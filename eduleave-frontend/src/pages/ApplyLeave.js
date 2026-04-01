import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { getStoredUser } from "../services/auth";
import "../App.css";

function ApplyLeave() {
  const [formData, setFormData] = useState({
    leaveType: "Sick",
    fromDate: "",
    toDate: "",
    reason: ""
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getStoredUser();

    if (!user || user.role === "admin") {
      navigate("/");
    }
  }, [navigate]);

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

    const { leaveType, fromDate, toDate, reason } = formData;

    if (!leaveType || !fromDate || !toDate || !reason) {
      setError("Please complete all fields.");
      return;
    }

    if (reason.trim().length < 10) {
      setError("Reason must be at least 10 characters long.");
      return;
    }

    if (new Date(toDate) < new Date(fromDate)) {
      setError("To date cannot be before from date.");
      return;
    }

    try {
      setSubmitting(true);
      await API.post("/leaves", {
        leaveType,
        fromDate,
        toDate,
        reason
      });

      setMessage("Leave applied successfully.");
      setFormData({
        leaveType: "Sick",
        fromDate: "",
        toDate: "",
        reason: ""
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error applying leave.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-page">
      <section className="dashboard-header">
        <div>
          <p className="auth-eyebrow">Leave Request</p>
          <h1>Apply for leave</h1>
          <p className="dashboard-subtitle">
            Submit the leave type, dates, and a clear reason so your request can be reviewed.
          </p>
        </div>
        <div className="top-actions">
          <Link className="button-link secondary-button-link" to="/dashboard">
            Back to Dashboard
          </Link>
          <Link className="button-link" to="/my-leaves">
            My Leaves
          </Link>
        </div>
      </section>

      <form className="form-panel" onSubmit={handleSubmit}>
        <div className="field-grid">
          <div>
            <label>Leave Type</label>
            <select name="leaveType" value={formData.leaveType} onChange={handleChange}>
              <option value="Sick">Sick</option>
              <option value="Casual">Casual</option>
              <option value="Personal">Personal</option>
              <option value="Emergency">Emergency</option>
              <option value="On Duty">On Duty</option>
            </select>
          </div>

          <div>
            <label>From Date</label>
            <input
              name="fromDate"
              type="date"
              value={formData.fromDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>To Date</label>
            <input
              name="toDate"
              type="date"
              value={formData.toDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label>Reason</label>
          <textarea
            name="reason"
            rows="5"
            placeholder="Write a clear reason for your leave request"
            value={formData.reason}
            onChange={handleChange}
          />
        </div>

        {error ? <p className="form-message error">{error}</p> : null}
        {message ? <p className="form-message success">{message}</p> : null}

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Leave Request"}
        </button>
      </form>
    </div>
  );
}

export default ApplyLeave;
