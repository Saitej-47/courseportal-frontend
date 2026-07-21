SCP — Student Course Portal

A full-stack web application for students to browse courses, register for classes, and build their personal timetable — with a separate admin panel for managing course offerings.

Live App: courseportal-frontend-fuup.vercel.app Live API: courseportal-backend-2y3f.onrender.com

Repositories: Frontend · Backend

Features

Student side

Register and log in as a student
Browse all available courses, grouped by subject, with faculty/day/time slots
Register for a course section
Auto-generated weekly timetable based on registered courses
Student dashboard with profile info

Admin side

Separate admin login (restricted access)
Add new courses with faculty, day, and time slot
View all courses in the system
Tech Stack
Layer	Technology
Frontend	React (Create React App), React Router, Axios
Backend	Spring Boot 4 (Java 17), Spring Data JPA, Hibernate
Database	MySQL 8.4
Auth	Basic email/password (student + admin)
Architecture
┌─────────────────┐        HTTPS         ┌──────────────────┐        JDBC        ┌─────────────┐
│  React Frontend │ ───────────────────▶ │  Spring Boot API │ ──────────────────▶│  MySQL DB   │
│    (Vercel)     │ ◀─────────────────── │     (Render)      │ ◀──────────────────│   (Aiven)   │
└─────────────────┘      JSON / REST      └──────────────────┘                     └─────────────┘
Deployment

This project is deployed across three free-tier services:

Service	Platform	Purpose
Frontend	Vercel	Hosts the React build, auto-deploys on push to main
Backend	Render	Runs the Spring Boot app in a Docker container
Database	Aiven	Managed, always-free MySQL instance
Environment variables

Backend (Render)

DB_URL=jdbc:mysql://<aiven-host>:<port>/<database>?useSSL=true&requireSSL=true&serverTimezone=UTC
DB_USER=<aiven-username>
DB_PASS=<aiven-password>
FRONTEND_URL=https://courseportal-frontend-fuup.vercel.app

Frontend (Vercel)

REACT_APP_API_URL=https://courseportal-backend-2y3f.onrender.com

Note: Render's free tier spins down after 15 minutes of inactivity. The first request after idling can take 30–60 seconds while it wakes back up — this is expected, not a bug.

Redeploying
Frontend: push to main on courseportal-frontend → Vercel auto-deploys
Backend: push to main on courseportal-backend → Render auto-deploys using the Dockerfile
Running Locally
Prerequisites
Node.js (for the frontend)
Java 17 + Maven (for the backend)
MySQL running locally
Backend
bash
cd courseportal-backend
# set local DB credentials as environment variables, or edit application.properties directly
./mvnw spring-boot:run

Runs on http://localhost:8080

Frontend
bash
cd courseportal-frontend
npm install

Create a .env file in the project root:

REACT_APP_API_URL=http://localhost:8080

Then:

bash
npm start

Runs on http://localhost:3000

Project Structure
courseportal-backend/
├── controller/      # REST endpoints (Course, Student, Enrollment, Admin, Auth, Schedule)
├── service/         # Business logic
├── repository/       # Spring Data JPA repositories
├── entity/           # JPA entities (Course, Student, Faculty, Enrollment, Schedule)
├── config/           # CORS configuration
└── CourseportalApplication.java

courseportal-frontend/
├── src/
│   ├── pages/         # Route-level components (Courses, Registration, Timetable, etc.)
│   │   └── Admin/     # Admin panel pages
│   ├── services/      # API service wrappers
│   └── App.js          # Route definitions
API Overview
Method	Endpoint	Description
POST	/auth/register	Student registration
POST	/auth/login	Student login
POST	/admin/login	Admin login
GET	/courses/all	List all course sections
POST	/courses/add	Add a new course section (admin)
GET	/student/{id}	Get student profile
POST	/enroll/{studentId}/{courseId}	Register a student for a course
GET	/enroll/student/{id}/courses	Get a student's registered courses (for timetable)
Admin Access
Email: admin@gmail.com
Password: admin123
