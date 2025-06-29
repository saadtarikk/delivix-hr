# Delivix HR: Architectural Deep Dive - Leave Module Implementation

This document provides a deep, file-by-file analysis of the business logic for key functionalities within the Leave module.

---

## Functionality 1: Apply for Leave

**Trace:** `POST /api/v2/leave/leave-requests`

This functionality is a prime example of a well-structured, service-oriented architecture that handles a complex business process with multiple validation steps.

### 1. API Layer: `MyLeaveRequestAPI.php`
- **Method:** `create()`
- **Logic:**
  - This layer acts as a clean entry point. It does not contain any business logic.
  - It gathers all parameters from the web request (dates, type, comment) and populates a `DetailedLeaveRequest` Data Transfer Object (DTO).
  - It identifies the employee from the current authenticated user session.
  - It delegates the entire operation to a single, specialized service: `LeaveApplicationService`, by calling its `applyLeave()` method and passing the DTO.

### 2. Service Layer: `LeaveApplicationService.php`
- **This class is the heart of the functionality and contains all the business rules.**
- **Method:** `applyLeave()`
- **Logic:**
  - **Initial Validation:** Performs high-level checks:
    - Verifies the leave dates are within the company's allowed leave period.
    - Calls `hasOverlapLeaves()` to prevent duplicate/overlapping requests.
    - Calls `isWorkShiftLengthExceeded()` to validate against shift rules.
  - **Core Logic Delegation:** If initial checks pass, it calls its own private `saveLeaveRequest()` method to continue.
- **Method:** `saveLeaveRequest()`
- **Logic:**
  - **Entitlement Check (Critical Path):** This is the most important step.
    - It retrieves an "entitlement strategy" object from the `LeaveEntitlementService`.
    - It calls the strategy's `handleLeaveCreate()` method. This encapsulates the complex logic of checking if the employee has a sufficient leave balance for the request.
    - If the balance is insufficient and company policy (`allowToExceedLeaveBalance()`) forbids it, it throws a `LeaveBalanceExceeded` exception, stopping the process.
  - **DAO Delegation:** If the entitlement check passes:
    - It calls `getLeaveRequestDao()->saveLeaveRequest()`. This single call passes the `LeaveRequest` entity, the list of daily `Leave` entities, and the `entitlement` updates to the DAO. The DAO is expected to save all of this in a single database transaction.
  - **Save Comment:** If a comment was included, it creates and saves a `LeaveRequestComment` entity via the DAO.
  - **Workflow and Events:**
    - It determines the correct workflow action ("APPLY").
    - It dispatches a `LeaveApply` event. This is the crucial step that likely triggers supervisor email notifications and puts the item in their approval queue.

### 3. DAO Layer (Inferred)
- **Method:** `saveLeaveRequest()`
- **Logic:**
  - Based on the service layer calls, the DAO's `saveLeaveRequest` method is responsible for executing a database transaction that:
    1.  `INSERT`s the new record into the `ohrm_leave_request` table.
    2.  `INSERT`s multiple records into the `ohrm_leave` table (one for each day of leave).
    3.  `UPDATE`s the `ohrm_leave_entitlement` table to deduct the leave days from the employee's balance.
  - Wrapping these operations in a transaction ensures data integrity; if any step fails, the entire application is rolled back. 