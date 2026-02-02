import React from "react";

export default function ProgressBar({ value = 0 }) {
  return (
    <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
      <div style={{ width: `${value}%` }} className="h-full bg-green-500" />
    </div>
  );
}
