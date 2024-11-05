import React from "react";

const GoogleAuth = () => {
  const handleGoogleLogin = () => {
    // Default to localhost if the environment variable is missing
    const baseUrl =
      process.env.REACT_APP_API_BASE_URL;
    window.location.href = `${baseUrl}/auth/google`;
  };

  return <button onClick={handleGoogleLogin}>Login with Google</button>;
};

export default GoogleAuth;
