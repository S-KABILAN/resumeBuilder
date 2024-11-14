
import axiosInstance from "../api";

export const experienceCreate = async (formData) => {
  try {
    const response = await axiosInstance.post("/resume/experience", formData, {
      headers: {
        "Content-Type": "application/json",
        // Include authentication token if needed
        // 'Authorization': `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error || { message: "Education creation failed" };
  }
};