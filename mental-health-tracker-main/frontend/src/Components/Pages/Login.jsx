import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../../Styles/Login.css";
import api from "../../ServicesJS/api"; // use our centralized API

export default function Login() {
  const [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || (isSignup && !username)) {
      alert("Please fill all the fields.");
      return;
    }
    
    try {
      if (isSignup) {
        // REGISTER
        const res = await api.post("/auth/register", {
          username,
          email,
          password
        });
        alert("Signup successful! You can log in now.");
        setIsSignup(false);
      } else {
        // LOGIN
        const res = await api.post("/auth/login", {
          email,
          password
        });
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        navigate("/dashboard"); // redirect after login
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <div className="login-box">
        {/* left form */}
        <div className="login-form">
          <p className="subtitle">Welcome to EkaMind ✨</p>
          <b>
            <p className="subtext">Track. Heal. Unite </p>
          </b>
          <p className="subtext2">
            A gamified experience to help you grow, one mindful level at a time.
          </p>

          <form onSubmit={handleLogin}>
            {isSignup && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            )}

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-pw"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* Show/hide icon or text here */}
              </button>
            </div>

            <b>
              <button className="btn-signin" type="submit">
                {isSignup ? "SIGN UP" : "LOGIN"}
              </button>
            </b>
          </form>

          {/* Toggle message */}
          <p className="toggle-link">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <span className="highlight" onClick={toggleForm}>
                  <b>LOGIN</b>
                </span>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <span className="highlight" onClick={toggleForm}>
                  <b>SIGN UP</b>
                </span>
              </>
            )}
          </p>
        </div>

        {/* right avatar */}
        <div className="loginavatar">
          <img src="/assets/panda.png" alt="avatar" />
        </div>
      </div>
    </div>
  );
}


