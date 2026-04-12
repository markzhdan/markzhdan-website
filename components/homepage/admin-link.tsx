"use client";

import Link from "next/link";
import { useAdminAuth } from "@/hooks/use-admin-auth";

export function AdminLink() {
  const { isAdmin } = useAdminAuth();

  if (!isAdmin) return null;

  return (
    <Link
      href="/add-blog"
      className="fixed bottom-8 right-8 text-md text-black/0 hover:text-black transition-colors select-none"
      tabIndex={-1}
    >
      Add blog
    </Link>
  );
}
