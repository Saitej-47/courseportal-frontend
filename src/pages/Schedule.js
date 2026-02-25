import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Schedule.css";

function Schedule() {

  const studentId = localStorage.getItem("studentId");

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  // ⭐ format time (remove seconds + AM/PM)
  const formatTime = (time) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");
    let h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12;
    if (h === 0) h = 12;

    return `${h}:${minute} ${ampm}`;
  };

  // ✅ fetch tasks
  useEffect(() => {
    axios.get(`http://localhost:8080/schedule/${studentId}`)
      .then(res => setTasks(res.data))
      .catch(() => console.log("Fetch schedule error"));
  }, [studentId]);

  // ✅ add task
  const addTask = () => {
    if(!title || !day || !start || !end) {
      alert("Fill all fields");
      return;
    }

    axios.post("http://localhost:8080/schedule", {
      studentId,
      title,
      day,
      startTime: start,
      endTime: end
    }).then(() => {
      setTitle("");
      setDay("");
      setStart("");
      setEnd("");

      axios.get(`http://localhost:8080/schedule/${studentId}`)
        .then(res => setTasks(res.data));
    });
  };

  // ✅ delete task
  const del = (id) => {
    axios.delete(`http://localhost:8080/schedule/${id}`)
      .then(() => {
        axios.get(`http://localhost:8080/schedule/${studentId}`)
          .then(res => setTasks(res.data));
      });
  };

  return (
    <div className="schedule-wrapper">

      <h2 className="schedule-title">
        <span className="title-icon">📅</span> Weekly Productivity Planner
      </h2>

      {/* FORM */}
      <div className="schedule-form">
        <input
          placeholder="Task"
          value={title}
          onChange={e=>setTitle(e.target.value)}
        />

        <select value={day} onChange={e=>setDay(e.target.value)}>
          <option value="">Day</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>

        <input
          type="time"
          value={start}
          onChange={e=>setStart(e.target.value)}
        />

        <input
          type="time"
          value={end}
          onChange={e=>setEnd(e.target.value)}
        />

        <button onClick={addTask}>Add</button>
      </div>

      {/* TASK LIST */}
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map(t => (
          <div className="task-card" key={t.id}>
            <div>
              <b>{t.title}</b>
              <div className="task-time">
                {t.day} • {formatTime(t.startTime)} - {formatTime(t.endTime)}
              </div>
            </div>

            <button className="delete-btn" onClick={()=>del(t.id)}>
              Delete
            </button>
          </div>
        ))
      )}

    </div>
  );
}

export default Schedule;