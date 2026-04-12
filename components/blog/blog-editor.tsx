"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Heading } from "@/components/heading";
import { fetchWithToken } from "@/lib/api";

export function BlogEditor() {
  const today = new Date();
  const defaultDate = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}-${today.getFullYear()}`;

  const [date, setDate] = useState(defaultDate);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSave() {
    if (!content.trim() || !date) return;
    setStatus("saving");

    try {
      await fetchWithToken("/daily-blogs/create", "POST", { date, content });
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <Heading>Write</Heading>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="MM-DD-YYYY"
            className="border-b border-black bg-transparent text-sm outline-none text-right w-28"
          />
          <button
            onClick={handleSave}
            disabled={status === "saving"}
            className="font-heading text-sm uppercase tracking-widest hover:opacity-60 transition-opacity disabled:opacity-30"
          >
            {status === "saving" ? "Saving..." : status === "saved" ? "Saved" : "Publish"}
          </button>
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm">Failed to save. Try again.</p>
      )}

      <div className="grid grid-cols-2 gap-6 items-start">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write in markdown..."
          className="w-full min-h-[60vh] resize-none border border-black/10 bg-transparent p-3 text-sm outline-none focus:border-black/30 leading-relaxed"
        />
        <div className="prose prose-sm min-h-[60vh] border border-black/10 p-3 leading-relaxed text-sm">
          <ReactMarkdown>{content || "*Preview appears here...*"}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
