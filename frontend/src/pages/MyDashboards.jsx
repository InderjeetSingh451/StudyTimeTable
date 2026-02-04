import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { setSEO } from "../utils/seo";
import StudentLoader from "../components/StudentLoader";
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
       <StudentLoader text="Preparing your study workspace" />
      </div>
    );
  }

  const completedPlans = dashboards.filter(
    (d) => d.overallProgress === 100,
  ).length;

  const inProgressPlans = dashboards.filter(
    (d) => d.overallProgress < 100,
  ).length;

  return (
    <div className="space-y-12">
      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-700 via-blue-700 to-indigo-800 text-white p-10 overflow-hidden">
        <div className="absolute inset-0 bg-white/5"></div>

        <div className="relative flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold mb-3 tracking-tight">
                My Time-Tables
              </h1>
              <p className="text-blue-100 max-w-xl leading-relaxed">
                Manage all your interview preparation dashboards and track
                progress across days.
              </p>
            </div>

            <Link
              to="/app/dashboards/create"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl
                         bg-white/10 backdrop-blur border border-white/30
                         text-sm font-medium hover:bg-white/20 transition"
            >
              + Create Time-Table
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white/15 backdrop-blur p-6">
              <div className="text-xs font-medium text-blue-100 tracking-wider">
                TOTAL PLANS
              </div>
              <div className="text-3xl font-bold mt-1">{dashboards.length}</div>
            </div>

            <div className="rounded-2xl bg-white/15 backdrop-blur p-6">
              <div className="text-xs font-medium text-blue-100 tracking-wider">
                COMPLETED
              </div>
              <div className="text-3xl font-bold mt-1">{completedPlans}</div>
            </div>

            <div className="rounded-2xl bg-white/15 backdrop-blur p-6">
              <div className="text-xs font-medium text-blue-100 tracking-wider">
                IN PROGRESS
              </div>
              <div className="text-3xl font-bold mt-1">{inProgressPlans}</div>
            </div>
          </div>
        </div>
      </div>

      {dashboards.length === 0 ? (
        <div className="rounded-3xl bg-indigo-50 border border-indigo-200 p-12 text-center">
          <h3 className="text-2xl font-bold text-indigo-900 mb-2">
            No plans yet
          </h3>
          <p className="text-indigo-700 mb-6">
            Create your first time-table and start structured preparation.
          </p>

          <Link
            to="/app/dashboards/create"
            className="inline-flex px-7 py-3 rounded-xl
                       bg-indigo-600 text-white font-semibold
                       hover:bg-indigo-700 transition"
          >
            Create Time-Table
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboards.map((d) => (
              <Link
                key={d._id}
                to={`/app/dashboards/${d._id}`}
                className="rounded-2xl bg-white border border-gray-200
                           p-6 transition
                           hover:shadow-lg hover:border-gray-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {d.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {d.totalDays} days
                  </span>
                </div>

                <div className="text-sm font-medium text-gray-600 mb-2">
                  Overall Progress
                </div>

                <div className="mb-4">
                  <ProgressBar value={d.overallProgress} />
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm font-medium ${
                      d.overallProgress === 100
                        ? "text-green-600"
                        : "text-indigo-600"
                    }`}
                  >
                    {d.overallProgress}% complete
                  </span>

                  <span className="text-sm font-semibold text-gray-700">
                    View →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

