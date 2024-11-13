// src/pages/Login.jsx
import GoogleAuth from "../components/GoogleAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setLoading(true);
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleAuthSuccess = (token) => {
    // Save token to localStorage and navigate to dashboard
    localStorage.setItem("jwtToken", token);
    setLoading(true);
    navigate("/dashboard");
  };

  return (
    <div>
      <h2 className="text-red-500 text-center text-4xl">Login with Google</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <GoogleAuth onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default Login;
