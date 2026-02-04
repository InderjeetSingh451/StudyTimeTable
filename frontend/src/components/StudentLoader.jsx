import React from "react";
import "../StudentLoader.css";
export default function StudentLoader({ text = "Preparing your study plan" }) {
  return (
    <div className="student-loader">
      <div className="student-wrapper">
        <div className="student">
          <span className="student-emoji">👨‍🎓</span>

          <div className="book">
            📘
            <span className="page page-1" />
            <span className="page page-2" />
          </div>
        </div>
      </div>

      <div className="loading-text">
        {text}
        <span className="dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>
    </div>
  );
}


