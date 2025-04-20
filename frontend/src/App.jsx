import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import PrivateRoute from "./components/PrivateRoute";
import Page from "./pages/Page";
import { useEffect, useState } from "react";
import "./App.css";

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
    <div className="min-h-screen font-sans text-gray-900">
      <Router>
        <Routes>
          {/* Landing page as the default route */}
          <Route path="/" element={<Landing />} />

          {/* Login route - redirect to dashboard if already authenticated */}
          <Route
            path="/login"
            element={token ? <Navigate to="/dashboard" replace /> : <Login />}
          />

          {/* Protected Dashboard route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute token={token}>
                <Page />
              </PrivateRoute>
            }
          />

          {/* Catch-all route - redirect to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
