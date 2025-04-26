// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import Login from "../assets/login.jpg";
import { login, register } from "../services/authService";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isLogin && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Name validation for registration
    if (!isLogin && !formData.name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Login with email/password
        const response = await login({
          email: formData.email,
          password: formData.password,
        });
        if (response.success) {
          navigate("/dashboard");
        } else if (response.message) {
          setError(response.message);
        }
      } else {
        // Register new user
        const response = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        if (response.success) {
          navigate("/dashboard");
        } else if (response.message) {
          setError(response.message);
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError(error.message || "An error occurred during authentication");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    console.log("User authenticated successfully!");
    navigate("/dashboard"); // Redirect to the dashboard
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center">
        <a
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Resume Builder
        </a>
      </header>

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-5xl h-[540px] mx-4 rounded-xl overflow-hidden shadow-xl bg-white flex">
          {/* Left Image Section - Hidden on smaller screens */}
          <div className="hidden md:block w-5/12 relative bg-gradient-to-br from-indigo-600 to-purple-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={Login}
                alt="Login"
                className="w-full h-full object-cover opacity-75"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-t from-indigo-900/70 to-transparent">
              <div></div>
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">
                  Professional Resume Builder
                </h2>
                <p className="text-indigo-100 text-sm">
                  Design, customize, and download your perfect resume in minutes
                </p>
              </div>
            </div>
          </div>

          {/* Right Content Section */}
          <div className="w-full md:w-7/12 p-6 flex items-center">
            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-5">
                <h2 className="text-2xl font-bold text-gray-800">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {isLogin
                    ? "Sign in to continue to your dashboard"
                    : "Sign up to start building your resume"}
                </p>
              </div>

              {/* Auth Tabs */}
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 text-sm font-medium ${
                    isLogin
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 text-sm font-medium ${
                    !isLogin
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {!isLogin && (
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required={!isLogin}
                        className={`py-2 pl-10 pr-3 block w-full rounded-lg border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Full Name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                )}

                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`py-2 pl-10 pr-3 block w-full rounded-lg border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="Email Address"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className={`py-2 pl-10 pr-10 block w-full rounded-lg border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="Password"
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FaEye className="text-gray-400 hover:text-gray-600" />
                      )}
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {error && (
                  <div className="text-red-500 text-xs font-medium p-2 bg-red-50 rounded border border-red-200">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    "Processing..."
                  ) : (
                    <>
                      {isLogin ? "Sign In" : "Create Account"}
                      <FaArrowRight className="ml-2" />
                    </>
                  )}
                </button>

                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google Auth Button */}
                <div className="flex justify-center">
                  <GoogleAuth onAuthSuccess={handleAuthSuccess} />
                </div>

                <div className="text-center mt-4 text-xs text-gray-500">
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-indigo-600 hover:underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-indigo-600 hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Reduced size */}
      <footer className="py-2 px-6 text-center text-xs text-gray-500">
        <p className="mb-1">
          © {new Date().getFullYear()} Resume Builder. All rights reserved.
        </p>
        <p className="flex items-center justify-center">
          Made with <span className="text-red-500 mx-1">❤️</span> by Kabilan S
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
