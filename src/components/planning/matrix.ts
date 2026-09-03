import type { AvailabilityType } from "@/lib/planning/availability";

export type SelectedPlanningCell = {
  employeeId: string;
  date: string;
};

export type SelectedPlanningCard = {
  planningItemId: string;
};

export type EmployeeAvailability = SelectedPlanningCell & {
  type: AvailabilityType;
};
