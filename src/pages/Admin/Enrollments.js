import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const COURSE_BADGES = ["badge-blue", "badge-green", "badge-gold", "badge-purple", "badge-red"];

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/anything/enroll/all-details`)
      .then((res) => setEnrollments(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Stable color per course name
  const courseColorMap = {};
  let idx = 0;
  enrollments.forEach((e) => {
    if (!courseColorMap[e.courseName]) {
      courseColorMap[e.courseName] = COURSE_BADGES[idx % COURSE_BADGES.length];
      idx++;
    }
  });

  const filtered = enrollments.filter((e) => {
    const q = search.toLowerCase();
    return (
      !q ||
      e.studentName?.toLowerCase().includes(q) ||
      e.courseName?.toLowerCase().includes(q) ||
      e.facultyName?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="admin-page">
      <h2 className="admin-title">📋 Enrollments</h2>

      {/* SEARCH BAR */}
      <div style={{ marginBottom: 18 }}>
        <input
          type="text"
          placeholder="Search by student, course or faculty…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%", maxWidth: 360,
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,.09)",
            background: "rgba(255,255,255,.04)",
            color: "#e0e8ff",
            fontSize: 13,
            fontFamily: "'DM Sans', sans-serif",
            outline: "none",
            transition: "border .2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(226,172,90,.45)")}
          onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,.09)")}
        />
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Course</th>
              <th>Faculty</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td style={{ fontWeight: 500, color: "rgba(255,255,255,.85)" }}>
                    {e.studentName}
                  </td>
                  <td>
                    <span className={`badge ${courseColorMap[e.courseName] || "badge-blue"}`}>
                      {e.courseName}
                    </span>
                  </td>
                  <td style={{ color: "rgba(167,139,250,.8)" }}>{e.facultyName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  {search ? "No results match your search" : "No enrollments found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Enrollments;