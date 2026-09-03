export type WeekDay = {
  date: string;
  dayLabel: string;
  shortLabel: string;
};

const dayLabels = [
  "Maandag",
  "Dinsdag",
  "Woensdag",
  "Donderdag",
  "Vrijdag",
  "Zaterdag",
  "Zondag"
];

function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDateInputValue(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function getMonday(date: Date): Date {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  return monday;
}

export function getCurrentWeekStartDate(): string {
  return toDateInputValue(getMonday(new Date()));
}

export function addWeeksToDateInputValue(
  dateInputValue: string,
  weekOffset: number
): string {
  const date = parseDateInputValue(dateInputValue);
  date.setDate(date.getDate() + weekOffset * 7);

  return toDateInputValue(date);
}

function getIsoWeekReferenceDate(date: Date): Date {
  const referenceDate = new Date(date);
  const day = referenceDate.getDay();
  const isoDay = day === 0 ? 7 : day;

  referenceDate.setDate(referenceDate.getDate() + 4 - isoDay);

  return referenceDate;
}

export function getIsoWeekYear(date: Date | string): number {
  const parsedDate =
    typeof date === "string" ? parseDateInputValue(date) : new Date(date);

  return getIsoWeekReferenceDate(parsedDate).getFullYear();
}

export function getIsoWeekNumber(date: Date | string): number {
  const parsedDate =
    typeof date === "string" ? parseDateInputValue(date) : new Date(date);
  const referenceDate = getIsoWeekReferenceDate(parsedDate);
  const firstThursday = new Date(referenceDate.getFullYear(), 0, 4);
  const firstWeekReferenceDate = getIsoWeekReferenceDate(firstThursday);
  const diffInMilliseconds =
    referenceDate.getTime() - firstWeekReferenceDate.getTime();
  const diffInDays = Math.round(diffInMilliseconds / 86400000);

  return Math.floor(diffInDays / 7) + 1;
}

export function getIsoWeekKey(date: Date | string): string {
  const weekYear = getIsoWeekYear(date);
  const weekNumber = String(getIsoWeekNumber(date)).padStart(2, "0");

  return `${weekYear}-W${weekNumber}`;
}

export function getIsoWeeksInYear(year: number): number {
  return getIsoWeekNumber(new Date(year, 11, 28));
}

export function getDateForIsoWeek(year: number, week: number): string {
  const maxWeeks = getIsoWeeksInYear(year);

  if (!Number.isInteger(year) || !Number.isInteger(week)) {
    throw new Error("Week en jaar moeten numeriek zijn.");
  }

  if (week < 1 || week > maxWeeks) {
    throw new Error(`Week ${week} bestaat niet in ${year}.`);
  }

  const januaryFourth = new Date(year, 0, 4);
  const firstWeekMonday = getMonday(januaryFourth);
  firstWeekMonday.setDate(firstWeekMonday.getDate() + (week - 1) * 7);

  return toDateInputValue(firstWeekMonday);
}

export function getWorkWeek(anchorDate: Date | string): WeekDay[] {
  const monday =
    typeof anchorDate === "string"
      ? getMonday(parseDateInputValue(anchorDate))
      : getMonday(anchorDate);

  return dayLabels.map((dayLabel, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    return {
      date: toDateInputValue(date),
      dayLabel,
      shortLabel: `${dayLabel} ${date.getDate()}/${date.getMonth() + 1}`
    };
  });
}

export function formatWeekRange(days: WeekDay[]): string {
  if (days.length === 0) {
    return "Geen week";
  }

  return `${days[0].shortLabel} - ${days[days.length - 1].shortLabel}`;
}

export function getCurrentWorkWeek(): WeekDay[] {
  return getWorkWeek(new Date());
}
