import { withAdminAuth } from "@/lib/middleware/withAuth";
import { NextResponse } from "next/server";
import Blog from "@/lib/models/blog-model";
import { checkRateLimit } from "@/lib/rate-limit";

// @desc    Create or update a daily blog
// @route   POST /api/daily-blogs/create
// @access  Private (Admin)
export const POST = withAdminAuth(async (req) => {
  checkRateLimit(req, 10, 60);

  const body = await req.json();

  // Validate date is a plain string matching MM-DD-YYYY — prevents NoSQL injection
  if (typeof body.date !== "string" || !/^\d{2}-\d{2}-\d{4}$/.test(body.date)) {
    const error = new Error("Invalid date format") as Error & { status: number };
    error.status = 400;
    throw error;
  }

  if (
    typeof body.content !== "string" ||
    body.content.trim().length === 0 ||
    body.content.length > 50_000
  ) {
    const error = new Error("Invalid content") as Error & { status: number };
    error.status = 400;
    throw error;
  }

  const { content, date } = body as { content: string; date: string };

  await Blog.findOneAndUpdate(
    { slug: date },
    { slug: date, type: "daily", content },
    { upsert: true, new: true }
  );

  return NextResponse.json({ success: true });
});
