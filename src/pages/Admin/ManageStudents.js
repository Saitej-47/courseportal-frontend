import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function ManageStudents() {
  const [students, setStudents] = useState([]);

  const fetchStudents = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/student/all`)
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/anything/student/${id}`)
        .then(() => {
          alert("Student deleted ✅");
          fetchStudents();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">👥 Manage Students</h2>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td className="email-cell">{s.email}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(s.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageStudents;