import { withAdminAuth } from "@/lib/middleware/withAuth";
import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

// @desc    Verify JWT and confirm admin identity
// @route   GET /api/auth/me
// @access  Private (Admin)
export const GET = withAdminAuth(async (req) => {
  checkRateLimit(req, 20, 60);
  return NextResponse.json({ ok: true });
});
