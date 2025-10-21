import React from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";

export default function Mainpage() {
  const navigate = useNavigate();
  const token = getToken();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <h1 className="text-5xl font-extrabold mb-8 tracking-wide">
        Welcome to <span className="text-indigo-400">CipherStudio</span>
      </h1>
      <p className="text-lg mb-12 text-gray-300">
        Build, Code, and Create directly in your browser ✨
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-indigo-600 hover:bg-indigo-700 py-6 px-12 rounded-2xl shadow-lg font-semibold text-xl transition transform hover:scale-105"
      >
        Open Studio
      </button>

      {!token && (
        <p className="mt-8 text-sm text-gray-400">
          You are not logged in.{" "}
          <button
            className="text-indigo-400 hover:underline"
            onClick={() => navigate("/login")}
          >
            Login here
          </button>
        </p>
      )}
    </div>
  );
}

