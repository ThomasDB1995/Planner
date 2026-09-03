import { getEmployeeDisplayName } from "@/lib/planning/employees";
import { getPlanningItemResourceIds } from "@/lib/planning/planning-resources";
import { getResourceDisplayLabel } from "@/lib/planning/resources";
import type { Employee, PlanningItem, Resource } from "@/types/planning";

type WorkCardPreviewProps = {
  employee: Employee;
  date: string;
  items: PlanningItem[];
  resources: Resource[];
};

const workCardDateFormatter = new Intl.DateTimeFormat("nl-BE", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
});

function getUniqueResourcesForItems(
  items: PlanningItem[],
  resources: Resource[]
): Resource[] {
  const resourceIds = new Set<string>();
  const uniqueResources: Resource[] = [];

  for (const item of items) {
    for (const resourceId of getPlanningItemResourceIds(item)) {
      if (resourceIds.has(resourceId)) {
        continue;
      }

      const resource = resources.find(
        (currentResource) => currentResource.id === resourceId
      );

      if (!resource) {
        continue;
      }

      resourceIds.add(resourceId);
      uniqueResources.push(resource);
    }
  }

  return uniqueResources;
}

export function WorkCardPreview({
  employee,
  date,
  items,
  resources
}: WorkCardPreviewProps) {
  const dayResources = getUniqueResourcesForItems(items, resources);
  const formattedDate = workCardDateFormatter.format(new Date(date));

  return (
    <aside className="rounded-md border border-perceel-line bg-white px-3 py-2 text-xs shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase text-perceel-green">
            Werkkaart
          </p>
          <h2 className="mt-0.5 truncate text-base font-bold text-perceel-dark">
            {getEmployeeDisplayName(employee)}
          </h2>
          <p className="mt-0.5 font-semibold text-slate-500">
            {formattedDate}
          </p>
        </div>

        <div className="grid min-w-[280px] flex-1 gap-2 md:grid-cols-2">
          <div>
            <p className="text-[10px] font-semibold uppercase text-slate-500">
              Materieel vandaag
            </p>
            {dayResources.length > 0 ? (
              <div className="mt-1 flex flex-wrap gap-1">
                {dayResources.map((resource) => (
                  <span
                    className="border border-slate-300 bg-slate-50 px-1 py-0.5 text-[10px] font-semibold leading-3 text-slate-700"
                    key={resource.id}
                    title={getResourceDisplayLabel(resource)}
                  >
                    {resource.number}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-1 font-semibold text-slate-400">
                Geen materieel gepland.
              </p>
            )}
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase text-slate-500">
              Opdrachten vandaag
            </p>
            {items.length > 0 ? (
              <ul className="mt-1 space-y-1">
                {items.map((item) => (
                  <li
                    className="truncate border-l-2 border-slate-300 pl-2 font-semibold text-slate-700"
                    key={item.id}
                    title={item.taskName}
                  >
                    {item.taskName}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 font-semibold text-slate-400">
                Geen opdrachten gepland.
              </p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
