// src/pages/LoginPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import Login from '../assets/login.jpg'

const LoginPage = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    console.log("User  authenticated successfully!");
    navigate("/dashboard"); // Redirect to the dashboard
  };

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Product Name */}
      <div className="absolute top-4 right-6 text-lg font-semibold text-indigo-600">
        Resume Builder
      </div>

      {/* Left Image Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
        <img
          src={Login}
          alt="Login"
          className="max-w-full h-auto md:w-[80%] rounded-lg shadow-lg"
        />
      </div>

      {/* Right Content Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-center text-4xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-center text-sm text-gray-600">
            Please sign in to your account
          </p>

          {/* Google Auth Section */}
          <div className="mt-6 flex justify-center">
            <GoogleAuth onAuthSuccess={handleAuthSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
