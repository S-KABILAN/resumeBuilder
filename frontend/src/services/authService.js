import axios from "axios";

// Determine API URL with fallbacks
let API_BASE_URL;
let API_URL;

// Fallback approach if import.meta.env is undefined or empty
try {
  // Try to get from Vite environment variables
  API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  API_URL = import.meta.env.VITE_API_URL;

  // If not set properly, determine dynamically
  if (!API_BASE_URL) {
    // In production, assume API is on same domain as the frontend
    // In development, use localhost
    if (window.location.hostname !== "localhost") {
      API_BASE_URL = `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ""
      }`;
    } else {
      API_BASE_URL = "http://localhost:5000";
    }
  }

  if (!API_URL) {
    API_URL = `${API_BASE_URL}/api`;
  }
} catch (error) {
  // Default fallback if import.meta.env is not available
  API_BASE_URL = "http://localhost:5000";
  API_URL = `${API_BASE_URL}/api`;
}

// Log the API URL for debugging (remove in production)
console.log("API Base URL:", API_BASE_URL);
console.log("API URL:", API_URL);

// Create an instance of axios with the base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add authentication token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Register new user with email/password
export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    if (response.data.success) {
      localStorage.setItem("jwtToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    const message =
      error.response?.data?.message || "Registration failed. Please try again.";
    throw new Error(message);
  }
};

// Login with email/password
export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    if (response.data.success) {
      localStorage.setItem("jwtToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    const message =
      error.response?.data?.message || "Login failed. Please try again.";
    throw new Error(message);
  }
};

// Google login (re-using existing functionality)
export const googleLogin = async (credential) => {
  try {
    const response = await api.post("/auth/google", { token: credential });
    if (response.data.success) {
      localStorage.setItem("jwtToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  } catch (error) {
    console.error("Google login error:", error);
    const message =
      error.response?.data?.message || "Google login failed. Please try again.";
    throw new Error(message);
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
  // Force reload to reset application state
  window.location.href = "/login";
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("jwtToken");
};

// Get current user details
export const getCurrentUser = () => {
  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
};
