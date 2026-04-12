import Link from "next/link";

interface PageLinkProps {
  name: string;
  href: string;
}

export function PageLink({ name, href }: PageLinkProps) {
  return <Link href={href}>{name}</Link>;
}
