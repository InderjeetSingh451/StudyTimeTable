import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthHome from "./pages/AuthHome";
import MyDashboards from "./pages/MyDashboards";
import CreateDashboard from "./pages/CreateDashboard";
import DashboardView from "./pages/DashboardView";
import DayView from "./pages/DayView";
import { AuthContext } from "./context/AuthContext";
import VerifyOtp from "./pages/VerifyOtp";
function RequireAuth({ children }) {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Checking session...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Helmet>
        <title>Study Planner | Time Table Maker</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route
          path="/app"
          element={
            <RequireAuth>
              <AuthHome />
            </RequireAuth>
          }
        />

        <Route
          path="/app/dashboards"
          element={
            <RequireAuth>
              <MyDashboards />
            </RequireAuth>
          }
        />

        <Route
          path="/app/dashboards/create"
          element={
            <RequireAuth>
              <CreateDashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/app/dashboards/:id"
          element={
            <RequireAuth>
              <DashboardView />
            </RequireAuth>
          }
        />

        <Route
          path="/app/dashboards/:id/day/:dayNumber"
          element={
            <RequireAuth>
              <DayView />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}
