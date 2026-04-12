"use client";

import { useMemo } from "react";
import { use } from "react";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Link from "next/link";
import { BackLink } from "@/components/back-link";
import { Loading } from "@/components/loading";
import { fetchBackend } from "@/lib/api";
import { useAdminAuth } from "@/hooks/use-admin-auth";

type BlogResponse = { type: "daily" | "article"; content: string } | null;

export default function BlogViewerPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = use(params);
  const { isAdmin } = useAdminAuth();

  const { data: blog, isLoading } = useSWR<BlogResponse>(
    `/daily-blogs/${blogId}`,
    fetchBackend
  );

  const markdownComponents = useMemo(
    () => ({
      code({
        className,
        children,
        ...props
      }: React.ComponentPropsWithoutRef<"code">) {
        const match = /language-(\w+)/.exec(className || "");
        if (!match)
          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        return (
          <SyntaxHighlighter
            style={oneLight}
            language={match[1]}
            PreTag="div"
            customStyle={{ margin: 0 }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        );
      },
    }),
    []
  );

  const isDaily = blog?.type === "daily";

  if (isLoading) {
    return (
      <main className="flex flex-col px-2.5 gap-6 w-full max-w-100">
        <Loading />
      </main>
    );
  }

  return (
    <main
      className={`flex flex-col px-2.5 gap-6 w-full ${
        isDaily ? "max-w-100" : "max-w-150"
      }`}
    >
      <div className="flex items-center justify-between">
        <BackLink />
        {isAdmin && (
          <Link
            href={`/add-blog?slug=${blogId}`}
            className="font-heading text-sm uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity no-underline"
          >
            Edit
          </Link>
        )}
      </div>
      {!blog ? (
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
