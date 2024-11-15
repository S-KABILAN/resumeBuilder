import axiosInstance from "../api";

export const resumeCreate = async(fromData) => {
    try {
        const response = await axiosInstance.post("/resume/r",fromData);
        return response;
    } catch (error) {
        throw error || {message: "Resume created successfully"}  
    }
}

export const updateResume = async (resumeId, resumeData) => {
  return await axiosInstance.put(`/resume/r/${resumeId}`, resumeData); // Adjust the URL as needed
};



// Function to get all resumes
export const getAllResumes = async () => {
  try {
    const response = await axiosInstance.get("/resume/r"); // Adjust the URL as needed
    return response.data; // Return the response data containing all resumes
  } catch (error) {
    // Handle error appropriately
    throw error.response
      ? error.response.data
      : { message: "Error fetching resumes" };
  }
};