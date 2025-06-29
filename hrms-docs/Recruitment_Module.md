# Delivix HR: Architectural Deep Dive

## Chapter 6: Recruitment Module Data Model

This document outlines the database schema for the Recruitment module. This module manages the entire hiring lifecycle, from defining job vacancies and managing candidates to conducting interviews and making job offers.

### Core Recruitment Tables

- **`ohrm_job_vacancy`**: This table holds the details of a specific job opening. It links to a `ohrm_job_title` and an employee who acts as the hiring manager.
  ```sql
  CREATE TABLE `ohrm_job_vacancy` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `job_title_code` INT,
    `hiring_manager_id` INT,
    `name` VARCHAR(255),
    `description` TEXT,
    `status` INT,
    `published_in_feed` TINYINT(1) DEFAULT 0,
    `defined_time` TIMESTAMP,
    `updated_time` TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`job_title_code`) REFERENCES `ohrm_job_title`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`hiring_manager_id`) REFERENCES `hs_hr_employee`(`emp_number`) ON DELETE SET NULL
  );
  ```
  **Analysis**: `status` tracks whether the vacancy is "ACTIVE", "CLOSED", etc. `published_in_feed` suggests an integration with a public job board or a "Careers" page.

- **`ohrm_job_candidate`**: This table stores information about individuals who have applied for jobs. It is a separate "person" table, distinct from `hs_hr_employee`.
  ```sql
  CREATE TABLE `ohrm_job_candidate` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100),
    `middle_name` VARCHAR(100),
    `last_name` VARCHAR(100),
    `email` VARCHAR(100),
    `contact_number` VARCHAR(30),
    `keywords` VARCHAR(255),
    `comment` TEXT,
    `date_of_application` DATE,
    `consent_to_keep_data` TINYINT(1) DEFAULT 0,
    PRIMARY KEY (`id`)
  );
  ```
  **Analysis**: `consent_to_keep_data` is an important field for GDPR and data privacy compliance.

- **`ohrm_job_candidate_vacancy`**: This is the crucial join table that represents a single application, linking a candidate to a vacancy. It also tracks the application's status through the hiring pipeline.
  ```sql
  CREATE TABLE `ohrm_job_candidate_vacancy` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `candidate_id` INT NOT NULL,
    `vacancy_id` INT NOT NULL,
    `status` VARCHAR(100),
    `applied_date` TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`candidate_id`) REFERENCES `ohrm_job_candidate`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`vacancy_id`) REFERENCES `ohrm_job_vacancy`(`id`) ON DELETE CASCADE
  );
  ```
  **Analysis**: The `status` field is the core of the recruitment workflow, tracking a candidate's progress from "APPLICATION INITIATED" to "INTERVIEW SCHEDULED", "OFFERED", and "HIRED".

### Supporting Recruitment Tables

- **`ohrm_job_interview`**: Stores details about scheduled interviews, linking the application, the interviewers, and the date/time.
  ```sql
  CREATE TABLE `ohrm_job_interview` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `candidate_vacancy_id` INT,
    `interview_name` VARCHAR(100),
    `interview_date` DATE,
    `interview_time` TIME,
    `note` TEXT,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`candidate_vacancy_id`) REFERENCES `ohrm_job_candidate_vacancy`(`id`) ON DELETE CASCADE
  );
  ```

- **`ohrm_job_interview_interviewer`**: A join table to allow multiple interviewers for a single interview.
  ```sql
  CREATE TABLE `ohrm_job_interview_interviewer` (
    `interview_id` INT NOT NULL,
    `interviewer_id` INT NOT NULL,
    PRIMARY KEY (`interview_id`, `interviewer_id`),
    FOREIGN KEY (`interview_id`) REFERENCES `ohrm_job_interview`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`interviewer_id`) REFERENCES `hs_hr_employee`(`emp_number`) ON DELETE CASCADE
  );
  ```

- **`ohrm_job_candidate_attachment`**: Stores attachments related to a candidate, such as their resume or cover letter.
  ```sql
  CREATE TABLE `ohrm_job_candidate_attachment` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `candidate_id` INT NOT NULL,
    `file_name` VARCHAR(255),
    `file_type` VARCHAR(255),
    `file_size` INT,
    `file_content` MEDIUMBLOB,
    `attachment_type` INT,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`candidate_id`) REFERENCES `ohrm_job_candidate`(`id`) ON DELETE CASCADE
  );
  ```

### Summary
The Recruitment module provides a comprehensive Applicant Tracking System (ATS).
1.  **Vacancy Creation**: A hiring manager creates an `ohrm_job_vacancy` for a specific `ohrm_job_title`.
2.  **Application**: A person applies, creating an `ohrm_job_candidate` record and an `ohrm_job_candidate_vacancy` record to link them to the specific job. Their resume is stored in `ohrm_job_candidate_attachment`.
3.  **Pipeline Management**: The `status` of the `ohrm_job_candidate_vacancy` record is updated as the candidate moves through the process.
4.  **Interviewing**: `ohrm_job_interview` records are created to manage interview schedules.
5.  **Hiring**: When a candidate is hired, their `status` is updated, and the system would then trigger a workflow to create a new `hs_hr_employee` record from the `ohrm_job_candidate` data. 