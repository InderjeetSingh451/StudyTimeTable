import React from "react";
import ProgressBar from "./ProgressBar";

export default function DayCard({ day, locked, onClick }) {
  return (
    <div
      onClick={() => !locked && onClick()}
      className={`
        bg-white rounded-3xl shadow-lg p-8 min-h-[220px] transition
        ${locked ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:shadow-2xl hover:-translate-y-1"}
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Day {day.dayNumber}</h3>

        <span
          className={`text-sm font-semibold px-4 py-1.5 rounded-full ${
            day.dayProgress === 100
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {day.dayProgress}%
        </span>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <ProgressBar value={day.dayProgress} />
      </div>

      {/* Footer */}
      {!locked ? (
        <div className="flex justify-between items-center text-base">
          <span className="text-gray-500">
            {day.dayProgress === 100 ? "Completed" : "In Progress"}
          </span>
          <span className="text-blue-600 font-semibold">View Details →</span>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-sm mt-6">
          🔒 Complete previous day <br />
          <span className="text-xs">to unlock this day</span>
        </div>
      )}
    </div>
  );
}
