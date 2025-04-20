import axiosInstance from "../api";
import {
  getUserId,
  getAuthToken,
  isAuthenticated,
} from "../../utils/userUtils";

export const resumeCreate = async (formData) => {
  try {
    // Get user ID and token using utility functions
    const userId = getUserId();
    const token = getAuthToken();

    // Check if user is authenticated
    if (!isAuthenticated()) {
      throw new Error("Authentication required. Please log in again.");
    }

    if (!userId) {
      throw new Error("User ID is missing. Please log in again.");
    }

    // Add userId to the request data
    const dataWithUserId = {
      ...formData,
      userId: userId,
    };

    // Make the API call with proper headers
    const response = await axiosInstance.post("/resume/r", dataWithUserId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Resume create response:", response);
    return response;
  } catch (error) {
    console.error("Error creating resume:", error);
    throw error || { message: "Failed to create resume" };
  }
};

export const updateResume = async (resumeId, resumeData) => {
  try {
    // Get user ID and token using utility functions
    const userId = getUserId();
    const token = getAuthToken();

    // Check if user is authenticated
    if (!isAuthenticated()) {
      throw new Error("Authentication required. Please log in again.");
    }

    if (!userId) {
      throw new Error("User ID is missing. Please log in again.");
    }

    // Add userId to the request data
    const dataWithUserId = {
      ...resumeData,
      userId: userId,
    };

    const response = await axiosInstance.put(
      `/resume/r/${resumeId}`,
      dataWithUserId,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Resume update response:", response);
    return response;
  } catch (error) {
    console.error("Error updating resume:", error);
    throw error || { message: "Failed to update resume" };
  }
};

// src/services/routes/resume.js
export const getAllResumes = async () => {
  try {
    // Get user ID and token using utility functions
    const userId = getUserId();
    const token = getAuthToken();

    // Check if user is authenticated
    if (!isAuthenticated()) {
      throw new Error("Authentication required. Please log in again.");
    }

    if (!userId) {
      throw new Error("User ID is missing. Please log in again.");
    }

    const response = await axiosInstance.get(`/resume/r/?userId=${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Log the response for debugging
    console.log("Get resumes response status:", response.status);
    console.log("Get resumes response data:", response.data);

    if (response.status !== 200) {
      throw new Error("Failed to fetch resumes");
    }

    return response.data; // Assuming resumes are in response.data
  } catch (error) {
    console.error(
      "Error fetching resumes:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const deleteResume = async (resumeId) => {
  try {
    // Get token using utility function
    const token = getAuthToken();

    if (!resumeId) {
      throw new Error("Resume ID is missing");
    }

    if (!token) {
      throw new Error("Authentication required. Please log in again.");
    }

    const response = await axiosInstance.delete(`/resume/r/${resumeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Resume deleted successfully:", response);
    return response;
  } catch (error) {
    console.error("Error deleting resume:", error.message || error);
    throw error; // Rethrow the error to handle it in the component
  }
};
