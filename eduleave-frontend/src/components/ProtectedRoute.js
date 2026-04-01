import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getStoredUser } from "../services/auth";

function ProtectedRoute({ allowedRoles }) {
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
