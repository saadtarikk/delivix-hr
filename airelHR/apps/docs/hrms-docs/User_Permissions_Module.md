# Delivix HR: Architectural Deep Dive

## Chapter 3: User, Roles, and Permissions Data Model

This document outlines the database schema for the User Management and Permissions module. This system controls authentication and authorization, determining what actions a user can perform.

### Core User and Role Tables

- **`ohrm_user`**: The central table for all system users who can log in. It is distinct from the `hs_hr_employee` table but can be linked to it.
  ```sql
  CREATE TABLE `ohrm_user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_role_id` INT NOT NULL,
    `emp_number` INT DEFAULT NULL,
    `user_name` VARCHAR(40) UNIQUE,
    `user_password` VARCHAR(255),
    `is_admin` VARCHAR(3) DEFAULT 'No',
    `status` TINYINT(1) DEFAULT 1,
    `created_by` INT,
    `created_date` DATETIME,
    `deleted` TINYINT(1) DEFAULT 0,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_role_id`) REFERENCES `ohrm_user_role`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`emp_number`) REFERENCES `hs_hr_employee`(`emp_number`) ON DELETE SET NULL
  );
  ```
  **Analysis:**
  - Every user must have a `user_role_id`, which defines their permissions.
  - A user can optionally be linked to an employee record via `emp_number`. This is how an employee gets ESS (Employee Self-Service) access.
  - A user not linked to an employee would be a non-employee admin.
  - The `is_admin` flag seems like a legacy or simplified way to grant full rights, but the primary mechanism is role-based.

- **`ohrm_user_role`**: Defines the different roles in the system (e.g., "Admin", "ESS", "Supervisor").
  ```sql
  CREATE TABLE `ohrm_user_role` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) UNIQUE NOT NULL,
    `display_name` VARCHAR(255) NOT NULL,
    `is_assignable` TINYINT(1) DEFAULT 0,
    `is_predefined` TINYINT(1) DEFAULT 0,
    PRIMARY KEY (`id`)
  ) ENGINE=INNODB DEFAULT CHARSET=utf8;
  ```
  **Analysis:**
  - This is the central point for creating and managing roles. The `name` is the unique identifier.
  - `is_predefined` likely protects default system roles from being deleted.

### Permission Control Schema

The permission model is screen-based. A role is granted access to specific screens within a module.

- **`ohrm_module`**: Defines the top-level modules of the application (e.g., "PIM", "Leave", "Admin").
  ```sql
  CREATE TABLE `ohrm_module` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) UNIQUE,
    `status` TINYINT(1) DEFAULT 1,
    PRIMARY KEY (`id`)
  ) ENGINE=INNODB DEFAULT CHARSET=utf8;
  ```

- **`ohrm_screen`**: Defines individual screens or pages within each module.
  ```sql
  CREATE TABLE ohrm_screen (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `module_id` INT NOT NULL,
    `action_url` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`module_id`) REFERENCES `ohrm_module`(`id`) ON DELETE CASCADE
  ) ENGINE=INNODB DEFAULT CHARSET=utf8;
  ```

- **`ohrm_user_role_screen`**: This is the crucial join table that assigns permissions. It maps which roles get access to which screens.
  ```sql
  CREATE TABLE ohrm_user_role_screen (
    `user_role_id` INT NOT NULL,
    `screen_id` INT NOT NULL,
    `can_read` TINYINT(1) DEFAULT 0,
    `can_create` TINYINT(1) DEFAULT 0,
    `can_update` TINYINT(1) DEFAULT 0,
    `can_delete` TINYINT(1) DEFAULT 0,
    PRIMARY KEY (`user_role_id`, `screen_id`),
    FOREIGN KEY (`user_role_id`) REFERENCES `ohrm_user_role`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`screen_id`) REFERENCES `ohrm_screen`(`id`) ON DELETE CASCADE
  );
  ```
  **Analysis:**
  - This table provides granular CRUD (Create, Read, Update, Delete) permissions for each role on a per-screen basis.
  - To check if a user can perform an action, the application would:
    1. Get the user's `user_role_id` from `ohrm_user`.
    2. Find the current `screen_id` based on the URL or page being viewed.
    3. Look up the entry in `ohrm_user_role_screen` for that role and screen.
    4. Check if the corresponding `can_read`, `can_create`, etc., flag is set to 1.

### Summary
The permissions system is a classic Role-Based Access Control (RBAC) implementation. Users are assigned to a single Role, and that Role is granted specific CRUD permissions for various Screens, which are grouped into Modules. This is a robust and flexible system for managing access control. 