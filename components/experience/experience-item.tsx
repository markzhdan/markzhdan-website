import Image from "next/image";

type ExperienceType = {
  company: string;
  initials?: string;
  logo?: string;
  url?: string;
  role: string;
  startDate: string;
  endDate: string;
};

export function ExperienceItem({ item }: { item: ExperienceType }) {
  return (
    <div className="flex items-start gap-4 py-4">
      <div className="flex items-center justify-center shrink-0 w-9 h-9 borde overflow-hidden rounded-lg">
        {item.logo ? (
          <Image
            src={item.logo}
            alt={item.company}
            width={144}
            height={144}
            className="object-contain w-full h-full"
          />
        ) : (
          <span className="font-heading text-sm leading-none">{item.initials}</span>
        )}
      </div>

      <div className="flex flex-1 items-start justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          {item.url ? (
            <a href={item.url} target="_blank" rel="noreferrer" className="font-heading text-xl uppercase leading-none no-underline">
              {item.company}
            </a>
          ) : (
            <span className="font-heading text-xl uppercase leading-none">{item.company}</span>
          )}
          <span className="text-xs text-neutral-500 uppercase tracking-wider">
            {item.role}
          </span>
        </div>

        <span className="text-xs text-neutral-400 uppercase tracking-wider whitespace-nowrap pt-0.5">
          {item.startDate} - {item.endDate}
        </span>
      </div>
    </div>
  );
}
