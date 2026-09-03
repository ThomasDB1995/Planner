import { useEffect, useState } from "react";
import { ConflictSummary } from "@/components/planning/ConflictSummary";
import { EmployeeRow } from "@/components/planning/EmployeeRow";
import type {
  EmployeeAvailability,
  SelectedPlanningCard,
  SelectedPlanningCell
} from "@/components/planning/matrix";
import { WeekHeader } from "@/components/planning/WeekHeader";
import type { AvailabilityType } from "@/lib/planning/availability";
import { getAvailabilityLabel } from "@/lib/planning/availability";
import {
  formatWeekRange,
  getDateForIsoWeek,
  getIsoWeekNumber,
  getIsoWeeksInYear,
  getIsoWeekYear,
  type WeekDay
} from "@/lib/planning/week";
import type {
  Employee,
  PlanningConflict,
  PlanningItem,
  Resource
} from "@/types/planning";

type WeekPlanningBoardProps = {
  days: WeekDay[];
  employees: Employee[];
  employeeAvailability: EmployeeAvailability[];
  resources: Resource[];
  items: PlanningItem[];
  conflicts: PlanningConflict[];
  selectedCell: SelectedPlanningCell | null;
  selectedCard: SelectedPlanningCard | null;
  activeDestinationCell: SelectedPlanningCell | null;
  selectedCellAvailability?: EmployeeAvailability;
  canMoveSelectedCard: boolean;
  onSelectCell: (cell: SelectedPlanningCell) => void;
  onSelectCard: (card: SelectedPlanningCard) => void;
  onDeleteCard: (planningItemId: string) => void;
  onMoveSelectedCard: () => void;
  onGoToCurrentWeek: () => void;
  onGoToNextWeek: () => void;
  onGoToPreviousWeek: () => void;
  onGoToWeekStartDate: (weekStartDate: string) => void;
  onHideEmployee: (employeeId: string) => void;
  onRemoveEmployeeFromWeek: (employeeId: string) => void;
  onSetSelectedCellAvailabilityType: (type: AvailabilityType) => void;
  onToggleSelectedCellAvailability: () => void;
  weeklyEmployeeIds: string[];
};

const secondaryAvailabilityTypes: AvailabilityType[] = [
  "recovery",
  "vacation",
  "weather_leave",
  "sick_leave"
];

const compactDateFormatter = new Intl.DateTimeFormat("nl-BE", {
  day: "numeric",
  month: "long"
});

