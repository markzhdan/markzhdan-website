import { withDB } from "@/lib/middleware/withAuth";
import { NextResponse } from "next/server";
import Blog from "@/lib/models/blog-model";

// @desc    Get list of all articles
// @route   GET /api/blogs
// @access  Public
export const GET = withDB(async () => {
  const articles = await Blog.find(
    { type: "article" },
    { slug: 1, title: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json(articles);
});
