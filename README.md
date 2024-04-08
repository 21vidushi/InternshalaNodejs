E-learningManagement System API
This API provides functionality for managing users, courses, and course enrollments in a course management system.

Table of Contents
User APIs
Course APIs
Profile APIs
User Enrollment APIs
Filters and Pagination
Database and Email Integration
Security and Authentication
Error Handling and Logging
User APIs
User Registration
Endpoint: /api/v1/user/register
Method: POST
Description: Allows users to register by providing necessary details such as name, email,password,confirmPassword,category. Implements validation for email uniqueness.
User Login
Endpoint: /api/v1/user/login
Method: POST
Description: Allows users to login by providing necessary details such as  email,password. Generate JWT token stored in cookie.
User Profile
Endpoint: /api/v1/user/viewprofile
Methods:
GET: Allows users to view their profile information.
Endpoint: /api/v1/user/updateprofile
Methods:
POST: Allows users to update their profile information, including DOB, PhoneNumber, profilepic,Aboutme..
Course APIs
Get Courses
Endpoint: /api/v1/course/getallcourses
Method: GET
Description: Provides an API endpoint to fetch courses available on the platform. Implements filtering options based on parameters such as category, level, popularity, etc. Enables pagination to handle large datasets efficiently.
CRUD Operations for Superadmin
Endpoints:
Create: /api/v1/course/createcourse
Update: /api/v1/course/updatecourse/{courseId}
Delete: /api/v1/course/deletecourse/{courseId}
Methods:
POST: Create a new course.
POST: Update details of a specific course.
DELETE: Delete a course.
Description: Implements Create, Update, and Delete operations for courses. Only superadmin users have permission to perform these operations.
User Enrollment APIs
Course Enrollment
Endpoint: /api/v1/course/userenrolled/{courseid}
Method: POST
Description: Allows users to enroll in courses they are interested in. Implements validation to prevent users from enrolling in the same course multiple times.
View Enrolled Courses
Endpoint: /api/v1/course/getallenrolled
Method: GET
Description: Provides an API endpoint for users to view the courses they have enrolled in.
Filters and Pagination
Filtering Options
Parameters:
category
level
popularity
Description: Implements filtering options for the courses API to enable users to refine their search based on criteria such as category, level, etc.
Pagination
Parameters:
page
limit
Description: Enables pagination to limit the number of results returned per request and improve performance when dealing with large datasets.
Database and Email Integration
Database: Utilizes the free tier of mongodb for storing user information, course details, and enrollment data.
Email Service: Integrates with nodemailer for handling email communications, such as user registration confirmation,and course enrollment notifications.
Security and Authentication
Authentication: Implements secure authentication mechanisms, such as JWT (JSON Web Tokens), to authenticate users for accessing protected endpoints.
Password Security: Ensures sensitive data, such as passwords, is securely hashed before storage in the database.
Error Handling and Logging
Error Handling: Implements robust error handling mechanisms to provide meaningful error messages to clients.
Logging: Utilizes logging to track API requests, responses, and any potential errors or exceptions for debugging purposes.
