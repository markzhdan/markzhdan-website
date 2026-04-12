import { withDB } from "@/lib/middleware/withAuth";
import { NextResponse } from "next/server";
import Blog from "@/lib/models/blog-model";

// @desc    Get blog content by slug
// @route   GET /api/daily-blogs/:slug
// @access  Public
export const GET = withDB(async (_req, context) => {
  const { date: slug } = await context.params;

  const blog = await Blog.findOne({ slug });
  if (!blog) return NextResponse.json(null);

  return NextResponse.json({ type: blog.type, content: blog.content });
});
