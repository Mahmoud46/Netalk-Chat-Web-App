import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || ("development" as string),
  PORT: parseInt(process.env.PORT || "5000", 10) as number,
  JWT_SECRET: process.env.JWT_SECRET as string,
  CLIENT_URL: process.env.CLIENT_URL as string,
} as const;
