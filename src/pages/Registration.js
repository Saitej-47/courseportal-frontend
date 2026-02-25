import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Registration.css";   // ✅ changed from Courses.css

const courseMeta = {
  "Data Structures": { icon: "🧠", tag: "Core", desc: "Master arrays, trees & graphs" },
  "DBMS": { icon: "💾", tag: "Core", desc: "Learn SQL & database design" },
  "Operating Systems": { icon: "⚙️", tag: "Core", desc: "Understand processes & memory" },
  "Computer Networks": { icon: "🌐", tag: "Core", desc: "Protocols & network architecture" },
  "Machine Learning": { icon: "🤖", tag: "AI", desc: "Build intelligent models" }
};

function Registration() {   // ✅ changed from Courses
  const [courses, setCourses] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [registered, setRegistered] = useState([]);

  // 🔥 fetch all course slots
  useEffect(() => {
    axios.get("http://localhost:8080/courses/all")
      .then(res => setCourses(res.data))
      .catch(() => console.log("Course fetch error"));
  }, []);

  // 🔥 fetch enrollments
  useEffect(() => {
    const id = localStorage.getItem("studentId");

    axios.get(`http://localhost:8080/enroll/${id}`)
      .then(res => {
        const ids = res.data.map(e => e.courseId);
        setRegistered(ids);
      })
      .catch(() => console.log("Enrollment fetch error"));
  }, []);

  // 🔥 group slots by courseName
  const groupedCourses = courses.reduce((acc, course) => {
    if (!acc[course.courseName]) acc[course.courseName] = [];
    acc[course.courseName].push(course);
    return acc;
  }, {});

  const handleSelect = (courseName, slotId) => {
    setSelectedSlots({ ...selectedSlots, [courseName]: slotId });
  };

  // 🔥 enroll API
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
    <div className="courses-page">
      <h2 className="page-title">Register Here</h2>

      <div className="course-grid">
        {Object.keys(groupedCourses).map(name => {
          const meta = courseMeta[name];

          const isRegistered = groupedCourses[name].some(slot =>
            registered.includes(slot.id)
          );

          return (
            <div className="course-card" key={name}>
              <div className="course-header">
                <span className="course-icon">{meta?.icon}</span>
                <span className="course-tag">{meta?.tag}</span>
              </div>

              <h3>{name}</h3>
              <p className="course-desc">{meta?.desc}</p>

              <select
                className="faculty-select"
                disabled={isRegistered}
                onChange={(e) => handleSelect(name, e.target.value)}
              >
                <option value="">Select Faculty</option>
                {groupedCourses[name].map(slot => (
                  <option key={slot.id} value={slot.id}>
                    {slot.faculty} ({slot.day} {slot.startTime}-{slot.endTime})
                  </option>
                ))}
              </select>

              {isRegistered ? (
                <button disabled style={{opacity:0.6, cursor:"not-allowed"}}>
                  Registered ✅
                </button>
              ) : (
                <button onClick={() => handleRegister(name)}>
                  Register
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Registration;   // ✅ changed