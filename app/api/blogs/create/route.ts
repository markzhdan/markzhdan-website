import { withAdminAuth } from "@/lib/middleware/withAuth";
import { NextResponse } from "next/server";
import Blog from "@/lib/models/blog-model";
import { checkRateLimit } from "@/lib/rate-limit";

function badRequest(message: string): Error & { status: number } {
  const error = new Error(message) as Error & { status: number };
  error.status = 400;
  return error;
}

// @desc    Create or update a blog (daily or article)
// @route   POST /api/blogs/create
// @access  Private (Admin)
export const POST = withAdminAuth(async (req) => {
  checkRateLimit(req, 10, 60);

  const body = await req.json();
  const { type, date, slug, title, content } = body;

  if (type !== "daily" && type !== "article") throw badRequest("Invalid type");

  if (
    typeof content !== "string" ||
    content.trim().length === 0 ||
    content.length > 50_000
  )
    throw badRequest("Invalid content");

  let finalSlug: string;

  if (type === "daily") {
    if (typeof date !== "string" || !/^\d{2}-\d{2}-\d{4}$/.test(date))
      throw badRequest("Invalid date format");
    finalSlug = date;
  } else {
    if (
      typeof slug !== "string" ||
      !/^[a-z0-9][a-z0-9-]*$/.test(slug) ||
      slug.length > 200
    )
      throw badRequest("Invalid slug");
    if (
      title !== undefined &&
      (typeof title !== "string" || title.length > 500)
    )
      throw badRequest("Invalid title");
    finalSlug = slug;
  }

  await Blog.findOneAndUpdate(
    { slug: finalSlug },
    {
      slug: finalSlug,
      type,
      title: type === "article" ? title?.trim() || null : undefined,
      content,
    },
    { upsert: true, new: true }
  );

  return NextResponse.json({ success: true });
});
