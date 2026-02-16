import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      setError("");

      setTimeout(() => navigate("/"), 800);
    } catch (err: any) {
      const errMsg = err.response?.data?.error || err.response?.data?.message || "Login failed. Please try again.";
      setError(typeof errMsg === 'string' ? errMsg : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Animated background like homepage */}
      <div className="bg-blur blur1"></div>
      <div className="bg-blur blur2"></div>
      <div className="bg-blur blur3"></div>

      <div className="login-wrapper">
        <div className="login-header">
          <h1 className="login-logo"> JobPortal</h1>
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
          {error && (
            <div className="login-error">
              <span style={{ marginRight: "10px" }}></span>
              {error}
            </div>
          )}

          <div className="login-input-group">
            <label className="login-label"> Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
              autoComplete="off"
              name="email-new"
            />
          </div>

          <div className="login-input-group">
            <label className="login-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
              autoComplete="new-password"
              name="password-new"
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "🔄 Logging in..." : " Login"}
          </button>
        </form>

        <div className="login-divider"></div>

        <p className="login-switch">
          Don't have an account?
          <span className="login-link" onClick={() => navigate("/register")}>
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
