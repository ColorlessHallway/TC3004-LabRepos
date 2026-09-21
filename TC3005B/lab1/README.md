# Project: Department Audit Tracker

## 1. Tech Stack
* **Frontend:** React (JavaScript, Functional Components, Hooks)
* **Backend:** Node.js with Express.js
* **Database:** Mock relational database using a local JSON file (e.g., `db.json`) accessed via Node's `fs` module or `json-server`.

## 2. Core Features (CRUD API)
Implement a RESTful API on the backend and corresponding frontend services to manage audit records:
* **Create:** Add a new department's audit record.
* **Read:** Fetch and display all departments and their current audit statuses.
* **Update:** Modify the audit status of a specific department.
* **Delete:** Remove a department's audit record from the database.

## 3. Data Model (db.json schema)
Initialize the JSON file with an array of objects representing the audit records. Each object must include:
* `id` (Unique identifier)
* `departmentName` (String)
* `auditStatus` (String: e.g., "Pending", "In Progress", "Completed", "Failed")
* `lastAudited` (Date string)
* `auditorName` (String)

## 4. User Interface Guidelines
* **Styling:** Use a modern CSS framework (e.g., Tailwind CSS or Material-UI) for a clean, professional look.
* **Components:** 
  * A main dashboard featuring a responsive data table to seamlessly inspect, sort, and filter the audit records.
  * An interactive form (modal or side-panel) to handle creating and editing the department records.
  * Delete confirmation dialogs to prevent accidental data loss.