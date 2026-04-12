"use client";

import { useEffect, useMemo, useState } from "react";
import { use } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BackLink } from "@/components/back-link";
import { Loading } from "@/components/loading";
import { fetchBackend } from "@/lib/api";

type BlogResponse = { type: "daily" | "article"; content: string } | null;

export default function BlogViewerPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = use(params);

  const [blog, setBlog] = useState<BlogResponse>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBackend(`/daily-blogs/${blogId}`)
      .then((data: BlogResponse) => setBlog(data))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [blogId]);

  const markdownComponents = useMemo(() => ({
    code({ className, children, ...props }: React.ComponentPropsWithoutRef<"code">) {
      const match = /language-(\w+)/.exec(className || "");
      if (!match) return <code className={className} {...props}>{children}</code>;
      return (
        <SyntaxHighlighter style={oneLight} language={match[1]} PreTag="div" customStyle={{ margin: 0 }}>
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    },
  }), []);

  const isDaily = blog?.type === "daily";

  if (loading) {
    return (
      <main className="flex flex-col px-2.5 gap-6 w-100">
        <Loading />
      </main>
    );
  }

  return (
    <main className={`flex flex-col px-2.5 gap-6 ${isDaily ? "w-100" : "w-150"}`}>
      <BackLink />
      {blog === null ? (
        <p className="text-sm">No entry found.</p>
      ) : (
        <article className="prose text-sm leading-relaxed [&_h1]:font-heading [&_h2]:font-heading [&_h3]:font-heading [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5">
          <ReactMarkdown components={markdownComponents}>
            {blog.content}
          </ReactMarkdown>
        </article>
      )}
    </main>
  );
}
