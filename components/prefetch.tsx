"use client";

import { preload } from "swr";
import { fetchBackend } from "@/lib/api";

// Seed the SWR cache for /api/blogs while the user is on the homepage so that
// navigating to /blogs renders instantly with no loading state.
preload("/blogs", fetchBackend);

export function Prefetch() {
  return null;
}
