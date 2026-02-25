import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import Courses from "./pages/Courses";
import Registration from "./pages/Registration";
import Timetable from "./pages/Timetable";
import Schedule from "./pages/Schedule";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLayout from "./pages/Admin/AdminLayout";
import ManageStudents from "./pages/Admin/ManageStudents";
import ManageCourses from "./pages/Admin/ManageCourses";
import ManageFaculty from "./pages/Admin/ManageFaculty";
import Enrollments from "./pages/Admin/Enrollments";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Student routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/schedule" element={<Schedule />} />

        {/* ✅ Admin login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* ✅ Admin panel routes */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<ManageStudents />} />
          <Route path="courses" element={<ManageCourses />} />
          <Route path="faculty" element={<ManageFaculty />} />
          <Route path="enrollments" element={<Enrollments />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;