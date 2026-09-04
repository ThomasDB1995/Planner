import type { PlanningConflict } from "@/types/planning";
import { formatPlanningDate } from "@/lib/planning/date-format";

type ConflictSummaryProps = {
  conflicts: PlanningConflict[];
  onSelectConflict?: (conflict: PlanningConflict) => void;
};

export function ConflictSummary({
  conflicts,
  onSelectConflict
}: ConflictSummaryProps) {
  if (conflicts.length === 0) {
    return (
      <div className="rounded-md border border-green-200 bg-green-50 px-2 py-1 text-xs font-semibold text-green-800">
        Geen conflicten
      </div>
    );
  }

  return (
    <div className="max-w-[360px] rounded-md border border-amber-200 bg-amber-50 px-2 py-1.5 text-xs text-amber-900">
      <p className="font-semibold">Waarschuwingen ({conflicts.length})</p>
      <ul className="mt-1 space-y-1">
        {conflicts.map((conflict) => (
          <li key={conflict.id}>
            <button
              className="w-full truncate rounded border border-transparent px-1 py-0.5 text-left hover:border-amber-200 hover:bg-white/70"
              onClick={() => onSelectConflict?.(conflict)}
              title={`${formatPlanningDate(conflict.date)} - ${
                conflict.message
              }`}
              type="button"
            >
              <span className="font-semibold">
                {formatPlanningDate(conflict.date)}
              </span>{" "}
              - {conflict.message}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
