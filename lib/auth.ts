import jwt from "jsonwebtoken";

export function createToken(username: string): string {
  return jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: "7d" });
}
