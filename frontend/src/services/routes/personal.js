import axiosInstance from "../api"; // Ensure you have the correct import for your axios instance

export const googleLogin = async (token) => {
  try {
    const response = await axiosInstance.post("/auth/google", { token });

    // Check if the response indicates success
    if (response.data.success) {
      const {
        token: jwtToken,
        data: { user },
      } = response.data; // Destructure the response

      // Store the JWT token in local storage
      localStorage.setItem("jwtToken", jwtToken);

      // Store the user object in local storage
      localStorage.setItem("user", JSON.stringify(user));

      console.log("User  data stored in local storage:", user);

      return { success: true, user }; // Return user data if needed
    } else {
      console.error("Login failed:", response.data.message);
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error(
      "Google login error:",
      error.response?.data?.message || error.message
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An error occurred during Google login",
    };
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
