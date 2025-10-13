    
    
    import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { testConnection } from "./db";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req: Request, res: Response) =>
  res.send("Auth API running ")
);
app.use("/api/auth", authRoutes);

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  await testConnection();
});

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // // src/index.ts
    // import express, { Request, Response } from 'express';

    // const app = express();
    // const port = process.env.PORT || 3000;

    // app.get('/', (req: Request, res: Response) => {
    //   res.send('Hello TypeScript with Express!!!!');
    // });

    // app.listen(port, () => {
    //   console.log(`Server running on http://localhost:${port}`);
    // });