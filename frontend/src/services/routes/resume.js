import axiosInstance from "../api";

export const resumeCreate = async(fromData) => {
    try {
        const response = await axiosInstance.post("/resume/r",fromData);
        return response
    } catch (error) {
        throw error || {message: "Resume created successfully"}  
    }
}