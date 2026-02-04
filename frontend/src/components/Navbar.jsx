import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link
        to="/"
        className="px-6 py-2 text-2xl font-extrabold tracking-tight flex items-center"
      >
        <span className="bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
          Study
        </span>
        <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent ml-1">
          Planner
        </span>
      </Link>

      {user && (
        <div className="flex items-center gap-4">
          {/* User Initial Circle */}
          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold uppercase">
            {user.name?.[0]}
          </div>
          <button
            onClick={logout}
            className="border border-red-300 px-4 py-2 text-sm font-medium text-red-600
             hover:bg-red-600 hover:text-white transition rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
