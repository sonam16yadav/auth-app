import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { testConnection } from "./db/index.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ✅ Allow cross-origin requests
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://auth-frontend-ten-nu.vercel.app", // your Vercel frontend
    ],
    credentials: true,
  })
);

// ✅ Parse incoming JSON (this is the key line)
app.use(express.json());

// ✅ Parse URL-encoded form data (optional but good)
app.use(express.urlencoded({ extended: true }));

// ✅ Use your routes
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
});