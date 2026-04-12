interface ExternalLinkProps {
  name: string;
  href: string;
}

export function ExternalLink({ name, href }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {name}
    </a>
  );
}
