"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackLink() {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className="self-start flex items-center gap-1.5 cursor-pointer group font-black uppercase tracking-wider text-sm px-0 h-auto hover:bg-transparent hover:text-inherit"
    >
      <ArrowLeft
        className="transition-transform group-hover:-translate-x-0.5"
        size={14}
      />
      <span>Back</span>
    </Button>
  );
}
