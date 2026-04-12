"use client";

import "react-day-picker/src/style.css";
import { Suspense, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DayPicker } from "react-day-picker";
import { BackLink } from "@/components/back-link";
import { Heading } from "@/components/heading";
import { Loading } from "@/components/loading";
import { fetchBackend } from "@/lib/api";

function CalendarContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  const [month, setMonth] = useState<Date>(() => {
    const m = searchParams.get("month");
    if (m) {
      const [year, mo] = m.split("-").map(Number);
      if (year && mo) return new Date(year, mo - 1);
    }
    return new Date();
  });

  useEffect(() => {
    fetchBackend("/daily-blogs/list")
      .then((dates: string[]) => {
        setAvailableDates(
          dates.map((d) => {
            const [mo, day, year] = d.split("-").map(Number);
            return new Date(year, mo - 1, day);
          })
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function handleMonthChange(newMonth: Date) {
    setMonth(newMonth);
    const param = `${newMonth.getFullYear()}-${String(newMonth.getMonth() + 1).padStart(2, "0")}`;
    window.history.replaceState(null, "", `${pathname}?month=${param}`);
  }

  function handleSelect(day: Date | undefined) {
    if (!day) return;
    const mo = String(day.getMonth() + 1).padStart(2, "0");
    const day2 = String(day.getDate()).padStart(2, "0");
    const year = day.getFullYear();
    router.push(`/blogs/${mo}-${day2}-${year}`);
  }

  if (loading) return <Loading />;

  return (
    <>
      <BackLink />
      <Heading size="xl">Daily</Heading>
      <DayPicker
        mode="single"
        fixedWeeks
        month={month}
        onMonthChange={handleMonthChange}
        onSelect={handleSelect}
        disabled={(day) =>
          !availableDates.some((d) => d.toDateString() === day.toDateString())
        }
        modifiers={{ available: availableDates }}
        modifiersStyles={{
          available: { backgroundColor: "#000000", color: "#ffffff", borderRadius: "50%" },
        }}
        style={
          {
            "--rdp-accent-color": "#000000",
            "--rdp-accent-background-color": "#f0f0f0",
          } as React.CSSProperties
        }
      />
    </>
  );
}

export default function DailyBlogsPage() {
  return (
    <main className="flex flex-col w-100 px-2.5 gap-6">
      <Suspense fallback={<Loading />}>
        <CalendarContent />
      </Suspense>
    </main>
  );
}
