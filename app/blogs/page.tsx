"use client";

import { useEffect, useState } from "react";
import { BackLink } from "@/components/back-link";
import { Heading } from "@/components/heading";
import { PageLink } from "@/components/page-link";
import { Loading } from "@/components/loading";
import { fetchBackend } from "@/lib/api";

type Article = { slug: string; title: string | null };

export default function BlogsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBackend("/blogs")
      .then((data: Article[]) => setArticles(data))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="flex flex-col w-100 px-2.5 gap-6">
        <Loading />
      </main>
    );
  }

  return (
    <main className="flex flex-col w-100 px-2.5 gap-6">
      <BackLink />
      <Heading size="xl">Blogs</Heading>

      <section className="flex flex-col gap-2">
        <Heading>Articles</Heading>
        {articles.map((article) => (
          <PageLink key={article.slug} name={article.title ?? article.slug} href={`/blogs/${article.slug}`} />
        ))}
      </section>

      <section className="flex flex-col gap-2">
        <Heading>Daily</Heading>
        <PageLink name="Calendar" href="/blogs/daily-blogs" />
      </section>
    </main>
  );
}
