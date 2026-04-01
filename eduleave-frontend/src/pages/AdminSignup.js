import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

function AdminSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "Administration",
    password: "",
    confirmPassword: "",
    adminSecret: ""
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

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const { name, email, department, password, confirmPassword, adminSecret } = formData;

    if (!name || !email || !department || !password || !confirmPassword || !adminSecret) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await API.post("/auth/register-admin", {
        name,
        email,
        department,
        password,
        adminSecret
      });

      setMessage("Admin account created successfully. You can log in now.");
      setTimeout(() => navigate("/admin/login"), 700);
    } catch (err) {
      setError(err.response?.data?.message || "Admin signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="hero-panel">
          <p className="auth-eyebrow">Admin Registration</p>
          <h1>Create the account that will review and approve leave requests.</h1>
          <p>
            Admin signup is separated from user signup and protected by an admin secret.
          </p>
        </div>

        <form className="auth-card" onSubmit={handleSignup}>
          <div className="auth-copy">
            <p className="auth-eyebrow">Admin Sign Up</p>
            <h2>Create admin account</h2>
            <p>Use the configured admin secret to register.</p>
          </div>

          <input
            name="name"
            placeholder="Admin Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
          />
          <input
            name="adminSecret"
            type="password"
            placeholder="Admin Secret"
            value={formData.adminSecret}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {error ? <p className="form-message error">{error}</p> : null}
          {message ? <p className="form-message success">{message}</p> : null}

          <button type="submit" disabled={loading}>
            {loading ? "Creating admin..." : "Admin Sign Up"}
          </button>

          <p className="auth-switch">
            Already admin? <Link to="/admin/login">Admin login</Link>
          </p>
          <p className="auth-switch">
            Back to user portal: <Link to="/">Student/faculty login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminSignup;
