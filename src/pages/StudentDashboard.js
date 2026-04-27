import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentDashboard.css";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const id = localStorage.getItem("studentId");
    if (!id) { navigate("/"); return; }
    axios.get(`http://localhost:8080/student/${id}`)
      .then(res => setStudent(res.data))
      .catch(() => console.log("Student fetch error"));
    axios.get(`http://localhost:8080/enroll/${id}`)
      .then(res => setEnrollments(res.data))
      .catch(() => console.log("Enrollment fetch error"));
  }, [navigate]);

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: "🏠" },
    { label: "Courses", path: "/courses", icon: "📚" },
    { label: "Registration", path: "/registration", icon: "📝" },
    { label: "Time Table", path: "/timetable", icon: "🗓" },
    { label: "Build Schedule", path: "/schedule", icon: "📅" },
  ];

  return (
    <div className="dash-wrapper">

      {/* SIDEBAR */}
      <div className="dash-sidebar">
        <img src={logo} alt="logo" className="dash-logo" />

        <ul>
          {navItems.map(item => (
            <li
              key={item.path}
              className={location.pathname === item.path ? "active" : ""}
              onClick={() => navigate(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </li>
          ))}
          <li
            className="logout"
            onClick={() => {
              if (window.confirm("Logout from your account?")) {
                localStorage.removeItem("studentId");
                navigate("/");
              }
            }}
          >
            <span className="nav-icon">→</span>
            Logout
          </li>
        </ul>

        <div className="sidebar-profile">
          <div className="profile-avatar">{student?.name?.charAt(0)}</div>
          <div className="profile-info">
            <strong>{student?.name}</strong>
            <small>{student?.email}</small>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="dash-main">

        {/* BG DECORATIONS */}
        <div className="dash-orb1"></div>
        <div className="dash-orb2"></div>
        <div className="dash-orb3"></div>

        {/* HERO */}
        <div className="hero-card">
          <div className="hero-text">
            <h1>Welcome {student?.name} 👋</h1>
            <p>Manage your courses and build schedules easily</p>
            <button className="hero-btn" onClick={() => navigate("/courses")}>
              Explore Courses →
            </button>
          </div>
          <div className="hero-deco">
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
              <circle cx="90" cy="90" r="70" stroke="rgba(0,245,196,.08)" strokeWidth="1"/>
              <circle cx="90" cy="90" r="50" stroke="rgba(0,245,196,.12)" strokeWidth="1"/>
              <circle cx="90" cy="90" r="30" stroke="rgba(0,245,196,.18)" strokeWidth="1"/>
              <circle cx="90" cy="20" r="6" fill="rgba(0,245,196,.5)"/>
              <circle cx="160" cy="90" r="4" fill="rgba(0,153,255,.5)"/>
              <circle cx="90" cy="160" r="5" fill="rgba(139,92,246,.5)"/>
              <circle cx="20" cy="90" r="4" fill="rgba(0,245,196,.4)"/>
            </svg>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="stats">
          <div className="stat" onClick={() => navigate("/courses")}>
            <div className="stat-glow teal"></div>
            <span className="icon">📚</span>
            <b>Courses</b>
            <p>Browse all available courses</p>
            <div className="stat-arrow">→</div>
          </div>

          <div className="stat" onClick={() => navigate("/registration")}>
            <div className="stat-glow blue"></div>
            <span className="icon">📝</span>
            <b>Registration</b>
            <p>{enrollments.length === 0 ? "Not Registered" : "Completed ✅"}</p>
            <div className="stat-arrow">→</div>
          </div>

          <div className="stat" onClick={() => navigate("/timetable")}>
            <div className="stat-glow purple"></div>
            <span className="icon">🗓</span>
            <b>Time Table</b>
            <p>View your schedule</p>
            <div className="stat-arrow">→</div>
          </div>

          <div className="stat" onClick={() => navigate("/schedule")}>
            <div className="stat-glow orange"></div>
            <span className="icon">📅</span>
            <b>Build Schedule</b>
            <p>Create your daily routine</p>
            <div className="stat-arrow">→</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;