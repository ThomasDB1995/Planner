import type { PlanningItem, WorkCard } from "@/types/planning";

export type WorkCardScopeNote = {
  readonly planningContext: "read-only-planner-detail";
  readonly nonGoals: readonly [
    "work-order",
    "post-calculation",
    "material-catalog",
    "execution-registration"
  ];
};

export const WORK_CARD_SCOPE: WorkCardScopeNote = {
  planningContext: "read-only-planner-detail",
  nonGoals: [
    "work-order",
    "post-calculation",
    "material-catalog",
    "execution-registration"
  ]
};

export type WorkCardSourcePlanningItem = Pick<
  PlanningItem,
  "id" | "employeeId" | "date" | "resourceId" | "resourceIds" | "taskName"
>;

export type WorkCardIdentity = Pick<WorkCard, "employeeId" | "date">;

export function getWorkCardKey({ employeeId, date }: WorkCardIdentity): string {
  return `${employeeId}:${date}`;
}

export function isPlanningItemForWorkCard(
  item: Pick<PlanningItem, "employeeId" | "date">,
  workCard: WorkCardIdentity
): boolean {
  return item.employeeId === workCard.employeeId && item.date === workCard.date;
}
