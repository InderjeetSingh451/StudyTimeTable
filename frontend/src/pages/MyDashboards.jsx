import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { setSEO } from "../utils/seo";

export default function MyDashboards() {
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSEO({
      title: "My Study Plans | Time Table Maker",
      description:
        "View and manage your study plans and daily timetables using Study Planner.",
    });
  }, []);

  useEffect(() => {
    API.get("/dashboards")
      .then((res) => {
        setDashboards(res.data.dashboards);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        Loading your plans...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* ================= HERO SECTION ================= */}
      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-700 via-blue-700 to-indigo-800 text-white p-10 overflow-hidden">
        <div className="absolute inset-0 bg-white/5"></div>

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Text */}
          <div>
            <h1 className="text-3xl font-extrabold mb-3 tracking-tight">
              My Time-Tables
            </h1>
            <p className="text-blue-100 max-w-xl leading-relaxed">
              Manage all your interview preparation dashboards and track
              progress across days.
            </p>
          </div>

          {/* Glass-style Create Button (SAME as All Time-Tables style) */}
          <Link
            to="/app/dashboards/create"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl
                       bg-white/10 backdrop-blur border border-white/30
                       text-sm font-medium hover:bg-white/20 transition"
          >
            + Create Time-Table
          </Link>
        </div>
      </div>
      {/* ================================================= */}

      {dashboards.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-12 text-center">
          <div className="text-6xl mb-4">🗂️</div>
          <h3 className="text-2xl font-semibold mb-2">No plans created yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start by creating your first interview preparation dashboard. You
            can define days, slots, and track progress automatically.
          </p>

          <Link
            to="/app/dashboards/create"
            className="inline-flex items-center gap-2 px-7 py-3
                       bg-indigo-600 text-white rounded-xl
                       font-semibold shadow hover:bg-indigo-700 transition"
          >
            + Create Your First Plan
          </Link>
        </div>
      ) : (
        <>
          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="text-sm text-gray-500">TOTAL PLANS</div>
              <div className="text-2xl font-bold">{dashboards.length}</div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <div className="text-sm text-gray-500">COMPLETED PLANS</div>
              <div className="text-2xl font-bold">
                {dashboards.filter((d) => d.overallProgress === 100).length}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <div className="text-sm text-gray-500">IN PROGRESS</div>
              <div className="text-2xl font-bold">
                {dashboards.filter((d) => d.overallProgress < 100).length}
              </div>
            </div>
          </div>

          {/* ================= DASHBOARD CARDS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboards.map((d) => (
              <Link
                to={`/app/dashboards/${d._id}`}
                key={d._id}
                className="group bg-white rounded-2xl shadow p-6
                           hover:shadow-xl hover:-translate-y-1 transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition">
                    {d.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {d.totalDays} days
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-2">
                  Overall Progress
                </div>

                <div className="mb-3">
                  <ProgressBar value={d.overallProgress} />
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {d.overallProgress}% complete
                  </span>
                  <span className="text-indigo-600 font-medium">View →</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
