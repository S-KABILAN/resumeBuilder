import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleAuth = () => {
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    // Redirect or process login
    window.location.href =
      "https://resume-builder-client1.vercel.app/auth/google/callback";
  };

  const handleGoogleLoginError = () => {
    console.error("Login Failed");
    alert("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId="427914236244-vqjda24o5f814gf3aaj0vcpgl5pcb51q.apps.googleusercontent.com">
      <div>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
