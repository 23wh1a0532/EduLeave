# EduLeave

<<<<<<< HEAD
EduLeave is a **web-based leave management system** designed for educational institutions. It allows students to apply for leave, and administrators or teachers to review and approve/reject leave requests efficiently.

---
## 🎥 Project Demo
👉 [Watch Full Execution Video](https://drive.google.com/file/d/1fRyeW0C939QkJjowCuetOCSaxGMQ7Wkg/view?usp=sharing)
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



EduLeave is a full-stack leave management system built for students, faculty, and administrators. It provides separate authentication flows for regular users and admins, supports leave application and review workflows, and offers a simple dashboard-based experience for tracking leave activity.

The project is split into:

- `backend`: Node.js, Express, MongoDB, JWT authentication
- `eduleave-frontend`: React application using Axios and React Router

## Features

- Student and faculty signup and login
- Separate admin signup and login flow
- Role-based route protection
- Leave application with date and reason validation
- Leave history for student and faculty users
- Admin dashboard for reviewing all leave requests
- Approve and reject actions with admin remarks
- Password reset flow for all supported roles
- Demo data seeding and database reset scripts

## Roles and Permissions

- `student`
  Can sign up, log in, apply for leave, and view personal leave history
- `faculty`
  Can sign up, log in, apply for leave, and view personal leave history
- `admin`
  Can sign up with an admin secret, log in, view all leave requests, and approve or reject them

## Tech Stack

### Frontend

- React
- React Router DOM
- Axios
- React Scripts

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JSON Web Tokens
- bcryptjs
- CORS
- dotenv

## Project Structure

```text
EduLeave/
|-- backend/
|   |-- src/
|   |   |-- controllers/
|   |   |-- middleware/
|   |   |-- models/
|   |   |-- routes/
|   |   |-- utils/
|   |   |-- app.js
|   |   |-- seed.js
|   |   |-- resetData.js
|   |-- package.json
|   |-- .env
|
|-- eduleave-frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- services/
|   |   |-- App.js
|   |   |-- index.js
|   |-- package.json
|
|-- README.md
```

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- npm installed
- MongoDB connection string available

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_SECRET=your_admin_secret
PORT=5000
```

### Variable Details

- `MONGO_URI`
  MongoDB connection string used by Mongoose
- `JWT_SECRET`
  Secret used to sign login tokens
- `ADMIN_SECRET`
  Secret required for admin registration
- `PORT`
  Backend server port, default is `5000`

## Installation

Open a terminal in the project root and install dependencies for both apps.

### Backend

```powershell
cd "c:\Users\Dell\Downloads\fsd project\EduLeave\backend"
npm install
```

### Frontend

```powershell
cd "c:\Users\Dell\Downloads\fsd project\EduLeave\eduleave-frontend"
npm install
```

## Running the Project

You need two terminals: one for the backend and one for the frontend.

### 1. Start the backend server

```powershell
cd "c:\Users\Dell\Downloads\fsd project\EduLeave\backend"
npm start
```

Expected behavior:

- The backend starts on `http://localhost:5000`
- MongoDB connects using the `MONGO_URI` from `.env`

### 2. Start the frontend app

```powershell
cd "c:\Users\Dell\Downloads\fsd project\EduLeave\eduleave-frontend"
npm start
```

Expected behavior:

- The React app starts on `http://localhost:3000`
- The frontend sends API requests to `http://localhost:5000/api`

## Available Scripts

### Backend Scripts

From the `backend` folder:

```powershell
npm start
```

Starts the backend using `nodemon`.

```powershell
npm run seed
```

Deletes existing users and inserts demo users.

```powershell
npm run reset-data
```

Deletes all users and all leave requests from the database.

### Frontend Scripts

From the `eduleave-frontend` folder:

```powershell
npm start
```

Runs the React development server.

```powershell
npm run build
```

Builds the frontend for production.

```powershell
npm test
```

Runs the frontend test suite in watch mode.

## Demo / Seeded Accounts

You can insert demo users with:

```powershell
cd "c:\Users\Dell\Downloads\fsd project\EduLeave\backend"
npm run seed
```

Seeded users:

- `student@gmail.com` / `Password123`
- `faculty@gmail.com` / `Password123`
- `admin@gmail.com` / `Password123`

Notes:

- Running the seed script removes existing users before inserting demo accounts
- The reset script removes both users and leave records

## Resetting the Database

If you want to clear all users and leave requests:

```powershell
cd "c:\Users\Dell\Downloads\fsd project\EduLeave\backend"
npm run reset-data
```

Use this when you want to start from a clean state for testing or demo purposes.

## User Flow

### Student and Faculty

1. Open the frontend in the browser
2. Sign up using the regular signup page
3. Log in from the main login page
4. Open the dashboard
5. Apply for leave
6. Check leave history and approval status

### Admin

1. Open the admin signup page
2. Enter the correct admin secret
3. Log in through the admin login page
4. Open the admin leave management screen
5. Review leave requests
6. Approve or reject with remarks

## Frontend Routes

- `/`
  Student and faculty login
- `/signup`
  Student and faculty signup
- `/reset-password`
  Password reset page
- `/admin/login`
  Admin login
- `/admin/signup`
  Admin signup
- `/dashboard`
  Shared dashboard based on role
- `/apply`
  Apply for leave
- `/my-leaves`
  Personal leave history
- `/admin/leaves`
  Admin leave management page

## Backend API Routes

Base URL:

```text
http://localhost:5000/api
```

### Auth Routes

- `POST /auth/register`
  Register a student or faculty user
- `POST /auth/register-admin`
  Register an admin user using the admin secret
- `POST /auth/login`
  Log in and receive a JWT token
- `POST /auth/reset-password`
  Reset the password for a user based on email and role
- `GET /auth/me`
  Get the current authenticated user

### Leave Routes

- `POST /leaves`
  Apply for leave, student and faculty only
- `GET /leaves/mine`
  Get personal leave history, student and faculty only
- `GET /leaves`
  Get all leave requests, admin only
- `PATCH /leaves/:id/status`
  Approve or reject a leave request, admin only

### User Routes

- `GET /users`
  Get all users, admin only

## Validation Rules

The application includes several checks in the backend:

- Name, email, and password are required during signup
- Admin signup requires a valid admin secret
- Passwords must be at least 6 characters long
- Leave requests require leave type, start date, end date, and reason
- Leave reason must be at least 10 characters long
- Leave start date cannot be in the past
- End date cannot be before start date
- Overlapping pending or approved leave requests are blocked
- Rejected requests require admin remarks

## Default Local URLs

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- API base URL used by frontend: `http://localhost:5000/api`

## Troubleshooting

### MongoDB connection fails

Make sure:

- `MONGO_URI` is present in `backend/.env`
- Your MongoDB service or Atlas cluster is reachable
- Your IP is allowed if you are using MongoDB Atlas

### Frontend loads but API calls fail

Make sure:

- The backend server is running on port `5000`
- The frontend is running on port `3000`
- The frontend API base URL still matches `http://localhost:5000/api`

### Port already in use

If `3000` or `5000` is busy, stop the conflicting process or change the port configuration.

### Admin signup not working

Make sure the `ADMIN_SECRET` entered in the form matches the value in `backend/.env`.

## Current Limitations

- The frontend API base URL is hardcoded to `http://localhost:5000/api`
- Password reset currently works directly from the app without email verification
- There is no deployment configuration included yet
- Backend automated tests are not set up

## Future Improvements

- Add email-based password reset with OTP or token verification
- Move frontend API URL to an environment variable
- Add backend test coverage
- Add pagination and filtering improvements for admin requests
- Add deployment instructions for frontend and backend
- Add audit logging for admin actions

## Author Notes

This project is a good base for a college or department leave management workflow. It already includes the core authentication and approval flow, and it can be extended further with notifications, better security, and deployment support.

