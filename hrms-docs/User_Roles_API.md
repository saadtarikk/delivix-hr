# Delivix HR: Architectural Deep Dive

## Chapter 10: User Roles & Permissions API

This document outlines the API endpoints for managing User Roles and their associated permissions. This is a critical security component of the application, defining who can see and do what. This functionality is logically part of the **Admin Module**.

### Key Architectural Observations
- **Clear Responsibility**: The API correctly separates the management of `users` (the people) from `user-roles` (the definition of their capabilities).
- **Granular Control**: A dedicated endpoint for `/permissions` on each role allows for the fine-grained assignment of access rights, matching the data model we previously analyzed.

---

### User Roles & Permissions API Endpoint Summary

This table summarizes the critical endpoints for managing the system's Role-Based Access Control (RBAC).

| Path                                        | Methods        | Description                                                                                                   |
| :------------------------------------------ | :------------- | :------------------------------------------------------------------------------------------------------------ |
| `/api/v2/admin/user-roles`                  | `GET`, `POST`, `DELETE` | **CRUD** for User Roles (e.g., "Admin", "ESS", "Supervisor"). This is where roles are created or deleted.     |
| `/api/v2/admin/user-roles/{id}`             | `GET`, `PUT`   | Gets or updates the name and details of a single user role.                                                     |
| `/api/v2/admin/user-roles/{id}/permissions` | `GET`, `PUT`   | **The key security endpoint.** Gets or sets the detailed screen-level CRUD permissions for a specific user role. |

---

### Conclusion
This API provides a robust and secure method for implementing Role-Based Access Control. By defining roles and then assigning specific permissions to them, the system can be flexibly configured to meet the security needs of any organization. This is a vital blueprint for the security model of the new Delivix HR application. 