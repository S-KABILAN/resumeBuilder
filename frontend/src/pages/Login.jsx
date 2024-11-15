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
    <div>
      <h1>Login</h1>
      <GoogleAuth onAuthSuccess={handleAuthSuccess} />
    </div>
  );
};

export default LoginPage;
