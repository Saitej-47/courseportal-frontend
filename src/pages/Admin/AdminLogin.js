import React, { useState } from "react";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if(email === "admin@gmail.com" && password === "admin123"){
      navigate("/admin/dashboard");
    }else{
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="admin-login-wrapper">

      {/* 🔥 BIG LOGO like student login */}
      <img src={logo} alt="Admin Portal" className="admin-portal-logo" />

      {/* GLASS CARD */}
      <div className="admin-glass-card">
        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button type="submit" className="admin-login-btn">
            Login
          </button>
        </form>
      </div>

    </div>
  );
}

export default AdminLogin;