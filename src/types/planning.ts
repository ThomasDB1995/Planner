export type EmployeeCategory =
  | "Werknemer"
  | "Zelfstandige"
  | "Werknemer, bureau"
  | "Flexi-job"
  | "Vakantiejob";

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  category: EmployeeCategory;
  sortOrder: number;
  isDefaultVisible?: boolean;
  isHidden?: boolean;
};

export type Resource = {
  id: string;
  number: string;
  group?: string;
  name: string;
  brand?: string;
  category: "machine" | "voertuig" | "werktuig" | "aanhanger";
  type: string;
  isDefective: boolean;
  isFavorite?: boolean;
};

export type PlanningStatus = "voorlopig" | "bevestigd" | "uitgevoerd";

export type PlanningItem = {
  id: string;
  date: string;
  employeeId: string;
  taskName: string;
  resourceId?: string;
  resourceIds?: string[];
  status: PlanningStatus;
  createdBy?: string;
  createdByEmail?: string;
  updatedBy?: string;
  updatedByEmail?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type WorkCardTerrain = {
  id: string;
  name: string;
  instruction?: string;
  materialText?: string;
  methodText?: string;
  note?: string;
  sortOrder: number;
};

export type WorkCardProject = {
  id: string;
  title: string;
  note?: string;
  sortOrder: number;
  terrains: WorkCardTerrain[];
};

export type WorkCard = {
  id: string;
  employeeId: string;
  date: string;
  resourceIds?: string[];
  dayNote?: string;
  projects: WorkCardProject[];
  sourcePlanningItemIds?: string[];
};

export type PlanningConflict = {
  id: string;
  type: "duplicate-resource";
  severity: "warning";
  message: string;
  date: string;
  resourceId: string;
  planningItemIds: string[];
};
