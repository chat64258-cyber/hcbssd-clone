import axios from "axios";

const BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, "") + "/api"
  : "/api";

const api = axios.create({ baseURL: BASE, timeout: 10000 });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("hcbssd_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// إذا Vercel أرجع HTML بدل JSON (لأن الباك إند مش شاغل)
// نرفضها بدل ما تكسر الـ components
api.interceptors.response.use(
  (response) => {
    const ct = response.headers["content-type"] || "";
    if (ct.includes("text/html")) {
      return Promise.reject(new Error("Backend offline"));
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;