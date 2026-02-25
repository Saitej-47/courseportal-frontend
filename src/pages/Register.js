import React, { useState } from "react";
import "./Login.css";   // same CSS
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.png";
import logo from "../assets/logo.png";   // 🔥 add logo

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/auth/register", {
        name,
        email,
        password
      });

      alert("Registration Successful!");
      navigate("/");

    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div 
      className="login-wrapper"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      {/* 🔥 SAME ANIMATED LOGO AS LOGIN */}
      <img src={logo} alt="portal logo" className="portal-logo" />

      {/* GLASS CARD */}
      <div className="glass-card">
        <h2>Register</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />

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
            Register
          </button>
        </form>

        <p className="register-text">
          Already have an account?{" "}
          <span
            className="register-link"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Register;
