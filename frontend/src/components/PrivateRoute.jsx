import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isAuthenticated, getUserId } from "../utils/userUtils";

const PrivateRoute = ({ children, token }) => {
  // Use our utility function for a more robust check
  const authenticated = isAuthenticated();

  // Additional verification that user ID exists
  const userId = getUserId();

  // Only allow access if both token and userId are valid
  if (!authenticated || !userId) {
    console.warn(
      "Authentication failed in PrivateRoute: ",
      !authenticated ? "No valid token" : "No valid user ID"
    );
    return <Navigate to="/login" />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  token: PropTypes.string, // optional token prop
};

export default PrivateRoute;
