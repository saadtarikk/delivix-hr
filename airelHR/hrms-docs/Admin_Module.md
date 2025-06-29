# Delivix HR: Architectural Deep Dive

## Chapter 2: Admin Module Data Model

This document outlines the database schema for the Admin module. This module is responsible for managing the organizational structure and the metadata used throughout the application, providing the foundational data for other modules like PIM.

### Core Configuration Tables

- **`ohrm_organization_gen_info`**: A key-value store for general company information like name, tax ID, and address.
  ```sql
  CREATE TABLE `ohrm_organization_gen_info` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `tax_id` VARCHAR(30) DEFAULT NULL,
    `registration_number` VARCHAR(30) DEFAULT NULL,
    `phone` VARCHAR(30) DEFAULT NULL,
    `fax` VARCHAR(30) DEFAULT NULL,
    `email` VARCHAR(30) DEFAULT NULL,
    `country` VARCHAR(30) DEFAULT NULL,
    `province` VARCHAR(30) DEFAULT NULL,
    `city` VARCHAR(30) DEFAULT NULL,
    `zip_code` VARCHAR(30) DEFAULT NULL,
    `street1` VARCHAR(100) DEFAULT NULL,
    `street2` VARCHAR(100) DEFAULT NULL,
    `note` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=INNODB DEFAULT CHARSET=utf8;
  ```

- **`ohrm_subunit`**: The core table for the Company Structure, allowing for a tree-like hierarchy of divisions and departments. It likely has a `parent` column referencing itself.
  ```sql
  CREATE TABLE `ohrm_subunit` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `unit_id` VARCHAR(100) DEFAULT NULL,
    `description` VARCHAR(400) DEFAULT NULL,
    `lft` INT,
    `rgt` INT,
    `level` INT,
    `parent` INT,
    PRIMARY KEY (`id`)
  ) ENGINE=INNODB DEFAULT CHARSET=utf8;
  ```

- **`ohrm_location`**: Defines physical company locations (offices, branches) that can be associated with employees or subdivisions.
  ```sql
  CREATE TABLE `ohrm_location` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `country_code` VARCHAR(3) NOT NULL,
    `province` VARCHAR(60) DEFAULT NULL,
    `city` VARCHAR(60) DEFAULT NULL,
    `address` VARCHAR(255) DEFAULT NULL,
    `zip_code` VARCHAR(30) DEFAULT NULL,
    `phone` VARCHAR(30) DEFAULT NULL,
    `fax` VARCHAR(30) DEFAULT NULL,
    `notes` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=INNODB DEFAULT CHARSET=utf8;
  ```

### Job & Salary Structure Tables

- **`ohrm_job_title`**: Defines all job titles within the organization. This is referenced by `hs_hr_employee`.
  ```sql
  CREATE TABLE `ohrm_job_title` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `job_title` VARCHAR(100) NOT NULL,
    `job_description` VARCHAR(400) DEFAULT NULL,
    `note` VARCHAR(400) DEFAULT NULL,
    `job_spec_attachment_id` INT DEFAULT NULL,
    `is_deleted` TINYINT(1) DEFAULT 0,
    PRIMARY KEY (`id`)
  ) ENGINE=INNODB DEFAULT CHARSET=utf8;
  ```

- **`ohrm_pay_grade`**: Defines salary bands with minimum and maximum values, providing structure for compensation.
  ```sql
  CREATE TABLE `ohrm_pay_grade` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(60) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=INNODB DEFAULT CHARSET=utf8;
  ```
  *Note: The currency and salary steps are defined in the related `ohrm_pay_grade_currency` table.*

### Metadata (Lookup) Tables
These tables provide the options for dropdowns and selectors throughout the PIM module. They are managed here in the Admin section.

- **`ohrm_employment_status`**: Defines statuses like "Full-Time", "Part-Time", "Contract".
- **`ohrm_job_category`**: For grouping job titles.
- **`ohrm_nationality`**: A simple lookup table for nationalities.
- **`ohrm_skill`**: Manages the list of available skills.
- **`ohrm_license`**: Manages the list of available professional licenses.
- **`ohrm_language`**: Manages the list of available languages.
- **`ohrm_education`**: Defines education levels (e.g., "Bachelors Degree").

### Summary
The Admin module serves as the configuration hub for the entire system. It establishes the organizational chart, job roles, salary structures, and the metadata required to populate employee records in PIM. Its proper configuration is a prerequisite for the effective use of all other modules. 