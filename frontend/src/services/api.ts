import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_COOKIE_NAME } from "@/utils/constants";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.i9ja.com";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get(AUTH_COOKIE_NAME);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      Cookies.remove(AUTH_COOKIE_NAME);
    }
    return Promise.reject(error);
  }
);
