import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        <span className="text-gray-900">Study</span>{" "}
        <span className="text-blue-600">Planner</span>
      </Link>

      {user && (
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
