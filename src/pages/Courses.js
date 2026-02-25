import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Courses.css";

const courseMeta = {
  "Data Structures": { icon: "🧠", tag: "Core", desc: "Master arrays, trees & graphs" },
  "DBMS": { icon: "💾", tag: "Core", desc: "Learn SQL & database design" },
  "Operating Systems": { icon: "⚙️", tag: "Core", desc: "Understand processes & memory" },
  "Computer Networks": { icon: "🌐", tag: "Core", desc: "Protocols & network architecture" },
  "Machine Learning": { icon: "🤖", tag: "AI", desc: "Build intelligent models" }
};

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/courses/all")
      .then(res => setCourses(res.data))
      .catch(() => console.log("Course fetch error"));
  }, []);

  // group slots by courseName
  const groupedCourses = courses.reduce((acc, course) => {
    if (!acc[course.courseName]) acc[course.courseName] = [];
    acc[course.courseName].push(course);
    return acc;
  }, {});

  return (
    <div className="courses-page">
      <h2 className="page-title">Available Courses</h2>

      <div className="course-grid">
        {Object.keys(groupedCourses).map(name => {
          const meta = courseMeta[name];

          return (
            <div className="course-card" key={name}>
              <div className="course-header">
                <span className="course-icon">{meta?.icon}</span>
                <span className="course-tag">{meta?.tag}</span>
              </div>

              <h3>{name}</h3>
              <p className="course-desc">{meta?.desc}</p>

              {/* ⭐ Faculty list */}
              <div className="faculty-list">
                {groupedCourses[name].map(slot => (
                  <p key={slot.id} className="faculty-item">
                    👨‍🏫 {slot.faculty} — {slot.day} {slot.startTime}-{slot.endTime}
                  </p>
                ))}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;