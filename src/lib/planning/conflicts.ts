import type {
  PlanningConflict,
  PlanningItem,
  Resource
} from "@/types/planning";
import { formatPlanningDate } from "@/lib/planning/date-format";
import { getPlanningItemResourceIds } from "@/lib/planning/planning-resources";
import { getResourceDisplayLabel } from "@/lib/planning/resources";

function getResourceLabel(resource: Resource | undefined): string {
  if (!resource) {
    return "Onbekende resource";
  }

  return getResourceDisplayLabel(resource);
}

export function findPlanningConflicts(
  items: PlanningItem[],
  resources: Resource[]
): PlanningConflict[] {
  const conflicts: PlanningConflict[] = [];
  const resourcesById = new Map(
    resources.map((resource) => [resource.id, resource])
  );
  const itemsByDateAndResource = new Map<string, PlanningItem[]>();

  for (const item of items) {
    const resourceIds = getPlanningItemResourceIds(item);

    for (const resourceId of resourceIds) {
      const key = `${item.date}:${resourceId}`;
      const currentItems = itemsByDateAndResource.get(key) ?? [];
      itemsByDateAndResource.set(key, [...currentItems, item]);
    }
  }

  for (const [key, groupedItems] of itemsByDateAndResource.entries()) {
    if (groupedItems.length < 2) {
      continue;
    }

    const [firstItem] = groupedItems;
    const [date, resourceId] = key.split(":");

    if (!resourceId) {
      continue;
    }

    const resource = resourcesById.get(resourceId);

    conflicts.push({
      id: `duplicate-${date}-${resourceId}`,
      type: "duplicate-resource",
      severity: "warning",
      message: `${getResourceLabel(resource)} is meerdere keren ingepland op ${formatPlanningDate(date)}.`,
      date,
      resourceId,
      planningItemIds: groupedItems.map((item) => item.id)
    });
  }

  return conflicts;
}
