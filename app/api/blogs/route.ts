import { withDB } from "@/lib/middleware/withAuth";
import { NextResponse } from "next/server";
import Blog from "@/lib/models/blog-model";
import { checkRateLimit } from "@/lib/rate-limit";

// @desc    Get list of all articles
// @route   GET /api/blogs
// @access  Public
export const GET = withDB(async (req) => {
  checkRateLimit(req, 30, 60);

  const articles = await Blog.find(
    { type: "article" },
    { slug: 1, title: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();
  return NextResponse.json(articles);
});
