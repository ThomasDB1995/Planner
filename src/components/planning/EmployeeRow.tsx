import type {
  EmployeeAvailability,
  SelectedPlanningCard,
  SelectedPlanningCell
} from "@/components/planning/matrix";
import { PlanningCell } from "@/components/planning/PlanningCell";
import { findEmployeeAvailability } from "@/lib/planning/availability";
import { getEmployeeDisplayName } from "@/lib/planning/employees";
import type { WeekDay } from "@/lib/planning/week";
import type {
  Employee,
  PlanningConflict,
  PlanningItem,
  Resource
} from "@/types/planning";

type EmployeeRowProps = {
  employee: Employee;
  rowIndex: number;
  employeeAvailability: EmployeeAvailability[];
  days: WeekDay[];
  items: PlanningItem[];
  resources: Resource[];
  conflicts: PlanningConflict[];
  selectedCell: SelectedPlanningCell | null;
  selectedCard: SelectedPlanningCard | null;
  activeDestinationCell: SelectedPlanningCell | null;
  isEditingEnabled?: boolean;
  onSelectCell: (cell: SelectedPlanningCell) => void;
  onSelectCard: (card: SelectedPlanningCard) => void;
  onDeleteCard: (planningItemId: string) => void;
  onRemoveEmployeeFromWeek?: (employeeId: string) => void;
  isWeeklyAddedEmployee?: boolean;
};

function isWeekendDay(day: WeekDay): boolean {
  return day.dayLabel === "Zaterdag" || day.dayLabel === "Zondag";
}

function getEmployeeNameParts(employee: Employee): {
  firstName: string;
  lastName: string;
} {
  const firstName = employee.firstName.trim();
  const lastName = employee.lastName.trim();

  if (firstName && lastName) {
    return { firstName, lastName };
  }

  const displayName = getEmployeeDisplayName(employee);
  const [fallbackFirstName = "", ...fallbackLastNameParts] =
    displayName.split(/\s+/);

  return {
    firstName: fallbackFirstName,
    lastName: fallbackLastNameParts.join(" ")
  };
}

export function EmployeeRow({
  employee,
  rowIndex,
  employeeAvailability,
  days,
  items,
  resources,
  conflicts,
  selectedCell,
  selectedCard,
  activeDestinationCell,
  isEditingEnabled = true,
  onSelectCell,
  onSelectCard,
  onDeleteCard,
  onRemoveEmployeeFromWeek,
  isWeeklyAddedEmployee = false
}: EmployeeRowProps) {
  const employeeDisplayName = getEmployeeDisplayName(employee);
  const { firstName: employeeFirstName, lastName: employeeLastName } =
    getEmployeeNameParts(employee);
  const rowTone = rowIndex % 2 === 1 ? "soft" : "plain";
  const employeeCellToneStyle =
    rowTone === "soft" ? "bg-slate-100/95" : "bg-white/95";
  const canRemoveFromWeek =
    isEditingEnabled && isWeeklyAddedEmployee && Boolean(onRemoveEmployeeFromWeek);
  const employeeActionLabel = `${employeeDisplayName} uit deze week halen`;
  const employeeActionTitle = `${employeeDisplayName} uit deze week halen`;

  function getCellAvailability(date: string): EmployeeAvailability | undefined {
    return findEmployeeAvailability(employeeAvailability, {
      employeeId: employee.id,
      date
    });
  }

  return (
    <div className="group grid min-w-[calc(116px+7*(100vw-152px))] grid-cols-[116px_repeat(7,minmax(220px,calc(100vw-152px)))] items-stretch border-b border-slate-300/80 last:border-b-0 sm:min-w-[920px] sm:grid-cols-[144px_repeat(7,minmax(110px,1fr))] lg:min-w-[1040px] lg:grid-cols-[156px_repeat(7,minmax(126px,1fr))]">
      <div
        className={`sticky left-0 z-10 flex min-h-[72px] items-center border-r border-slate-300 px-1.5 py-1.5 text-[12px] font-semibold text-perceel-dark shadow-[3px_0_0_rgba(148,163,184,0.22)] sm:px-2 sm:text-sm ${employeeCellToneStyle}`}
      >
        <div className="relative min-w-0 w-full pr-5">
          <span className="block leading-4" title={employeeDisplayName}>
            {employeeFirstName && employeeLastName ? (
              <>
                <span className="block truncate">{employeeFirstName}</span>
                <span className="block truncate">{employeeLastName}</span>
              </>
            ) : (
              <span className="block whitespace-normal break-words">
                {employeeDisplayName}
              </span>
            )}
          </span>
          {canRemoveFromWeek ? (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded border border-transparent px-1 py-0.5 text-[10px] font-semibold leading-3 text-slate-400 opacity-0 transition-opacity hover:border-slate-200 hover:bg-white hover:text-slate-600 focus:border-slate-200 focus:bg-white focus:text-slate-600 focus:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100"
              aria-label={employeeActionLabel}
              onClick={() => onRemoveEmployeeFromWeek?.(employee.id)}
              title={employeeActionTitle}
              type="button"
            >
              ×
            </button>
          ) : null}
        </div>
      </div>
      {days.map((day) => (
        <PlanningCell
          conflicts={conflicts}
          date={day.date}
          employeeId={employee.id}
          availabilityType={getCellAvailability(day.date)?.type}
          items={items}
          key={day.date}
          onDeleteCard={onDeleteCard}
          isEditingEnabled={isEditingEnabled}
          onSelectCard={onSelectCard}
          onSelectCell={onSelectCell}
          resources={resources}
          activeDestinationCell={activeDestinationCell}
          isWeekend={isWeekendDay(day)}
          rowTone={rowTone}
          selectedCard={selectedCard}
          selectedCell={selectedCell}
        />
      ))}
    </div>
  );
}
