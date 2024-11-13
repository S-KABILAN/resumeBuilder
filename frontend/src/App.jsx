import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Page from "./pages/Page";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));

  // Update token state if it changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("jwtToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Base route: Redirects based on authentication status */}
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute token={token}>
              <Page />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
