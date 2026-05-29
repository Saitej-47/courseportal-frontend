import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell
} from "recharts";
import "./AdminDashboard.css";

const barColors = [
  "#00f5c4","#60b4ff","#8b5cf6","#e2ac5a",
  "#ff6b6b","#00c9a7","#a78bfa","#ffdb4d","#f9a8d4"
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "linear-gradient(145deg, #0d1428, #080c18)",
        border: "1px solid rgba(226,172,90,.3)",
        borderRadius: "12px",
        padding: "12px 16px",
        boxShadow: "0 10px 30px rgba(0,0,0,.5)",
        minWidth: "140px"
      }}>
        <p style={{ color: "#e2ac5a", fontWeight: 700, fontSize: "13px", marginBottom: "6px" }}>
          {label}
        </p>
        <p style={{ color: "#fff", fontSize: "13px" }}>
          Students: <span style={{ color: "#00f5c4", fontWeight: 700 }}>{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/anything/api/admin/stats`)
      .then(res => setStats(res.data))
      .catch(err => console.error("Stats error:", err));
    axios.get(`${process.env.REACT_APP_API_URL}/anything/enroll/faculty-students`)
      .then(res => setFacultyData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashWrapper">
      <h1 className="dashTitle">Admin Dashboard 🚀</h1>

      <div className="statsGrid">
        <div className="statCard teal">
          <div className="statLabel">STUDENTS</div>
          <div className="statVal">{stats.students || 0}</div>
        </div>
        <div className="statCard blue">
          <div className="statLabel">COURSES</div>
          <div className="statVal">{stats.courses || 0}</div>
        </div>
        <div className="statCard gold">
          <div className="statLabel">FACULTY</div>
          <div className="statVal">{stats.faculty || 0}</div>
        </div>
        <div className="statCard red">
          <div className="statLabel">ENROLLMENTS</div>
          <div className="statVal">{stats.enrollments || 0}</div>
        </div>
      </div>

      <div className="chartCard">
        <h2 className="chartTitle">Faculty vs Student Selections</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={facultyData}
            margin={{ top: 10, right: 10, left: -20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)" />
            <XAxis
              dataKey="faculty"
              stroke="rgba(255,255,255,.3)"
              tick={{ fill: "rgba(255,255,255,.55)", fontSize: 11 }}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              stroke="rgba(255,255,255,.3)"
              tick={{ fill: "rgba(255,255,255,.55)", fontSize: 11 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(226,172,90,.05)" }}
            />
            <Bar dataKey="students" radius={[8, 8, 0, 0]} maxBarSize={50}>
              {facultyData.map((_, i) => (
                <Cell
                  key={i}
                  fill={barColors[i % barColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminDashboard;