import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white/90 backdrop-blur shadow-sm px-6 py-4 flex justify-between items-center border-b">
      <Link
        to="/"
        className="text-2xl font-extrabold tracking-tight flex items-center hover:opacity-90 transition"
      >
        <span className="text-indigo-900">Study</span>
        <span className="text-indigo-500 ml-1">Planner</span>
      </Link>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
            {user.name}
          </span>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold
                       hover:bg-red-600 active:scale-95 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
