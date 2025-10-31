import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { testConnection } from "./db/index.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ✅ Configure CORS to work for both local and Render frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://auth-frontend-ten-nu.vercel.app" // replace when deployed
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);


// ✅ Parse JSON requests
app.use(express.json());

// ✅ Basic health route
app.get("/", (req: Request, res: Response) => {
  res.send("✅ Auth API running successfully!");
});

// ✅ Authentication routes
app.use("/api/auth", authRoutes);

// ✅ Start server and test DB connection
app.listen(port, async () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  await testConnection();
});
