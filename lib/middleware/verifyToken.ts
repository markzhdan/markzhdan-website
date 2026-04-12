import jwt from "jsonwebtoken";

export interface DecodedToken {
  username: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

const verifyToken = (request: Request): DecodedToken => {
  const authHeader = request.headers.get("authorization");
  const [scheme, token] = authHeader?.split(" ", 2) ?? [];

  if (!token || scheme?.toLowerCase() !== "bearer") {
    // 401 = not authenticated (no/missing token), not 403 (forbidden)
    const error = new Error("Not authorized, no token") as Error & { status: number };
    error.status = 401;
    throw error;
  }

  try {
    // Explicitly lock to HS256 — prevents algorithm confusion attacks where an
    // attacker strips the signature and sets alg: "none", or downgrades to a
    // weaker algorithm. Without this, the library's default set is used.
    return jwt.verify(token, process.env.JWT_SECRET!, {
      algorithms: ["HS256"],
    }) as DecodedToken;
  } catch {
    const error = new Error("Not authorized, invalid token") as Error & { status: number };
    error.status = 401;
    throw error;
  }
};

export default verifyToken;
