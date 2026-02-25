import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/enrollments")
      .then((res) => setEnrollments(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="admin-page">
      <h2 className="admin-title">Enrollments</h2>

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
          {enrollments.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.studentName}</td>
              <td>{e.courseName}</td>
              <td>{e.facultyName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Enrollments;