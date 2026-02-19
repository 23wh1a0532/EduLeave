EduLeave — Leave Management System 
Technical Documentation 
1. Introduction 
1.1 Purpose 
This document defines the end-to-end technical design and development guidelines for 
EduLeave – A Smart Leave Management System. 
EduLeave is a web-based application designed to manage leave requests digitally for 
educational institutions. It replaces the traditional paper-based leave system with a secure and 
structured online workflow. 
The platform enables: 
• Students to apply for leave online 
• Faculty to review and approve/reject requests 
• Admin to monitor and manage overall leave data 
1.2 Target Audience 
• Students 
• Faculty / Staff 
• Institution Administrators 
• Developers learning full-stack development 
1.3 Learning Outcomes 
• Authentication & Authorization 
• Role-Based Access Control (RBAC) 
• REST API Design 
• MongoDB Schema Design 
• Leave workflow automation 
• Real-world CRUD operations 
• Full-stack architecture implementation 
2. System Overview 
2.1 User Roles 
Role Description 
Student Applies for leave, views leave status 
Faculty Approves or rejects student leave 
Admin Manages users and monitors leave reports 
 
2.2 Core Features 
• Secure Login & Registration 
• Role-based dashboards 
• Leave application submission 
• Leave approval/rejection workflow 
• Leave history tracking 
• Email notification system (optional) 
• Admin reporting dashboard 
 
3. High-Level Architecture 
[ Frontend (React / Angular) ] 
              | 
         REST API 
              | 
      [ Node.js + Express ] 
              | 
         [ MongoDB ] 
Key Principle 
Single backend serving multiple user roles through protected routes. 
 
4. Database Design (DB-First Approach) 
4.1 Database 
• MongoDB (Atlas or Local) 
• ODM: Mongoose 
 
4.2 Collections 
4.2.1 users 
{ 
} 
"_id": "ObjectId", 
"name": "string", 
"email": "string", 
"password": "string", 
"role": "student | faculty | admin", 
"department": "string", 
"year": "number", 
"createdAt": "Date", 
"updatedAt": "Date" 
Indexes: 
• email (unique) 
4.2.2 leaves 
{ 
} 
"_id": "ObjectId", 
"studentId": "ObjectId (ref users)", 
"leaveType": "Medical | Personal | Emergency | Other", 
"fromDate": "Date", 
"toDate": "Date", 
"reason": "string", 
"status": "Pending | Approved | Rejected", 
"approvedBy": "ObjectId (ref users)", 
"remarks": "string", 
"appliedAt": "Date" 
Indexes: 
• studentId 
• status 
5. Backend Design (Node.js + Express) 
5.1 Technology Stack 
• Node.js 
• Express.js 
• MongoDB + Mongoose 
• JWT Authentication 
• bcrypt (Password hashing) 
5.2 Backend Folder Structure 
backend/ 
│── src/ 
│   ├── controllers/ 
│   ├── models/ 
│   ├── routes/ 
│   ├── middleware/ 
│   ├── services/ 
│   ├── utils/ 
│   └── app.js 
│── .env 
│── package.json 
5.3 Authentication Flow 
1. User registers with email & password 
2. Password is hashed using bcrypt 
3. User logs in 
4. JWT token is generated 
5. Token is verified for protected routes 
5.4 API Endpoints 
Auth APIs 
Method Endpoint 
Description 
POST /auth/register Register user 
POST /auth/login Login user 
GET 
/auth/me 
Get logged-in user 
Student APIs 
Method Endpoint 
Description 
POST /leaves/apply Apply for leave 
GET 
/leaves/my View my leaves 
Faculty APIs 
Method Endpoint 
GET 
PUT 
/leaves/pending 
Description 
View pending leaves 
/leaves/:id/approve Approve leave 
PUT 
/leaves/:id/reject 
Reject leave 
Admin APIs 
Method Endpoint 
GET 
Description 
/admin/users View all users 
GET 
/admin/reports Leave reports 
5.5 Role-Based Access Control 
• Middleware checks JWT 
• Role verification middleware 
• Faculty/Admin routes are protected 
Example: 
authorizeRoles("faculty") 
6. Frontend (React Version) 
6.1 Tech Stack 
• React 
• React Router 
• Axios 
• Context API 
6.2 Folder Structure 
src/ 
├── components/ 
├── pages/ 
├── context/ 
├── services/ 
└── App.jsx 
6.3 Key Pages 
• Login Page 
• Register Page 
• Student Dashboard 
• Apply Leave Page 
• Faculty Dashboard 
• Admin Dashboard 
• Leave History Page 
7. Security Considerations 
• Password hashing 
• JWT authentication 
• Role-based authorization 
• Input validation 
• Secure environment variables 
• Protected API routes 
8. Workflow Diagram 
Leave Request Flow 
Student → Submit Leave → Status: Pending → 
Faculty → Approve/Reject → Status Updated → 
Student → View Final Status 
9. Future Enhancements 
• Email notifications 
• Leave balance calculation 
• File upload for medical certificate 
• Mobile app version 
• Multi-college support 
• Analytics dashboard 
10. Development Workflow 
• Git-based version control 
• Separate branches for frontend & backend 
• REST API testing using Postman 
• Environment configuration via .env 
• Deployment using Render / Vercel / Railway 
11. Conclusion 
EduLeave is a real-world full-stack Leave Management System that digitizes and simplifies the 
leave approval workflow in educational institutions. 
It demonstrates: 
• Authentication 
• RBAC 
• CRUD operations 
• REST API architecture 
• Clean frontend-backend separation 
Project Name: EduLeave 
Document Owner: SUDHEEPTHI YEMUNURI
