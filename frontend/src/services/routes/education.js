import axiosInstance from "../api";

export const educationCreate = async (formData) => {
    try {
        const response = await axiosInstance.post("/resume/education",formData);
        return response;
    } catch (error) {
        throw error || {message: "Education creation failed"}
    }
}   