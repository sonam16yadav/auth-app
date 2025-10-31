import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { db } from "../db/index";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, gender, email, password } = req.body;

    const existing = await db.select().from(users).where(eq(users.email, email));
    if (existing.length > 0)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(users)
      .values({ firstName, lastName, gender, email, password: hashedPassword })
      .returning({ firstName: users.firstName ,gender:users.lastName, id: users.id, email: users.email });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }

  
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.json({ message: "Login successful", accessToken, refreshToken });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).user; 

    const [user] = await db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        gender: users.gender,
        email: users.email,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({
      success: true,
      message: "Current user fetched successfully",
      user,
    });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


