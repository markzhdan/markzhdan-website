"use client";

import { useAdminAuth } from "@/hooks/use-admin-auth";
import { BlogLogin } from "@/components/blog/blog-login";
import { BlogEditor } from "@/components/blog/blog-editor";
import { Loading } from "@/components/loading";

export default function AddBlogPage() {
  const { isAdmin, loading, signIn } = useAdminAuth();

  if (loading) {
    return (
      <main className="w-100 px-2.5">
        <Loading />
      </main>
    );
  }

  return (
    <main className={`flex flex-col px-2.5 gap-6 ${isAdmin ? "w-215" : "w-100"}`}>
      {isAdmin ? <BlogEditor /> : <BlogLogin onLogin={signIn} />}
    </main>
  );
}
