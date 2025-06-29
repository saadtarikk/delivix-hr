# Delivix HR: Architectural Deep Dive

## Chapter 13: Recruitment Module API

This document outlines the API endpoints for the Recruitment module. This API manages the entire hiring process, from posting job vacancies to managing candidates through a multi-step interview and offering process.

### Key Architectural Observations
- **Workflow-Driven Design**: The API is highly focused on actions and state transitions. Endpoints like `/shortlist`, `/shedule-interview`, `/pass`, `/fail`, and `/hire` represent explicit, well-defined steps in the recruitment pipeline. This is a very strong and clear way to model a complex business process.
- **Clear Entity Separation**: The API properly separates the management of `vacancies` (the job openings) and `candidates` (the applicants), linking them implicitly through the workflow actions.
- **Public vs. Internal Endpoints**: The design wisely includes separate `/public/vacancies` endpoints. This allows the internal recruitment tool to be developed independently from a public-facing careers page, which can consume the read-only public API.

---

### Recruitment API Endpoint Summary

This table summarizes the most critical endpoints for the Recruitment module, highlighting the key workflow steps.

| Path                                                       | Methods        | Description                                                                                             |
| :--------------------------------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------ |
| `/api/v2/recruitment/vacancies`                            | `GET`, `POST`, `DELETE` | **Recruiter:** CRUD for job vacancies.                                                                  |
| `/api/v2/recruitment/candidates`                           | `GET`, `POST`, `DELETE` | **Recruiter:** CRUD for candidates. New applicants are added here.                                        |
| `/api/v2/recruitment/candidates/{candidateId}/shortlist`   | `PUT`          | **Workflow:** Moves a candidate to the "Shortlisted" state.                                             |
| `/api/v2/recruitment/candidates/{candidateId}/shedule-interview` | `POST`         | **Workflow:** Schedules an interview for the candidate.                                                 |
| `/api/v2/recruitment/candidates/{candidateId}/interviews/{interviewId}/pass` | `PUT`          | **Workflow:** Marks an interview as "Passed".                                                           |
| `/api/v2/recruitment/candidates/{candidateId}/interviews/{interviewId}/fail` | `PUT`          | **Workflow:** Marks an interview as "Failed".                                                           |
| `/api/v2/recruitment/candidates/{candidateId}/job/offer`   | `PUT`          | **Workflow:** Moves a candidate to the "Job Offered" state.                                             |
| `/api/v2/recruitment/candidates/{candidateId}/hire`        | `PUT`          | **Workflow:** The final step. Moves a candidate to "Hired", likely triggering their creation as an employee in PIM. |
| `/api/v2/recruitment/public/vacancies`                     | `GET`          | **Public:** A read-only endpoint to list open jobs, suitable for a public careers website.              |

---

### Conclusion
The Recruitment API is an excellent example of a workflow-driven design. Its clear, action-oriented endpoints provide a robust foundation for building a feature-rich applicant tracking system (ATS). This model should be closely followed for the recruitment features in Delivix HR. 