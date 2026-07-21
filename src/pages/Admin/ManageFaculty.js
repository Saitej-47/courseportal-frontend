import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const COURSE_COLORS = [
  "badge-blue", "badge-green", "badge-gold", "badge-purple", "badge-red",
];

function ManageFaculty() {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/courses/all`)
      .then((res) => {
        const seen = new Set();
        const unique = [];
        res.data.forEach((c, i) => {
          if (c.faculty && !seen.has(c.faculty)) {
            seen.add(c.faculty);
            unique.push({ id: i + 1, name: c.faculty, course: c.courseName });
          }
        });
        setFaculty(unique);
      })
      .catch((err) => console.log(err));
  }, []);

  // Consistent color per course name
  const courseColorMap = {};
  let colorIdx = 0;
  faculty.forEach((f) => {
    if (!courseColorMap[f.course]) {
      courseColorMap[f.course] = COURSE_COLORS[colorIdx % COURSE_COLORS.length];
      colorIdx++;
    }
  });

  // Initials avatar helper
  const initials = (name) =>
    name
      .replace(/^Dr\.?\s*/i, "")
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const avatarColors = [
    "#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444",
    "#06b6d4", "#ec4899", "#84cc16",
  ];

  return (
    <div className="admin-page">
      <h2 className="admin-title">👨‍🏫 Manage Faculty</h2>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Faculty</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {faculty.length > 0 ? (
              faculty.map((f) => {
                const color = avatarColors[(f.id - 1) % avatarColors.length];
                return (
                  <tr key={f.id}>
                    <td>{f.id}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: "50%",
                          background: color + "22",
                          border: `1px solid ${color}44`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, fontWeight: 700, color: color,
                          fontFamily: "'Space Grotesk', sans-serif",
                          flexShrink: 0,
                        }}>
                          {initials(f.name)}
                        </div>
                        <span style={{ fontWeight: 500, color: "rgba(255,255,255,.85)" }}>{f.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${courseColorMap[f.course] || "badge-blue"}`}>
                        {f.course}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan="3">No faculty found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageFaculty;