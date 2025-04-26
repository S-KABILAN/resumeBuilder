import axios from "axios";

// Determine the base URL based on environment
const baseURL = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/api`
  : "http://localhost:5000/api";

// Create axios instance
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      // Ensure there's a properly formatted Bearer token
      config.headers.Authorization = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;

      // For debugging purposes
      console.log("Request sent with auth token", {
        url: config.url,
        method: config.method,
        hasToken: !!token,
      });
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error Response:", error);

    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized: Token may be invalid or expired");
      // Additional auth error handling could be added here
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
