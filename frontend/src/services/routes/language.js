import API from "../api";

// Create languages (Create or update language records)
export const languageCreate = async (languages) => {
  try {
    const response = await API.post("/api/languages", { languages });
    return response.data;
  } catch (error) {
    console.error("Error creating languages:", error.response?.data || error.message);
    throw error;
  }
}; 