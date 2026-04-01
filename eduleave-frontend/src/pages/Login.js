import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { getStoredUser, setSession } from "../services/auth";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = getStoredUser();

    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email, password });
      setSession(res.data);
      navigate(res.data.user.role === "admin" ? "/admin/leaves" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="hero-panel">
          <p className="auth-eyebrow">EduLeave</p>
          <h1>Simplify leave requests for students, faculty, and admins.</h1>
          <p>
            Sign in to apply for leave, monitor approvals, or manage requests from the
            admin panel.
          </p>
          <div className="pill-row">
            <span className="pill">Role-based access</span>
            <span className="pill">Approval workflow</span>
            <span className="pill">Real-time status tracking</span>
          </div>
        </div>

        <form className="auth-card" onSubmit={handleLogin}>
          <div className="auth-copy">
            <p className="auth-eyebrow">Student & Faculty Login</p>
            <h2>Welcome back</h2>
            <p>Use your EduLeave account to manage leave requests securely.</p>
          </div>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? <p className="form-message error">{error}</p> : null}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="auth-switch">
            Need an account? <Link to="/signup">Create student/faculty account</Link>
          </p>
          <p className="auth-switch">
            Forgot password? <Link to="/reset-password">Create a new password</Link>
          </p>
          <p className="auth-switch">
            Admin portal: <Link to="/admin/login">Admin login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
