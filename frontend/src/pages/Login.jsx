// src/pages/LoginPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    console.log("User  authenticated successfully!");
    navigate("/dashboard"); // Redirect to the dashboard
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md rounded-lg bg-white shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>
        <button
          onClick={handleAuthSuccess}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            className="h-5 w-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              d="M24 9.5c3.2 0 6.1 1.2 8.3 3.3l6.2-6.2C34.4 3.4 29.4 1.5 24 1.5 14.7 1.5 6.7 7.8 3.5 16.1l7.5 5.8C12.5 14 17.6 9.5 24 9.5z"
              fill="#fbbc04"
            />
            <path
              d="M24 46.5c6.1 0 11.6-2.3 15.8-6.1l-7.4-6.3c-2.3 1.7-5.3 2.7-8.5 2.7-6.5 0-12-4.6-13.9-10.7l-7.6 5.9C6.5 38.9 14.7 46.5 24 46.5z"
              fill="#34a853"
            />
            <path
              d="M46.5 24c0-1.4-.1-2.9-.4-4.2H24v8h12.7c-.6 3.2-2.4 5.9-4.9 7.8l7.4 6.3C43.2 38 46.5 31.5 46.5 24z"
              fill="#4285f4"
            />
            <path
              d="M3.5 16.1C2.5 18.7 2 21.3 2 24s.5 5.3 1.5 7.9l7.6-5.9c-.6-1.8-1-3.7-1-5.9 0-2 .4-4 1-5.9l-7.6-5.9z"
              fill="#ea4335"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
