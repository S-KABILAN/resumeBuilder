import axiosInstance from "../api";
import {
  getUserId,
  getAuthToken,
  isAuthenticated,
} from "../../utils/userUtils";

// Create a new resume
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

    return response.data;
  } catch (error) {
    console.error("Error creating resume:", error);
    throw error || { message: "Failed to create resume" };
  }
};

// Update an existing resume
export const updateResume = async (resumeId, formData) => {
  try {
    const token = getAuthToken();

    if (!isAuthenticated()) {
      throw new Error("Authentication required. Please log in again.");
    }

    if (!resumeId) {
      throw new Error("Resume ID is missing. Cannot update resume.");
    }

    const response = await axiosInstance.put(
      `/resume/r/${resumeId}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating resume:", error);
    throw error || { message: "Failed to update resume" };
  }
};

// Get all resumes for the authenticated user
export const getAllResumes = async () => {
  try {
    const token = getAuthToken();

    if (!isAuthenticated()) {
      throw new Error("Authentication required. Please log in again.");
    }

    const response = await axiosInstance.get(`/resume/r`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error("Invalid response from server");
    }

    return response.data; // This should be { success: true, data: [...resumes] }
  } catch (error) {
    console.error("Error fetching resumes:", error);
    throw error || { message: "Failed to fetch resumes" };
  }
};

// Delete a resume
export const deleteResume = async (resumeId) => {
  try {
    const token = getAuthToken();

    if (!isAuthenticated()) {
      throw new Error("Authentication required. Please log in again.");
    }

    if (!resumeId) {
      throw new Error("Resume ID is missing. Cannot delete resume.");
    }

    const response = await axiosInstance.delete(`/resume/r/${resumeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting resume:", error);
    throw error || { message: "Failed to delete resume" };
  }
};
