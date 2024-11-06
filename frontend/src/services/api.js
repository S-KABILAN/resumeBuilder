// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "resume-builder-ashy-two.vercel.app/api",
});

export const googleLogin = async (token) => {
  try {
    const response = await API.post("/auth/google-login", { token });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred" };
  }
};
