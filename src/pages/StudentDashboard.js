import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentDashboard.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {

  const [student, setStudent] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("studentId");

    // ⭐ route protection
    if(!id){
      navigate("/");
      return;
    }

    axios.get(`http://localhost:8080/student/${id}`)
      .then(res => setStudent(res.data))
      .catch(() => console.log("Student fetch error"));

    axios.get(`http://localhost:8080/enroll/${id}`)
      .then(res => setEnrollments(res.data))
      .catch(() => console.log("Enrollment fetch error"));

  }, [navigate]);

  return (
    <div className="dash-wrapper">

      {/* 🔥 SIDEBAR */}
      <div className="dash-sidebar">

        <img src={logo} alt="logo" className="dash-logo" />

        <ul>
          <li className="active" onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/courses")}>Courses</li>
          <li onClick={() => navigate("/registration")}>Registration</li>
          <li onClick={() => navigate("/timetable")}>Time Table</li>
          <li onClick={() => navigate("/schedule")}>Build Schedule</li>

          {/* ⭐ LOGOUT */}
          <li 
            className="logout"
            onClick={() => {
              if(window.confirm("Logout from your account?")){
                localStorage.removeItem("studentId");
                navigate("/");
              }
            }}
          >
            Logout
          </li>
        </ul>

        {/* PROFILE */}
        <div className="sidebar-profile">
          <div className="profile-avatar">
            {student?.name?.charAt(0)}
          </div>

          <div className="profile-info">
            <strong>{student?.name}</strong>
            <small>{student?.email}</small>
          </div>
        </div>

      </div>

      {/* 🔥 MAIN */}
      <div className="dash-main">

        {/* HERO */}
        <div className="hero-card">
          <div className="hero-text">
            <h1>Welcome {student?.name} 👋</h1>
            <p>Manage your courses and build schedules easily</p>

            <button
              className="hero-btn"
              onClick={() => navigate("/courses")}
            >
              Explore Courses
            </button>
          </div>
        </div>

        {/* 4 BOXES */}
        <div className="stats">

          <div className="stat" onClick={() => navigate("/courses")}>
            <span className="icon">📚</span>
            <b>Courses</b>
            <p>Browse all available courses</p>
          </div>

          <div 
            className="stat" 
            onClick={() => navigate("/registration")} 
            style={{cursor:"pointer"}}
          >
            <span className="icon">📄</span>
            <b>Registration</b>

            {enrollments.length === 0 ? (
              <p>Not Registered</p>
            ) : (
              <p>Completed ✅</p>
            )}
          </div>

          <div 
            className="stat" 
            onClick={() => navigate("/timetable")}
            style={{cursor:"pointer"}}
          >
            <span className="icon">🗓</span>
            <b>Time Table</b>
            <p>View your schedule</p>
          </div>

          <div 
            className="stat" 
            onClick={() => navigate("/schedule")}
            style={{cursor:"pointer"}}
          >
            <span className="icon">📅</span>
            <b>Build Schedule</b>
            <p>Create your daily routine</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;