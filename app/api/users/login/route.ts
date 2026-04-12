import { withDB } from "@/lib/middleware/withAuth";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UserModel from "@/lib/models/user-model";
import { createToken } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

// Pre-computed bcrypt hash used when the username doesn't exist.
// bcrypt.compare always runs so response time is identical whether the account
// exists or not — prevents timing-based account enumeration (#32, #31).
const DUMMY_HASH = "$2b$10$E8H1h3wqFqEbSfH0zCq1Re3qDxm6uclmfP93r5nBsN54PvJQWmhFK";

// @desc    Authenticate user and return signed JWT
// @route   POST /api/users/login
// @access  Public
export const POST = withDB(async (req) => {
  checkRateLimit(req, 5, 60);

  const body = await req.json();

  // Type + empty check (must come before bcrypt to prevent DoS via huge strings)
  if (
    typeof body.username !== "string" ||
    typeof body.password !== "string" ||
    body.username.trim().length === 0 ||
    body.password.length === 0
  ) {
    const error = new Error("Missing fields") as Error & { status: number };
    error.status = 400;
    throw error;
  }

  // Length cap — bcrypt is intentionally slow; hashing a 100MB string would hang the server
  if (body.username.length > 100 || body.password.length > 200) {
    const error = new Error("Invalid credentials") as Error & { status: number };
    error.status = 401;
    throw error;
  }

  const { username, password } = body as { username: string; password: string };

  const user = await UserModel.findOne({ username });

  // Always run bcrypt.compare regardless of whether the user exists.
  // Skipping it when the user is not found would create a measurable timing
  // difference that reveals valid usernames to an attacker.
  const hashToCheck = user?.password ?? DUMMY_HASH;
  const passwordMatches = await bcrypt.compare(password, hashToCheck);

  if (user && passwordMatches) {
    const token = createToken(user.username, user.isAdmin);
    return NextResponse.json({ username: user.username, isAdmin: user.isAdmin, token });
  }

  const error = new Error("Invalid credentials") as Error & { status: number };
  error.status = 401;
  throw error;
});
