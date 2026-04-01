import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    department: "",
    password: "",
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

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const { name, email, role, department, password, confirmPassword } = formData;

    if (!name || !email || !password || !role || !department) {
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
      await API.post("/auth/register", {
        name,
        email,
        role,
        department,
        password
      });

      setMessage("Account created successfully. You can log in now.");
      setTimeout(() => navigate("/"), 700);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="hero-panel">
          <p className="auth-eyebrow">User Registration</p>
          <h1>Create a student or faculty EduLeave account.</h1>
          <p>
            Choose your role, add your department, and you are ready to submit leave
            requests and track every decision.
          </p>
        </div>

        <form className="auth-card" onSubmit={handleSignup}>
          <div className="auth-copy">
            <p className="auth-eyebrow">Sign Up</p>
            <h2>Create your account</h2>
            <p>Students and faculty can register here.</p>
          </div>

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
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
          </select>
          <input
            name="department"
            placeholder="Department"
            value={formData.department}
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/">Login</Link>
          </p>
          <p className="auth-switch">
            Need an admin account? <Link to="/admin/signup">Admin signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
