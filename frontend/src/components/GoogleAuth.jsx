// src/components/GoogleAuth.jsx
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { googleLogin } from "../services/api";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const GoogleAuth = ({ onAuthSuccess }) => {
  const navigate = useNavigate();

  // src/components/GoogleAuth.jsx

  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const response = await googleLogin(credential);

      if (response.success) {
        console.log("Login successful:", response.data);
        // Save token and user details to local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user details
        // Redirect to dashboard
        onAuthSuccess();
        navigate("/dashboard");
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

GoogleAuth.propTypes = {
  onAuthSuccess: PropTypes.func.isRequired,
};


export default GoogleAuth;
