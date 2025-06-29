# Delivix HR: Architectural Deep Dive

## Chapter 7: Performance Module Data Model

This document outlines the database schema for the Performance module. This module facilitates the employee performance review process, including the management of Key Performance Indicators (KPIs), review cycles, and ratings from various reviewers.

### Core Performance Tables

- **`ohrm_kpi`**: This table stores the Key Performance Indicators that employees are rated against. KPIs are typically associated with a specific `ohrm_job_title`.
  ```sql
  CREATE TABLE `ohrm_kpi` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `job_title_code` INT,
    `kpi_indicators` VARCHAR(255),
    `min_rating` INT DEFAULT 1,
    `max_rating` INT DEFAULT 5,
    `default_kpi` TINYINT(1) DEFAULT 0,
    `deleted` TINYINT(1) DEFAULT 0,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`job_title_code`) REFERENCES `ohrm_job_title`(`id`) ON DELETE CASCADE
  );
  ```
  **Analysis**: KPIs are defined with a rating scale (`min_rating`, `max_rating`), and they are linked directly to job titles, ensuring that employees are evaluated on relevant criteria.

- **`ohrm_performance_review`**: This is the central table for a performance review instance. It links an employee, a set of reviewers, and tracks the status and period of the review.
  ```sql
  CREATE TABLE `ohrm_performance_review` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `employee_number` INT,
    `reviewer_id` INT,
    `creator_id` INT,
    `job_title_code` INT,
    `status` INT,
    `from_date` DATE,
    `to_date` DATE,
    `due_date` DATE,
    `completed_date` DATE,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`employee_number`) REFERENCES `hs_hr_employee`(`emp_number`) ON DELETE CASCADE,
    FOREIGN KEY (`reviewer_id`) REFERENCES `ohrm_reviewer`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`creator_id`) REFERENCES `hs_hr_employee`(`emp_number`) ON DELETE SET NULL
  );
  ```
  **Analysis**: The `status` column is key to the workflow, tracking the review from "SCHEDULED" to "IN PROGRESS" and "COMPLETED".

- **`ohrm_reviewer`**: This table represents an individual who is providing feedback in a review. This is typically a supervisor but can be other employees (e.g., for 360-degree feedback).
  ```sql
  CREATE TABLE `ohrm_reviewer` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `review_id` INT,
    `employee_number` INT,
    `status` INT,
    `completed_date` DATE,
    `comment` TEXT,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`review_id`) REFERENCES `ohrm_performance_review`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`employee_number`) REFERENCES `hs_hr_employee`(`emp_number`) ON DELETE CASCADE
  );
  ```

- **`ohrm_reviewer_rating`**: This table stores the actual rating given by a reviewer for a specific KPI within a performance review.
  ```sql
  CREATE TABLE `ohrm_reviewer_rating` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `review_id` INT,
    `reviewer_id` INT,
    `kpi_id` INT,
    `rating` INT,
    `comment` TEXT,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`review_id`) REFERENCES `ohrm_performance_review`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`reviewer_id`) REFERENCES `ohrm_reviewer`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`kpi_id`) REFERENCES `ohrm_kpi`(`id`) ON DELETE CASCADE
  );
  ```
  **Analysis**: This is the most granular table, capturing the specific scores and comments that form the core of the performance evaluation.

### Summary
The Performance module provides a structured framework for formal employee evaluations.
1.  **Configuration**: An admin or HR manager defines `ohrm_kpi`s and associates them with specific `ohrm_job_title`s.
2.  **Review Cycle Creation**: A new `ohrm_performance_review` is created for an employee for a specific period.
3.  **Reviewer Assignment**: One or more `ohrm_reviewer` records are created and linked to the performance review.
4.  **Evaluation**: Each reviewer submits their feedback by creating `ohrm_reviewer_rating` records for each relevant KPI.
5.  **Completion**: Once all reviewers have submitted their ratings, the `status` of the `ohrm_performance_review` is updated to "COMPLETED", and the results are finalized. 