import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Schedule.css";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: "🏠" },
  { label: "Courses", path: "/courses", icon: "📚" },
  { label: "Registration", path: "/registration", icon: "📝" },
  { label: "Time Table", path: "/timetable", icon: "🗓" },
  { label: "Build Schedule", path: "/schedule", icon: "📅" },
];

function Schedule() {
  const studentId = localStorage.getItem("studentId");
  const navigate = useNavigate();
  const location = useLocation();

  const [tasks, setTasks] = useState([]);
  const [student, setStudent] = useState(null);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    let h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}:${minute} ${ampm}`;
  };

  const fetchTasks = () => {
    axios.get(`http://localhost:8080/schedule/${studentId}`)
      .then(res => setTasks(res.data))
      .catch(() => console.log("Fetch schedule error"));
  };

  useEffect(() => {
    fetchTasks();
    if (studentId) {
      axios.get(`http://localhost:8080/student/${studentId}`)
        .then(res => setStudent(res.data))
        .catch(() => {});
    }
  }, [studentId]);

  const addTask = () => {
    if (!title || !day || !start || !end) { alert("Fill all fields"); return; }
    axios.post("http://localhost:8080/schedule", {
      studentId, title, day, startTime: start, endTime: end
    }).then(() => {
      setTitle(""); setDay(""); setStart(""); setEnd("");
      fetchTasks();
    });
  };

  const del = (id) => {
    axios.delete(`http://localhost:8080/schedule/${id}`).then(fetchTasks);
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
        <h2 className="page-title">
          <span className="title-icon">📅</span> Weekly Productivity Planner
        </h2>

        {/* FORM */}
        <div className="schedule-form">
          <input
            className="s-input"
            placeholder="Task title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ flex: 2 }}
          />
          <select className="s-input" value={day} onChange={e => setDay(e.target.value)}>
            <option value="">Day</option>
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(d =>
              <option key={d}>{d}</option>
            )}
          </select>
          <input className="s-input" type="time" value={start} onChange={e => setStart(e.target.value)} />
          <input className="s-input" type="time" value={end} onChange={e => setEnd(e.target.value)} />
          <button className="s-add-btn" onClick={addTask}>+ Add</button>
        </div>

        {/* TASK LIST */}
        {tasks.length === 0 ? (
          <p className="empty-msg">No tasks yet — add one above!</p>
        ) : (
          tasks.map((t, i) => (
            <div className="task-card" key={t.id} style={{
              borderColor: i % 3 === 0 ? "rgba(167,139,250,.2)" : i % 3 === 1 ? "rgba(0,153,255,.2)" : "rgba(0,245,196,.2)",
              background: i % 3 === 0 ? "rgba(167,139,250,.04)" : i % 3 === 1 ? "rgba(0,153,255,.04)" : "rgba(0,245,196,.04)"
            }}>
              <div>
                <div className="task-title">{t.title}</div>
                <div className="task-time">
                  {t.day} • {formatTime(t.startTime)} – {formatTime(t.endTime)}
                </div>
              </div>
              <button className="delete-btn" onClick={() => del(t.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Schedule;