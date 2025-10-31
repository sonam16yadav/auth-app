import axios from "axios";

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api/auth" // 👩‍💻 When running locally
    : import.meta.env.VITE_API_URL + "/api/auth"; // 🌐 When deployed (from Vercel env variable)

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
