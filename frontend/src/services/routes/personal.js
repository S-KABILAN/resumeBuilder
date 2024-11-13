import axiosInstance from "../api";

export const googleLogin = async (token) => {
  try {
    const response = await axiosInstance.post("/auth/google", { token });
    console.log("Token received from backend:", response.data.token); // Log the token received
    localStorage.setItem("jwtToken", response.data.token); // Store token in local storage
    return response;
  } catch (error) {
    console.error("Google login error:", error.message);
    throw error || { message: "An error occurred" };
  }
};

export const PersonalInfoSubmit = async (formData) => {
  try {
    const response = await axiosInstance.post("/resume/personal", formData, {
      headers: {
        "Content-Type": "application/json",
        // Include authentication token if needed
        // 'Authorization': `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error || { message: "Personal submission failed" };
  }
};
