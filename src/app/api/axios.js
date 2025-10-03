import axios from "axios";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// ✅ Request interceptor → always grab token from localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ✅ Response interceptor
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response.status, "error response status");
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // call refresh endpoint
        const res = await axios.get("http://localhost:5000/api/user/refresh", {
          withCredentials: true,
        });
        // store new token in localStorage
        localStorage.setItem("accessToken", res.data.data.accessToken);

        // retry failed request with new token
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log(refreshError, "refresh error");
        toast.error("Session expired. Please log in again.");
        // localStorage.removeItem("accessToken");
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    let message = "Something went wrong.";
    if (Array.isArray(error.response?.data?.message)) {
      message = error.response.data.message[0]?.message || message;
    } else if (typeof error.response?.data?.message === "string") {
      message = error.response.data.message;
    }
    toast.error(message);

    return Promise.reject(error);
  }
);

export default api;
