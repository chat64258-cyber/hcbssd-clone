import axios from "axios";

const BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, "") + "/api"
  : "/api";

const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("hcbssd_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// منع crash عند فشل الاتصال بالباك إند
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.warn("Backend unavailable:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;