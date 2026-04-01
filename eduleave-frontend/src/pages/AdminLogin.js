import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { getStoredUser, setSession } from "../services/auth";
import "../App.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = getStoredUser();

    if (user?.role === "admin") {
      navigate("/admin/leaves");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email, password });

      if (res.data.user.role !== "admin") {
        setError("This portal is only for admin accounts.");
        return;
      }

      setSession(res.data);
      navigate("/admin/leaves");
    } catch (err) {
      setError(err.response?.data?.message || "Admin login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="hero-panel">
          <p className="auth-eyebrow">Admin Portal</p>
          <h1>Review, approve, and reject leave requests with full visibility.</h1>
          <p>
            Admin access gives you a dedicated queue of requests with reviewer remarks
            and status control.
          </p>
        </div>

        <form className="auth-card" onSubmit={handleLogin}>
          <div className="auth-copy">
            <p className="auth-eyebrow">Admin Login</p>
            <h2>Sign in as admin</h2>
            <p>Only admin accounts can access approval tools.</p>
          </div>

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

          {error ? <p className="form-message error">{error}</p> : null}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Admin Login"}
          </button>

          <p className="auth-switch">
            Forgot password? <Link to="/reset-password">Create a new password</Link>
          </p>

          <p className="auth-switch">
            Need an admin account? <Link to="/admin/signup">Admin signup</Link>
          </p>
          <p className="auth-switch">
            Back to user portal: <Link to="/">Student/faculty login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
