import type { PlanningItem } from "@/types/planning";

type ResourceIdInput = string | null | undefined;

export function normalizeResourceIds(
  ids: ResourceIdInput[] | null | undefined
): string[] {
  if (!ids) {
    return [];
  }

  const seenResourceIds = new Set<string>();
  const normalizedResourceIds: string[] = [];

  for (const id of ids) {
    const normalizedId = id?.trim();

    if (!normalizedId || seenResourceIds.has(normalizedId)) {
      continue;
    }

    seenResourceIds.add(normalizedId);
    normalizedResourceIds.push(normalizedId);
  }

  return normalizedResourceIds;
}

export function getPlanningItemResourceIds(
  item: Pick<PlanningItem, "resourceId" | "resourceIds">
): string[] {
  return normalizeResourceIds([item.resourceId, ...(item.resourceIds ?? [])]);
}

export function withPlanningItemResourceIds<T extends object>(
  item: T,
  resourceIds: ResourceIdInput[] | null | undefined
): T & Pick<PlanningItem, "resourceId" | "resourceIds"> {
  const normalizedResourceIds = normalizeResourceIds(resourceIds);
  const primaryResourceId = normalizedResourceIds[0];

  return {
    ...item,
    resourceId: primaryResourceId,
    resourceIds:
      normalizedResourceIds.length > 0 ? normalizedResourceIds : undefined
  };
}
