import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({ baseURL: `${BASE}/api` });

export const authHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: token ? `Bearer ${token}` : "" } };
};

// Expired/invalid token -> back to login
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const onAuthPage = ["/", "/signup"].includes(window.location.pathname);
    if (err.response?.status === 401 && localStorage.getItem("token") && !onAuthPage) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(err);
  },
);

export default API;
