// src/components/GoogleAuth.jsx
import { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { googleLogin } from "../services/authService";
import PropTypes from "prop-types";
import { FaGoogle } from "react-icons/fa";

const GoogleAuth = ({ onAuthSuccess }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSuccess = async (credentialResponse) => {
    try {
      setError(null);
      setLoading(true);

      // Log the credential response structure
      console.log(
        "Google credential response received:",
        credentialResponse?.credential ? "Has credential" : "No credential"
      );

      if (!credentialResponse?.credential) {
        setError("Google authentication failed. Missing credentials.");
        setLoading(false);
        return;
      }

      const { credential } = credentialResponse;
      const response = await googleLogin(credential);

      if (response.success) {
        console.log("Google login successful");
        // Call the success handler to update the parent component's state
        onAuthSuccess();
      } else {
        console.error("Google login failed:", response.message);
        setError(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Google login failed:", error.message);
      setError(error.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleError = (errorResponse) => {
    console.error("Google Login failed:", errorResponse);
    setError("Google authentication failed. Please try again.");
    setLoading(false);
  };

  // Custom Google button (as fallback if the Google button doesn't render)
  const CustomGoogleButton = ({ onClick }) => (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {loading ? (
        <span>Processing...</span>
      ) : (
        <>
          <FaGoogle className="text-red-500 mr-2" />
          <span>Continue with Google</span>
        </>
      )}
    </button>
  );

  CustomGoogleButton.propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  return (
    <div className="w-full">
      <GoogleOAuthProvider clientId="427914236244-vqjda24o5f814gf3aaj0vcpgl5pcb51q.apps.googleusercontent.com">
        <div className="flex flex-col justify-center w-full">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
            theme="filled_blue"
            shape="pill"
            text="continue_with"
            logo_alignment="center"
            width="100%"
            disabled={loading}
          />

          {error && (
            <div className="mt-2 text-center text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
              {error}
            </div>
          )}
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

GoogleAuth.propTypes = {
  onAuthSuccess: PropTypes.func.isRequired,
};

export default GoogleAuth;
