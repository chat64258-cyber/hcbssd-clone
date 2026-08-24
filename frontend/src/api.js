import axios from "axios";

// في production: VITE_API_URL يشير للباك إند على Render
// في development: proxy في vite.config.js يتولى الأمر
const BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL + "/api"
  : "/api";

const api = axios.create({ baseURL: BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("hcbssd_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
