import axiosInstance from "../api";


export const projectCreate = async (formData) => {
    try {
        const response = await axiosInstance.post("/resume/project",formData);
        return response
    } catch (error) {
        throw error || {message: "Project create failed"}
    }
}