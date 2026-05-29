import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { alert("Enter email & password"); return; }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
      const student = response.data;
      localStorage.setItem("studentId", student.id);
      localStorage.setItem("role", student.role);
      localStorage.setItem("name", student.name);
      if (student.role === "ADMIN") navigate("/admin");
      else navigate("/student");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="o1"></div>
      <div className="o2"></div>
      <div className="o3"></div>
      <div className="o4"></div>
      <div className="scan-line"></div>
      <div className="corner-tl"></div>
      <div className="corner-tr"></div>
      <div className="corner-bl"></div>
      <div className="corner-br"></div>
      <div className="dots-left">
        {[...Array(8)].map((_, i) => <div key={i} className="dot"></div>)}
      </div>
      <div className="dots-right">
        {[...Array(8)].map((_, i) => <div key={i} className="dot"></div>)}
      </div>
      <div className="ring ring1"></div>
      <div className="ring ring2"></div>
      <div className="ring ring3"></div>
      <div className="ring ring4"></div>
      <div className="ring ring5"></div>
      <div className="ring ring6"></div>
      {[...Array(12)].map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${(i * 8.3) % 100}%`,
          width: `${(i % 3) + 2}px`,
          height: `${(i % 3) + 2}px`,
          background: i % 3 === 0 ? 'rgba(0,245,196,.6)' : i % 3 === 1 ? 'rgba(0,153,255,.6)' : 'rgba(139,92,246,.6)',
          animationDuration: `${(i % 4) + 7}s`,
          animationDelay: `${(i % 5) * 1.5}s`,
          bottom: '-10px'
        }}></div>
      ))}
      <div className="astronaut">
        <svg width="110" height="150" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="100" rx="32" ry="38" fill="#1e2a4a" stroke="rgba(0,245,196,.4)" strokeWidth="1.5"/>
          <circle cx="60" cy="55" r="28" fill="#1a2240" stroke="rgba(0,245,196,.5)" strokeWidth="1.5"/>
          <ellipse cx="60" cy="55" rx="18" ry="16" fill="rgba(0,200,255,.15)" stroke="rgba(0,245,196,.6)" strokeWidth="1"/>
          <ellipse cx="54" cy="48" rx="5" ry="4" fill="rgba(255,255,255,.12)"/>
          <ellipse cx="25" cy="100" rx="10" ry="22" fill="#1e2a4a" stroke="rgba(0,245,196,.3)" strokeWidth="1" transform="rotate(-15 25 100)"/>
          <ellipse cx="95" cy="100" rx="10" ry="22" fill="#1e2a4a" stroke="rgba(0,245,196,.3)" strokeWidth="1" transform="rotate(15 95 100)"/>
          <circle cx="18" cy="118" r="8" fill="#162035" stroke="rgba(0,245,196,.4)" strokeWidth="1"/>
          <circle cx="102" cy="118" r="8" fill="#162035" stroke="rgba(0,245,196,.4)" strokeWidth="1"/>
          <ellipse cx="45" cy="140" rx="10" ry="18" fill="#1e2a4a" stroke="rgba(0,245,196,.3)" strokeWidth="1"/>
          <ellipse cx="75" cy="140" rx="10" ry="18" fill="#1e2a4a" stroke="rgba(0,245,196,.3)" strokeWidth="1"/>
          <rect x="45" y="88" width="30" height="20" rx="4" fill="#0d1628" stroke="rgba(0,245,196,.4)" strokeWidth="1"/>
          <circle cx="52" cy="96" r="3" fill="#00f5c4" opacity="0.9"/>
          <circle cx="60" cy="96" r="3" fill="#0099ff" opacity="0.9"/>
          <circle cx="68" cy="96" r="3" fill="#8b5cf6" opacity="0.9"/>
          <line x1="60" y1="27" x2="60" y2="10" stroke="rgba(0,245,196,.6)" strokeWidth="1.5"/>
          <circle cx="60" cy="8" r="3" fill="#00f5c4"/>
          <circle cx="35" cy="45" r="3" fill="#0d1628" stroke="rgba(0,245,196,.4)" strokeWidth="1"/>
          <circle cx="85" cy="45" r="3" fill="#0d1628" stroke="rgba(0,245,196,.4)" strokeWidth="1"/>
        </svg>
      </div>
      <div className="planet">
        <svg width="110" height="110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="35" fill="url(#planetGrad)"/>
          <ellipse cx="50" cy="50" rx="48" ry="12" fill="none" stroke="rgba(0,153,255,.5)" strokeWidth="2"/>
          <ellipse cx="50" cy="50" rx="44" ry="9" fill="none" stroke="rgba(0,245,196,.25)" strokeWidth="1"/>
          <circle cx="38" cy="38" r="8" fill="rgba(255,255,255,.04)"/>
          <circle cx="60" cy="58" r="6" fill="rgba(255,255,255,.04)"/>
          <ellipse cx="38" cy="35" rx="10" ry="7" fill="rgba(255,255,255,.07)" transform="rotate(-20 38 35)"/>
          <defs>
            <radialGradient id="planetGrad" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#1a3a6a"/>
              <stop offset="60%" stopColor="#0d1f3c"/>
              <stop offset="100%" stopColor="#060c1a"/>
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="orbit-ring"></div>
      <div className="stars-container">
        {[
          {x:8,y:12,s:2,d:0},{x:18,y:6,s:1.5,d:.5},{x:84,y:10,s:2,d:1},
          {x:91,y:22,s:1.5,d:1.5},{x:4,y:58,s:2,d:.3},{x:14,y:73,s:1,d:.8},
          {x:87,y:68,s:2,d:.6},{x:94,y:52,s:1.5,d:1.2},{x:77,y:86,s:1,d:.4},
          {x:23,y:88,s:2,d:.9},{x:50,y:4,s:1.5,d:1.7},{x:69,y:91,s:1,d:.2},
          {x:2,y:33,s:1,d:2},{x:96,y:38,s:2,d:.7},{x:44,y:94,s:1.5,d:1.3},
        ].map((star, i) => (
          <div key={i} className="star" style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.s}px`,
            height: `${star.s}px`,
            animationDelay: `${star.d}s`
          }}></div>
        ))}
      </div>
      <div className="login-center">
        <img src={logo} alt="SCP Portal" className="portal-logo" />
        <div className="glass-card">
          <h2>Welcome Back</h2>
          <div className="sub">Sign in to your account</div>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-btn">Login →</button>
          </form>
          <div className="divider"><div></div><span>or</span><div></div></div>
          <p className="register-text">
            No account?{" "}
            <span className="register-link" onClick={() => navigate("/register")}>
              Register here
            </span>
          </p>
          <p className="register-text" style={{ marginTop: "6px" }}>
            Admin?{" "}
            <span
              className="register-link"
              style={{ color: "#60b4ff" }}
              onClick={() => navigate("/admin/login")}
            >
              Admin Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;