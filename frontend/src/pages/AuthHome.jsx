import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AuthHome() {
  const { user } = useContext(AuthContext);
  const firstName = user?.name?.split(" ")[0] || "User";

  return (
    <div className="bg-white">
      <section className="relative bg-gradient-to-br from-indigo-700 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
            Welcome back, <span className="text-blue-200">{firstName}</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-12 leading-relaxed">
            A structured way to plan, execute, and track your interview
            preparation — day by day, slot by slot.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/app/dashboards"
              className="px-8 py-4 rounded-xl bg-white text-indigo-700 font-semibold text-lg
                   shadow-lg hover:shadow-xl hover:bg-gray-100 transition"
            >
              My Time-Tables
            </Link>

            <Link
              to="/app/dashboards/create"
              className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur
                   border border-white/30 text-white font-semibold text-lg
                   hover:bg-white/20 transition"
            >
              Create New Time-Table
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold text-indigo-900 mb-4 tracking-tight">
              About this workspace
            </h2>

            <p className="text-gray-700 leading-relaxed text-lg">
              Interview preparation usually fails not due to lack of ability,
              but because of poor planning and inconsistency.
              <br />
              <br />
              This workspace helps you break preparation into focused daily
              tasks, track progress automatically, and stay consistent until
              completion.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-14 tracking-tight">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 hover:shadow-lg transition">
              <div className="text-indigo-700 font-bold text-sm mb-3">
                STEP 1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-indigo-900">
                Create a Time-Table
              </h3>
              <p className="text-indigo-900/80 leading-relaxed">
                Decide how many days you want to prepare and structure each day
                with focused time slots.
              </p>
            </div>

            <div className="rounded-2xl p-8 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-lg transition">
              <div className="text-blue-700 font-bold text-sm mb-3">STEP 2</div>
              <h3 className="text-xl font-semibold mb-3 text-blue-900">
                Complete daily slots
              </h3>
              <p className="text-blue-900/80 leading-relaxed">
                Work through each slot and mark it complete. Your progress is
                tracked automatically.
              </p>
            </div>

            <div className="rounded-2xl p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 hover:shadow-lg transition">
              <div className="text-emerald-700 font-bold text-sm mb-3">
                STEP 3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-emerald-900">
                Unlock the next day
              </h3>
              <p className="text-emerald-900/80 leading-relaxed">
                The next day unlocks only after completing the current one,
                enforcing discipline and consistency.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
