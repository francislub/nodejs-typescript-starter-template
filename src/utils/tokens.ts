// utils/tokens.ts
import jwt, { JwtPayload } from "jsonwebtoken";
 
interface TokenOptions {
  expiresIn: string | number;
}
 
const ACCESS_TOKEN_OPTIONS: TokenOptions = {
  expiresIn: "60m", // 60 minutes
};
 
const REFRESH_TOKEN_OPTIONS: TokenOptions = {
  expiresIn: "30d", // 30 days
};
 
export interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
  role: string;
}
 
export function generateAccessToken(payload: TokenPayload): string {
  const secret = process.env.ACCESS_TOKEN_SECRET!;
  return jwt.sign(payload, secret, ACCESS_TOKEN_OPTIONS);
}
 
export function generateRefreshToken(payload: TokenPayload): string {
  const secret = process.env.REFRESH_TOKEN_SECRET!;
  return jwt.sign(payload, secret, REFRESH_TOKEN_OPTIONS);
}
 
export function verifyAccessToken(token: string): TokenPayload {
  const secret = process.env.ACCESS_TOKEN_SECRET!;
  return jwt.verify(token, secret) as TokenPayload;
}
 
export function verifyRefreshToken(token: string): TokenPayload {
  const secret = process.env.REFRESH_TOKEN_SECRET!;
  return jwt.verify(token, secret) as TokenPayload;
}