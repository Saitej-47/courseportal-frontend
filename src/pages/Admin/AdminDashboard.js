import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    // ✅ FIXED stats URL
    axios.get("http://localhost:8080/api/admin/stats")
  .then((res) => {
    console.log("STATS DATA:", res.data);
    setStats(res.data);
  })
  .catch((err) => console.error("Stats error:", err));

    axios.get("http://localhost:8080/enroll/faculty-students")
      .then((res) => setFacultyData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashWrapper">
      <h1>Admin Dashboard 🚀</h1>

      <div className="statsGrid">
        <div className="statCard">Students<br/><span>{stats.students || 0}</span></div>
        <div className="statCard">Courses<br/><span>{stats.courses || 0}</span></div>
        <div className="statCard">Faculty<br/><span>{stats.faculty || 0}</span></div>
        <div className="statCard">Enrollments<br/><span>{stats.enrollments || 0}</span></div>
      </div>

      <div className="chartCard">
        <h2>Faculty vs Student Selections</h2>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={facultyData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="faculty" stroke="#cbd5f5" />
            <YAxis stroke="#cbd5f5" />

            {/* ✅ Dark tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "8px",
                color: "#fff"
              }}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />

            <Bar
              dataKey="students"
              radius={[8, 8, 0, 0]}
              fill="url(#colorGradient)"
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminDashboard;