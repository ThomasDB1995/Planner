import type { WeekDay } from "@/lib/planning/week";

type WeekHeaderProps = {
  days: WeekDay[];
};

const dutchDateFormatter = new Intl.DateTimeFormat("nl-BE", {
  day: "numeric",
  month: "long",
  weekday: "long",
  year: "numeric"
});

function formatHeaderDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return dutchDateFormatter.format(new Date(year, month - 1, day));
}

function isWeekendDay(day: WeekDay): boolean {
  return day.dayLabel === "Zaterdag" || day.dayLabel === "Zondag";
}

export function WeekHeader({ days }: WeekHeaderProps) {
  return (
    <div className="grid min-w-[calc(116px+7*(100vw-152px))] grid-cols-[116px_repeat(7,minmax(220px,calc(100vw-152px)))] border-b border-slate-300 bg-slate-100 text-xs font-semibold text-slate-600 sm:min-w-[920px] sm:grid-cols-[144px_repeat(7,minmax(110px,1fr))] lg:min-w-[1040px] lg:grid-cols-[156px_repeat(7,minmax(126px,1fr))]">
      <div
        aria-hidden="true"
        className="sticky left-0 z-20 border-r border-slate-300 bg-slate-100 px-2 py-1.5 shadow-[3px_0_0_rgba(148,163,184,0.22)]"
        data-planner-employee-column
      />
      {days.map((day) => (
        <div
          className={`flex min-h-8 snap-start items-center justify-center border-r border-slate-300 px-2 py-1.5 text-center text-slate-900 last:border-r-0 ${isWeekendDay(day) ? "bg-slate-200/70" : "bg-slate-100"}`}
          data-week-date={day.date}
          key={day.date}
        >
          <span className="leading-4">{formatHeaderDate(day.date)}</span>
        </div>
      ))}
    </div>
  );
}
