import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import DayCard from "../components/DayCard";
import { Helmet } from "react-helmet-async";
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
        Loading...
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
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-10">
        <div className="absolute top-6 right-6">
          <Link
            to="/app/dashboards"
            className="px-4 py-2 rounded-xl border border-white/40 bg-white/10 backdrop-blur text-sm font-medium hover:bg-white/20 transition"
          >
            ← All Time-Tables
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">{dashboard.title}</h1>
        <p className="text-blue-100 mb-8">
          Structured learning. Daily execution. Measurable progress.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white/15 rounded-xl p-5">
            <div className="text-sm text-blue-100">TOTAL DAYS</div>
            <div className="text-2xl font-bold">{dashboard.totalDays}</div>
          </div>

          <div className="bg-white/15 rounded-xl p-5">
            <div className="text-sm text-blue-100">COMPLETED DAYS</div>
            <div className="text-2xl font-bold">{completedDays}</div>
          </div>

          <div className="bg-white/15 rounded-xl p-5">
            <div className="text-sm text-blue-100">OVERALL PROGRESS</div>
            <div className="text-2xl font-bold">
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
