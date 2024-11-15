import axiosInstance from "../api";

export const resumeCreate = async (fromData) => {
  try {
    const response = await axiosInstance.post("/resume/r", fromData);
    return response;
  } catch (error) {
    throw error || { message: "Resume created successfully" };
  }
};

export const updateResume = async (resumeId, resumeData) => {
  return await axiosInstance.put(`/resume/r/${resumeId}`, resumeData); // Adjust the URL as needed
};

// src/services/routes/resume.js
export const getAllResumes = async (userId) => {
  try {
    const response = await axiosInstance.get(`/resume/r/?userId=${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    // Log the response for debugging
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);

    if (response.status !== 200) {
      throw new Error("Failed to fetch resumes");
    }

    return response.data; // Assuming resumes are in response.data
  } catch (error) {
    console.error(
      "Error fetching resumes:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch resumes");
  }
};

export const deleteResume = async (resumeId) => {
  try {
    await axiosInstance.delete(`/resume/r/${resumeId}`);
    console.log("Resume deleted successfully");
  } catch (error) {
    console.error("Error deleting resume:", error.message || error);
    throw error; // Rethrow the error to handle it in the component
  }
};
