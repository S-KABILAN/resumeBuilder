import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { googleLogin } from "../services/routes/personal";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const GoogleAuth = ({ onAuthSuccess }) => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      // Send the Google token to the backend for authentication
      const response = await googleLogin(credential);

      // Log the response to debug
      console.log("Login Response:", response);

      if (response.data && response.data.success) {
        // Save token and user details to local storage
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to dashboard after successful login
        onAuthSuccess(); // Optional: If you need to trigger an external handler
        navigate("/dashboard"); // This triggers the redirect without needing a manual refresh
      } else {
        console.error("Login response was not successful:", response);
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
