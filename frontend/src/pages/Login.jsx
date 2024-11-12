// src/pages/Login.jsx
import GoogleAuth from "../components/GoogleAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Login with Google
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        ) : (
          <GoogleAuth
            onAuthSuccess={() => navigate("/dashboard")}
            className="w-full mt-4"
          />
        )}
      </div>
    </div>
  );
}

export default Login;
