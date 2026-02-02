import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AuthHome() {
  const { user } = useContext(AuthContext);
  const firstName = user?.name?.split(" ")[0] || "User";

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Welcome back, {firstName}
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl mb-10">
            A structured way to plan, execute, and track your interview
            preparation — day by day, slot by slot.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/app/dashboards"
              className="px-8 py-4 rounded-xl bg-white text-blue-700 font-semibold text-lg hover:bg-gray-100 transition"
            >
              My Time-Tables
            </Link>

            <Link
              to="/app/dashboards/create"
              className="px-8 py-4 rounded-xl bg-black/20 border border-white/30 text-white font-semibold text-lg hover:bg-black/30 transition"
            >
              Create New Time-Table
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            About this workspace
          </h2>

          <p className="text-gray-700 max-w-3xl leading-relaxed">
            Interview preparation often fails not because of lack of knowledge,
            but because of poor planning and inconsistency. This application is
            designed to help you break preparation into manageable daily tasks,
            track progress automatically, and stay accountable to your plan.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="border rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-3">
                1. Create a Time-Table
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Define the number of days for your preparation and plan each day
                with focused time slots.
              </p>
            </div>

            <div className="border rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-3">
                2. Complete daily slots
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Mark slots as completed as you finish them. Day progress is
                calculated automatically.
              </p>
            </div>

            <div className="border rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-3">
                3. Unlock the next day
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The next day unlocks only when the previous day is fully
                completed, enforcing consistency.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
