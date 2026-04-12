import jwt from "jsonwebtoken";

const verifyToken = (request: Request) => {
  const authHeader = request.headers.get("authorization");
  const [scheme, token] = authHeader?.split(" ", 2) ?? [];

  if (!token || scheme?.toLowerCase() !== "bearer") {
    const error = new Error("Not authorized, no token") as Error & { status: number };
    error.status = 403;
    throw error;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch {
    const error = new Error("Not authorized, invalid token") as Error & { status: number };
    error.status = 401;
    throw error;
  }
};

export default verifyToken;
