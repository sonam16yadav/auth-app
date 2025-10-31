import axios from "axios";

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api/auth" // when running locally
    : "https://auth-app-045n.onrender.com/api/auth"; // your Render backend

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
