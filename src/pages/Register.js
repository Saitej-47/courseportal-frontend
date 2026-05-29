import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Register() {
  const navigate = useNavigate();
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/anything/auth/register`, { name, email, password });
      alert("Registration Successful!");
      navigate("/");
    } catch {
      alert("Registration Failed");
    }
  };

  return (
    <div className="login-wrapper">

      {/* ── Orbs (same as login) ── */}
      <div className="o1" /><div className="o2" /><div className="o3" /><div className="o4" />

      {/* ── Corner decorations (same as login) ── */}
      <div className="corner-tl" /><div className="corner-tr" />
      <div className="corner-bl" /><div className="corner-br" />

      {/* ── Scanning line ── */}
      <div className="scan-line" />

      {/* ── Rings ── */}
      <div className="ring ring1" /><div className="ring ring2" /><div className="ring ring3" />
      <div className="ring ring4" /><div className="ring ring5" /><div className="ring ring6" />

      {/* ── Orbit ring ── */}
      <div className="orbit-ring" />

      {/* ── Side dots ── */}
      <div className="dots-left">
        {Array.from({ length: 8 }).map((_, i) => <div key={i} className="dot" />)}
      </div>
      <div className="dots-right">
        {Array.from({ length: 8 }).map((_, i) => <div key={i} className="dot" />)}
      </div>

      {/* ── Stars ── */}
      <div className="stars-container">
        {[
          { w:2,  h:2,  t:"8%",  l:"15%", d:"0s"   },
          { w:3,  h:3,  t:"22%", l:"78%", d:"0.8s"  },
          { w:1,  h:1,  t:"45%", l:"92%", d:"1.5s"  },
          { w:2,  h:2,  t:"67%", l:"5%",  d:"0.3s"  },
          { w:3,  h:3,  t:"12%", l:"52%", d:"2.1s"  },
          { w:1,  h:1,  t:"88%", l:"34%", d:"1.1s"  },
          { w:2,  h:2,  t:"35%", l:"68%", d:"0.6s"  },
          { w:1,  h:1,  t:"74%", l:"88%", d:"1.8s"  },
          { w:3,  h:3,  t:"55%", l:"42%", d:"2.5s"  },
          { w:2,  h:2,  t:"92%", l:"62%", d:"0.4s"  },
          { w:1,  h:1,  t:"18%", l:"28%", d:"1.3s"  },
          { w:2,  h:2,  t:"80%", l:"18%", d:"2.8s"  },
        ].map((s, i) => (
          <div key={i} className="star" style={{
            width: s.w, height: s.h,
            top: s.t, left: s.l,
            animationDelay: s.d,
          }} />
        ))}
      </div>

      {/* ── Floating particles ── */}
      {[
        { w:3,  l:"10%", dur:"8s",  del:"0s"   },
        { w:5,  l:"25%", dur:"12s", del:"2s"   },
        { w:2,  l:"50%", dur:"9s",  del:"4s"   },
        { w:4,  l:"70%", dur:"11s", del:"1s"   },
        { w:3,  l:"85%", dur:"7s",  del:"3s"   },
        { w:6,  l:"40%", dur:"14s", del:"5s"   },
      ].map((p, i) => (
        <div key={i} className="particle" style={{
          width: p.w, height: p.w,
          left: p.l,
          background: i % 2 === 0 ? "rgba(0,245,196,.6)" : "rgba(0,153,255,.6)",
          boxShadow: `0 0 ${p.w * 2}px ${i % 2 === 0 ? "rgba(0,245,196,.8)" : "rgba(0,153,255,.8)"}`,
          animationDuration: p.dur,
          animationDelay: p.del,
        }} />
      ))}

      {/* ── Astronaut (same as login) ── */}
      <div className="astronaut">
        <svg width="110" height="150" viewBox="0 0 110 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="55" cy="38" r="28" fill="#1a2744" stroke="#00f5c4" strokeWidth="1.5"/>
          <circle cx="55" cy="38" r="20" fill="#0d1929" stroke="rgba(0,245,196,.3)" strokeWidth="1"/>
          <circle cx="47" cy="34" r="5" fill="#00f5c4" opacity=".8"/>
          <circle cx="63" cy="34" r="5" fill="#00f5c4" opacity=".8"/>
          <circle cx="47" cy="34" r="2.5" fill="white"/>
          <circle cx="63" cy="34" r="2.5" fill="white"/>
          <rect x="20" y="55" width="70" height="65" rx="18" fill="#1a2744" stroke="#00f5c4" strokeWidth="1.5"/>
          <rect x="32" y="68" width="46" height="12" rx="6" fill="rgba(0,245,196,.15)" stroke="rgba(0,245,196,.3)" strokeWidth="1"/>
          <circle cx="42" cy="96" r="5" fill="#00f5c4" opacity=".6"/>
          <circle cx="55" cy="96" r="5" fill="#0099ff" opacity=".6"/>
          <circle cx="68" cy="96" r="5" fill="#8b5cf6" opacity=".6"/>
          <rect x="2"  y="62" width="18" height="36" rx="9" fill="#1a2744" stroke="#00f5c4" strokeWidth="1.5"/>
          <rect x="90" y="62" width="18" height="36" rx="9" fill="#1a2744" stroke="#00f5c4" strokeWidth="1.5"/>
          <rect x="32" y="120" width="20" height="28" rx="8" fill="#1a2744" stroke="#00f5c4" strokeWidth="1.5"/>
          <rect x="58" y="120" width="20" height="28" rx="8" fill="#1a2744" stroke="#00f5c4" strokeWidth="1.5"/>
          <ellipse cx="42" cy="148" rx="12" ry="4" fill="rgba(0,245,196,.2)"/>
          <ellipse cx="68" cy="148" rx="12" ry="4" fill="rgba(0,245,196,.2)"/>
        </svg>
      </div>

      {/* ── Planet (same as login) ── */}
      <div className="planet">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="45" cy="45" r="30" fill="url(#planetGrad)"/>
          <defs>
            <radialGradient id="planetGrad" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#1a4fa8"/>
              <stop offset="60%" stopColor="#0a2d6e"/>
              <stop offset="100%" stopColor="#050f2a"/>
            </radialGradient>
          </defs>
          <ellipse cx="45" cy="45" rx="44" ry="12" fill="none" stroke="rgba(0,153,255,.4)" strokeWidth="1.5"/>
          <ellipse cx="45" cy="28" rx="18" ry="5" fill="rgba(0,200,255,.08)"/>
          <circle cx="33" cy="38" r="3" fill="rgba(255,255,255,.08)"/>
          <circle cx="55" cy="52" r="2" fill="rgba(255,255,255,.06)"/>
        </svg>
      </div>

      {/* ── Content: logo + card ── */}
      <div className="login-center">
        <img src={logo} alt="portal logo" className="portal-logo" />

        <div className="glass-card">
          <h2>Create Account</h2>
          

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">
              Register →
            </button>
          </form>

          <div className="divider">
            <div /><span>or</span><div />
          </div>

          <p className="register-text">
            Already have an account?{" "}
            <span className="register-link" onClick={() => navigate("/")}>Login</span>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Register;