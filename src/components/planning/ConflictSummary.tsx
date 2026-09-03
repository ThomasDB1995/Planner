import type { PlanningConflict } from "@/types/planning";
import { formatPlanningDate } from "@/lib/planning/date-format";

type ConflictSummaryProps = {
  conflicts: PlanningConflict[];
};

export function ConflictSummary({ conflicts }: ConflictSummaryProps) {
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
      <ul className="mt-1 space-y-0.5">
        {conflicts.map((conflict) => (
          <li className="truncate" key={conflict.id} title={conflict.message}>
            <span className="font-semibold">
              {formatPlanningDate(conflict.date)}
            </span>{" "}
            -{" "}
            {conflict.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
