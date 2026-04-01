import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import ApplyLeave from "./pages/ApplyLeave";
import Dashboard from "./pages/Dashboard";
import LeaveHistory from "./pages/LeaveHistory";
import Login from "./pages/Login";
import ManageLeaves from "./pages/ManageLeaves";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        <Route element={<ProtectedRoute allowedRoles={["student", "faculty", "admin"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["student", "faculty"]} />}>
          <Route path="/apply" element={<ApplyLeave />} />
          <Route path="/my-leaves" element={<LeaveHistory />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/leaves" element={<ManageLeaves />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
