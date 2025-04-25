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
import { isAuthenticated, getUserId } from "./utils/userUtils";
import { logAuthState, fixAuthStateIssues } from "./utils/debugUtils";
import "./App.css";
import "./styles/resume.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verify authentication state when app loads
  useEffect(() => {
    // Log current authentication state
    logAuthState();

    // Try to fix common auth state issues
    const fixesApplied = fixAuthStateIssues();

    // If fixes were applied, check auth state again
    if (fixesApplied) {
      console.log("Auth state fixes applied, rechecking...");
      logAuthState();
      setToken(localStorage.getItem("jwtToken"));
    }

    setAuthChecked(true);

    // Simulate loading time for smoother transitions
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Update token state if it changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("jwtToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // If auth check hasn't completed yet, show loading spinner
  if (!authChecked || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-indigo-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700 font-medium">
            Loading Resume Builder...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-gray-50">
      <Router>
        <Routes>
          {/* Landing page as the default route */}
          <Route path="/" element={<Landing />} />

          {/* Login route - redirect to dashboard if already authenticated */}
          <Route
            path="/login"
            element={
              isAuthenticated() && getUserId() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login />
              )
            }
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
