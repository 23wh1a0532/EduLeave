import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { getStoredUser } from "../services/auth";
import "../App.css";

function ManageLeaves() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [remarks, setRemarks] = useState({});
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchLeaves = async (status = statusFilter, role = roleFilter) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (status && status !== "All") {
        params.set("status", status);
      }

      if (role && role !== "All") {
        params.set("role", role);
      }

      const query = params.toString() ? `?${params.toString()}` : "";
      const res = await API.get(`/leaves${query}`);
      setLeaves(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load leave requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = getStoredUser();

    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const loadInitialLeaves = async () => {
      try {
        setLoading(true);
        const res = await API.get("/leaves");
        setLeaves(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load leave requests.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialLeaves();
  }, [navigate]);

  const handleDecision = async (leaveId, status) => {
    setError("");
    setMessage("");

    try {
      await API.patch(`/leaves/${leaveId}/status`, {
        status,
        adminRemarks: remarks[leaveId] || ""
      });

      setMessage(`Leave ${status.toLowerCase()} successfully.`);
      fetchLeaves(statusFilter, roleFilter);
    } catch (err) {
      setError(err.response?.data?.message || "Could not update leave status.");
    }
  };

  return (
    <div className="dashboard-page">
      <section className="dashboard-header">
        <div>
          <p className="auth-eyebrow">Admin Approval Queue</p>
          <h1>Manage leave requests</h1>
          <p className="dashboard-subtitle">
            Review requests, filter by status, and leave remarks while approving or rejecting.
          </p>
        </div>
        <div className="top-actions">
          <Link className="button-link secondary-button-link" to="/dashboard">
            Dashboard
          </Link>
        </div>
      </section>

      <section className="filter-bar">
        <label>Status Filter</label>
        <select
          value={statusFilter}
          onChange={(e) => {
            const nextStatus = e.target.value;
            setStatusFilter(nextStatus);
            fetchLeaves(nextStatus, roleFilter);
          }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <label>Role Filter</label>
        <select
          value={roleFilter}
          onChange={(e) => {
            const nextRole = e.target.value;
            setRoleFilter(nextRole);
            fetchLeaves(statusFilter, nextRole);
          }}
        >
          <option value="All">All</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
      </section>

      {message ? <div className="panel-card success-box">{message}</div> : null}
      {error ? <div className="panel-card error-box">{error}</div> : null}
      {loading ? <div className="panel-card">Loading leave requests...</div> : null}

      {!loading ? (
        <div className="list-grid">
          {leaves.length === 0 ? (
            <div className="panel-card">No leave requests found for this filter.</div>
          ) : (
            leaves.map((leave) => (
              <div className="panel-card" key={leave._id}>
                <div className="card-header">
                  <div>
                    <h3>{leave.requestedBy?.name}</h3>
                    <p>{leave.requestedBy?.email}</p>
                  </div>
                  <span className={`status-badge status-${leave.status.toLowerCase()}`}>
                    {leave.status}
                  </span>
                </div>

                <p><strong>Role:</strong> {leave.requestedBy?.role}</p>
                <p><strong>Department:</strong> {leave.requestedBy?.department || "Not provided"}</p>
                <p><strong>Leave Type:</strong> {leave.leaveType}</p>
                <p><strong>Dates:</strong> {leave.fromDate.slice(0, 10)} to {leave.toDate.slice(0, 10)}</p>
                <p><strong>Total days:</strong> {leave.totalDays}</p>
                <p><strong>Reason:</strong> {leave.reason}</p>
                <p><strong>Existing remarks:</strong> {leave.adminRemarks || "No remarks yet"}</p>
                <p><strong>Reviewed by:</strong> {leave.reviewedBy?.name || "Pending review"}</p>

                <textarea
                  rows="3"
                  placeholder="Write admin remarks"
                  value={remarks[leave._id] || ""}
                  onChange={(e) =>
                    setRemarks((current) => ({
                      ...current,
                      [leave._id]: e.target.value
                    }))
                  }
                />

                <div className="action-row">
                  <button onClick={() => handleDecision(leave._id, "Approved")}>
                    Approve
                  </button>
                  <button
                    className="secondary-button"
                    onClick={() => handleDecision(leave._id, "Rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

export default ManageLeaves;
