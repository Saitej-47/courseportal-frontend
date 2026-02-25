import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function ManageFaculty() {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/faculty")
      .then((res) => setFaculty(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="admin-page">
      <h2 className="admin-title">Manage Faculty</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {faculty.map((f) => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.name}</td>
              <td>{f.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageFaculty;