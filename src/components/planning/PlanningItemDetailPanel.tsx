import type { Employee, PlanningItem, Resource } from "@/types/planning";
import { formatPlanningDate } from "@/lib/planning/date-format";
import { getEmployeeDisplayName } from "@/lib/planning/employees";
import { getPlanningItemResourceIds } from "@/lib/planning/planning-resources";
import { getResourceDisplayLabel } from "@/lib/planning/resources";

type PlanningItemDetailPanelProps = {
  employee: Employee;
  item: PlanningItem;
  resources: Resource[];
  onClose: () => void;
};

export function PlanningItemDetailPanel({
  employee,
  item,
  resources,
  onClose
}: PlanningItemDetailPanelProps) {
  const itemResources = getPlanningItemResourceIds(item)
    .map((resourceId) =>
      resources.find((resource) => resource.id === resourceId)
    )
    .filter((resource): resource is Resource => Boolean(resource));
  const auditLines = [
    item.createdByEmail ? `Aangemaakt door ${item.createdByEmail}` : "",
    item.updatedByEmail ? `Gewijzigd door ${item.updatedByEmail}` : ""
  ].filter(Boolean);

  return (
    <aside className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-40 rounded-md border border-perceel-line bg-white p-3 text-xs shadow-lg sm:static sm:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase text-perceel-green">
            Planningdetail
          </p>
          <h2 className="mt-0.5 truncate text-base font-bold text-perceel-dark">
            {item.taskName}
          </h2>
          <p className="mt-0.5 font-semibold text-slate-500">
            {getEmployeeDisplayName(employee)} · {formatPlanningDate(item.date)}
          </p>
        </div>
        <button
          aria-label="Planningdetail sluiten"
          className="rounded border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          onClick={onClose}
          type="button"
        >
          Sluiten
        </button>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(220px,0.7fr)]">
        <div className="min-w-0 rounded border border-slate-100 bg-slate-50 px-2 py-1.5">
          <p className="text-[10px] font-semibold uppercase text-slate-500">
            Taak/project
          </p>
          <p className="mt-0.5 break-words font-semibold text-slate-900">
            {item.taskName}
          </p>
        </div>
        <div className="min-w-0 rounded border border-slate-100 bg-slate-50 px-2 py-1.5">
          <p className="text-[10px] font-semibold uppercase text-slate-500">
            Materieel
          </p>
          {itemResources.length > 0 ? (
            <div className="mt-1 flex flex-wrap gap-1">
              {itemResources.map((resource) => (
                <span
                  className="rounded-sm border border-slate-300 bg-white px-1.5 py-0.5 text-[11px] font-semibold text-slate-700"
                  key={resource.id}
                  title={getResourceDisplayLabel(resource)}
                >
                  {resource.number}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-0.5 font-semibold text-slate-500">
              Geen materieel gekozen
            </p>
          )}
        </div>
      </div>

      {auditLines.length > 0 ? (
        <div className="mt-2 rounded border border-slate-100 bg-white px-2 py-1.5 text-[11px] font-semibold text-slate-500">
          {auditLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}
    </aside>
  );
}
