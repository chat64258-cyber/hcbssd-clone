import { createContext, useContext, useState, useEffect } from "react";
import api from "../api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("hcbssd_token");
    if (token) {
      api.get("/auth/me")
        .then((r) => setAdmin(r.data))
        .catch(() => localStorage.removeItem("hcbssd_token"))
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, []);

  const login = async (username, password) => {
    const { data } = await api.post("/auth/login", { username, password });
    localStorage.setItem("hcbssd_token", data.token);
    setAdmin({ username: data.username });
  };

  const logout = () => {
    localStorage.removeItem("hcbssd_token");
    setAdmin(null);
  };

  return <AuthContext.Provider value={{ admin, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
