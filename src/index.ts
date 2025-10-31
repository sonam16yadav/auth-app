import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { testConnection } from "./db/index";
import authRoutes from "./routes/authRoutes";


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

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
testConnection();


// ✅ Use your routes
app.use("/api/auth", authRoutes);

// ✅ Add a root route for testing
app.get("/", (req: Request, res: Response) => {
  res.send("✅ Auth API is running successfully!");
});

// ✅ Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
});
