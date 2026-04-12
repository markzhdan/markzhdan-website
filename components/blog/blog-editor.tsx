"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import { Heading } from "@/components/heading";
import { fetchWithToken, fetchBackend } from "@/lib/api";

type BlogType = "daily" | "article";
type LoadedBlog = {
  type: BlogType;
  title: string | null;
  content: string;
} | null;

interface BlogEditorProps {
  editSlug?: string | null;
}

export function BlogEditor({ editSlug }: BlogEditorProps) {
  const isEditMode = !!editSlug;

  const [type, setType] = useState<BlogType>("daily");
  const [date, setDate] = useState(() => {
    const d = new Date();
    return `${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}-${d.getFullYear()}`;
  });
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );

  const { data: existing } = useSWR<LoadedBlog>(
    editSlug ? `/daily-blogs/${editSlug}` : null,
    fetchBackend
  );

  useEffect(() => {
    if (!existing) return;
    setType(existing.type);
    setContent(existing.content);
    if (existing.type === "daily") {
      setDate(editSlug!);
    } else {
      setSlug(editSlug!);
      setTitle(existing.title ?? "");
    }
  }, [existing, editSlug]);

  async function handleSave() {
    if (!content.trim()) return;
    setStatus("saving");
    try {
      await fetchWithToken(
        "/blogs/create",
        "POST",
        type === "daily"
          ? { type, date, content }
          : { type, slug, title, content }
      );
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Heading>{isEditMode ? "Edit" : "Write"}</Heading>

          {/* Type toggle — only shown when creating */}
          {!isEditMode && (
            <div className="flex gap-3 border-b border-black/10 pb-0.5">
              {(["daily", "article"] as BlogType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`font-heading text-sm uppercase tracking-widest transition-opacity ${
                    type === t ? "opacity-100" : "opacity-25 hover:opacity-50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Date field (daily) or slug field (article) */}
          {type === "daily" ? (
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="MM-DD-YYYY"
              readOnly={isEditMode}
              className="border-b border-black bg-transparent text-sm outline-none text-right w-28 placeholder:text-black/30 read-only:opacity-40"
            />
          ) : (
            <input
              type="text"
              value={slug}
              onChange={(e) =>
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
              }
              placeholder="article-slug"
              readOnly={isEditMode}
              className="border-b border-black bg-transparent text-sm outline-none text-right w-36 placeholder:text-black/30 read-only:opacity-40"
            />
          )}

          <button
            onClick={handleSave}
            disabled={status === "saving"}
            className="font-heading text-sm uppercase tracking-widest hover:opacity-60 transition-opacity disabled:opacity-30"
          >
            {status === "saving"
              ? "Saving..."
              : status === "saved"
              ? "Saved"
              : "Publish"}
          </button>
        </div>
      </div>

      {/* Article title field */}
      {type === "article" && (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title..."
          className="border-b border-black/20 bg-transparent py-1 text-sm outline-none placeholder:text-black/30 focus:border-black/60 transition-colors"
        />
      )}

      {status === "error" && (
        <p className="text-xs text-black/50">Failed to save. Try again.</p>
      )}

      {/* Editor / preview split */}
      <div className="grid grid-cols-2 gap-6 items-start">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write in markdown..."
          className="w-full min-h-[60vh] resize-none border border-black/10 bg-transparent p-3 text-sm outline-none focus:border-black/30 leading-relaxed"
        />
        <div className="prose prose-sm min-h-[60vh] border border-black/10 p-3 leading-relaxed text-sm overflow-auto">
          <ReactMarkdown>
            {content || "*Preview appears here...*"}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
