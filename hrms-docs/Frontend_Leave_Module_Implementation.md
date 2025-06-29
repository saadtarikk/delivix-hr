# Frontend Deep Dive: Leave Module

This document outlines the frontend implementation details for the Leave module. The architecture closely mirrors the PIM module, demonstrating a consistent and well-designed frontend.

## Core Component: Leave List Table

Unlike the PIM module, the Leave module's primary view is split into two components. The parent, `LeaveList.vue`, defines the filter UI, but the core logic, API interaction, and data display are all handled by a child component, `LeaveListTable.vue`. This component is designed to be highly reusable.

- **Child Component File:** `orangehrm/src/client/src/orangehrmLeavePlugin/components/LeaveListTable.vue`
- **Parent Component File:** `orangehrm/src/client/src/orangehrmLeavePlugin/pages/LeaveList.vue`

### Architecture and Design

The implementation leverages component composition, slots, and reusable composable functions.

- **Component Composition & Reusability:** The `LeaveListTable.vue` component is designed to serve two different roles. A boolean prop, `myLeaveList`, determines which API endpoint to target:
    - `false` (default): Fetches from `/api/v2/leave/employees/leave-requests` for a comprehensive admin/manager view.
    - `true`: Fetches from `/api/v2/leave/leave-requests` to get leave for only the logged-in user.
- **Slot-Based UI Injection:** The `LeaveList.vue` parent component defines the complex filter form UI. It then passes this UI down to the `LeaveListTable.vue` child via a [Vue slot](https://vuejs.org/guide/components/slots.html). This is an effective inversion of control pattern that keeps the data-handling component clean while allowing for flexible UI.
- **Specialized Composables:** Like the PIM module, it uses `usePaginate` for data fetching. It also introduces a domain-specific composable:
    - **`useLeaveActions`:** This crucial composable encapsulates all the business logic for performing actions on leave requests (e.g., Approve, Reject, Cancel). It handles API calls for these actions and manages the display of any necessary confirmation modals. This cleanly separates action logic from the display logic.

### Data Flow: Searching for Leave Requests

The reactive data flow for filtering is identical to the pattern established in the PIM module.

1.  **User Interaction & State Update:** The user interacts with a filter input in the parent `LeaveList.vue` component. A `v-model` updates a local `filters` state object within the `LeaveListTable.vue` component (passed via the slot).

2.  **Filter Serialization:** A `serializedFilters` computed property watches the `filters` object. It transforms the state into the exact query parameter object required by the backend Leave API, including formatting dates and mapping arrays.

3.  **Reactive API Call:** The `usePaginate` composable, whose dependencies include `serializedFilters`, detects the change and triggers a new API request to the appropriate leave request endpoint.

4.  **Data Normalization:** A `leavelistNormalizer` function transforms the raw API response into a view-friendly model. This is significantly more complex than the PIM normalizer. It is responsible for:
    - Building human-readable date range strings (e.g., "2023-01-01 to 2023-01-03").
    - Appending duration information (e.g., "Half Day").
    - Aggregating and formatting leave status breakdowns (e.g., "Scheduled (1.00), Taken (1.00)").
    - Aggregating and formatting leave balance information.

5.  **Re-render:** The normalized and formatted data is passed to the `oxd-card-table` component, which re-renders to display the updated list. 