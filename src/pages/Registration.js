import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Registration.css";
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

function Registration() {
  const [courses, setCourses] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [registered, setRegistered] = useState([]);
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:8080/courses/all")
      .then(res => setCourses(res.data))
      .catch(() => console.log("Course fetch error"));

    const id = localStorage.getItem("studentId");
    if (id) {
      axios.get(`http://localhost:8080/enroll/${id}`)
        .then(res => setRegistered(res.data.map(e => e.courseId)))
        .catch(() => {});
      axios.get(`http://localhost:8080/student/${id}`)
        .then(res => setStudent(res.data))
        .catch(() => {});
    }
  }, []);

  const groupedCourses = courses.reduce((acc, course) => {
    if (!acc[course.courseName]) acc[course.courseName] = [];
    acc[course.courseName].push(course);
    return acc;
  }, {});

  const handleSelect = (courseName, slotId) => {
    setSelectedSlots({ ...selectedSlots, [courseName]: slotId });
  };

  const handleRegister = (courseName) => {
    if (!selectedSlots[courseName]) return alert("Select faculty first");
    const studentId = localStorage.getItem("studentId");
    const courseId = selectedSlots[courseName];
    axios.post(`http://localhost:8080/enroll/${studentId}/${courseId}`)
      .then(() => {
        setRegistered([...registered, parseInt(courseId)]);
        alert(`${courseName} Registered ✅`);
      })
      .catch(() => alert("Enrollment failed"));
  };

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
        <h2 className="page-title">Register Here</h2>
        <div className="course-grid">
          {Object.keys(groupedCourses).map(name => {
            const meta = courseMeta[name] || { icon: "📘", tag: "Core", desc: "", color: "#00f5c4" };
            const isRegistered = groupedCourses[name].some(slot => registered.includes(slot.id));
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

                <select
                  className="faculty-select"
                  disabled={isRegistered}
                  onChange={(e) => handleSelect(name, e.target.value)}
                  style={{ borderColor: isRegistered ? "rgba(255,255,255,.06)" : `${meta.color}44` }}
                >
                  <option value="">Select Faculty</option>
                  {groupedCourses[name].map(slot => (
                    <option key={slot.id} value={slot.id}>
                      {slot.faculty} ({slot.day} {slot.startTime}–{slot.endTime})
                    </option>
                  ))}
                </select>

                {isRegistered ? (
                  <button className="reg-btn done" disabled>Registered ✅</button>
                ) : (
                  <button className="reg-btn" onClick={() => handleRegister(name)}
                    style={{ background: `linear-gradient(135deg, ${meta.color}, #0099ff)` }}>
                    Register
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Registration;