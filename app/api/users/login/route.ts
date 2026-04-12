import { withDB } from "@/lib/middleware/withAuth";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UserModel from "@/lib/models/user-model";
import { createToken } from "@/lib/auth";

// @desc    Authenticate user and return signed JWT
// @route   POST /api/users/login
// @access  Public
export const POST = withDB(async (req) => {
  const { username, password } = await req.json();

  if (!username || !password) {
    const error = new Error("Missing fields") as Error & { status: number };
    error.status = 400;
    throw error;
  }

  const user = await UserModel.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = createToken(user.username);
    return NextResponse.json({ username: user.username, isAdmin: user.isAdmin, token });
  }

  const error = new Error("Invalid credentials") as Error & { status: number };
  error.status = 401;
  throw error;
});
