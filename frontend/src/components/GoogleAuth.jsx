// src/components/GoogleAuth.jsx
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { googleLogin } from "../services/api";

const GoogleAuth = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      // Send the credential (Google ID token) to the backend
      const response = await googleLogin(credential);
      if (response.success) {
        console.log("Login successful:", response.data);
        // Perform any post-login actions (e.g., saving token, redirecting)
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleError = () => {
    console.error("Google Login failed");
  };

  return (
    <GoogleOAuthProvider clientId="427914236244-vqjda24o5f814gf3aaj0vcpgl5pcb51q.apps.googleusercontent.com">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
