import { cn } from "@/lib/utils";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "p";
  size?: "xl" | "lg" | "md" | "sm";
  children: React.ReactNode;
  className?: string;
};

const sizes = {
  xl: "text-4xl leading-none",
  lg: "text-2xl",
  md: "text-xl",
  sm: "text-sm tracking-widest",
};

export function Heading({ as: Tag = "h1", size = "lg", children, className }: HeadingProps) {
  return (
    <Tag className={cn("font-heading uppercase", sizes[size], className)}>
      {children}
    </Tag>
  );
}
