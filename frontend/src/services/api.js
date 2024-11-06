// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const googleLogin = async (token) => {
  try {
    const response = await API.post("/auth/google", { token });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred" };
  }
};
