import axiosInstance from "../api";


export const skillCreate = async (formData) => {
    try {
        const response = await axiosInstance.post("/resume/skill",formData);
        return response
    } catch (error) {
        throw error || {message: "Skill submission failed"};
    }
}