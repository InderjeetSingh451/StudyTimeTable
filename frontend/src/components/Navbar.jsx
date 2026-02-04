import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="border-2 border-black px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link
        to="/"
        className="border-2 border-black px-6 py-2 text-lg font-semibold"
      >
        Logo
      </Link>

      {user && (
        <div className="flex items-center gap-4">
          {/* Avatar Circle */}
          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold uppercase">
            {user.name?.[0]}
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="border-2 border-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
