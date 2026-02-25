import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Timetable.css";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function Timetable() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("studentId");

    axios.get(`http://localhost:8080/enroll/student/${id}/courses`)
      .then(res => {
        console.log("Enroll data:", res.data);
        setSlots(res.data);
      })
      .catch(() => console.log("Timetable fetch error"));
  }, []);

  // 🔥 convert Monday → Mon etc
  const normalizeDay = (d) => {
    if (!d) return "";
    return d.slice(0,3);
  };

  const getDay = (s) => normalizeDay(s.day);
  const getTime = (s) => `${s.startTime}-${s.endTime}`;

  // 🔥 sort timetable rows
  const times = [...new Set(slots.map(getTime))]
    .sort((a,b) => a.localeCompare(b));

  // 🔥 allow multiple courses per slot
  const getSlot = (day, time) =>
    slots.filter(s => getDay(s) === day && getTime(s) === time);

  return (
    <div className="time-wrapper">
      <h2 className="time-title">My Timetable</h2>

      {slots.length === 0 ? (
        <p className="empty">Register courses to build timetable ⚠</p>
      ) : (
        <div className="time-grid">

          <div className="grid-header">Time</div>
          {days.map(d => <div key={d} className="grid-header">{d}</div>)}

          {times.map(time => (
            <React.Fragment key={time}>
              <div className="grid-time">{time}</div>

              {days.map(day => {
                const slot = getSlot(day, time);
                return (
                  <div className="grid-cell" key={day}>
                    {slot.length > 0 && slot.map(s => (
                      <div key={s.id}>
                        <b>{s.courseName}</b>
                        <small>{s.faculty}</small>
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}

        </div>
      )}
    </div>
  );
}

export default Timetable;