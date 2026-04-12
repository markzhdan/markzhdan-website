import { withAuth } from "@/lib/middleware/withAuth";
import { NextResponse } from "next/server";
import Blog from "@/lib/models/blog-model";

// @desc    Create or update a daily blog
// @route   POST /api/daily-blogs/create
// @access  Private
export const POST = withAuth(async (req) => {
  const { content, date } = await req.json();

  if (!content || !date) {
    const error = new Error("Missing fields") as Error & { status: number };
    error.status = 400;
    throw error;
  }

  await Blog.findOneAndUpdate(
    { slug: date },
    { slug: date, type: "daily", content },
    { upsert: true, new: true }
  );

  return NextResponse.json({ success: true });
});
