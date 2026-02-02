import React, { createContext, useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  //  Restore auth on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setAuthLoading(false);
  }, []);

  //  Login
  const login = async (payload) => {
    const res = await API.post("/auth/login", payload);
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);

    navigate("/app");
  };

  //  Signup
  const signup = async (payload) => {
    return API.post("/auth/signup", payload);
  };

  //  Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
