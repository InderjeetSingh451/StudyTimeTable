import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import DayCard from "../components/DayCard";
import { Helmet } from "react-helmet-async";
import StudentLoader from "../components/StudentLoader";
export default function DashboardView() {
  const { id } = useParams();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/dashboards/${id}`)
      .then((res) => {
        setDashboard(res.data.dashboard);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
         <StudentLoader text="Opening your timetable" />
      </div>
    );

  if (!dashboard) return <div>Time-Table not found</div>;

  const completedDays = dashboard.daysInfo.filter(
    (d) => d.dayProgress === 100,
  ).length;

  const handleDayClick = (day) => {
    if (day.dayNumber === 1)
      return navigate(`/app/dashboards/${id}/day/${day.dayNumber}`);

    const prev = dashboard.daysInfo.find(
      (d) => d.dayNumber === day.dayNumber - 1,
    );

    if (prev?.dayProgress === 100) {
      navigate(`/app/dashboards/${id}/day/${day.dayNumber}`);
    }
  };

  return (
    <div className="space-y-10">
      <Helmet>
        <title>Study Planner | Time Table Maker</title>
      </Helmet>
      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-700 via-blue-700 to-indigo-800 text-white p-10 overflow-hidden">
        {/* subtle overlay for depth */}
        <div className="absolute inset-0 bg-white/5"></div>

        {/* Back button */}
        <div className="relative flex justify-end mb-6">
          <Link
            to="/app/dashboards"
            className="px-4 py-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur
                 text-sm font-medium hover:bg-white/20 transition"
          >
            ← All Time-Tables
          </Link>
        </div>

        {/* Title */}
        <h1 className="relative text-3xl font-extrabold mb-2 tracking-tight">
          {dashboard.title}
        </h1>

        <p className="relative text-blue-100 mb-10 max-w-xl">
          Structured learning. Daily execution. Measurable progress.
        </p>

        {/* Stats */}
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white/15 backdrop-blur p-6">
            <div className="text-xs font-medium text-blue-100 tracking-wider">
              TOTAL DAYS
            </div>
            <div className="text-3xl font-bold mt-1">{dashboard.totalDays}</div>
          </div>

          <div className="rounded-2xl bg-white/15 backdrop-blur p-6">
            <div className="text-xs font-medium text-blue-100 tracking-wider">
              COMPLETED DAYS
            </div>
            <div className="text-3xl font-bold mt-1">{completedDays}</div>
          </div>

          <div className="rounded-2xl bg-white/15 backdrop-blur p-6">
            <div className="text-xs font-medium text-blue-100 tracking-wider">
              OVERALL PROGRESS
            </div>
            <div className="text-3xl font-bold mt-1">
              {dashboard.overallProgress}%
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6">Your Daily Plan</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboard.daysInfo
            .sort((a, b) => a.dayNumber - b.dayNumber)
            .map((day) => {
              const locked =
                day.dayNumber !== 1 &&
                dashboard.daysInfo.find(
                  (d) => d.dayNumber === day.dayNumber - 1,
                )?.dayProgress !== 100;

              return (
                <DayCard
                  key={day.dayNumber}
                  day={day}
                  locked={locked}
                  onClick={() => handleDayClick(day)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

