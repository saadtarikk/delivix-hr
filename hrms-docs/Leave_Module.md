# Delivix HR: Architectural Deep Dive

## Chapter 4: Leave Module Data Model

This document outlines the database schema for the Leave Management module. This module is a core HR function that manages all aspects of employee time-off, from entitlements to requests and balance tracking.

### Core Leave Configuration Tables

- **`ohrm_leave_type`**: Defines the different categories of leave available (e.g., "Annual Leave", "Sick Leave", "Unpaid Leave").
  ```sql
  CREATE TABLE `ohrm_leave_type` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `deleted` TINYINT(1) DEFAULT 0,
    `exclude_in_reports_if_no_entitlement` TINYINT(1) DEFAULT 0,
    `operational_country_id` INT DEFAULT NULL,
    PRIMARY KEY (`id`)
  );
  ```

- **`ohrm_holiday`**: Defines specific public holidays for the organization. These days are typically not counted against an employee's leave balance.
  ```sql
  CREATE TABLE `ohrm_holiday` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(214) DEFAULT NULL,
    `date` DATE DEFAULT NULL,
    `recurring` TINYINT(1) DEFAULT 0,
    `length` DECIMAL(2,1) DEFAULT NULL,
    `operational_country_id` INT DEFAULT NULL,
    PRIMARY KEY (`id`)
  );
  ```

- **`ohrm_work_week`**: Defines the company's standard working week, including which days are considered workdays. This is critical for calculating the duration of a leave request.
  ```sql
  CREATE TABLE IF NOT EXISTS `ohrm_work_week` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `day` TINYINT(1) NOT NULL,
    `length` DECIMAL(4,2) NOT NULL,
    `operational_country_id` INT DEFAULT NULL,
    PRIMARY KEY (`id`)
  );
  ```

### Entitlement and Balance Management

- **`ohrm_leave_entitlement`**: This is a crucial table that assigns a specific number of leave days of a certain type to an employee for a given leave period.
  ```sql
  CREATE TABLE `ohrm_leave_entitlement` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `emp_number` INT NOT NULL,
    `no_of_days` DECIMAL(8,4) NOT NULL,
    `days_used` DECIMAL(8,4) DEFAULT 0.0000,
    `leave_type_id` INT NOT NULL,
    `from_date` DATE NOT NULL,
    `to_date` DATE NOT NULL,
    `entitlement_type_id` INT NOT NULL,
    `deleted` TINYINT(1) DEFAULT 0,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`emp_number`) REFERENCES `hs_hr_employee`(`emp_number`) ON DELETE CASCADE,
    FOREIGN KEY (`leave_type_id`) REFERENCES `ohrm_leave_type`(`id`) ON DELETE CASCADE
  );
  ```
  **Analysis**: This table tracks the total entitlement (`no_of_days`) and how much has been used (`days_used`). This forms the basis of an employee's leave balance.

- **`ohrm_leave_adjustment`**: Allows an administrator to manually adjust an employee's leave entitlement (e.g., adding carry-over days).
  ```sql
  CREATE TABLE `ohrm_leave_adjustment` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `emp_number` INT NOT NULL,
    `no_of_days` DECIMAL(8,4) NOT NULL,
    `leave_type_id` INT NOT NULL,
    `from_date` DATE DEFAULT NULL,
    `to_date` DATE DEFAULT NULL,
    `adjustment_type` INT,
    `created_by_id` INT,
    `created_by_name` VARCHAR(255),
    `created_at` TIMESTAMP,
    `note` VARCHAR(255),
    PRIMARY KEY (`id`)
  );
  ```

### Leave Request Workflow

- **`ohrm_leave_request`**: Stores the initial request for leave made by an employee.
  ```sql
  CREATE TABLE `ohrm_leave_request` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `leave_type_id` INT NOT NULL,
    `date_applied` DATE NOT NULL,
    `emp_number` INT NOT NULL,
    `comments` VARCHAR(256) DEFAULT NULL,
    PRIMARY KEY (`id`)
  );
  ```

- **`ohrm_leave`**: This table represents the actual leave event, including dates, duration, and status (e.g., Pending Approval, Scheduled, Taken, Rejected). It links to a leave request.
  ```sql
  CREATE TABLE `ohrm_leave` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `date` DATE DEFAULT NULL,
    `length_hours` DECIMAL(6,2) DEFAULT NULL,
    `length_days` DECIMAL(8,4) DEFAULT NULL,
    `status` SMALLINT,
    `comments` VARCHAR(256) DEFAULT NULL,
    `leave_request_id` INT NOT NULL,
    `leave_type_id` INT NOT NULL,
    `emp_number` INT NOT NULL,
    `start_time` TIME DEFAULT NULL,
    `end_time` TIME DEFAULT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`leave_request_id`) REFERENCES `ohrm_leave_request`(`id`) ON DELETE CASCADE
  );
  ```
  **Analysis**: A single `ohrm_leave_request` can result in multiple rows in `ohrm_leave` if the leave spans multiple days. The `status` column is key to tracking the request through its lifecycle.

### Summary
The Leave Module is a well-structured system.
1.  **Configuration**: An admin first defines `ohrm_leave_type`, `ohrm_holiday`, and `ohrm_work_week`.
2.  **Entitlement**: The admin then assigns leave to employees by creating records in `ohrm_leave_entitlement`.
3.  **Request Workflow**: An employee creates an `ohrm_leave_request`, which generates one or more `ohrm_leave` records.
4.  **Approval**: A supervisor or admin changes the `status` of the `ohrm_leave` records.
5.  **Balance Update**: Once leave is approved and taken, the `days_used` in the corresponding `ohrm_leave_entitlement` record is updated. 