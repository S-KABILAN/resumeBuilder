// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
