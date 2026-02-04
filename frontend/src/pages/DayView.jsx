import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import ProgressBar from "../components/ProgressBar";
import { formatTime } from "../utils/time";

export default function DayView() {
  const { id, dayNumber } = useParams();
  const dayNum = Number(dayNumber);

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/dashboards/${id}`)
      .then((res) => {
        setDashboard(res.data.dashboard);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load day");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        Loading day plan...
      </div>
    );
  }

  if (error) return <div className="text-red-600">{error}</div>;
  if (!dashboard) return <div>Dashboard not found</div>;

  const day = dashboard.daysInfo.find((d) => d.dayNumber === dayNum);
  if (!day) return <div>Day not found</div>;

  const completedSlots = day.slotsInfo.filter((s) => s.isCompleted).length;

  const toggleSlot = async (slotIndex) => {
    try {
      const res = await API.patch(`/dashboards/${id}/slot/toggle`, {
        dayNumber: dayNum,
        slotIndex,
      });
      setDashboard(res.data.dashboard);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update slot");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* ================= HERO WITH STATS ================= */}
      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-700 via-blue-700 to-indigo-800 text-white p-8 overflow-hidden">
        <div className="absolute inset-0 bg-white/5"></div>

        <div className="relative flex flex-col gap-6">
          {/* Back */}
          <div>
            <Link
              to={`/app/dashboards/${id}`}
              className="inline-flex items-center px-4 py-2 rounded-xl
                         bg-white/10 backdrop-blur border border-white/30
                         text-sm font-medium hover:bg-white/20 transition"
            >
              ← Back to Dashboard
            </Link>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Day {dayNum} Preparation Plan
            </h1>
            <p className="text-blue-100 mt-1">
              Complete all slots to unlock the next day.
            </p>
          </div>

          {/* Stats inside hero */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white/15 backdrop-blur p-6">
              <div className="text-xs font-medium text-blue-100 tracking-wider">
                TOTAL SLOTS
              </div>
              <div className="text-3xl font-bold mt-1">{day.totalSlots}</div>
            </div>

            <div className="rounded-2xl bg-white/15 backdrop-blur p-6">
              <div className="text-xs font-medium text-blue-100 tracking-wider">
                COMPLETED
              </div>
              <div className="text-3xl font-bold mt-1">{completedSlots}</div>
            </div>

            <div className="rounded-2xl bg-white/15 backdrop-blur p-6">
              <div className="text-xs font-medium text-blue-100 tracking-wider">
                DAY PROGRESS
              </div>
              <div className="text-3xl font-bold mt-1">{day.dayProgress}%</div>
              <div className="mt-3">
                <ProgressBar value={day.dayProgress} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ================= END HERO ================= */}

      {/* ================= SLOTS ================= */}
      <div className="space-y-6">
        {day.slotsInfo.map((slot, idx) => (
          <div
            key={idx}
            className={`group relative rounded-2xl border transition-all overflow-hidden
              ${
                slot.isCompleted
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-xl"
              }`}
          >
            <div
              className={`h-1 w-full ${
                slot.isCompleted ? "bg-green-500" : "bg-indigo-500"
              }`}
            />

            <div className="p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {slot.subjectName}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    ⏰{" "}
                    {slot.startTime && slot.endTime
                      ? `${formatTime(slot.startTime)} – ${formatTime(
                          slot.endTime,
                        )}`
                      : "Time not set"}
                  </span>

                  <span className="flex items-center gap-1 text-gray-600">
                    📌 {slot.topics.join(", ")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide
                    ${
                      slot.isCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                >
                  {slot.isCompleted ? "COMPLETED" : "PENDING"}
                </span>

                <button
                  onClick={() => toggleSlot(idx)}
                  className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all
                    ${
                      slot.isCompleted
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                >
                  {slot.isCompleted ? "Undo" : "Mark Done"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
