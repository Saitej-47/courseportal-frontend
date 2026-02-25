import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function ManageCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="admin-page">
      <h2 className="admin-title">Manage Courses</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Faculty</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.facultyName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageCourses;