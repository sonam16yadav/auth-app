import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
  throw new Error(" Missing JWT secret keys in .env file");
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as jwt.Secret;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as jwt.Secret;

const ACCESS_TOKEN_EXPIRY: jwt.SignOptions["expiresIn"] =
  (process.env.ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"]) || "2h";
const REFRESH_TOKEN_EXPIRY: jwt.SignOptions["expiresIn"] =
  (process.env.REFRESH_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"]) || "14d";

export const generateAccessToken = (userId: number): string => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

export const generateRefreshToken = (userId: number): string => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};
