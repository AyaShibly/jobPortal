import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { username, email, password }
      );

      localStorage.setItem("token", response.data.token);
      setError("");

      setTimeout(() => navigate("/"), 1000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* BACKGROUND BLUR CIRCLES */}
      <div style={styles.backgroundDecor1}></div>
      <div style={styles.backgroundDecor2}></div>
      <div style={styles.backgroundDecor3}></div>

      {/* REGISTER CARD */}
      <div style={styles.formWrapper}>
        <div style={styles.headerSection}>
          <h1 style={styles.logo}> JobPortal</h1>
          <h2 style={styles.title}>Join Today</h2>
          <p style={styles.subtitle}>Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && (
            <div style={styles.errorBox}>
              <span style={{ marginRight: "10px" }}></span>
              {error}
            </div>
          )}

          {/* USERNAME */}
          <div style={styles.inputGroup}>
            <label style={styles.label}> Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.border = "2px solid #059669";
                e.target.style.boxShadow = "0px 0px 0px 4px rgba(5, 150, 105, 0.18)";
              }}
              onBlur={(e) => {
                e.target.style.border = "2px solid #e5e7eb";
                e.target.style.boxShadow = "none";
              }}
              required
              minLength={3}
            />
          </div>

          {/* EMAIL */}
          <div style={styles.inputGroup}>
            <label style={styles.label}> Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.border = "2px solid #059669";
                e.target.style.boxShadow = "0px 0px 0px 4px rgba(5, 150, 105, 0.18)";
              }}
              onBlur={(e) => {
                e.target.style.border = "2px solid #e5e7eb";
                e.target.style.boxShadow = "none";
              }}
              required
            />
          </div>

          {/* PASSWORD */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.border = "2px solid #059669";
                e.target.style.boxShadow = "0px 0px 0px 4px rgba(5, 150, 105, 0.18)";
              }}
              onBlur={(e) => {
                e.target.style.border = "2px solid #e5e7eb";
                e.target.style.boxShadow = "none";
              }}
              required
              minLength={6}
            />

            <p style={styles.hint}>Password must be at least 6 characters</p>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            style={
              loading
                ? { ...styles.button, ...styles.buttonDisabled }
                : styles.button
            }
            onMouseEnter={(e) => {
              if (!loading) {
                (e.target as HTMLButtonElement).style.transform = "translateY(-4px)";
                (e.target as HTMLButtonElement).style.boxShadow =
                  "0px 18px 40px rgba(76, 123, 255, 0.45)";
              }
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = "translateY(0px)";
              (e.target as HTMLButtonElement).style.boxShadow =
                "0px 14px 30px rgba(76, 123, 255, 0.3)";
            }}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div style={styles.divider}></div>

        <p style={styles.switchText}>
          Already have an account?
          <span style={styles.switchLink} onClick={() => navigate("/login")}>
            {" "}
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: "80px 20px",   
  background: "linear-gradient(to bottom right, #f7f9ff, #ffffff)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  position: "relative" as const,
  overflow: "hidden",
},


  /* BACKGROUND BLUR CIRCLES */
  backgroundDecor1: {
    position: "absolute" as const,
    width: "360px",
    height: "360px",
    background: "#10b981",
    borderRadius: "50%",
    filter: "blur(100px)",
    opacity: 0.4,
    top: "110px",
    left: "90px",
    animation: "floatBg 10s infinite ease-in-out",
  },

  backgroundDecor2: {
    position: "absolute" as const,
    width: "420px",
    height: "420px",
    background: "#059669",
    borderRadius: "50%",
    filter: "blur(120px)",
    opacity: 0.35,
    bottom: "70px",
    right: "120px",
    animation: "floatBg 12s infinite ease-in-out",
  },

  backgroundDecor3: {
    position: "absolute" as const,
    width: "290px",
    height: "290px",
    background: "#34d399",
    borderRadius: "50%",
    filter: "blur(110px)",
    opacity: 0.35,
    top: "260px",
    right: "430px",
    animation: "floatBg 14s infinite ease-in-out",
  },

  /* FORM CARD */
  formWrapper: {
    background: "rgba(255, 255, 255, 0.92)",
    borderRadius: "22px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    width: "100%",
    maxWidth: "440px",
    padding: "55px 45px",
    position: "relative" as const,
    zIndex: 10,
    backdropFilter: "blur(12px)",

    /* CARD ANIMATION */
    animation: "fadeSlideUp 0.9s ease, floatCard 4s ease-in-out infinite",
  },

  headerSection: {
    textAlign: "center" as const,
    marginBottom: "35px",
  },

  logo: {
    fontSize: "32px",
    color: "#059669",
    marginBottom: "10px",
    fontWeight: "900",
  },

  title: {
    fontSize: "28px",
    color: "#111827",
    marginBottom: "8px",
    fontWeight: "900",
  },

  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "5px",
    fontWeight: "600",
  },

  form: {
    display: "flex",
    flexDirection: "column" as const,
  },

  inputGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "8px",
    textAlign: "left" as const,
  },

  hint: {
    fontSize: "12px",
    color: "#6b7280",
    marginTop: "6px",
    margin: "6px 0 0 0",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "15px",
    transition: "all 0.3s ease",
    boxSizing: "border-box" as const,
    outline: "none",
  } as React.CSSProperties,

  button: {
    width: "100%",
    padding: "14px 14px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "900",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
    boxShadow: "0px 14px 30px rgba(76, 123, 255, 0.3)",
  } as React.CSSProperties,

  buttonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },

  errorBox: {
    background: "#fff3cd",
    border: "2px solid #ffc107",
    color: "#856404",
    padding: "12px 14px",
    borderRadius: "12px",
    marginBottom: "20px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    fontWeight: "700",
  } as React.CSSProperties,

  divider: {
    height: "1px",
    background: "#e5e7eb",
    margin: "25px 0",
  },

  switchText: {
    textAlign: "center" as const,
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
    fontWeight: "700",
  },

  switchLink: {
    color: "#059669",
    fontWeight: "900",
    cursor: "pointer",
    marginLeft: "5px",
    transition: "all 0.2s ease",
  },
};

export default Register;
