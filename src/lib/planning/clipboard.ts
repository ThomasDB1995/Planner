import type { PlanningItem } from "@/types/planning";
import { getPlanningItemResourceIds, withPlanningItemResourceIds } from "@/lib/planning/planning-resources";

export type PlanningClipboard = { mode: "cut" | "copy"; item: PlanningItem };
export type PlanningDestination = { employeeId: string; date: string };

export function copyPlanningItem(item: PlanningItem, destination: PlanningDestination, id: string): PlanningItem {
  return withPlanningItemResourceIds({
    id,
    ...destination,
    taskName: item.taskName,
    status: item.status
  }, getPlanningItemResourceIds(item));
}

export function isSamePlanningCell(item: PlanningDestination, destination: PlanningDestination): boolean {
  return item.date === destination.date && item.employeeId === destination.employeeId;
}
