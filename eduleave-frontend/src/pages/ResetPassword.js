import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    role: "student",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const { email, role, newPassword, confirmPassword } = formData;

    if (!email || !role || !newPassword || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/reset-password", {
        email,
        role,
        newPassword
      });
      setMessage(res.data.message);
      setTimeout(() => navigate(role === "admin" ? "/admin/login" : "/"), 900);
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="hero-panel">
          <p className="auth-eyebrow">Password Recovery</p>
          <h1>Set a new password for any EduLeave account.</h1>
          <p>
            If a login password is invalid, you can reset it here for student, faculty,
            or admin users.
          </p>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-copy">
            <p className="auth-eyebrow">Reset Password</p>
            <h2>Create a new password</h2>
            <p>Select the correct role before changing the password.</p>
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>
          <input
            name="newPassword"
            type="password"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {error ? <p className="form-message error">{error}</p> : null}
          {message ? <p className="form-message success">{message}</p> : null}

          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <p className="auth-switch">
            Back to user login: <Link to="/">Student/faculty login</Link>
          </p>
          <p className="auth-switch">
            Back to admin login: <Link to="/admin/login">Admin login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
