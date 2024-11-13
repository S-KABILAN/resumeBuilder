
import axiosInstance from "../api";

export const experienceCreate = async (formData) => {
  try {
    const response = await axiosInstance.post("/resume/experience", formData);
    return response;
  } catch (error) {
    throw error || { message: "Education creation failed" };
  }
};