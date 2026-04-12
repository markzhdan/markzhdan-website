import { withDB } from "@/lib/middleware/withAuth";
import { NextResponse } from "next/server";
import Blog from "@/lib/models/blog-model";

// @desc    Get list of all daily blog slugs
// @route   GET /api/daily-blogs/list
// @access  Public
export const GET = withDB(async () => {
  const blogs = await Blog.find({ type: "daily" }, { slug: 1, _id: 0 }).sort({ slug: 1 });
  return NextResponse.json(blogs.map((b: { slug: string }) => b.slug));
});
