import type {
  EmployeeAvailability,
  SelectedPlanningCell
} from "@/components/planning/matrix";

export type AvailabilityType =
  | "unavailable"
  | "recovery"
  | "vacation"
  | "weather_leave"
  | "sick_leave";

export function getAvailabilityKey(employeeId: string, date: string): string {
  return `${employeeId}:${date}`;
}

export function findEmployeeAvailability(
  employeeAvailability: EmployeeAvailability[],
  cell: SelectedPlanningCell | null | undefined
): EmployeeAvailability | undefined {
  if (!cell) {
    return undefined;
  }

  const targetKey = getAvailabilityKey(cell.employeeId, cell.date);

  return employeeAvailability.find(
    (availability) =>
      getAvailabilityKey(availability.employeeId, availability.date) ===
      targetKey
  );
}

export function hasEmployeeAvailability(
  employeeAvailability: EmployeeAvailability[],
  cell: SelectedPlanningCell | null | undefined
): boolean {
  return Boolean(findEmployeeAvailability(employeeAvailability, cell));
}

export function setEmployeeAvailabilityType(
  current: EmployeeAvailability[],
  cell: SelectedPlanningCell,
  type: AvailabilityType
): EmployeeAvailability[] {
  const targetKey = getAvailabilityKey(cell.employeeId, cell.date);
  const nextAvailability = {
    employeeId: cell.employeeId,
    date: cell.date,
    type
  };
  const hasExistingAvailability = current.some(
    (availability) =>
      getAvailabilityKey(availability.employeeId, availability.date) ===
      targetKey
  );

  if (!hasExistingAvailability) {
    return [...current, nextAvailability];
  }

  return current.map((availability) =>
    getAvailabilityKey(availability.employeeId, availability.date) === targetKey
      ? nextAvailability
      : availability
  );
}

export function clearEmployeeAvailability(
  current: EmployeeAvailability[],
  cell: SelectedPlanningCell
): EmployeeAvailability[] {
  const targetKey = getAvailabilityKey(cell.employeeId, cell.date);

  return current.filter(
    (availability) =>
      getAvailabilityKey(availability.employeeId, availability.date) !==
      targetKey
  );
}

export function toggleUnavailableAvailability(
  current: EmployeeAvailability[],
  cell: SelectedPlanningCell
): EmployeeAvailability[] {
  const currentAvailability = findEmployeeAvailability(current, cell);

  if (currentAvailability?.type === "unavailable") {
    return clearEmployeeAvailability(current, cell);
  }

  return setEmployeeAvailabilityType(current, cell, "unavailable");
}

export function getAvailabilityLabel(type: AvailabilityType): string {
  const labels: Record<AvailabilityType, string> = {
    unavailable: "Niet beschikbaar",
    recovery: "Recup",
    vacation: "Jaarlijkse vakantie",
    weather_leave: "Weerverlet",
    sick_leave: "Ziekte"
  };

  return labels[type];
}

export function getAvailabilityShortLabel(type: AvailabilityType): string {
  const labels: Record<AvailabilityType, string> = {
    unavailable: "Niet beschikbaar",
    recovery: "Recup",
    vacation: "Vakantie",
    weather_leave: "Weer",
    sick_leave: "Ziek"
  };

  return labels[type];
}

export function getAvailabilityCellLabel(type: AvailabilityType): string {
  const labels: Record<AvailabilityType, string> = {
    unavailable: "Niet beschikbaar",
    recovery: "Recup",
    vacation: "Vakantie",
    weather_leave: "Weerverlet",
    sick_leave: "Ziekte"
  };

  return labels[type];
}

export function getAvailabilityIndicator(type: AvailabilityType): string {
  const indicators: Record<AvailabilityType, string> = {
    unavailable: "NB",
    recovery: "REC",
    vacation: "VAK",
    weather_leave: "WV",
    sick_leave: "ZK"
  };

  return indicators[type];
}

export function getAvailabilityClassName(
  type: AvailabilityType,
  density: "empty" | "occupied" = "occupied"
): string {
  if (density === "empty") {
    const classNames: Record<AvailabilityType, string> = {
      unavailable: "border-slate-300 bg-slate-100 text-slate-700",
      recovery: "border-emerald-200 bg-emerald-50 text-emerald-800",
      vacation: "border-sky-200 bg-sky-50 text-sky-800",
      weather_leave: "border-amber-200 bg-amber-50 text-amber-800",
      sick_leave: "border-rose-200 bg-rose-50 text-rose-800"
    };

    return classNames[type];
  }

  const classNames: Record<AvailabilityType, string> = {
    unavailable: "border-slate-300 bg-slate-50 text-slate-600",
    recovery: "border-emerald-200 bg-emerald-50 text-emerald-700",
    vacation: "border-sky-200 bg-sky-50 text-sky-700",
    weather_leave: "border-amber-200 bg-amber-50 text-amber-700",
    sick_leave: "border-rose-200 bg-rose-50 text-rose-700"
  };

  return classNames[type];
}
