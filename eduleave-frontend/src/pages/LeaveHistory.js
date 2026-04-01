import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { getStoredUser } from "../services/auth";
import "../App.css";

function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = getStoredUser();

    if (!user || user.role === "admin") {
      navigate("/");
      return;
    }

    const loadLeaves = async () => {
      try {
        const res = await API.get("/leaves/mine");
        setLeaves(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load leave history.");
      } finally {
        setLoading(false);
      }
    };

    loadLeaves();
  }, [navigate]);

  return (
    <div className="dashboard-page">
      <section className="dashboard-header">
        <div>
          <p className="auth-eyebrow">My Leaves</p>
          <h1>Leave history</h1>
          <p className="dashboard-subtitle">
            Review every request, its duration, and the final admin decision.
          </p>
        </div>
        <div className="top-actions">
          <Link className="button-link secondary-button-link" to="/dashboard">
            Dashboard
          </Link>
          <Link className="button-link" to="/apply">
            Apply Leave
          </Link>
        </div>
      </section>

      {loading ? <div className="panel-card">Loading leave history...</div> : null}
      {error ? <div className="panel-card error-box">{error}</div> : null}

      {!loading && !error ? (
        <div className="list-grid">
          {leaves.length === 0 ? (
            <div className="panel-card">No leave requests found yet.</div>
          ) : (
            leaves.map((leave) => (
              <div className="panel-card" key={leave._id}>
                <div className="card-header">
                  <h3>{leave.leaveType} Leave</h3>
                  <span className={`status-badge status-${leave.status.toLowerCase()}`}>
                    {leave.status}
                  </span>
                </div>
                <p><strong>Dates:</strong> {leave.fromDate.slice(0, 10)} to {leave.toDate.slice(0, 10)}</p>
                <p><strong>Total days:</strong> {leave.totalDays}</p>
                <p><strong>Reason:</strong> {leave.reason}</p>
                <p><strong>Admin remarks:</strong> {leave.adminRemarks || "No remarks yet"}</p>
                <p>
                  <strong>Reviewed by:</strong> {leave.reviewedBy?.name || "Awaiting action"}
                </p>
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

export default LeaveHistory;
