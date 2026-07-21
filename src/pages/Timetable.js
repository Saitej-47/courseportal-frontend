import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Timetable.css";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const courseColors = [
  { bg: "rgba(0,245,196,.1)", border: "rgba(0,245,196,.35)", color: "#b8fff0" },
  { bg: "rgba(0,153,255,.1)", border: "rgba(0,153,255,.35)", color: "#b8e0ff" },
  { bg: "rgba(255,165,0,.1)", border: "rgba(255,165,0,.35)", color: "#ffe4b8" },
  { bg: "rgba(139,92,246,.1)", border: "rgba(139,92,246,.35)", color: "#e0d4ff" },
  { bg: "rgba(255,107,107,.1)", border: "rgba(255,107,107,.35)", color: "#ffd4d4" },
  { bg: "rgba(34,211,238,.1)", border: "rgba(34,211,238,.35)", color: "#b8f4ff" },
];

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: "🏠" },
  { label: "Courses", path: "/courses", icon: "📚" },
  { label: "Registration", path: "/registration", icon: "📝" },
  { label: "Time Table", path: "/timetable", icon: "🗓" },
  { label: "Build Schedule", path: "/schedule", icon: "📅" },
];

function Timetable() {
  const [slots, setSlots] = useState([]);
  const [colorMap, setColorMap] = useState({});
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const id = localStorage.getItem("studentId");
    axios.get(`${process.env.REACT_APP_API_URL}/enroll/student/${id}/courses`)
      .then(res => {
        setSlots(res.data);
        const map = {};
        let i = 0;
        res.data.forEach(s => {
          if (!map[s.courseName]) { map[s.courseName] = courseColors[i % courseColors.length]; i++; }
        });
        setColorMap(map);
      })
      .catch(() => console.log("Timetable fetch error"));
    if (id) {
      axios.get(`${process.env.REACT_APP_API_URL}/student/${id}`)
        .then(res => setStudent(res.data))
        .catch(() => {});
    }
  }, []);

  const normalizeDay = (d) => d ? d.slice(0, 3) : "";
  const getDay = (s) => normalizeDay(s.day);
  const getTime = (s) => `${s.startTime}-${s.endTime}`;
  const times = [...new Set(slots.map(getTime))].sort((a, b) => a.localeCompare(b));
  const getSlot = (day, time) => slots.filter(s => getDay(s) === day && getTime(s) === time);

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
        <h2 className="page-title">My Timetable</h2>
        {slots.length === 0 ? (
          <p className="empty">Register courses to build timetable ⚠</p>
        ) : (
          <div className="time-grid">
            <div className="grid-header">TIME</div>
            {days.map(d => <div key={d} className="grid-header">{d}</div>)}
            {times.map(time => (
              <React.Fragment key={time}>
                <div className="grid-time">{time}</div>
                {days.map(day => {
                  const slot = getSlot(day, time);
                  return (
                    <div className="grid-cell" key={day}>
                      {slot.map(s => {
                        const c = colorMap[s.courseName] || courseColors[0];
                        return (
                          <div key={s.id} className="tt-block" style={{
                            background: c.bg, borderColor: c.border, color: c.color
                          }}>
                            <b>{s.courseName}</b>
                            <small>{s.faculty}</small>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Timetable;