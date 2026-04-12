import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, index: true, unique: true },
    type: { type: String, enum: ["daily", "article"], required: true },
    title: { type: String },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog ?? mongoose.model("Blog", BlogSchema);

export default Blog;
