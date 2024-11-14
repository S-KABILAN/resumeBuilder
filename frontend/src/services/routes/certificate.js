import axiosInstance from "../api";


export const certificateCreate = async (formData) => {
    try {
        const response = await axiosInstance.post("/resume/certificate",formData)
        return response;
    } catch (error) {
        throw error || {message: "Certificate created failed"};
    }
}