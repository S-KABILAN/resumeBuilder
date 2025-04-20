import axios from "axios";
import { storeUserData, clearUserData } from "../utils/userUtils";

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
      // Ensure the user object has the required fields
      const user = response.data.data.user;
      if (!user || !user._id) {
        console.error("Registration succeeded but user data is invalid");
        throw new Error("Invalid user data received from server");
      }

      // Store user data and token
      storeUserData(user, response.data.token);
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
      // Ensure the user object has the required fields
      const user = response.data.data.user;
      if (!user || !user._id) {
        console.error("Login succeeded but user data is invalid");
        throw new Error("Invalid user data received from server");
      }

      // Store user data and token
      storeUserData(user, response.data.token);
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
    console.log(
      "Google credential received:",
      credential ? "Valid credential" : "Missing credential"
    );

    const response = await api.post("/auth/google", { token: credential });

    // Log the entire response structure for debugging
    console.log("Google login raw response:", {
      status: response.status,
      statusText: response.statusText,
      hasData: !!response.data,
      success: response.data?.success,
      hasToken: !!response.data?.token,
      dataStructure: JSON.stringify(response.data),
    });

    if (response.data.success) {
      // Check response data structure
      if (!response.data.data) {
        console.error(
          "Google login response missing 'data' field:",
          response.data
        );
        throw new Error("Invalid server response format");
      }

      // For Google login, the user might be directly in response.data or in response.data.data.user
      // Try to handle both cases
      let user = null;

      if (response.data.data.user) {
        user = response.data.data.user;
        console.log("Found user in response.data.data.user");
      } else if (response.data.data._id) {
        user = response.data.data; // The user object might be directly in data
        console.log("Found user in response.data.data");
      } else if (response.data.user) {
        user = response.data.user; // Or it might be in response.data.user
        console.log("Found user in response.data.user");
      }

      // Log what user data we found
      console.log(
        "User data found:",
        user ? "User object found" : "No user object found"
      );

      if (!user) {
        console.error(
          "Google login succeeded but no user data found in response"
        );
        console.error(
          "Response structure:",
          JSON.stringify(response.data, null, 2)
        );
        throw new Error("Invalid user data received from server");
      }

      // Convert id to _id if needed
      if (user.id && !user._id) {
        user._id = user.id;
        console.log("Converted id to _id for consistency");
      }

      // Check if we have a valid ID
      if (!user._id) {
        console.error(
          "Google login succeeded but user data is missing ID field"
        );
        console.error("User data:", user);
        throw new Error("Invalid user data received from server");
      }

      // Store user data and token
      const success = storeUserData(user, response.data.token);
      if (!success) {
        throw new Error("Failed to store user data");
      }
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
  // Clear user data and token
  clearUserData();
  // Force reload to reset application state
  window.location.href = "/login";
};

// Import these directly from userUtils.js instead
export { isAuthenticated, getCurrentUser } from "../utils/userUtils";
