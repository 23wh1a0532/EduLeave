# EduLeave

EduLeave is a **web-based leave management system** designed for educational institutions. It allows students to apply for leave, and administrators or teachers to review and approve/reject leave requests efficiently.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Usage](#usage)
* [Database Schema](#database-schema)
* [API Endpoints](#api-endpoints)
* [Contributing](#contributing)
* [License](#license)

---

## Features

* Student can **apply for leave** with a reason and date range.
* Admin/Teacher can **approve or reject** leave requests.
* Students can **view leave status**.
* Admin dashboard for **tracking all leave records**.
* Email notifications for **leave status updates** (optional).

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Frontend:** HTML, CSS, JavaScript (or React, if applicable)
* **Libraries:** Mongoose for MongoDB object modeling

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository_url>
   cd eduleave
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure MongoDB connection**:
   Update the MongoDB URL in `config.js` or `.env` file:

   ```
   MONGO_URI=mongodb://localhost:27017/eduleave
   ```

4. **Run the server**:

   ```bash
   npm start
   ```

5. **Access the application**:
   Open `http://localhost:3000` in your browser.

---

## Usage

* Students can register and login.
* Apply for leave using the form.
* Admin can log in and view all leave requests.
* Approve or reject requests with comments.
* View leave history and generate reports if needed.

---

## Database Schema

**Collections**:

1. **Students**

   * `name` : String
   * `email` : String
   * `password` : String
   * `class` : String

2. **Admins**

   * `name` : String
   * `email` : String
   * `password` : String

3. **Leaves**

   * `studentId` : ObjectId (references Students)
   * `startDate` : Date
   * `endDate` : Date
   * `reason` : String
   * `status` : String (`Pending`, `Approved`, `Rejected`)
   * `comments` : String

---

## API Endpoints

| Endpoint                  | Method | Description             |
| ------------------------- | ------ | ----------------------- |
| `/api/students/register`  | POST   | Register new student    |
| `/api/students/login`     | POST   | Student login           |
| `/api/leaves/apply`       | POST   | Apply for leave         |
| `/api/leaves/:id/approve` | PUT    | Approve leave (admin)   |
| `/api/leaves/:id/reject`  | PUT    | Reject leave (admin)    |
| `/api/leaves`             | GET    | Get all leaves (admin)  |
| `/api/leaves/student/:id` | GET    | Get leaves of a student |

---



