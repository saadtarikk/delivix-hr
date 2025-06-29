# Delivix HR: Architectural Deep Dive

## Chapter 11: Leave Module API

This document outlines the API endpoints for the Leave Management module. This API provides a comprehensive interface for the entire leave workflow, from administrative configuration to employee self-service and manager approvals.

### Key Architectural Observations
- **Clear Separation of Concerns**: The API is well-structured, with distinct endpoints for administrative setup (`/leave/holidays`, `/leave/leave-types`), employee self-service (`/leave/leave-requests`), and manager/admin actions (`/leave/employees/leave-requests`).
- **Full Workflow Support**: The endpoints collectively support the complete leave management lifecycle, including checking balances, submitting requests, adding comments, and processing approvals or rejections.
- **Consistency**: The API maintains the same RESTful design, versioning, and controller patterns seen in the PIM and Admin modules, ensuring a consistent and predictable developer experience.

---

### Leave API Endpoint Summary

This table summarizes the most critical endpoints for the Leave module.

| Path                                        | Methods               | Description                                                                                                   |
| :------------------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------ |
| `/api/v2/leave/leave-types`                 | `GET`, `POST`, `DELETE` | **Admin:** CRUD for the different types of leave available in the organization (e.g., "Annual", "Sick").        |
| `/api/v2/leave/holidays`                    | `GET`, `POST`, `DELETE` | **Admin:** CRUD for defining public holidays, which affects leave calculations.                               |
| `/api/v2/leave/workweek`                    | `GET`, `PUT`          | **Admin:** Defines the company's standard working days of the week.                                           |
| `/api/v2/leave/leave-entitlements`          | `GET`, `POST`, `DELETE` | **Admin:** CRUD for assigning leave entitlements (e.g., giving "20 days of Annual Leave" to an employee or group). |
| `/api/v2/leave/leave-requests`              | `GET`, `POST`         | **Employee:** Creates a new leave request or views their own past requests. This is a core self-service feature.    |
| `/api/v2/leave/employees/leave-requests`    | `GET`, `PUT`          | **Supervisor/Admin:** Views and manages leave requests for other employees. The `PUT` is used for approvals/rejections. |
| `/api/v2/leave/employees/leave-balances`    | `GET`                 | **Employee/Admin:** Retrieves current leave balances for one or more employees.                               |

---

### Conclusion
The Leave Module API provides a robust and complete set of tools for managing employee time off. Its logical structure and comprehensive features make it an excellent model for the leave functionality in the new Delivix HR application. 