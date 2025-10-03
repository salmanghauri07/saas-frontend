import axios from "axios";
import { toast } from "react-hot-toast";

let accessToken = null;

// helper to set token after login
export const setAccessToken = (token) => {
  accessToken = token;
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  }
};

// restore token on client-side when app loads
export const loadAccessToken = () => {
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }
};

const api = axios.create({
  baseURL: "http://localhost:5000/", // adjust if needed
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// ✅ Request interceptor → attach access token
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ✅ Response interceptor
api.interceptors.response.use(
  (response) => response, // pass through success
  async (error) => {
    let message = "Something went wrong. Please try again.";

    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh token API
        const { data } = await axios.post(
          "http://localhost:5000/api/user/refresh",
          {},
          { withCredentials: true } // cookie is sent automatically
        );

        // Update access token in memory
        accessToken = data.accessToken;

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed → force logout
        toast.error("Session expired. Please log in again.");
        accessToken = null;
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    if (Array.isArray(error.response?.data?.message)) {
      // Multiple validation errors → take first one, or join them
      message = error.response.data.message[0]?.message || message;
    } else if (typeof error.response?.data?.message === "string") {
      message = error.response.data.message;
    }

    // Show toast for error
    toast.error(message);

    return Promise.reject(error); // keep rejecting so caller can handle if needed
  }
);

export default api;
