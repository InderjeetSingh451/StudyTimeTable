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
      <div className="space-y-2">
        <Link
          to={`/app/dashboards/${id}`}
          className="text-sm text-indigo-600 hover:underline"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-gray-900">
          Day {dayNum} Preparation Plan
        </h1>

        <p className="text-gray-600">
          Complete all slots to unlock the next day.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <div className="text-sm text-gray-500">Total Slots</div>
          <div className="text-2xl font-bold">{day.totalSlots}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Completed Slots</div>
          <div className="text-2xl font-bold">{completedSlots}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Day Progress</div>
          <div className="text-2xl font-bold">{day.dayProgress}%</div>
          <div className="mt-2">
            <ProgressBar value={day.dayProgress} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {day.slotsInfo.map((slot, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 transition ${
              slot.isCompleted
                ? "bg-green-50 border border-green-200"
                : "bg-white"
            }`}
          >
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {slot.subjectName}
              </h3>

              <div className="text-sm text-gray-500">
                ⏰{" "}
                {slot.startTime && slot.endTime
                  ? `${formatTime(slot.startTime)} → ${formatTime(slot.endTime)}`
                  : "Time not set"}
              </div>

              <div className="text-sm text-gray-600">
                📌 {slot.topics.join(", ")}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  slot.isCompleted
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {slot.isCompleted ? "Completed" : "Pending"}
              </span>

              <button
                onClick={() => toggleSlot(idx)}
                className={`px-6 py-2 rounded-xl font-semibold transition ${
                  slot.isCompleted
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {slot.isCompleted ? "Undo" : "Mark Done"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
