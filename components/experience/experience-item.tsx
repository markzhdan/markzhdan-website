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
      <div className="flex items-center justify-center shrink-0 w-7 h-7 md:w-9 md:h-9 borde overflow-hidden rounded-lg">
        {item.logo ? (
          <Image
            src={item.logo}
            alt={item.company}
            width={144}
            height={144}
            className="object-contain w-full h-full"
          />
        ) : (
          <span className="font-heading text-sm leading-none">
            {item.initials}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="font-heading text-[2rem] leading-none md:text-xl uppercase no-underline"
            >
              {item.company}
            </a>
          ) : (
            <span className="font-heading text-[2rem] leading-none md:text-xl uppercase">
              {item.company}
            </span>
          )}
          <span className="hidden md:block text-xs text-neutral-400 uppercase tracking-wider whitespace-nowrap pt-0.5">
            {item.startDate} - {item.endDate}
          </span>
        </div>

        <span className="text-xs text-neutral-500 uppercase tracking-wider mt-1 md:mt-0.5">
          {item.role}
        </span>

        <span className="md:hidden text-xs text-neutral-400 uppercase tracking-wider mt-0.5">
          {item.startDate} - {item.endDate}
        </span>
      </div>
    </div>
  );
}
