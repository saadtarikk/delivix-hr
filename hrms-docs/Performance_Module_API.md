# Delivix HR: Architectural Deep Dive

## Chapter 14: Performance Module API

This document outlines the API endpoints for the Performance module. This API facilitates the entire employee performance review lifecycle, from managing Key Performance Indicators (KPIs) to conducting multi-stage evaluations.

### Key Architectural Observations
- **Evaluation-Focused Design**: The API is clearly centered around the `reviews` resource and the different types of `evaluation` that contribute to it (employee, supervisor, final). This provides a structured workflow for the review process.
- **Centralized KPI Management**: The API provides endpoints for managing a central library of `kpis`, which can then be associated with specific performance reviews, ensuring consistency.
- **Role-Differentiated Endpoints**: The design clearly separates endpoints for different actors in the process: administrators setting up reviews, employees performing self-evaluations, and supervisors conducting their evaluations.

---

### Performance API Endpoint Summary

This table summarizes the most critical endpoints for the Performance module.

| Path                                                       | Methods        | Description                                                                                             |
| :--------------------------------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------ |
| `/api/v2/performance/kpis`                                 | `GET`, `POST`, `DELETE` | **Admin:** CRUD for Key Performance Indicators (KPIs), the metrics used for evaluation.                  |
| `/api/v2/performance/manage/reviews`                       | `GET`, `POST`, `DELETE` | **Admin:** CRUD for Performance Reviews. This is where new review cycles are created and managed.      |
| `/api/v2/performance/reviews/{reviewId}/kpis`              | `GET`          | **Employee/Supervisor:** Retrieves the specific KPIs associated with a given performance review.           |
| `/api/v2/performance/reviews/{reviewId}/evaluation/employee` | `GET`, `PUT`   | **Employee:** Retrieves or submits the employee's self-evaluation for a review.                         |
| `/api/v2/performance/reviews/{reviewId}/evaluation/supervisor` | `GET`, `PUT`   | **Supervisor:** Retrieves or submits the supervisor's evaluation of the employee for a review.          |
| `/api/v2/performance/reviews/{reviewId}/evaluation/final`  | `GET`, `PUT`   | **Supervisor/Admin:** Retrieves or submits the final evaluation and rating for a review.                |
| `/api/v2/performance/trackers`                             | `GET`          | **Employee:** Allows employees to view their performance trackers (logs of achievements/goals).         |

---

### Conclusion
The Performance Module API provides a well-structured and comprehensive interface for managing employee performance. Its clear separation of concerns and workflow-oriented design make it a solid blueprint for the performance management features in the new Delivix HR application. 