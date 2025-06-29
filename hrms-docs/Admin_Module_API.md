# Delivix HR: Architectural Deep Dive

## Chapter 9: Admin Module API

This document outlines the API endpoints for the Admin module. This API is responsible for managing all the foundational metadata and organizational structure that the rest of the application relies on, such as job titles, company locations, and user accounts.

### Key Architectural Observations
- **Design Consistency**: The API follows the same clean, RESTful, and resource-oriented design patterns established in the PIM module. All endpoints are versioned under `/api/v2/admin/`.
- **Comprehensive Coverage**: The endpoints provide full CRUD (Create, Read, Update, Delete) capabilities for all the key entities identified in the Admin data model.
- **Clear Separation**: This API cleanly separates the management of system-wide metadata from the management of specific employee data, which resides in the PIM API.

---

### Admin API Endpoint Summary

This table summarizes the most critical endpoints for managing the system's core configuration data.

| Path                                  | Methods               | Description                                                                                             |
| :------------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------ |
| `/api/v2/admin/organization`          | `GET`, `PUT`          | Manages the top-level company information.                                                              |
| `/api/v2/admin/job-titles`            | `GET`, `POST`, `DELETE` | **CRUD** for job titles, a fundamental piece of data for employees and recruitment.                       |
| `/api/v2/admin/subunits`              | `GET`, `POST`, `DELETE` | **CRUD** for organizational subunits (departments).                                                       |
| `/api/v2/admin/employment-statuses`   | `GET`, `POST`, `DELETE` | **CRUD** for employee statuses (e.g., "Full-Time", "Part-Time", "Contract").                            |
| `/api/v2/admin/locations`             | `GET`, `POST`, `DELETE` | **CRUD** for company office locations.                                                                  |
| `/api/v2/admin/pay-grades`            | `GET`, `POST`, `DELETE` | **CRUD** for pay grades, which are linked to employees.                                                 |
| `/api/v2/admin/users`                 | `GET`, `POST`, `DELETE` | **CRUD** for system users who can log in.                                                               |
| `/api/v2/admin/skills`                | `GET`, `POST`, `DELETE` | Manages the central list of skills available to be assigned to employees.                               |
| `/api/v2/admin/educations`            | `GET`, `POST`, `DELETE` | Manages the central list of educational qualifications.                                                 |
| `/api/v2/admin/languages`             | `GET`, `POST`, `DELETE` | Manages the central list of languages.                                                                  |
| `/api/v2/admin/nationalities`         | `GET`, `POST`, `DELETE` | Manages the central list of nationalities.                                                              |

---

### Conclusion
The Admin API is the backbone of the system's configuration. Its clear, consistent, and comprehensive nature makes it a solid blueprint for managing the settings of our new Delivix HR application. 