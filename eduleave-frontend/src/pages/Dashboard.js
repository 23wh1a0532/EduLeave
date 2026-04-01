import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { clearSession, getStoredUser } from "../services/auth";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    users: 0
  });

  useEffect(() => {
    const storedUser = getStoredUser();

    if (!storedUser) {
      navigate("/");
      return;
    }

    setUser(storedUser);
  }, [navigate]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const loadStats = async () => {
      try {
        if (user.role === "admin") {
          const [leavesRes, usersRes] = await Promise.all([
            API.get("/leaves"),
            API.get("/users")
          ]);

          const leaves = leavesRes.data;
          setStats({
            total: leaves.length,
            pending: leaves.filter((leave) => leave.status === "Pending").length,
            approved: leaves.filter((leave) => leave.status === "Approved").length,
            rejected: leaves.filter((leave) => leave.status === "Rejected").length,
            users: usersRes.data.length
          });
          return;
        }

        const leavesRes = await API.get("/leaves/mine");
        const leaves = leavesRes.data;
        setStats({
          total: leaves.length,
          pending: leaves.filter((leave) => leave.status === "Pending").length,
          approved: leaves.filter((leave) => leave.status === "Approved").length,
          rejected: leaves.filter((leave) => leave.status === "Rejected").length,
          users: 0
        });
      } catch (error) {
        if (error.response?.status === 401) {
          clearSession();
          navigate("/");
        }
      }
    };

    loadStats();
  }, [navigate, user]);

  const handleLogout = () => {
    clearSession();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-page">
      <section className="dashboard-header">
        <div>
          <p className="auth-eyebrow">Dashboard</p>
          <h1>Welcome, {user.name}</h1>
          <p className="dashboard-subtitle">
            {user.role === "admin"
              ? "Manage every leave request from one approval workspace."
              : "Apply for leave, review request history, and track approvals in one place."}
          </p>
        </div>
        <div className="top-actions">
          {user.role === "admin" ? (
            <Link className="button-link" to="/admin/leaves">
              Manage Requests
            </Link>
          ) : (
            <>
              <Link className="button-link" to="/apply">
                Apply Leave
              </Link>
              <Link className="button-link secondary-button-link" to="/my-leaves">
                View History
              </Link>
            </>
          )}
          <button className="secondary-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>

      <section className="summary-grid">
        <div className="summary-card">
          <span>Total</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="summary-card">
          <span>Pending</span>
          <strong>{stats.pending}</strong>
        </div>
        <div className="summary-card">
          <span>Approved</span>
          <strong>{stats.approved}</strong>
        </div>
        <div className="summary-card">
          <span>Rejected</span>
          <strong>{stats.rejected}</strong>
        </div>
        {user.role === "admin" ? (
          <div className="summary-card">
            <span>Users</span>
            <strong>{stats.users}</strong>
          </div>
        ) : null}
      </section>

      <section className="panel-grid">
        <div className="panel-card">
          <h3>Your profile</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Department:</strong> {user.department || "Not provided"}</p>
        </div>

        <div className="panel-card">
          <h3>{user.role === "admin" ? "Admin actions" : "Next steps"}</h3>
          {user.role === "admin" ? (
            <>
              <p>Review pending requests, approve them, or reject with remarks.</p>
              <Link className="inline-link" to="/admin/leaves">Open approval queue</Link>
            </>
          ) : (
            <>
              <p>Submit a new request or check how your previous applications were handled.</p>
              <Link className="inline-link" to="/apply">Apply for leave</Link>
              <Link className="inline-link" to="/my-leaves">See leave history</Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
