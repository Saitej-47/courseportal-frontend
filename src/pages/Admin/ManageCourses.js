import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const API = `${process.env.REACT_APP_API_URL}/courses`;

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    courseName: "",
    faculty: "",
    day: "",
    startTime: "",
    endTime: "",
  });
  const [error, setError] = useState("");

  const loadCourses = () => {
    axios
      .get(`${API}/all`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    setError("");

    if (!form.courseName || !form.faculty || !form.day || !form.startTime || !form.endTime) {
      setError("Please fill in all fields.");
      return;
    }

    axios
      .post(`${API}/add`, form)
      .then(() => {
        setForm({ courseName: "", faculty: "", day: "", startTime: "", endTime: "" });
        loadCourses();
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to add course. Check backend logs.");
      });
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Manage Courses</h2>

      <form
        onSubmit={handleAddCourse}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          margin: "16px 0 24px",
          background: "rgba(255,255,255,0.05)",
          padding: "16px",
          borderRadius: "12px",
        }}
      >
        <input
          name="courseName"
          placeholder="Course Name (e.g. Data Structures)"
          value={form.courseName}
          onChange={handleChange}
        />
        <input
          name="faculty"
          placeholder="Faculty Name"
          value={form.faculty}
          onChange={handleChange}
        />
        <select name="day" value={form.day} onChange={handleChange}>
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>
        <input
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
        />
        <input
          type="time"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
        />
        <button type="submit" className="admin-login-btn">
          Add Course
        </button>
      </form>

      {error && <p style={{ color: "#f87171" }}>{error}</p>}

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Faculty</th>
            <th>Day</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.courseName}</td>
              <td>{c.faculty}</td>
              <td>{c.day}</td>
              <td>{c.startTime}-{c.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageCourses;