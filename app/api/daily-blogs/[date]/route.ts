import { withDB } from "@/lib/middleware/withAuth";
import { NextResponse } from "next/server";
import Blog from "@/lib/models/blog-model";
import { checkRateLimit } from "@/lib/rate-limit";

// @desc    Get blog content by slug
// @route   GET /api/daily-blogs/:slug
// @access  Public
export const GET = withDB(async (req, context) => {
  checkRateLimit(req, 30, 60);

  const { date: slug } = await context.params;

  // Validate slug is a safe string — allows both date slugs (04-11-2026)
  // and article slugs (reverse-engineering-vlr-rating).
  // Blocks empty strings, excessive length, and characters that have no place
  // in a slug (prevents NoSQL operator injection like $gt, {, }).
  if (typeof slug !== "string" || !/^[a-zA-Z0-9_-]{1,200}$/.test(slug)) {
    return NextResponse.json(null);
  }

  const blog = await Blog.findOne({ slug });
  if (!blog) return NextResponse.json(null);

  return NextResponse.json({ type: blog.type, content: blog.content });
});
