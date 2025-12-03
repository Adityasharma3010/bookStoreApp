import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:4001";

const api = axios.create({
  baseURL: BASE,
  withCredentials: true, // set true if you use cookies and configure CORS
});

export default api;
