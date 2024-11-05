import React from "react";

const GoogleAuth = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return <button onClick={handleGoogleLogin}>Login with Google</button>;
};

export default GoogleAuth;
