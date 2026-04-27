import React, { useState } from "react";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.success) {
        alert("Login Successful ✅");
        navigate("/admin/dashboard");
      } else {
        alert(data.message || "Invalid Credentials ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error ❌");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="al-o1"></div>
      <div className="al-o2"></div>
      <div className="al-o3"></div>
      <div className="al-scan"></div>
      <div className="al-corner-tl"></div>
      <div className="al-corner-tr"></div>
      <div className="al-corner-bl"></div>
      <div className="al-corner-br"></div>

      <div className="al-center">
        <img src={logo} alt="Admin Portal" className="admin-portal-logo" />

        <div className="admin-glass-card">
          <div className="admin-badge">⬡ ADMIN ACCESS</div>
          <h2>Admin Login</h2>
          <div className="al-sub">Restricted area — authorized personnel only</div>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="admin-login-btn">Login →</button>
          </form>

          <p className="al-back" onClick={() => navigate("/")}>
            ← Back to Student Login
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;