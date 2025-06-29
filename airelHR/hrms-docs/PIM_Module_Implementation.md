# Delivix HR: Architectural Deep Dive - PIM Module Implementation

This document provides a deep, file-by-file analysis of the business logic for key functionalities within the PIM (Personal Information Management) module.

---

## Functionality 1: Get Employee Details

**Trace:** `GET /api/v2/pim/employees/{empNumber}`

### 1. API Layer: `EmployeeAPI.php`
- **Method:** `getOne()`
- **Logic:**
  - Extracts `empNumber` from the URL.
  - Performs permission checks.
  - Delegates the core fetch operation to `EmployeeService`.
  - Serializes the resulting `Employee` object into a JSON response.

### 2. Service Layer: `EmployeeService.php`
- **Method:** `getEmployeeByEmpNumber()`
- **Logic:**
  - Acts as a direct pass-through, containing no additional business logic for this specific read operation.
  - Delegates immediately to the `EmployeeDao`.

### 3. DAO Layer: `EmployeeDao.php`
- **Method:** `getEmployeeByEmpNumber()`
- **Logic:**
  - Uses the Doctrine ORM: `return $this->getRepository(Employee::class)->find($empNumber);`
  - This issues a primary key lookup on the `hs_hr_employee` table (`SELECT * ... WHERE emp_number = ?`).
  - The ORM maps the resulting database row to an `Employee` entity object and returns it.

---

## Functionality 2: Create a New Employee

**Trace:** `POST /api/v2/pim/employees`

### 1. API Layer: `EmployeeAPI.php`
- **Method:** `create()`
- **Logic:**
  1.  **Authorization:** Checks if the current user has permission to create employees.
  2.  **Validation:** Validates the incoming request body (firstName, lastName, etc.).
  3.  **Entity Creation:** Creates a new, empty `Employee` entity object.
  4.  **Parameter Mapping:** Populates the `Employee` object with the validated data from the request.
  5.  **User Account Creation:** If `createLoginDetails` is flagged, it calls a separate `UserRoleManager` to create a corresponding `User` entity with a role and password. This is a key example of good Separation of Concerns.
  6.  **Service Delegation:** Delegates the saving of the `Employee` object to `EmployeeService`.
  7.  **Event Dispatch:** After saving, dispatches an `EMPLOYEE_ADDED` event for other parts of the system to consume.
  8.  **Response:** Returns the newly created employee data as a JSON response.

### 2. Service Layer: `EmployeeService.php`
- **Method:** `saveNewEmployee()`
- **Logic:**
  1.  **ID Generation:** Calls an `IDGeneratorService` to generate and reserve the next available `emp_number` (primary key).
  2.  **Delegate to Save:** Passes the `Employee` object to its own internal `saveEmployee()` method.
- **Method:** `saveEmployee()`
- **Logic:**
  1.  **DAO Delegation:** Passes the `Employee` object directly to the `EmployeeDao` for database persistence.
  2.  **Event Dispatch:** Fires a generic `EMPLOYEE_SAVED` event, distinct from the `EMPLOYEE_ADDED` event, for purposes like auditing.

### 3. DAO Layer: `EmployeeDao.php`
- **Method:** `saveEmployee()`
- **Logic:**
  - Uses the Doctrine ORM's `persist()` method.
  - Because the `$employee` object was originally fetched from the database, the ORM's "Unit of Work" knows it's an existing record.
  - When the transaction commits, the ORM automatically generates and executes an `UPDATE hs_hr_employee SET ...` statement with the new values, including the foreign keys for job title, subunit, etc.

---

## Functionality 3: Update Employee Job Details

**Trace:** `PUT /api/v2/pim/employees/{empNumber}/job-details`

### 1. API Layer: `EmployeeJobDetailAPI.php`
- **Method:** `update()`
- **Logic:**
  - Fetches the existing `Employee` entity from the database via the `EmployeeService`.
  - Extracts the new IDs for job title, subunit, location, etc., from the request body.
  - Uses a Decorator pattern (`$employee->getDecorator()->set...ById()`) to update the `Employee` entity in memory. This pattern cleverly encapsulates the logic of fetching the full related entities (e.g., the `JobTitle` object) and associating them with the employee.
  - Delegates the saving of the updated `Employee` entity to the `EmployeeService`.
  - Dispatches a `JoinedDateChangedEvent` if the employee's start date was modified.

### 2. Service Layer: `EmployeeService.php`
- **Method:** `updateEmployeeJobDetails()`
- **Logic:**
  - Immediately delegates the persistence of the updated `Employee` object to the `saveEmployee()` method.
  - Dispatches a specific `UpdateJobDetailsEvent`, allowing other modules to react to this change.
- **Method:** `saveEmployee()`
- **Logic:**
  - Passes the updated `Employee` object to the `EmployeeDao` for persistence.
  - Dispatches a generic `EmployeeSavedEvent` for auditing.

### 3. DAO Layer: `EmployeeDao.php`
- **Method:** `saveEmployee()`
- **Logic:**
  - Uses the Doctrine ORM's `persist()` method.
  - Because the `$employee` object was originally fetched from the database, the ORM's "Unit of Work" knows it's an existing record.
  - When the transaction commits, the ORM automatically generates and executes an `UPDATE hs_hr_employee SET ...` statement with the new values, including the foreign keys for job title, subunit, etc.

---

## Functionality 4: Search for Employees

**Trace:** `GET /api/v2/pim/employees` (with query parameters)

### 1. API Layer: `EmployeeAPI.php`
- **Method:** `getAll()`
- **Logic:**
  - Extracts potential filter parameters from the request's query string (eg, `nameOrId`, `jobTitleId`).
  - Populates a dedicated Data Transfer Object (DTO), `EmployeeSearchFilterParams`, with these values. This is an excellent pattern that keeps the code clean by passing a single, structured object between layers instead of many individual parameters.
  - Delegates the search to the `EmployeeService`, calling both `getEmployeeCount()` for pagination and `getEmployeeList()` for the actual data.
  - Formats the results and pagination metadata into a JSON response.

### 2. Service Layer: `EmployeeService.php`
- **Methods:** `getEmployeeCount()` and `getEmployeeList()`
- **Logic:**
  - This layer acts as a clean pass-through for search operations.
  - It immediately delegates the calls to the corresponding methods in the `EmployeeDao`, passing the `EmployeeSearchFilterParams` DTO directly.

### 3. DAO Layer: `EmployeeDao.php`
- **Method:** `getEmployeeList()` and `getEmployeeCount()`
- **Logic:**
  - Both methods rely on a central helper method, `getEmployeeListQueryBuilderWrapper()`, which contains the core logic for building the search query.
- **Method:** `getEmployeeListQueryBuilderWrapper()`
- **Logic:**
  - **Query Builder:** Initializes a Doctrine Query Builder (`FROM Employee ...`).
  - **Dynamic Filtering:** This is the key. It systematically checks for each filter in the `EmployeeSearchFilterParams` DTO and dynamically appends `AND WHERE` clauses to the query.
  - For text searches (`name`), it constructs complex `OR` conditions (`...LIKE :name`).
  - For relationship filters (`subunitId`), it adds simple `WHERE` clauses (`...WHERE subunit.id = :subunitId`).
  - For status filters (`includeEmployees`), it checks if a termination record `IS NULL` or `IS NOT NULL`.
  - **Dynamic Joins:** It intelligently adds `LEFT JOIN` clauses only when they are needed for sorting or filtering, making the query efficient.
  - **Return Builder:** It returns the fully configured Query Builder object to the calling methods, which then execute it to get either the list of results or the total count. 