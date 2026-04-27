import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    courseName: "",
    facultyName: "",
    day: "",
    startTime: "",
    endTime: "",
  });

  const fetchCourses = () => {
    axios
      .get("http://localhost:8080/courses/all")
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    if (!form.courseName.trim())  return alert("Enter course name");
    if (!form.facultyName.trim()) return alert("Enter faculty name");
    if (!form.day.trim())         return alert("Select a day");
    if (!form.startTime.trim() || !form.endTime.trim()) return alert("Enter time");

    axios
      .post("http://localhost:8080/courses/add", {
        courseName: form.courseName,
        facultyName: form.facultyName,
        day: form.day,
        startTime: form.startTime,
        endTime: form.endTime,
      })
      .then(() => {
        alert("Course added ✅");
        setForm({ courseName: "", facultyName: "", day: "", startTime: "", endTime: "" });
        fetchCourses();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this course?")) {
      axios
        .delete(`http://localhost:8080/courses/${id}`)
        .then(() => { alert("Deleted ✅"); fetchCourses(); })
        .catch((err) => console.log(err));
    }
  };

  const dayColors = {
    Monday: "badge-blue", Tuesday: "badge-purple", Wednesday: "badge-gold",
    Thursday: "badge-green", Friday: "badge-red",
    Mon: "badge-blue", Tue: "badge-purple", Wed: "badge-gold",
    Thu: "badge-green", Fri: "badge-red",
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">📚 Manage Courses</h2>

      {/* ADD COURSE FORM */}
      <div className="admin-card" style={{ marginBottom: "20px" }}>
        <h3>Add New Course</h3>
        <div className="form-row">
          <input
            type="text" name="courseName" placeholder="Course Name"
            value={form.courseName} onChange={handleChange}
          />
          <input
            type="text" name="facultyName" placeholder="Faculty Name"
            value={form.facultyName} onChange={handleChange}
          />
          <select name="day" value={form.day} onChange={handleChange}>
            <option value="">Select Day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
          </select>
          <input type="time" name="startTime" value={form.startTime} onChange={handleChange} />
          <input type="time" name="endTime"   value={form.endTime}   onChange={handleChange} />
          <button className="add-btn" onClick={handleAdd}>Add</button>
        </div>
      </div>

      {/* COURSES TABLE */}
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Faculty</th>
              <th>Day</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td style={{ fontWeight: 500, color: "rgba(255,255,255,.88)" }}>{c.courseName}</td>
                  <td style={{ color: "rgba(167,139,250,.85)" }}>{c.faculty}</td>
                  <td>
                    <span className={`badge ${dayColors[c.day] || "badge-blue"}`}>{c.day}</span>
                  </td>
                  <td style={{ color: "rgba(255,255,255,.45)", fontFamily: "'Space Grotesk', sans-serif", fontSize: 12 }}>
                    {c.startTime} – {c.endTime}
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(c.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6">No courses found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageCourses;