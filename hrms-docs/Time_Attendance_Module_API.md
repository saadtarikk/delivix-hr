# Delivix HR: Architectural Deep Dive

## Chapter 12: Time & Attendance Module API

This document outlines the API endpoints for the Time & Attendance module. This API manages employee timesheets, attendance records, and the related entities such as customers, projects, and activities that enable detailed time tracking.

### Key Architectural Observations
- **Project-Based Time Tracking**: The API is heavily structured around `projects` and `customers`. This indicates a strong focus on tracking time against specific client work or internal initiatives, going beyond simple attendance.
- **Dual-Purpose Endpoints**: Following the established pattern, the API provides distinct endpoints for an employee's own timesheets (e.g., `/api/v2/time/timesheets`) and for managers to oversee employee timesheets (e.g., `/api/v2/time/employees/timesheets/list`).
- **Complete Timesheet Lifecycle**: The API supports the full workflow: creating a timesheet (`POST`), adding and editing time entries (`PUT .../entries`), and submitting for approval (`PUT .../timesheets/{id}`).

---

### Time & Attendance API Endpoint Summary

This table summarizes the most critical endpoints for the Time & Attendance module.

| Path                                     | Methods        | Description                                                                                               |
| :--------------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------- |
| `/api/v2/time/customers`                 | `GET`, `POST`, `DELETE` | **Admin:** CRUD for customers, which can be associated with projects.                                       |
| `/api/v2/time/projects`                  | `GET`, `POST`, `DELETE` | **Admin:** CRUD for projects. Time entries are logged against activities within these projects.           |
| `/api/v2/time/project/{projectId}/activities` | `GET`, `POST`, `DELETE` | **Admin:** CRUD for project activities. These are the specific tasks that employees log time against.     |
| `/api/v2/time/timesheets`                | `GET`, `POST`  | **Employee:** Retrieves an employee's own timesheets or creates a new one for the current period.          |
| `/api/v2/time/timesheets/{id}`           | `PUT`          | **Employee:** Submits the specified timesheet for approval.                                               |
| `/api/v2/time/timesheets/{timesheetId}/entries` | `GET`, `PUT`   | **Employee:** Retrieves or updates the individual time entries (the grid of hours) for a given timesheet.   |
| `/api/v2/time/employees/timesheets/list` | `GET`          | **Supervisor/Admin:** Retrieves a list of timesheets for multiple employees, typically for review and approval. |

---

### Conclusion
The Time & Attendance API provides a powerful and flexible system for tracking work hours. Its integration with project management concepts makes it a valuable model for the Delivix HR application, particularly for any future plans involving billable hours or project-based costing. 