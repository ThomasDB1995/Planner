import type {
  SelectedPlanningCard,
  SelectedPlanningCell
} from "@/components/planning/matrix";
import { PlanningCell } from "@/components/planning/PlanningCell";
import type { WeekDay } from "@/lib/planning/week";
import type {
  Employee,
  PlanningConflict,
  PlanningItem,
  Resource
} from "@/types/planning";

type DayRowProps = {
  day: WeekDay;
  employees: Employee[];
  items: PlanningItem[];
  resources: Resource[];
  conflicts: PlanningConflict[];
  selectedCell: SelectedPlanningCell | null;
  selectedCard: SelectedPlanningCard | null;
  activeDestinationCell: SelectedPlanningCell | null;
  onSelectCell: (cell: SelectedPlanningCell) => void;
  onSelectCard: (card: SelectedPlanningCard) => void;
  onDeleteCard: (planningItemId: string) => void;
};

export function DayRow({
  day,
  employees,
  items,
  resources,
  conflicts,
  selectedCell,
  selectedCard,
  activeDestinationCell,
  onSelectCell,
  onSelectCard,
  onDeleteCard
}: DayRowProps) {
  return (
    <div className="grid min-w-[980px] grid-cols-[135px_repeat(3,minmax(210px,1fr))] border-b border-perceel-line last:border-b-0">
      <div className="border-r border-perceel-line bg-slate-50 px-3 py-2 text-sm font-semibold text-perceel-dark">
        <span>{day.shortLabel}</span>
        <span className="mt-0.5 block text-xs font-normal text-slate-500">
          {day.date}
        </span>
      </div>
      {employees.map((employee) => (
        <PlanningCell
          conflicts={conflicts}
          date={day.date}
          employeeId={employee.id}
          items={items}
          key={employee.id}
          onDeleteCard={onDeleteCard}
          onSelectCard={onSelectCard}
          onSelectCell={onSelectCell}
          resources={resources}
          activeDestinationCell={activeDestinationCell}
          selectedCard={selectedCard}
          selectedCell={selectedCell}
        />
      ))}
    </div>
  );
}
