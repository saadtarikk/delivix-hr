# Delivix HR: Architectural Deep Dive

## Chapter 1: PIM (Personal Information Management) Data Model

This document outlines the database schema for the core Personal Information Management (PIM) module. The analysis is based on the foundational SQL scripts from the OrangeHRM source.

### The Core Table: `hs_hr_employee`

This is the central table for every employee record. It acts as the hub for all personal and job-related information.

#### Schema Definition
```sql
CREATE TABLE `hs_hr_employee` (
  `emp_number` INT(7) NOT NULL,
  `employee_id` VARCHAR(50) DEFAULT NULL,
  `emp_lastname` VARCHAR(100) NOT NULL DEFAULT '',
  `emp_firstname` VARCHAR(100) NOT NULL DEFAULT '',
  `emp_middle_name` VARCHAR(100) NOT NULL DEFAULT '',
  `emp_nick_name` VARCHAR(100) DEFAULT '',
  `emp_smoker` SMALLINT(6) DEFAULT '0',
  `ethic_race_code` VARCHAR(13) DEFAULT NULL,
  `emp_birthday` DATE DEFAULT NULL,
  `nation_code` VARCHAR(13) DEFAULT NULL,
  `emp_gender` SMALLINT(6) DEFAULT NULL,
  `emp_marital_status` VARCHAR(20) DEFAULT NULL,
  `emp_ssn_num` VARCHAR(100) DEFAULT '',
  `emp_sin_num` VARCHAR(100) DEFAULT '',
  `emp_other_id` VARCHAR(100) DEFAULT '',
  `emp_dri_lice_num` VARCHAR(100) DEFAULT '',
  `emp_dri_lice_exp_date` DATE DEFAULT NULL,
  `emp_military_service` VARCHAR(100) DEFAULT '',
  `emp_status` VARCHAR(13) DEFAULT NULL,
  `job_title_code` VARCHAR(13) DEFAULT NULL,
  `eeo_cat_code` VARCHAR(13) DEFAULT NULL,
  `work_station` VARCHAR(13) DEFAULT NULL,
  `emp_street1` VARCHAR(100) DEFAULT '',
  `emp_street2` VARCHAR(100) DEFAULT '',
  `city_code` VARCHAR(100) DEFAULT '',
  `coun_code` VARCHAR(100) DEFAULT '',
  `provin_code` VARCHAR(100) DEFAULT '',
  `emp_zipcode` VARCHAR(20) DEFAULT '',
  `emp_hm_telephone` VARCHAR(50) DEFAULT '',
  `emp_mobile` VARCHAR(50) DEFAULT '',
  `emp_work_telephone` VARCHAR(50) DEFAULT '',
  `emp_work_email` VARCHAR(50) DEFAULT '',
  `sal_grd_code` VARCHAR(13) DEFAULT NULL,
  `joined_date` DATE DEFAULT NULL,
  `emp_oth_email` VARCHAR(50) DEFAULT '',
  `termination_id` INT(4) DEFAULT NULL,
  `custom1` VARCHAR(250) DEFAULT NULL,
  `custom2` VARCHAR(250) DEFAULT NULL,
  `custom3` VARCHAR(250) DEFAULT NULL,
  `custom4` VARCHAR(250) DEFAULT NULL,
  `custom5` VARCHAR(250) DEFAULT NULL,
  `custom6` VARCHAR(250) DEFAULT NULL,
  `custom7` VARCHAR(250) DEFAULT NULL,
  `custom8` VARCHAR(250) DEFAULT NULL,
  `custom9` VARCHAR(250) DEFAULT NULL,
  `custom10` VARCHAR(250) DEFAULT NULL,
  PRIMARY KEY (`emp_number`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;
```

#### Analysis:
- **Primary Key**: `emp_number`. This is the central ID used as a foreign key across the application.
- **Personal Data**: Contains all basic personal information (`emp_lastname`, `emp_firstname`, `emp_birthday`, `emp_gender`, etc.).
- **National IDs**: Includes fields for `emp_ssn_num` (US) and `emp_sin_num` (Canada), indicating international design.
- **Job Information**: `job_title_code`, `emp_status`, and `work_station` link to other tables to define the employee's role.
- **Contact Info**: A comprehensive set of address and communication fields.
- **Custom Fields**: `custom1` through `custom10` provide simple extensibility for administrators.
- **Termination**: `termination_id` is a nullable foreign key, linking to a termination record.

---

### Key Satellite Tables for PIM

These tables store detailed information related to an employee, all linking back to `hs_hr_employee` via the `emp_number` foreign key.

- **`hs_hr_emp_picture`**: Stores the employee's profile picture as a `mediumblob`.
- **`hs_hr_emp_emergency_contacts`**: A one-to-many relationship for storing emergency contacts.
- **`hs_hr_emp_dependents` / `hs_hr_emp_children`**: Stores information about an employee's family members.
- **`ohrm_emp_education`**: Tracks educational qualifications, allowing multiple entries per employee.
- **`hs_hr_emp_skill`**: Manages employee skills.
- **`ohrm_emp_license`**: Stores professional licenses held by the employee.
- **`hs_hr_emp_language`**: Tracks language proficiency.
- **`hs_hr_emp_basicsalary`**: A crucial table for storing salary information. The `ebsal_basic_salary` column is a `VARCHAR`, suggesting potential application-layer encryption.
- **`hs_hr_emp_reportto`**: Defines the reporting hierarchy (manager-subordinate relationships) through a self-referencing link on the `hs_hr_employee` table. 