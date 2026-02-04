import React from "react";
import ProgressBar from "./ProgressBar";

export default function DayCard({ day, locked, onClick }) {
  console.log(day);
  return (
    <div
      onClick={() => !locked && onClick()}
      className={`
        bg-white rounded-3xl p-8 min-h-[220px]
        border border-gray-200
        transition-all duration-200
        ${
          locked
            ? "cursor-not-allowed opacity-70"
            : "cursor-pointer hover:shadow-xl hover:border-gray-300"
        }
      `}
    >
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-bold text-gray-900">Day {day.dayNumber}</h3>

        <span
          className={`text-sm font-semibold px-4 py-1.5 rounded-full
            ${
              day.dayProgress === 100
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
        >
          {day.dayProgress}%
        </span>
      </div>

      <div className="mb-6">
        <ProgressBar value={day.dayProgress} />
      </div>

      {!locked ? (
        <div className="flex justify-between items-center text-base">
          <span
            className={`font-medium ${
              day.dayProgress === 100 ? "text-green-600" : "text-gray-500"
            }`}
          >
            {day.dayProgress === 100 ? "Completed" : "In Progress"}
          </span>

          <span className="text-indigo-600 font-semibold">View Details →</span>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-sm mt-6">
          <div className="text-base font-medium">Locked</div>
          <div className="text-xs">
            Complete Day {day.dayNumber - 1} to unlock
          </div>
        </div>
      )}
    </div>
  );
}