const compactDateWithYearFormatter = new Intl.DateTimeFormat("nl-BE", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

function formatCompactWeekRange(days: WeekDay[]): string {
  if (days.length === 0) {
    return "Geen week";
  }

  const firstDate = new Date(days[0].date);
  const lastDate = new Date(days[days.length - 1].date);

  if (firstDate.getFullYear() === lastDate.getFullYear()) {
    return `${compactDateFormatter.format(firstDate)} \u2013 ${compactDateWithYearFormatter.format(lastDate)}`;
  }

  return `${compactDateWithYearFormatter.format(firstDate)} \u2013 ${compactDateWithYearFormatter.format(lastDate)}`;
}

export function WeekPlanningBoard({
  days,
  employees,
  employeeAvailability,
  resources,
  items,
  conflicts,
  selectedCell,
  selectedCard,
  activeDestinationCell,
  selectedCellAvailability,
  canMoveSelectedCard,
  onSelectCell,
  onSelectCard,
  onDeleteCard,
  onMoveSelectedCard,
  onGoToCurrentWeek,
  onGoToNextWeek,
  onGoToPreviousWeek,
  onGoToWeekStartDate,
  onHideEmployee,
  onRemoveEmployeeFromWeek,
  onSetSelectedCellAvailabilityType,
  onToggleSelectedCellAvailability,
  weeklyEmployeeIds
}: WeekPlanningBoardProps) {
  const activeWeekDate = days[0]?.date;
  const activeWeekNumber = activeWeekDate ? getIsoWeekNumber(activeWeekDate) : 1;
  const activeWeekYear = activeWeekDate
    ? getIsoWeekYear(activeWeekDate)
    : new Date().getFullYear();
  const weekRangeLabel = formatWeekRange(days);
  const compactWeekRangeLabel = formatCompactWeekRange(days);
  const [weekInput, setWeekInput] = useState(() => String(activeWeekNumber));
  const [yearInput, setYearInput] = useState(() => String(activeWeekYear));
  const [weekJumpError, setWeekJumpError] = useState("");
  const weeklyEmployeeIdSet = new Set(weeklyEmployeeIds);
  const selectedAvailabilityPickerValue =
    selectedCellAvailability && selectedCellAvailability.type !== "unavailable"
      ? selectedCellAvailability.type
      : "";

  useEffect(() => {
    setWeekInput(String(activeWeekNumber));
    setYearInput(String(activeWeekYear));
    setWeekJumpError("");
  }, [activeWeekNumber, activeWeekYear]);

  function submitWeekJump(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const week = Number(weekInput);
    const year = Number(yearInput);

    if (!Number.isInteger(year) || year < 2000 || year > 2100) {
      setWeekJumpError("Gebruik een jaar tussen 2000 en 2100.");
      return;
    }

    if (!Number.isInteger(week)) {
      setWeekJumpError("Gebruik een geldig weeknummer.");
      return;
    }

    const maxWeeks = getIsoWeeksInYear(year);

    if (week < 1 || week > maxWeeks) {
      setWeekJumpError(`Week ${week} bestaat niet in ${year}.`);
      return;
    }

    onGoToWeekStartDate(getDateForIsoWeek(year, week));
    setWeekJumpError("");
  }

  return (
    <section>
      <div className="mb-3 grid gap-2 lg:grid-cols-[minmax(180px,1fr)_auto_minmax(260px,1fr)] lg:items-start">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase text-perceel-green">
            Weekplanning
          </p>
          <h2 className="mt-1 text-lg font-bold leading-6 text-perceel-dark sm:text-xl">
            Matrix per werknemer en dag
          </h2>
        </div>
        <div
          aria-label={`Week ${activeWeekNumber} ${activeWeekYear}, ${weekRangeLabel}`}
          className="flex w-full max-w-none shrink-0 flex-col items-center gap-1 rounded-md border border-perceel-line bg-white px-2 py-1.5 sm:max-w-[520px] lg:w-fit"
        >
          <div className="flex items-center gap-2">
            <button
              aria-label="Vorige week"
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-slate-50 text-sm font-bold text-slate-600 hover:bg-white hover:text-perceel-dark"
              onClick={onGoToPreviousWeek}
              type="button"
            >
              ◀
            </button>
            <span className="min-w-[96px] text-center text-base font-bold leading-5 text-perceel-dark">
              Week {activeWeekNumber}
            </span>
            <button
              aria-label="Volgende week"
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-slate-50 text-sm font-bold text-slate-600 hover:bg-white hover:text-perceel-dark"
              onClick={onGoToNextWeek}
              type="button"
            >
              ▶
            </button>
          </div>
          <p className="text-xs font-semibold text-slate-500">
            {compactWeekRangeLabel}
          </p>
          <form
            className="flex flex-wrap items-center justify-center gap-1"
            noValidate
            onSubmit={submitWeekJump}
          >
            <label
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-500"
              htmlFor="week-jump-week"
            >
              Week
              <input
                className="h-7 w-12 rounded border border-slate-300 px-1 text-xs font-semibold text-slate-700"
                id="week-jump-week"
                max={53}
                min={1}
                onChange={(event) => {
                  setWeekInput(event.target.value);
                  setWeekJumpError("");
                }}
                type="number"
                value={weekInput}
              />
            </label>
            <label
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-500"
              htmlFor="week-jump-year"
            >
              Jaar
              <input
                className="h-7 w-16 rounded border border-slate-300 px-1 text-xs font-semibold text-slate-700"
                id="week-jump-year"
                max={2100}
                min={2000}
                onChange={(event) => {
                  setYearInput(event.target.value);
                  setWeekJumpError("");
                }}
                type="number"
                value={yearInput}
              />
            </label>
            <button
              className="h-7 rounded bg-slate-800 px-2 text-xs font-semibold text-white hover:bg-slate-700"
              type="submit"
            >
              Ga
            </button>
            <button
              className="h-7 rounded border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-perceel-dark"
              onClick={onGoToCurrentWeek}
              type="button"
            >
              Vandaag
            </button>
          </form>
          {weekJumpError ? (
            <p className="basis-full px-2 text-[11px] font-semibold text-red-700">
              {weekJumpError}
            </p>
          ) : null}
        </div>
        <div className="flex min-h-[34px] flex-wrap items-center justify-start gap-2 lg:justify-end">
          {selectedCell ? (
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <button
                className={`rounded-md border px-3 py-2 text-xs font-semibold ${
                  selectedCellAvailability
                    ? "border-slate-400 bg-slate-700 text-white hover:bg-slate-800"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
                data-action="toggle-selected-cell-availability"
                onClick={onToggleSelectedCellAvailability}
                type="button"
              >
                {selectedCellAvailability
                  ? "Beschikbaar maken"
                  : "Niet beschikbaar"}
              </button>
              <select
                aria-label="Availability type"
                className="h-[34px] rounded-md border border-slate-300 bg-white px-2 text-xs font-semibold text-slate-600"
                data-action="set-selected-cell-availability-type"
                onChange={(event) =>
                  onSetSelectedCellAvailabilityType(
                    event.target.value as AvailabilityType
                  )
                }
                value={selectedAvailabilityPickerValue}
              >
                <option disabled value="">
                  Kies type...
                </option>
                {secondaryAvailabilityTypes.map((type) => (
                  <option key={type} value={type}>
                  {getAvailabilityLabel(type)}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          {canMoveSelectedCard ? (
            <button
              className="w-full rounded-md bg-perceel-green px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-800 sm:w-auto"
              data-action="move-selected-card"
              onClick={onMoveSelectedCard}
              type="button"
            >
              Verplaats naar actieve cel
            </button>
          ) : null}
          <div className="flex shrink-0 items-center gap-2">
            <ConflictSummary conflicts={conflicts} />
            <p className="text-xs font-semibold text-slate-500">
              Maandag tot zondag
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto overscroll-x-contain rounded-md border border-slate-300 bg-white shadow-sm">
        <WeekHeader days={days} />
        {employees.map((employee, index) => {
          const showCategorySeparator =
            index === 0 || employees[index - 1].category !== employee.category;

          return (
            <div key={employee.id}>
              {showCategorySeparator ? (
                <div className="min-w-[1040px] border-b border-slate-300 bg-slate-200/85 px-2 py-1">
                  <div className="sticky left-0 z-20 w-fit rounded-sm bg-slate-200/95 pr-2 text-[10px] font-bold uppercase tracking-wide text-slate-600">
                    {employee.category}
                  </div>
                </div>
              ) : null}
              <EmployeeRow
                conflicts={conflicts}
                days={days}
                employee={employee}
                rowIndex={index}
                employeeAvailability={employeeAvailability}
                items={items}
                onDeleteCard={onDeleteCard}
                onHideEmployee={onHideEmployee}
                onRemoveEmployeeFromWeek={onRemoveEmployeeFromWeek}
                onSelectCard={onSelectCard}
                onSelectCell={onSelectCell}
                resources={resources}
                activeDestinationCell={activeDestinationCell}
                isWeeklyAddedEmployee={weeklyEmployeeIdSet.has(employee.id)}
                selectedCard={selectedCard}
                selectedCell={selectedCell}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
