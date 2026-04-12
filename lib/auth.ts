import jwt from "jsonwebtoken";

export function createToken(username: string, isAdmin: boolean): string {
  return jwt.sign({ username, isAdmin }, process.env.JWT_SECRET!, { expiresIn: "7d" });
}
