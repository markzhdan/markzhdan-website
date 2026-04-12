"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { BlogLogin } from "@/components/blog/blog-login";
import { BlogEditor } from "@/components/blog/blog-editor";
import { Loading } from "@/components/loading";

function AddBlogContent() {
  const { isAdmin, loading, signIn } = useAdminAuth();
  const searchParams = useSearchParams();
  const editSlug = searchParams.get("slug");

  if (loading) {
    return (
      <main className="w-full max-w-100 px-2.5">
        <Loading />
      </main>
    );
  }

  return (
    <main
      className={`flex flex-col px-2.5 gap-6 w-full ${
        isAdmin ? "max-w-215" : "max-w-100"
      }`}
    >
      {isAdmin ? (
        <BlogEditor editSlug={editSlug} />
      ) : (
        <BlogLogin onLogin={signIn} />
      )}
    </main>
  );
}

export default function AddBlogPage() {
  return (
    <Suspense
      fallback={
        <main className="w-full max-w-100 px-2.5">
          <Loading />
        </main>
      }
    >
      <AddBlogContent />
    </Suspense>
  );
}
