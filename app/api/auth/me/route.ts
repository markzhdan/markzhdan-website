import { withAuth } from "@/lib/middleware/withAuth";
import { NextResponse } from "next/server";

// @desc    Verify JWT and return admin identity
// @route   GET /api/auth/me
// @access  Private
export const GET = withAuth(async () => {
  return NextResponse.json({ ok: true });
});
