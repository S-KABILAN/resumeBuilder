// src/components/GoogleAuth.jsx
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { googleLogin } from "../services/authService";
import PropTypes from "prop-types";
import { FaGoogle } from "react-icons/fa";

const GoogleAuth = ({ onAuthSuccess }) => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const response = await googleLogin(credential);

      if (response.success) {
        console.log("Google login successful");
        // Call the success handler to update the parent component's state
        onAuthSuccess();
      } else {
        console.error("Google login failed:", response.message);
      }
    } catch (error) {
      console.error("Google login failed:", error.message);
    }
  };

  const handleError = () => {
    console.error("Google Login failed");
  };

  // Custom Google button (as fallback if the Google button doesn't render)
  const CustomGoogleButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <FaGoogle className="text-red-500 mr-2" />
      <span>Continue with Google</span>
    </button>
  );

  CustomGoogleButton.propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  return (
    <div className="w-full">
      <GoogleOAuthProvider clientId="427914236244-vqjda24o5f814gf3aaj0vcpgl5pcb51q.apps.googleusercontent.com">
        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
            theme="filled_blue"
            shape="pill"
            text="continue_with"
            logo_alignment="center"
            width="100%"
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

GoogleAuth.propTypes = {
  onAuthSuccess: PropTypes.func.isRequired,
};

export default GoogleAuth;
