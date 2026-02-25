import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.png";
import logo from "../assets/logo.png";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password
      });

      const student = response.data;

      // ⭐ STORE LOGIN DATA
      localStorage.setItem("studentId", student.id);
      localStorage.setItem("role", student.role);
      localStorage.setItem("name", student.name);

      console.log("Logged in studentId:", student.id);   // debug

      // ⭐ NAVIGATION
      if (student.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/student");
      }

    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div 
      className="login-wrapper"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      <img src={logo} alt="Student Course Portal" className="portal-logo" />

      <div className="glass-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <span 
            className="register-link"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
        <p style={{marginTop:"10px", fontSize:"14px", color:"#ddd"}}>
  Admin? <a href="/admin" style={{color:"#22c1c3"}}>Login here</a>
</p>

      </div>

    </div>
  );
}

export default Login;
