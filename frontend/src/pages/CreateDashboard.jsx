import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { validateSlots } from "../utils/slotValidation";
import { formatTime } from "../utils/time";

export default function CreateDashboard() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [totalDays, setTotalDays] = useState(1);
  const [daysInfo, setDaysInfo] = useState([]);

  const [error, setError] = useState("");
  const [errorDayIndex, setErrorDayIndex] = useState(null);
  const [errorSlotIndex, setErrorSlotIndex] = useState(null);

  const initDays = () => {
    const days = [];
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        dayNumber: i,
        totalSlots: 1,
        slotsInfo: [
          {
            startTime: "",
            endTime: "",
            subjectName: "",
            topics: [],
            isCompleted: false,
          },
        ],
        dayProgress: 0,
      });
    }
    setDaysInfo(days);
    setError("");
    setErrorDayIndex(null);
    setErrorSlotIndex(null);
  };

  const setSlotField = (dIdx, sIdx, field, value) => {
    const copy = [...daysInfo];

    if (field === "topics") {
      copy[dIdx].slotsInfo[sIdx].topics = value
        .split(/,|\n/)
        .map((t) => t.trim())
        .filter(Boolean);
    } else {
      copy[dIdx].slotsInfo[sIdx][field] = value;
    }

    setDaysInfo(copy);
  };

  const addSlot = (dIdx) => {
    const copy = [...daysInfo];
    if (copy[dIdx].slotsInfo.length >= 20) return;

    copy[dIdx].slotsInfo.push({
      startTime: "",
      endTime: "",
      subjectName: "",
      topics: [],
      isCompleted: false,
    });

    copy[dIdx].totalSlots = copy[dIdx].slotsInfo.length;
    setDaysInfo(copy);
  };

  const submit = async () => {
    setError("");
    setErrorDayIndex(null);
    setErrorSlotIndex(null);

    for (let d = 0; d < daysInfo.length; d++) {
      const validation = validateSlots(daysInfo[d].slotsInfo);
      if (validation) {
        setError(`Day ${d + 1}: ${validation.message}`);
        setErrorDayIndex(d);
        setErrorSlotIndex(validation.slotIndex);
        return;
      }
    }

    try {
      await API.post("/dashboards", {
        title,
        totalDays,
        daysInfo,
      });
      navigate("/app/dashboards");
    } catch {
      setError("Failed to create dashboard");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Create New Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Organize your daily study routine with structured days and focused
          time slots.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow p-6 space-y-6">
        <h2 className="text-xl font-semibold">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Timetable Name
            </label>
            <input
              placeholder="e.g. DSA + System Design Prep"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Number of Preparation Days
            </label>
            <input
              type="number"
              min={1}
              value={totalDays}
              onChange={(e) => setTotalDays(Number(e.target.value))}
              className="w-full px-4 py-3 border rounded-xl"
            />
            <p className="text-xs text-gray-500 mt-1">
              Each day represents one preparation session (Day 1, Day 2, …)
            </p>
          </div>
        </div>

        <button
          onClick={initDays}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold"
        >
          Generate Day Structure
        </button>

        {totalDays > 0 && (
          <div className="text-sm text-gray-600">
            📅 This will create{" "}
            <span className="font-medium">Day 1 to Day {totalDays}</span> for
            your preparation plan.
          </div>
        )}
      </div>

      {daysInfo.map((day, dIdx) => (
        <div
          key={day.dayNumber}
          className="bg-white rounded-2xl shadow p-6 space-y-6"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            📅 Day {day.dayNumber}
            <span className="text-sm text-gray-500 font-normal">
              (Preparation Day)
            </span>
          </h2>

          {day.slotsInfo.map((slot, sIdx) => (
            <div
              key={sIdx}
              className={`border rounded-xl p-5 space-y-4 ${
                errorDayIndex === dIdx && errorSlotIndex === sIdx
                  ? "border-red-400 bg-red-50"
                  : "bg-gray-50"
              }`}
            >
              {errorDayIndex === dIdx && errorSlotIndex === sIdx && (
                <div className="text-sm text-red-700 bg-red-100 border border-red-200 p-2 rounded">
                  {error}
                </div>
              )}

              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Slot {sIdx + 1}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) =>
                    setSlotField(dIdx, sIdx, "startTime", e.target.value)
                  }
                  className="px-4 py-3 border rounded-xl"
                />
                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) =>
                    setSlotField(dIdx, sIdx, "endTime", e.target.value)
                  }
                  className="px-4 py-3 border rounded-xl"
                />
              </div>

              <div className="text-sm text-gray-600">
                ⏰{" "}
                {slot.startTime && slot.endTime
                  ? `${formatTime(slot.startTime)} → ${formatTime(
                      slot.endTime,
                    )}`
                  : "Select start and end time (AM / PM)"}
              </div>

              <input
                placeholder="Subject (e.g. Arrays & Strings)"
                onChange={(e) =>
                  setSlotField(dIdx, sIdx, "subjectName", e.target.value)
                }
                className="w-full px-4 py-3 border rounded-xl"
              />

              <textarea
                placeholder="Topics (comma or new line separated)"
                onChange={(e) =>
                  setSlotField(dIdx, sIdx, "topics", e.target.value)
                }
                className="w-full px-4 py-3 border rounded-xl"
                rows={2}
              />
            </div>
          ))}

          <button
            onClick={() => addSlot(dIdx)}
            className="text-indigo-600 font-medium"
          >
            + Add another slot
          </button>
        </div>
      ))}

      {daysInfo.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={submit}
            className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold"
          >
            Create New Time-Table
          </button>
        </div>
      )}
    </div>
  );
}
