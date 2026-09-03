import type { PlanningConflict, PlanningItem, Resource } from "@/types/planning";
import { getResourceDisplayLabel } from "@/lib/planning/resources";

type PlanningCardProps = {
  item: PlanningItem;
  resources: Resource[];
  conflicts: PlanningConflict[];
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
};

function getConflictLabel(conflict: PlanningConflict): string {
  return "Dubbel";
}

function getUserInitial(email: string): string {
  const localPart = email.split("@")[0]?.trim() ?? "";
  return localPart.charAt(0).toUpperCase();
}

export function PlanningCard({
  item,
  resources,
  conflicts,
  isSelected,
  onSelect,
  onDelete
}: PlanningCardProps) {
  const selectedStyle = isSelected
    ? "border-perceel-green bg-emerald-50 ring-2 ring-inset ring-perceel-green shadow-[inset_3px_0_0_rgba(5,150,105,0.18)]"
    : "";
  const visibleResourceChips = resources.slice(0, 2);
  const hiddenResourceCount = Math.max(
    resources.length - visibleResourceChips.length,
    0
  );
  const resourceTitle = resources
    .map((resource) => getResourceDisplayLabel(resource))
    .join("\n");
  const auditEmail = item.updatedByEmail ?? item.createdByEmail ?? "";
  const auditInitial = auditEmail ? getUserInitial(auditEmail) : "";
  const auditTitle = [
    item.createdByEmail ? `Aangemaakt door ${item.createdByEmail}` : "",
    item.updatedByEmail ? `Gewijzigd door ${item.updatedByEmail}` : ""
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <article
      className={`relative border-l-4 border-slate-300 bg-white px-1.5 py-0.5 text-xs leading-4 text-slate-700 ${
        auditInitial ? "pb-3 pr-6" : ""
      } ${selectedStyle}`}
      data-selected={isSelected ? "true" : "false"}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="truncate font-semibold text-slate-950" title={item.taskName}>
          {item.taskName}
        </p>
        <div className="flex shrink-0 items-start gap-1">
          <button
            aria-label={`Verwijder ${item.taskName}`}
            className="rounded border border-transparent px-1 text-[11px] font-bold leading-3 text-slate-500 hover:border-slate-300 hover:bg-white hover:text-red-700"
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
            type="button"
          >
            x
          </button>
        </div>
      </div>
      {resources.length > 0 ? (
        <div
          className="mt-0.5 flex min-w-0 flex-wrap gap-1"
          title={resourceTitle}
        >
          {visibleResourceChips.map((resource) => (
            <span
              className="border border-slate-300 bg-slate-50 px-1 py-0.5 text-[10px] font-semibold leading-3 text-slate-700"
              key={resource.id}
            >
              {resource.number}
            </span>
          ))}
          {hiddenResourceCount > 0 ? (
            <span className="border border-slate-300 bg-slate-100 px-1 py-0.5 text-[10px] font-semibold leading-3 text-slate-600">
              +{hiddenResourceCount}
            </span>
          ) : null}
        </div>
      ) : null}
      {conflicts.length > 0 ? (
        <div className="mt-0.5 flex flex-wrap gap-1">
          {conflicts.map((conflict) => (
            <span
              className="border border-amber-400 bg-amber-100 px-1 py-0.5 text-[10px] font-semibold uppercase text-amber-950"
              key={conflict.id}
              title={conflict.message}
            >
              {getConflictLabel(conflict)}
            </span>
          ))}
        </div>
      ) : null}
      {auditInitial ? (
        <span
          aria-label={auditTitle}
          className="absolute bottom-0.5 right-1 flex h-4 min-w-4 items-center justify-center rounded border border-slate-200 bg-slate-50 px-1 text-[10px] font-bold leading-none text-slate-500"
          title={auditTitle}
        >
          {auditInitial}
        </span>
      ) : null}
    </article>
  );
}
