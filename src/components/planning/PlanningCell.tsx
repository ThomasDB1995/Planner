import { PlanningCard } from "@/components/planning/PlanningCard";
import type {
  SelectedPlanningCard,
  SelectedPlanningCell
} from "@/components/planning/matrix";
import type { AvailabilityType } from "@/lib/planning/availability";
import {
  getAvailabilityCellLabel,
  getAvailabilityClassName,
  getAvailabilityIndicator,
  getAvailabilityLabel
} from "@/lib/planning/availability";
import { findPlanningItemsForCell } from "@/lib/planning/grouping";
import { getPlanningItemResourceIds } from "@/lib/planning/planning-resources";
import type {
  PlanningConflict,
  PlanningItem,
  Resource
} from "@/types/planning";

type PlanningCellProps = {
  employeeId: string;
  date: string;
  isWeekend?: boolean;
  rowTone?: "plain" | "soft";
  availabilityType?: AvailabilityType;
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
};

function getAvailabilityCellStateStyle(
  type: AvailabilityType | undefined,
  hasPlanningItems: boolean,
  isWeekend: boolean,
  rowTone: "plain" | "soft"
): string {
  if (!type) {
    if (isWeekend) {
      return rowTone === "soft"
        ? "border-slate-300/75 bg-slate-200/60 hover:bg-slate-200/75"
        : "border-slate-300/75 bg-slate-100/85 hover:bg-slate-200/65";
    }

    return rowTone === "soft"
      ? "border-slate-300/75 bg-slate-100/55 hover:bg-perceel-soft"
      : "border-slate-300/70 bg-white hover:bg-perceel-soft";
  }

  if (hasPlanningItems) {
    return "border-slate-300/80 bg-white hover:bg-slate-50";
  }

  const classNames: Record<AvailabilityType, string> = {
    unavailable:
      "border-slate-300/80 bg-slate-100/90 shadow-[inset_3px_0_0_rgba(100,116,139,0.35)] hover:bg-slate-100",
    recovery:
      "border-slate-300/80 bg-emerald-50 shadow-[inset_3px_0_0_rgba(16,185,129,0.28)] hover:bg-emerald-50",
    vacation:
      "border-slate-300/80 bg-sky-50 shadow-[inset_3px_0_0_rgba(14,165,233,0.28)] hover:bg-sky-50",
    weather_leave:
      "border-slate-300/80 bg-amber-50 shadow-[inset_3px_0_0_rgba(245,158,11,0.3)] hover:bg-amber-50",
    sick_leave:
      "border-slate-300/80 bg-rose-50 shadow-[inset_3px_0_0_rgba(244,63,94,0.26)] hover:bg-rose-50"
  };

  return classNames[type];
}

export function PlanningCell({
  employeeId,
  date,
  isWeekend = false,
  rowTone = "plain",
  availabilityType,
  items,
  resources,
  conflicts,
  selectedCell,
  selectedCard,
  activeDestinationCell,
  isEditingEnabled = true,
  onSelectCell,
  onSelectCard,
  onDeleteCard
}: PlanningCellProps) {
  const cellItems = findPlanningItemsForCell(items, employeeId, date);
  const hasPlanningItems = cellItems.length > 0;
  const isSelected =
    selectedCell?.employeeId === employeeId && selectedCell.date === date;
  const isDestination =
    activeDestinationCell?.employeeId === employeeId &&
    activeDestinationCell.date === date;
  const isRelocationContext = isEditingEnabled && Boolean(selectedCard);
  const baseCellStateStyle =
    isRelocationContext && hasPlanningItems
      ? "border-amber-100 bg-amber-50/20 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.12)] hover:bg-amber-50/35"
      : getAvailabilityCellStateStyle(
          availabilityType,
          hasPlanningItems,
          isWeekend,
          rowTone
        );
  const stateStyle = isDestination
    ? "border-amber-400 bg-amber-50 ring-2 ring-inset ring-amber-500 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.22)]"
    : isSelected
      ? `${baseCellStateStyle} border-emerald-400 ring-2 ring-inset ring-perceel-green`
      : baseCellStateStyle;

  return (
    <div
      className={`h-full min-h-[72px] snap-start border-r border-slate-300/80 px-1 py-1 outline-none last:border-r-0 ${
        isEditingEnabled ? "cursor-pointer" : ""
      } ${stateStyle}`}
      data-date={date}
      data-destination={isDestination ? "true" : "false"}
      data-employee-id={employeeId}
      data-selected={isSelected ? "true" : "false"}
      data-availability-type={availabilityType}
      onClick={() => {
        if (isEditingEnabled) {
          onSelectCell({ employeeId, date });
        }
      }}
      onKeyDown={(event) => {
        if (!isEditingEnabled) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelectCell({ employeeId, date });
        }
      }}
      role={isEditingEnabled ? "button" : undefined}
      tabIndex={isEditingEnabled ? 0 : undefined}
    >
      <div className="space-y-1">
        {availabilityType && !hasPlanningItems ? (
          <span
            aria-label={getAvailabilityLabel(availabilityType)}
            className={`inline-flex max-w-full items-center rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold leading-3 ${getAvailabilityClassName(availabilityType, "empty")}`}
            title={getAvailabilityLabel(availabilityType)}
          >
            <span className="truncate">
              {getAvailabilityCellLabel(availabilityType)}
            </span>
          </span>
        ) : null}
        {availabilityType && hasPlanningItems ? (
          <span
            aria-label={getAvailabilityLabel(availabilityType)}
            className={`ml-auto flex h-4 min-w-[22px] w-fit items-center justify-center rounded-sm border px-1 text-[9px] font-semibold uppercase leading-3 ${getAvailabilityClassName(availabilityType, "occupied")}`}
            title={getAvailabilityLabel(availabilityType)}
          >
            {getAvailabilityIndicator(availabilityType)}
          </span>
        ) : null}
        {cellItems.map((item) => (
          <PlanningCard
            conflicts={conflicts.filter((conflict) =>
              conflict.planningItemIds.includes(item.id)
            )}
            isEditingEnabled={isEditingEnabled}
            isSelected={selectedCard?.planningItemId === item.id}
            item={item}
            key={item.id}
            onDelete={() => onDeleteCard(item.id)}
            onSelect={() => onSelectCard({ planningItemId: item.id })}
            resources={getPlanningItemResourceIds(item)
              .map((resourceId) =>
                resources.find((resource) => resource.id === resourceId)
              )
              .filter((resource): resource is Resource => Boolean(resource))}
          />
        ))}
      </div>
    </div>
  );
}
