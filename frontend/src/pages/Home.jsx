import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";
export default function Home() {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) return null;
  if (user) return <Navigate to="/app" replace />;

  return (
    <div className="bg-white w-full">
      <Helmet>
        <title>Time Table Maker & Study Plan Maker for Students</title>
        <meta
          name="description"
          content="Create a daily study timetable using our free time table maker. Plan your study routine, track progress, and stay consistent."
        />
      </Helmet>
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white w-full">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Free Time Table Maker & Study Plan Maker
            <br />
            Create Daily Study Schedules & Track Progress
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl mb-10">
            Plan your daily study routine day by day, track your progress
            automatically, and unlock the next day only after completing today’s
            schedule.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/login"
              className="px-8 py-4 rounded-xl bg-white text-blue-700 font-semibold text-lg hover:bg-gray-100 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-8 py-4 rounded-xl bg-black/20 border border-white/30 text-white font-semibold text-lg hover:bg-black/30 transition"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
      <p className="sr-only">
        Study Planner is a free time table maker and study plan maker for
        students preparing for exams. Create daily timetables, organize
        subjects, track progress, and stay consistent.
      </p>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Study Planner exists
          </h2>

          <p className="text-gray-700 max-w-3xl leading-relaxed">
            Most study plans fail because of poor structure and lack of
            consistency. Study Planner helps you convert vague goals into clear
            daily routines, so you always know what to study and when.
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
                Define how many days you want to prepare and create focused time
                slots for each day.
              </p>
            </div>

            <div className="border rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-3">
                2. Follow your daily routine
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Mark slots as completed as you finish them. Your daily progress
                updates automatically.
              </p>
            </div>

            <div className="border rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-3">
                3. Progress day by day
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The next day unlocks only when the current day is fully
                completed, helping you stay disciplined and consistent.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
