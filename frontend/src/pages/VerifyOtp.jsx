import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/auth/verify-email-otp", {
        email,
        otp: otp.join(""),
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Invalid access
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">OTP Verification</h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter the code sent to your email
        </p>

        <form onSubmit={submit}>
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                type="text"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleBackspace(e, idx)}
                className="
                  w-12 h-14
                  text-xl text-center
                  border rounded-lg
                  focus:outline-none
                  focus:ring-2 focus:ring-orange-400
                "
              />
            ))}
          </div>
          {error && <div className="text-sm text-red-600 mb-4">{error}</div>}
          <button
            type="submit"
            disabled={otp.join("").length !== 6 || loading}
            className="
              w-full py-3
              rounded-full
              bg-gradient-to-r from-pink-500 to-orange-500
              text-white font-medium
              hover:opacity-90
              transition
              disabled:opacity-50
            "
          >
            {loading ? "Verifying..." : "Continue"}
          </button>
        </form>
        <div className="mt-6 text-xs text-gray-400">© 2026 Study Planner</div>
      </div>
    </div>
  );
}
