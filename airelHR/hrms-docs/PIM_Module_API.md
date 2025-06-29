# Delivix HR: Architectural Deep Dive

## Chapter 8: PIM Module API

This document outlines the API endpoints for the PIM module, as defined in the `routes.yaml` configuration. The API provides a comprehensive and RESTful interface for managing all aspects of employee data.

### Key Architectural Observations
- **API Versioning**: All endpoints are consistently prefixed with `/api/v2/`, indicating good versioning practice.
- **Resource-Oriented Design**: URLs are structured around the primary `pim/employees` resource and its sub-resources (e.g., `picture`, `job-details`).
- **Standard HTTP Methods**: The API correctly and consistently uses `GET` for retrieval, `POST` for creation, `PUT` for updates, and `DELETE` for removal.
- **Generic Controller Pattern**: The system uses a `GenericRestController` that delegates logic to specific API handler classes (e.g., `OrangeHRM\Pim\Api\EmployeeAPI`). This is a scalable and maintainable architectural pattern.

---

### PIM API Endpoint Summary

This table summarizes the most important endpoints and their functions. This serves as the primary contract for any frontend interacting with the PIM module.

| Path                                                       | Methods               | Description                                                                     |
| :--------------------------------------------------------- | :-------------------- | :------------------------------------------------------------------------------ |
| `/api/v2/pim/employees`                                    | `GET`, `POST`, `DELETE` | **The main endpoint.** Gets a list of employees, creates a new employee, or deletes multiple employees. |
| `/api/v2/pim/employees/{empNumber}`                        | `GET`, `PUT`          | Gets or updates the core details for a single employee.                          |
| `/api/v2/pim/employees/count`                              | `GET`                 | Retrieves the total number of employees, useful for pagination.                 |
| `/api/v2/pim/employees/{empNumber}/picture`                | `GET`, `PUT`          | Gets or updates an employee's profile picture.                                  |
| `/api/v2/pim/employees/{empNumber}/personal-details`       | `GET`, `PUT`          | Manages an employee's personal details (name, birthday, gender, etc.).          |
| `/api/v2/pim/employees/{empNumber}/job-details`            | `GET`, `PUT`          | Manages an employee's job-related information (title, status, subunit).         |
| `/api/v2/pim/employees/{empNumber}/contact-details`        | `GET`, `PUT`          | Manages an employee's contact information (address, phone, email).              |
| `/api/v2/pim/employees/{empNumber}/salary-components`      | `GET`, `POST`, `DELETE` | Manages the list of salary components for an employee.                          |
| `/api/v2/pim/employees/{empNumber}/dependents`             | `GET`, `POST`, `DELETE` | Manages the list of an employee's dependents.                                   |
| `/api/v2/pim/employees/{empNumber}/emergency-contacts`     | `GET`, `POST`, `DELETE` | Manages the list of an employee's emergency contacts.                           |
| `/api/v2/pim/employees/{empNumber}/attachments`            | `GET`, `POST`, `DELETE` | Manages file attachments associated with an employee's record.                  |
| `/api/v2/pim/employees/{empNumber}/skills`                 | `GET`, `POST`, `DELETE` | Manages the list of skills for an employee.                                     |
| `/api/v2/pim/employees/{empNumber}/educations`             | `GET`, `POST`, `DELETE` | Manages the list of educational qualifications for an employee.                 |
| `/api/v2/pim/employees/{empNumber}/languages`              | `GET`, `POST`, `DELETE` | Manages the list of languages for an employee.                                  |
| `/api/v2/pim/employees/{empNumber}/terminations`           | `GET`, `POST`, `DELETE` | Manages termination records for an employee.                                    |

---

### Conclusion
The PIM API is well-structured and follows modern REST conventions. The breakdown of the large employee resource into smaller, more focused sub-resources is an excellent design choice that improves usability and performance. This API definition provides a clear blueprint for developing the PIM features in the new Delivix HR application. 