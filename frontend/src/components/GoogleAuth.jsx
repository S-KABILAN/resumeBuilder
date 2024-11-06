import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleAuth = () => {
  const [userName, setUserName] = useState("");

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      // Send the credential to the backend for verification
      const response = await axios.post(
        "https://resume-builder-ashy-two.vercel.app/auth/google/callback", // Your backend endpoint
        { idToken: credentialResponse.credential } // Send the idToken
      );

      const { user } = response.data; // Assuming your backend sends back user details
      setUserName(user.name); // Set the user's name to display
    } catch (error) {
      console.error("Login Failed", error);
      alert("Google login failed. Please try again.");
    }
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
        {userName && <h2>Welcome, {userName}!</h2>}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
