import React from "react";

const GoogleAuth = () => {
  const handleGoogleLogin = () => {
    // Default to localhost if the environment variable is missing
    const baseUrl = "http://localhost:5000";
    window.location.href = `${baseUrl}/auth/google`;
  };

  return <button onClick={handleGoogleLogin}>Login with Google</button>;
};

export default GoogleAuth;