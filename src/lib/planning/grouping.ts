import type { PlanningItem } from "@/types/planning";

export function findPlanningItemsForCell(
  items: PlanningItem[],
  employeeId: string,
  date: string
): PlanningItem[] {
  return items.filter(
    (item) => item.employeeId === employeeId && item.date === date
  );
}
