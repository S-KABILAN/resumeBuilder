import axios from "axios";
import { API_BASE_URL } from "../config";

// Function to create achievements
export const achievementCreate = async (achievementData) => {
  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await axios.post(
      `${API_BASE_URL}/achievements`,
      { achievements: achievementData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error creating achievements:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create achievements",
    };
  }
};
