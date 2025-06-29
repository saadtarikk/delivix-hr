# Delivix HR: Architectural Deep Dive

## Chapter 5: Time & Attendance Module Data Model

This document outlines the database schema for the Time and Attendance module. This module is responsible for tracking employee work hours through timesheets and individual attendance records.

### Core Timesheet Tables

- **`ohrm_timesheet`**: This table acts as a header or container for a collection of time entries for a single employee over a specific period (e.g., a week).
  ```sql
  CREATE TABLE `ohrm_timesheet` (
    `timesheet_id` INT NOT NULL AUTO_INCREMENT,
    `employee_id` INT NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    PRIMARY KEY (`timesheet_id`),
    FOREIGN KEY (`employee_id`) REFERENCES `hs_hr_employee`(`emp_number`) ON DELETE CASCADE
  );
  ```
  **Analysis**: The `state` column (e.g., "NOT SUBMITTED", "SUBMITTED", "APPROVED") is crucial for managing the timesheet approval workflow.

- **`ohrm_timesheet_item`**: This table holds the individual time entries that make up a timesheet. Each row represents a block of time spent on a specific activity.
  ```sql
  CREATE TABLE `ohrm_timesheet_item` (
    `timesheet_item_id` INT NOT NULL AUTO_INCREMENT,
    `timesheet_id` INT NOT NULL,
    `project_id` INT NOT NULL,
    `activity_id` INT NOT NULL,
    `date` DATE NOT NULL,
    `duration` INT NOT NULL,
    `comment` VARCHAR(255),
    PRIMARY KEY (`timesheet_item_id`),
    FOREIGN KEY (`timesheet_id`) REFERENCES `ohrm_timesheet`(`timesheet_id`) ON DELETE CASCADE
  );
  ```
  **Analysis**: Time is tracked against `project_id` and `activity_id`, allowing for detailed reporting on how work hours are spent. Duration is stored as an integer, likely representing seconds or minutes.

### Project & Customer Tables (for Time Categorization)
These tables are managed in the Admin module but are fundamental to the Time module's operation.

- **`ohrm_customer`**: Defines external customers or clients.
  ```sql
  CREATE TABLE `ohrm_customer` (
    `customer_id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255),
    `deleted` TINYINT(1) DEFAULT 0,
    PRIMARY KEY (`customer_id`)
  );
  ```

- **`ohrm_project`**: Defines projects, which are always associated with a customer.
  ```sql
  CREATE TABLE `ohrm_project` (
    `project_id` INT NOT NULL AUTO_INCREMENT,
    `customer_id` INT NOT NULL,
    `name` VARCHAR(100),
    `description` VARCHAR(255),
    `deleted` TINYINT(1) DEFAULT 0,
    PRIMARY KEY (`project_id`),
    FOREIGN KEY (`customer_id`) REFERENCES `ohrm_customer`(`customer_id`) ON DELETE CASCADE
  );
  ```

- **`ohrm_project_activity`**: Defines the specific activities that can be performed within a project.
  ```sql
  CREATE TABLE `ohrm_project_activity` (
    `activity_id` INT NOT NULL AUTO_INCREMENT,
    `project_id` INT NOT NULL,
    `name` VARCHAR(100),
    `deleted` TINYINT(1) DEFAULT 0,
    PRIMARY KEY (`activity_id`),
    FOREIGN KEY (`project_id`) REFERENCES `ohrm_project`(`project_id`) ON DELETE CASCADE
  );
  ```

### Attendance Records (Punch In/Out)

- **`ohrm_attendance_record`**: This table stores the raw punch-in and punch-out events for employees, providing a simpler way to track attendance.
  ```sql
  CREATE TABLE `ohrm_attendance_record` (
    `id` BIGINT AUTO_INCREMENT,
    `employee_id` INT NOT NULL,
    `punch_in_utc_time` DATETIME,
    `punch_in_note` VARCHAR(255),
    `punch_in_time_offset` VARCHAR(10),
    `punch_out_utc_time` DATETIME,
    `punch_out_note` VARCHAR(255),
    `punch_out_time_offset` VARCHAR(10),
    `state` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`employee_id`) REFERENCES `hs_hr_employee`(`emp_number`) ON DELETE CASCADE
  );
  ```
  **Analysis**: Storing times in UTC along with the timezone offset (`punch_in_time_offset`) is a robust way to handle employees in different geographic locations. The `state` indicates whether the record is active or has been manually edited/approved.

### Summary
The Time & Attendance module provides two primary methods for tracking work:
1.  **Timesheets**: A detailed, project-based method where employees categorize their work hours against specific projects and activities. This is ideal for professional services, client billing, and detailed productivity analysis.
2.  **Punch In/Out**: A simpler method focused on tracking start and end times for a workday. This is ideal for tracking overall attendance and for hourly workers.

The data model is well-designed to support both of these common workflows. 