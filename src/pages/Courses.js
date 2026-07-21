import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Courses.css";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const courseMeta = {
  "Data Structures": { icon: "🧠", tag: "Core", desc: "Master arrays, trees & graphs", color: "#00f5c4" },
  "DBMS": { icon: "💾", tag: "Core", desc: "Learn SQL & database design", color: "#0099ff" },
  "Operating Systems": { icon: "⚙️", tag: "Core", desc: "Understand processes & memory", color: "#8b5cf6" },
  "Computer Networks": { icon: "🌐", tag: "Core", desc: "Protocols & network architecture", color: "#ffa500" },
  "Machine Learning": { icon: "🤖", tag: "AI", desc: "Build intelligent models", color: "#ff6b6b" },
  "english": { icon: "📖", tag: "Core", desc: "English language & communication", color: "#22d3ee" },
};

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: "🏠" },
  { label: "Courses", path: "/courses", icon: "📚" },
  { label: "Registration", path: "/registration", icon: "📝" },
  { label: "Time Table", path: "/timetable", icon: "🗓" },
  { label: "Build Schedule", path: "/schedule", icon: "📅" },
];

function Courses() {
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/courses/all`)
      .then(res => setCourses(res.data))
      .catch(() => console.log("Course fetch error"));
    const id = localStorage.getItem("studentId");
    if (id) {
      axios.get(`${process.env.REACT_APP_API_URL}/student/${id}`)
        .then(res => setStudent(res.data))
        .catch(() => {});
    }
  }, []);

  const groupedCourses = courses.reduce((acc, course) => {
    if (!acc[course.courseName]) acc[course.courseName] = [];
    acc[course.courseName].push(course);
    return acc;
  }, {});

  return (
    <div className="page-wrapper">
      {/* SIDEBAR */}
      <div className="dash-sidebar">
        <img src={logo} alt="logo" className="dash-logo" />
        <ul>
          {navItems.map(item => (
            <li key={item.path}
              className={location.pathname === item.path ? "active" : ""}
              onClick={() => navigate(item.path)}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </li>
          ))}
          <li className="logout" onClick={() => {
            if (window.confirm("Logout?")) { localStorage.removeItem("studentId"); navigate("/"); }
          }}>
            <span className="nav-icon">→</span>Logout
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
      <div className="page-main">
        <h2 className="page-title">Available Courses</h2>
        <div className="course-grid">
          {Object.keys(groupedCourses).map((name, idx) => {
            const meta = courseMeta[name] || { icon: "📘", tag: "Core", desc: "", color: "#00f5c4" };
            return (
              <div className="course-card" key={name} style={{ "--accent": meta.color }}>
                <div className="card-top-line"></div>
                <div className="course-header">
                  <span className="course-icon">{meta.icon}</span>
                  <span className="course-tag" style={{ color: meta.color, borderColor: meta.color, background: `${meta.color}18` }}>
                    {meta.tag}
                  </span>
                </div>
                <h3>{name}</h3>
                <p className="course-desc">{meta.desc}</p>
                <div className="faculty-list">
                  {groupedCourses[name].map(slot => (
                    <div key={slot.id} className="faculty-item" style={{ borderColor: meta.color }}>
                      👨‍🏫 {slot.faculty} — {slot.day} {slot.startTime}–{slot.endTime}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Courses;