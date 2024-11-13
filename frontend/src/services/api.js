// src/services/api.js
import axios from "axios";

// Create an Axios instance with a base URL
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// Utility function to get the token from localStorage or from anywhere you're storing it
const getAuthToken = () => {
  // Example: return localStorage.getItem("authToken");
  return localStorage.getItem("authToken") || ""; // Replace with your logic
};

// Google login request with token
export const googleLogin = async (token) => {
  try {
    const response = await API.post(
      "/auth/google",
      { token },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Add the token to the header
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred" };
  }
};

// Personal Info submission with form data
export const PersonalInfoSubmit = async (formData) => {
  try {
    const response = await API.post("/resume/personal", formData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Add the token to the header
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Personal submission failed" };
  }
};
