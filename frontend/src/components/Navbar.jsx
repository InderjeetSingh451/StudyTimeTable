import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link
  to="/"
  className="text-2xl font-extrabold tracking-tight flex items-center"
>
  <span className="text-indigo-900">Study</span>
  <span className="text-indigo-500 ml-0.5">Planner</span>
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

