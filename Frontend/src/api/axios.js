import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

console.log("API baseURL:", baseURL); // temporary debug (remove after)

const api = axios.create({
  baseURL: baseURL,
  withCredentials: false, // set true if you use cookies and configure CORS
});

export default api;
