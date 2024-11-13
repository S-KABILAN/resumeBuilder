import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children, token }) => {
  const isAuthenticated = token || localStorage.getItem("jwtToken"); // Fallback to localStorage

  return isAuthenticated ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  token: PropTypes.string, // optional token prop
};

export default PrivateRoute;
