"use client";

import Link from "next/link";
import { useAdminAuth } from "@/hooks/use-admin-auth";

export function AdminLink() {
  const { isAdmin } = useAdminAuth();

  if (!isAdmin) return null;

  return (
    <Link
      href="/add-blog"
      className="text-xs text-black/0 hover:text-black/30 transition-colors select-none"
      tabIndex={-1}
    >
      Add blog
    </Link>
  );
}
