"use client";

import type { Session } from "@supabase/supabase-js";
import { useCallback, useEffect, useRef, useState } from "react";
import { AuthGate } from "@/components/auth/AuthGate";
import type {
  EmployeeAvailability,
  SelectedPlanningCard,
  SelectedPlanningCell
} from "@/components/planning/matrix";
import { PlanningForm } from "@/components/planning/PlanningForm";
import { WeekPlanningBoard } from "@/components/planning/WeekPlanningBoard";
import { WorkCardPreview } from "@/components/planning/WorkCardPreview";
import { employees } from "@/data/employees";
import type { AvailabilityType } from "@/lib/planning/availability";
import {
  clearEmployeeAvailability,
  findEmployeeAvailability,
  setEmployeeAvailabilityType
} from "@/lib/planning/availability";
import { findPlanningConflicts } from "@/lib/planning/conflicts";
import {
  getAvailableEmployeesForWeekAddition,
  getEmployeeDisplayName,
  getHiddenEmployees,
  getVisibleEmployeesForWeek,
  getWeeklyAddedEmployees,
  showEmployee
} from "@/lib/planning/employees";
import { withPlanningItemResourceIds } from "@/lib/planning/planning-resources";
import {
  addWeeksToDateInputValue,
  getCurrentWeekStartDate,
  getIsoWeekKey,
  getWorkWeek
} from "@/lib/planning/week";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { fetchPlannerEmployees } from "@/lib/supabase/employees";
import {
  createPlannerPlanningItem,
  deletePlannerPlanningItem,
  fetchPlannerPlanningItemsForDateRange,
  subscribePlannerPlanningItems,
  updatePlannerPlanningItem
} from "@/lib/supabase/planning-items";
import { fetchPlannerResources } from "@/lib/supabase/resources";
import {
  deletePlannerAvailability,
  fetchPlannerAvailabilityForDateRange,
  subscribePlannerAvailability,
  upsertPlannerAvailability
} from "@/lib/supabase/availability";
import type { PlannerAuditUser } from "@/lib/supabase/audit";
import {
  addPlannerWeeklyEmployee,
  fetchPlannerWeeklyEmployeeIds,
  removePlannerWeeklyEmployee,
  subscribePlannerWeeklyEmployees
} from "@/lib/supabase/weekly-employees";
import type { PlanningItem, Resource } from "@/types/planning";

type ResourceLoadState = "idle" | "loading" | "ready" | "error";
type EmployeeLoadState = "idle" | "loading" | "ready" | "error";
type PlanningItemsLoadState = "idle" | "loading" | "ready" | "error";

function mergePlanningItemsForDates(
  currentItems: PlanningItem[],
  nextItems: PlanningItem[],
  dates: string[]
): PlanningItem[] {
  const dateSet = new Set(dates);

  return [
    ...currentItems.filter((item) => !dateSet.has(item.date)),
    ...nextItems
  ];
}

function mergeEmployeeAvailabilityForDates(
  currentAvailability: EmployeeAvailability[],
  nextAvailability: EmployeeAvailability[],
  dates: string[]
): EmployeeAvailability[] {
  const dateSet = new Set(dates);

  return [
    ...currentAvailability.filter(
      (availability) => !dateSet.has(availability.date)
    ),
    ...nextAvailability
  ];
}

function upsertEmployeeAvailabilityInState(
  currentAvailability: EmployeeAvailability[],
  nextAvailability: EmployeeAvailability
): EmployeeAvailability[] {
  const availabilityKey = `${nextAvailability.employeeId}:${nextAvailability.date}`;
  const hasExistingAvailability = currentAvailability.some(
    (availability) =>
      `${availability.employeeId}:${availability.date}` === availabilityKey
  );

  if (!hasExistingAvailability) {
    return [...currentAvailability, nextAvailability];
  }

  return currentAvailability.map((availability) =>
    `${availability.employeeId}:${availability.date}` === availabilityKey
      ? nextAvailability
      : availability
  );
}

function removeEmployeeAvailabilityFromState(
  currentAvailability: EmployeeAvailability[],
  targetAvailability: EmployeeAvailability
): EmployeeAvailability[] {
  const availabilityKey = `${targetAvailability.employeeId}:${targetAvailability.date}`;

  return currentAvailability.filter(
    (availability) =>
      `${availability.employeeId}:${availability.date}` !== availabilityKey
  );
}

function setWeeklyEmployeeIdsForWeek(
  currentEmployeesByWeek: Record<string, string[]>,
  weekKey: string,
  employeeIds: string[]
): Record<string, string[]> {
  const nextEmployeesByWeek = { ...currentEmployeesByWeek };

  if (employeeIds.length === 0) {
    delete nextEmployeesByWeek[weekKey];
    return nextEmployeesByWeek;
  }

  nextEmployeesByWeek[weekKey] = employeeIds;
  return nextEmployeesByWeek;
}

function addWeeklyEmployeeIdInState(
  currentEmployeesByWeek: Record<string, string[]>,
  weekKey: string,
  employeeId: string
): Record<string, string[]> {
  const currentEmployeeIds = currentEmployeesByWeek[weekKey] ?? [];

  if (currentEmployeeIds.includes(employeeId)) {
    return currentEmployeesByWeek;
  }

  return setWeeklyEmployeeIdsForWeek(currentEmployeesByWeek, weekKey, [
    ...currentEmployeeIds,
    employeeId
  ]);
}

function removeWeeklyEmployeeIdInState(
  currentEmployeesByWeek: Record<string, string[]>,
  weekKey: string,
  employeeId: string
): Record<string, string[]> {
  const currentEmployeeIds = currentEmployeesByWeek[weekKey] ?? [];
  const nextEmployeeIds = currentEmployeeIds.filter(
    (currentEmployeeId) => currentEmployeeId !== employeeId
  );

  if (nextEmployeeIds.length === currentEmployeeIds.length) {
    return currentEmployeesByWeek;
  }

  return setWeeklyEmployeeIdsForWeek(
    currentEmployeesByWeek,
    weekKey,
    nextEmployeeIds
  );
}

function createPlanningItemId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `planning-${crypto.randomUUID()}`;
  }

  return `planning-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function Home() {
  const [plannerEmployees, setPlannerEmployees] = useState(() => employees);
  const [authSession, setAuthSession] = useState<Session | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceLoadState, setResourceLoadState] =
    useState<ResourceLoadState>("idle");
  const [employeeLoadState, setEmployeeLoadState] =
    useState<EmployeeLoadState>("idle");
  const [planningItemsLoadState, setPlanningItemsLoadState] =
    useState<PlanningItemsLoadState>("idle");
  const [planningSaveError, setPlanningSaveError] = useState("");
  const planningItemSaveTimeoutsRef = useRef<
    Record<string, ReturnType<typeof setTimeout>>
  >({});
  const pendingPlanningItemSavesRef = useRef<Record<string, PlanningItem>>({});
  const [showHiddenEmployees, setShowHiddenEmployees] = useState(false);
  const [showWeekEmployeePanel, setShowWeekEmployeePanel] = useState(false);
  const [weekEmployeeToAddId, setWeekEmployeeToAddId] = useState("");
  const [weeklyEmployeeIdsByWeek, setWeeklyEmployeeIdsByWeek] = useState<
    Record<string, string[]>
  >({});
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(() =>
    getCurrentWeekStartDate()
  );
  const [planningItems, setPlanningItems] = useState<PlanningItem[]>([]);
  const [selectedCell, setSelectedCell] =
    useState<SelectedPlanningCell | null>(null);
  const [selectedCard, setSelectedCard] =
    useState<SelectedPlanningCard | null>(null);
  const [relocationSourceCard, setRelocationSourceCard] =
    useState<SelectedPlanningCard | null>(null);
  const [editingPlanningItemId, setEditingPlanningItemId] =
    useState<string | null>(null);
  const [activeDestinationCell, setActiveDestinationCell] =
    useState<SelectedPlanningCell | null>(null);
  const [employeeAvailability, setEmployeeAvailability] = useState<
    EmployeeAvailability[]
  >([]);
  const days = getWorkWeek(currentWeekStartDate);
  const hasSupabaseConnection = isSupabaseConfigured();
  const auditUser: PlannerAuditUser | undefined = authSession
    ? {
        id: authSession.user.id,
        email: authSession.user.email
      }
    : undefined;
  const resourceStatusLabel =
    resourceLoadState === "ready"
      ? `Supabase · ${resources.length} materieelitems`
      : resourceLoadState === "loading"
        ? "Supabase · materieel laden"
        : resourceLoadState === "error"
          ? "Supabase · materieel niet geladen"
          : hasSupabaseConnection
            ? "Supabase ingesteld"
            : "Supabase niet ingesteld";
  const employeeStatusLabel =
    employeeLoadState === "ready"
      ? `${plannerEmployees.length} werknemers`
      : employeeLoadState === "loading"
        ? "werknemers laden"
        : employeeLoadState === "error"
          ? "werknemers fallback"
          : `${plannerEmployees.length} werknemers`;
  const planningStatusLabel =
    planningItemsLoadState === "ready"
      ? "planning opgeslagen"
      : planningItemsLoadState === "loading"
        ? "planning laden"
        : planningItemsLoadState === "error"
          ? "planning niet geladen"
          : hasSupabaseConnection
            ? "planning klaar"
            : "planning lokaal";
  const activeWeekKey = getIsoWeekKey(currentWeekStartDate);
  const activeWeeklyEmployeeIds = weeklyEmployeeIdsByWeek[activeWeekKey] ?? [];
  const visibleWeekDates = new Set(days.map((day) => day.date));
  const visibleEmployees = getVisibleEmployeesForWeek(
    plannerEmployees,
    activeWeeklyEmployeeIds
  );
  const hiddenEmployees = getHiddenEmployees(plannerEmployees);
  const weeklyAddedEmployees = getWeeklyAddedEmployees(
    plannerEmployees,
    activeWeeklyEmployeeIds
  );
  const availableWeekEmployees = getAvailableEmployeesForWeekAddition(
    plannerEmployees,
    activeWeeklyEmployeeIds
  );
  const selectedWeekEmployeeToAdd = availableWeekEmployees.find(
    (employee) => employee.id === weekEmployeeToAddId
  );
  const visibleEmployeeIds = new Set(
    visibleEmployees.map((employee) => employee.id)
  );
  const visiblePlanningItems = planningItems.filter(
    (item) =>
      visibleWeekDates.has(item.date) && visibleEmployeeIds.has(item.employeeId)
  );
  const conflicts = findPlanningConflicts(visiblePlanningItems, resources);
  const activeRelocationCard = relocationSourceCard ?? selectedCard;
  const selectedPlanningItem = activeRelocationCard
    ? planningItems.find(
        (item) => item.id === activeRelocationCard.planningItemId
      )
    : undefined;
  const editingPlanningItem = editingPlanningItemId
    ? planningItems.find((item) => item.id === editingPlanningItemId)
    : undefined;
  const canMoveSelectedCard =
    Boolean(selectedPlanningItem && activeDestinationCell) &&
    (selectedPlanningItem?.employeeId !== activeDestinationCell?.employeeId ||
      selectedPlanningItem?.date !== activeDestinationCell?.date);
  const selectedCellAvailability = findEmployeeAvailability(
    employeeAvailability,
    selectedCell
  );
  const selectedCellEmployee = selectedCell
    ? visibleEmployees.find((employee) => employee.id === selectedCell.employeeId)
    : undefined;
  const selectedCellPlanningItems = selectedCell
    ? visiblePlanningItems.filter(
        (item) =>
          item.employeeId === selectedCell.employeeId &&
          item.date === selectedCell.date
      )
    : [];
  const activeDestinationEmployee = activeDestinationCell
    ? visibleEmployees.find(
        (employee) => employee.id === activeDestinationCell.employeeId
      )
    : undefined;
  const actionContext =
    selectedPlanningItem && activeDestinationCell
      ? {
          label: "Verplaatsen",
          detail: canMoveSelectedCard
            ? `${selectedPlanningItem.taskName} -> ${
                activeDestinationEmployee
                  ? getEmployeeDisplayName(activeDestinationEmployee)
                  : "doelcel"
              } - ${activeDestinationCell.date}`
            : `${selectedPlanningItem.taskName} -> kies andere doelcel`,
          tone: "move" as const
        }
      : editingPlanningItem
        ? {
            label: "Bewerken",
            detail: `${editingPlanningItem.taskName} - kies doelcel om te verplaatsen`,
            tone: "edit" as const
          }
        : {
            label: "Nieuwe planning",
            detail:
              selectedCell && selectedCellEmployee
                ? `${getEmployeeDisplayName(selectedCellEmployee)} - ${
                    selectedCell.date
                  }`
                : "Kies een cel",
            tone: "create" as const
          };

  const handleAuthSessionChange = useCallback((nextSession: Session | null) => {
    setAuthSession(nextSession);
  }, []);

  useEffect(() => {
    if (!hasSupabaseConnection || !authSession) {
      setResourceLoadState("idle");
      return;
    }

    let isMounted = true;

    setResourceLoadState("loading");

    fetchPlannerResources()
      .then((nextResources) => {
        if (!isMounted) {
          return;
        }

        setResources(nextResources);
        setResourceLoadState("ready");
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setResources([]);
        setResourceLoadState("error");
      });

    return () => {
      isMounted = false;
    };
  }, [authSession, hasSupabaseConnection]);

  useEffect(() => {
    if (!hasSupabaseConnection || !authSession) {
      setEmployeeLoadState("idle");
      return;
    }

    let isMounted = true;

    setEmployeeLoadState("loading");

    fetchPlannerEmployees()
      .then((nextEmployees) => {
        if (!isMounted) {
          return;
        }

        setPlannerEmployees(nextEmployees);
        setEmployeeLoadState("ready");
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setEmployeeLoadState("error");
      });

    return () => {
      isMounted = false;
    };
  }, [authSession, hasSupabaseConnection]);

  useEffect(() => {
    if (!hasSupabaseConnection || !authSession || days.length === 0) {
      setPlanningItemsLoadState("idle");
      return;
    }

    let isMounted = true;
    const startDate = days[0].date;
    const endDate = days[days.length - 1].date;
    const weekDates = days.map((day) => day.date);

    setPlanningItemsLoadState("loading");

    fetchPlannerPlanningItemsForDateRange(startDate, endDate)
      .then((nextItems) => {
        if (!isMounted) {
          return;
        }

        setPlanningItems((currentItems) =>
          mergePlanningItemsForDates(currentItems, nextItems, weekDates)
        );
        setPlanningItemsLoadState("ready");
        setPlanningSaveError("");
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setPlanningItemsLoadState("error");
      });

    return () => {
      isMounted = false;
    };
  }, [authSession, currentWeekStartDate, hasSupabaseConnection]);

  useEffect(() => {
    if (!hasSupabaseConnection || !authSession || days.length === 0) {
      return;
    }

    const visibleDateSet = new Set(days.map((day) => day.date));
    const unsubscribe = subscribePlannerPlanningItems((change) => {
      if (change.eventType === "DELETE") {
        setPlanningItems((currentItems) =>
          currentItems.filter((item) => item.id !== change.itemId)
        );
        return;
      }

      if (pendingPlanningItemSavesRef.current[change.item.id]) {
        return;
      }

      setPlanningItems((currentItems) => {
        const hasExistingItem = currentItems.some(
          (item) => item.id === change.item.id
        );

        if (!visibleDateSet.has(change.item.date)) {
          return currentItems.filter((item) => item.id !== change.item.id);
        }

        if (!hasExistingItem) {
          return [...currentItems, change.item];
        }

        return currentItems.map((item) =>
          item.id === change.item.id ? change.item : item
        );
      });
    });

    return () => {
      unsubscribe();
    };
  }, [authSession, currentWeekStartDate, hasSupabaseConnection]);

  useEffect(() => {
    if (!hasSupabaseConnection || !authSession || days.length === 0) {
      return;
    }

    let isMounted = true;
    const startDate = days[0].date;
    const endDate = days[days.length - 1].date;
    const weekDates = days.map((day) => day.date);
    const visibleDateSet = new Set(weekDates);

    fetchPlannerAvailabilityForDateRange(startDate, endDate)
      .then((nextAvailability) => {
        if (!isMounted) {
          return;
        }

        setEmployeeAvailability((currentAvailability) =>
          mergeEmployeeAvailabilityForDates(
            currentAvailability,
            nextAvailability,
            weekDates
          )
        );
      })
      .catch(() => {
        if (isMounted) {
          setPlanningSaveError("Availability niet geladen uit Supabase.");
        }
      });

    const unsubscribe = subscribePlannerAvailability((change) => {
      if (!visibleDateSet.has(change.availability.date)) {
        return;
      }

      setEmployeeAvailability((currentAvailability) =>
        change.eventType === "DELETE"
          ? removeEmployeeAvailabilityFromState(
              currentAvailability,
              change.availability
            )
          : upsertEmployeeAvailabilityInState(
              currentAvailability,
              change.availability
            )
      );
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [authSession, currentWeekStartDate, hasSupabaseConnection]);

  useEffect(() => {
    if (!hasSupabaseConnection || !authSession) {
      return;
    }

    let isMounted = true;
    const weekKey = activeWeekKey;

    fetchPlannerWeeklyEmployeeIds(weekKey)
      .then((employeeIds) => {
        if (!isMounted) {
          return;
        }

        setWeeklyEmployeeIdsByWeek((currentEmployeesByWeek) =>
          setWeeklyEmployeeIdsForWeek(
            currentEmployeesByWeek,
            weekKey,
            employeeIds
          )
        );
      })
      .catch(() => {
        if (isMounted) {
          setPlanningSaveError(
            "Weekgebonden werknemers niet geladen uit Supabase."
          );
        }
      });

    const unsubscribe = subscribePlannerWeeklyEmployees((change) => {
      setWeeklyEmployeeIdsByWeek((currentEmployeesByWeek) =>
        change.eventType === "DELETE"
          ? removeWeeklyEmployeeIdInState(
              currentEmployeesByWeek,
              change.weekKey,
              change.employeeId
            )
          : addWeeklyEmployeeIdInState(
              currentEmployeesByWeek,
              change.weekKey,
              change.employeeId
            )
      );
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [activeWeekKey, authSession, hasSupabaseConnection]);

  useEffect(() => {
    if (!hasSupabaseConnection || !authSession) {
      return;
    }

    function flushWhenLeavingPage() {
      flushPendingPlanningItemSaves();
    }

    function flushWhenHidden() {
      if (document.visibilityState === "hidden") {
        flushPendingPlanningItemSaves();
      }
    }

    window.addEventListener("pagehide", flushWhenLeavingPage);
    document.addEventListener("visibilitychange", flushWhenHidden);

    return () => {
      flushPendingPlanningItemSaves();
      window.removeEventListener("pagehide", flushWhenLeavingPage);
      document.removeEventListener("visibilitychange", flushWhenHidden);
    };
  }, [authSession, hasSupabaseConnection]);

  function shouldPersistPlanningItems(): boolean {
    return hasSupabaseConnection && Boolean(authSession);
  }

  function savePlanningItemNow(item: PlanningItem) {
    if (!auditUser) {
      return;
    }

    updatePlannerPlanningItem(item, auditUser)
      .then((savedItem) => {
        setPlanningItems((currentItems) =>
          currentItems.map((currentItem) =>
            currentItem.id === savedItem.id ? savedItem : currentItem
          )
        );
        setPlanningSaveError("");
      })
      .catch(() => {
        setPlanningSaveError(
          "Planningwijziging niet opgeslagen. Herlaad niet voor je dit controleert."
        );
      });
  }

  function persistPlanningItemUpdate(item: PlanningItem, debounce = true) {
    if (!shouldPersistPlanningItems()) {
      return;
    }

    pendingPlanningItemSavesRef.current[item.id] = item;

    const persist = () => {
      const pendingItem = pendingPlanningItemSavesRef.current[item.id];

      if (!pendingItem) {
        return;
      }

      delete planningItemSaveTimeoutsRef.current[item.id];
      delete pendingPlanningItemSavesRef.current[item.id];

      savePlanningItemNow(pendingItem);
    };

    clearTimeout(planningItemSaveTimeoutsRef.current[item.id]);

    if (!debounce) {
      persist();
      return;
    }

    planningItemSaveTimeoutsRef.current[item.id] = setTimeout(persist, 500);
  }

  function flushPendingPlanningItemSaves() {
    Object.values(pendingPlanningItemSavesRef.current).forEach((item) => {
      clearTimeout(planningItemSaveTimeoutsRef.current[item.id]);
      delete planningItemSaveTimeoutsRef.current[item.id];
      delete pendingPlanningItemSavesRef.current[item.id];
      savePlanningItemNow(item);
    });
  }

  async function addPlanningItem(item: Omit<PlanningItem, "id">) {
    const nextItem = {
      ...item,
      id: createPlanningItemId(),
      createdBy: auditUser?.id,
      createdByEmail: auditUser?.email ?? undefined,
      updatedBy: auditUser?.id,
      updatedByEmail: auditUser?.email ?? undefined
    };

    setPlanningItems((currentItems) => [...currentItems, nextItem]);
    setPlanningSaveError("");

    if (!shouldPersistPlanningItems()) {
      return;
    }

    try {
      const savedItem = await createPlannerPlanningItem(nextItem, auditUser);

      setPlanningItems((currentItems) =>
        currentItems.map((currentItem) =>
          currentItem.id === nextItem.id ? savedItem : currentItem
        )
      );
    } catch {
      setPlanningItems((currentItems) =>
        currentItems.filter((currentItem) => currentItem.id !== nextItem.id)
      );
      setPlanningSaveError(
        "Planningitem niet opgeslagen. Probeer opnieuw of controleer de verbinding."
      );
    }
  }

  function clearPlannerSelection() {
    setSelectedCell(null);
    setSelectedCard(null);
    setRelocationSourceCard(null);
    setEditingPlanningItemId(null);
    setActiveDestinationCell(null);
  }

  function isPlanningItemForEmployee(
    planningItemId: string | null | undefined,
    employeeId: string
  ): boolean {
    if (!planningItemId) {
      return false;
    }

    return planningItems.some(
      (item) => item.id === planningItemId && item.employeeId === employeeId
    );
  }

  function clearPlannerSelectionForEmployee(employeeId: string) {
    setSelectedCell((currentCell) =>
      currentCell?.employeeId === employeeId ? null : currentCell
    );
    setActiveDestinationCell((currentCell) =>
      currentCell?.employeeId === employeeId ? null : currentCell
    );
    setSelectedCard((currentCard) =>
      isPlanningItemForEmployee(currentCard?.planningItemId, employeeId)
        ? null
        : currentCard
    );
    setRelocationSourceCard((currentCard) =>
      isPlanningItemForEmployee(currentCard?.planningItemId, employeeId)
        ? null
        : currentCard
    );
    setEditingPlanningItemId((currentItemId) =>
      isPlanningItemForEmployee(currentItemId, employeeId) ? null : currentItemId
    );
  }

  function showPlannerEmployee(employeeId: string) {
    setPlannerEmployees((currentEmployees) =>
      showEmployee(currentEmployees, employeeId)
    );
  }

  function addEmployeeToActiveWeek(employeeId: string) {
    if (!employeeId) {
      return;
    }

    const weekKey = activeWeekKey;

    setWeeklyEmployeeIdsByWeek((currentEmployeesByWeek) => {
      return addWeeklyEmployeeIdInState(
        currentEmployeesByWeek,
        weekKey,
        employeeId
      );
    });
    setWeekEmployeeToAddId("");
    setPlanningSaveError("");

    if (!shouldPersistPlanningItems() || !auditUser) {
      return;
    }

    addPlannerWeeklyEmployee(weekKey, employeeId, auditUser).catch(() => {
      setWeeklyEmployeeIdsByWeek((currentEmployeesByWeek) =>
        removeWeeklyEmployeeIdInState(
          currentEmployeesByWeek,
          weekKey,
          employeeId
        )
      );
      setPlanningSaveError(
        "Werknemer niet toegevoegd aan deze week in Supabase."
      );
    });
  }

  function removeEmployeeFromActiveWeek(employeeId: string) {
    const weekKey = activeWeekKey;

    setWeeklyEmployeeIdsByWeek((currentEmployeesByWeek) =>
      removeWeeklyEmployeeIdInState(currentEmployeesByWeek, weekKey, employeeId)
    );
    clearPlannerSelectionForEmployee(employeeId);
    setPlanningSaveError("");

    if (!shouldPersistPlanningItems()) {
      return;
    }

    removePlannerWeeklyEmployee(weekKey, employeeId).catch(() => {
      setWeeklyEmployeeIdsByWeek((currentEmployeesByWeek) =>
        addWeeklyEmployeeIdInState(
          currentEmployeesByWeek,
          weekKey,
          employeeId
        )
      );
      setPlanningSaveError(
        "Werknemer niet uit deze week verwijderd in Supabase."
      );
    });
  }

  function goToCurrentWeek() {
    setCurrentWeekStartDate(getCurrentWeekStartDate());
    clearPlannerSelection();
  }

  function goToNextWeek() {
    setCurrentWeekStartDate((currentStartDate) =>
      addWeeksToDateInputValue(currentStartDate, 1)
    );
    clearPlannerSelection();
  }

  function goToPreviousWeek() {
    setCurrentWeekStartDate((currentStartDate) =>
      addWeeksToDateInputValue(currentStartDate, -1)
    );
    clearPlannerSelection();
  }

  function goToWeekStartDate(weekStartDate: string) {
    setCurrentWeekStartDate(weekStartDate);
    clearPlannerSelection();
  }

  function updatePlanningItem(
    planningItemId: string,
    updates: Partial<Pick<PlanningItem, "taskName" | "resourceIds">>,
    debounce = true
  ) {
    const currentItem = planningItems.find((item) => item.id === planningItemId);

    if (!currentItem) {
      return;
    }

    const updatedItemBase = {
      ...currentItem,
      ...updates
    };
    const updatedItem =
      "resourceIds" in updates
        ? withPlanningItemResourceIds(updatedItemBase, updates.resourceIds)
        : updatedItemBase;

    setPlanningItems((currentItems) =>
      currentItems.map((item) =>
        item.id === planningItemId ? updatedItem : item
      )
    );
    persistPlanningItemUpdate(updatedItem, debounce);
  }

  async function deletePlanningItem(planningItemId: string) {
    const deletedItem = planningItems.find((item) => item.id === planningItemId);

    clearTimeout(planningItemSaveTimeoutsRef.current[planningItemId]);
    delete planningItemSaveTimeoutsRef.current[planningItemId];
    delete pendingPlanningItemSavesRef.current[planningItemId];

    setPlanningItems((currentItems) =>
      currentItems.filter((item) => item.id !== planningItemId)
    );
    setSelectedCard((currentCard) =>
      currentCard?.planningItemId === planningItemId ? null : currentCard
    );
    setRelocationSourceCard((currentCard) =>
      currentCard?.planningItemId === planningItemId ? null : currentCard
    );
    setActiveDestinationCell((currentDestinationCell) =>
      selectedCard?.planningItemId === planningItemId ||
      relocationSourceCard?.planningItemId === planningItemId
        ? null
        : currentDestinationCell
    );
    setEditingPlanningItemId((currentEditingItemId) =>
      currentEditingItemId === planningItemId ? null : currentEditingItemId
    );

    if (!deletedItem || !shouldPersistPlanningItems()) {
      return;
    }

    try {
      await deletePlannerPlanningItem(planningItemId);
      setPlanningSaveError("");
    } catch {
      setPlanningItems((currentItems) => [...currentItems, deletedItem]);
      setPlanningSaveError(
        "Planningitem niet verwijderd in Supabase. Probeer opnieuw."
      );
    }
  }

  function selectPlanningCard(card: SelectedPlanningCard) {
    setSelectedCard(card);
    setRelocationSourceCard(card);
    setEditingPlanningItemId(card.planningItemId);
    setActiveDestinationCell(null);
  }

  function selectPlanningCell(cell: SelectedPlanningCell) {
    setSelectedCell(cell);
    setEditingPlanningItemId(null);

    if (selectedCard) {
      setRelocationSourceCard(selectedCard);
      setActiveDestinationCell(cell);
      return;
    }

    if (relocationSourceCard) {
      setActiveDestinationCell(cell);
    }
  }

  function toggleSelectedCellAvailability() {
    if (!selectedCell) {
      return;
    }

    if (selectedCellAvailability) {
      const previousAvailability = selectedCellAvailability;

      setEmployeeAvailability((currentAvailability) =>
        clearEmployeeAvailability(currentAvailability, selectedCell)
      );

      if (shouldPersistPlanningItems()) {
        deletePlannerAvailability(selectedCell).catch(() => {
          setEmployeeAvailability((currentAvailability) =>
            upsertEmployeeAvailabilityInState(
              currentAvailability,
              previousAvailability
            )
          );
          setPlanningSaveError(
            "Availability niet gewist in Supabase. Probeer opnieuw."
          );
        });
      }

      return;
    }

    const nextAvailability = {
      employeeId: selectedCell.employeeId,
      date: selectedCell.date,
      type: "unavailable" as const
    };

    setEmployeeAvailability((currentAvailability) =>
      setEmployeeAvailabilityType(
        currentAvailability,
        selectedCell,
        "unavailable"
      )
    );

    if (shouldPersistPlanningItems() && auditUser) {
      upsertPlannerAvailability(selectedCell, "unavailable", auditUser).catch(
        () => {
          setEmployeeAvailability((currentAvailability) =>
            removeEmployeeAvailabilityFromState(
              currentAvailability,
              nextAvailability
            )
          );
          setPlanningSaveError(
            "Availability niet opgeslagen in Supabase. Probeer opnieuw."
          );
        }
      );
    }
  }

  function setSelectedCellAvailabilityType(type: AvailabilityType) {
    if (!selectedCell) {
      return;
    }

    const previousAvailability = selectedCellAvailability;
    const nextAvailability = {
      employeeId: selectedCell.employeeId,
      date: selectedCell.date,
      type
    };

    setEmployeeAvailability((currentAvailability) =>
      setEmployeeAvailabilityType(currentAvailability, selectedCell, type)
    );

    if (shouldPersistPlanningItems() && auditUser) {
      upsertPlannerAvailability(selectedCell, type, auditUser).catch(() => {
        setEmployeeAvailability((currentAvailability) =>
          previousAvailability
            ? upsertEmployeeAvailabilityInState(
                currentAvailability,
                previousAvailability
              )
            : removeEmployeeAvailabilityFromState(
                currentAvailability,
                nextAvailability
              )
        );
        setPlanningSaveError(
          "Availability niet opgeslagen in Supabase. Probeer opnieuw."
        );
      });
    }
  }

  function moveSelectedCardToActiveDestination() {
    if (!activeRelocationCard || !activeDestinationCell || !selectedPlanningItem) {
      return;
    }

    if (!canMoveSelectedCard) {
      return;
    }

    const movedItem = {
      ...selectedPlanningItem,
      employeeId: activeDestinationCell.employeeId,
      date: activeDestinationCell.date
    };

    setPlanningItems((currentItems) =>
      currentItems.map((item) =>
        item.id === activeRelocationCard.planningItemId
          ? movedItem
          : item
      )
    );
    persistPlanningItemUpdate(movedItem, false);
    setActiveDestinationCell(null);
    setRelocationSourceCard(null);
    setSelectedCard(null);
  }

  return (
    <AuthGate onSessionChange={handleAuthSessionChange}>
      <main className="min-h-screen bg-perceel-soft px-3 pb-5 pt-16 sm:px-5 sm:py-4 lg:px-6">
        <section className="mx-auto max-w-[1500px]">
          <header className="rounded-md border border-perceel-line bg-white/90 px-3 py-3 shadow-sm sm:px-4">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase text-perceel-green">
                  Perceel
                </p>
                <h1 className="mt-1 text-xl font-bold leading-7 text-perceel-dark sm:text-2xl">
                  Werkplanning & Materieelbeheer
                </h1>
                <p className="mt-1 max-w-3xl text-sm leading-5 text-slate-700">
                  Weekplanning van maandag tot zondag per werknemer met
                  optioneel materieel en conflictwaarschuwingen.
                </p>
              </div>
              <div className="flex max-w-full flex-wrap gap-1.5 lg:max-w-[560px] lg:justify-end">
                <p className="max-w-full rounded border border-emerald-100 bg-emerald-50 px-2 py-1 text-xs font-semibold text-slate-600">
                  Datalaag: {resourceStatusLabel}
                </p>
                <p className="max-w-full rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600">
                  Werknemers: {employeeStatusLabel}
                </p>
                <p className="max-w-full rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600">
                  Planning: {planningStatusLabel}
                </p>
              </div>
            </div>
          </header>

        <div className="mt-3 space-y-3">
          {planningSaveError ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">
              {planningSaveError}
            </p>
          ) : null}

          <PlanningForm
            actionContext={actionContext}
            auditUser={auditUser}
            employees={visibleEmployees}
            resources={resources}
            resourcesAreLoading={resourceLoadState === "loading"}
            resourcesLoadError={resourceLoadState === "error"}
            editingItem={editingPlanningItem}
            key={currentWeekStartDate}
            onCreate={addPlanningItem}
            onEditChange={updatePlanningItem}
            onFlushPendingEdits={flushPendingPlanningItemSaves}
            selectedCell={selectedCell}
          />

          <div className="rounded-md border border-perceel-line bg-white px-3 py-2 text-xs shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <span className="font-semibold text-slate-600">Werknemers</span>
              <button
                aria-expanded={showWeekEmployeePanel}
                className="w-full rounded border border-slate-200 bg-slate-50 px-2 py-1.5 text-left font-semibold text-slate-600 hover:bg-white hover:text-perceel-dark sm:w-auto sm:text-center"
                onClick={() => {
                  setShowWeekEmployeePanel((currentValue) => !currentValue);
                  setWeekEmployeeToAddId("");
                }}
                type="button"
              >
                {showWeekEmployeePanel
                  ? "Sluiten"
                  : "+ Aan deze week toevoegen"}
              </button>
              {weeklyAddedEmployees.length > 0 ? (
                <span className="font-semibold text-slate-500">
                  Tijdelijk deze week: {weeklyAddedEmployees.length}
                </span>
              ) : null}
              {hiddenEmployees.length > 0 ? (
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span className="font-semibold">
                    Verborgen: {hiddenEmployees.length}
                  </span>
                  <span aria-hidden="true">&middot;</span>
                  <button
                    aria-expanded={showHiddenEmployees}
                    className="rounded border border-transparent px-1.5 py-0.5 font-semibold text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-perceel-dark"
                    onClick={() =>
                      setShowHiddenEmployees((currentValue) => !currentValue)
                    }
                    type="button"
                  >
                    {showHiddenEmployees ? "Sluiten" : "Beheren"}
                  </button>
                </div>
              ) : null}
            </div>
            {showWeekEmployeePanel || showHiddenEmployees ? (
              <div className="mt-1.5 space-y-1.5 border-t border-slate-100 pt-1.5">
                {showWeekEmployeePanel ? (
                  <div className="space-y-1.5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end">
                      <label className="w-full font-semibold text-slate-600 sm:min-w-[260px] sm:w-auto">
                        Werknemer
                        <select
                          className="mt-1 h-[30px] w-full rounded-md border border-perceel-line px-2 text-sm font-normal text-slate-800"
                          onChange={(event) =>
                            setWeekEmployeeToAddId(event.target.value)
                          }
                          value={
                            selectedWeekEmployeeToAdd
                              ? selectedWeekEmployeeToAdd.id
                              : ""
                          }
                        >
                          <option value="">Kies werknemer</option>
                          {availableWeekEmployees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                              {getEmployeeDisplayName(employee)} -{" "}
                              {employee.category}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button
                        className="h-[34px] rounded-md border border-perceel-green bg-white px-3 text-xs font-semibold text-perceel-green hover:bg-emerald-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400 disabled:hover:bg-white sm:h-[30px]"
                        disabled={!selectedWeekEmployeeToAdd}
                        onClick={() =>
                          addEmployeeToActiveWeek(
                            selectedWeekEmployeeToAdd?.id ?? ""
                          )
                        }
                        type="button"
                      >
                        Toevoegen aan week
                      </button>
                      {availableWeekEmployees.length === 0 ? (
                        <p className="pb-1 font-semibold text-slate-500">
                          Geen extra werknemers beschikbaar.
                        </p>
                      ) : null}
                    </div>
                    {weeklyAddedEmployees.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {weeklyAddedEmployees.map((employee) => (
                          <div
                            className="flex items-center gap-1.5 rounded-md border border-emerald-100 bg-emerald-50 px-2 py-1"
                            key={employee.id}
                            title={`${getEmployeeDisplayName(
                              employee
                            )} uit deze week halen`}
                          >
                            <span className="font-semibold text-slate-600">
                              {getEmployeeDisplayName(employee)}
                            </span>
                            <span className="text-slate-400">
                              {employee.category}
                            </span>
                            <button
                              className="rounded border border-transparent px-1.5 py-0.5 font-semibold text-slate-500 hover:border-slate-200 hover:bg-white hover:text-perceel-dark"
                              onClick={() =>
                                removeEmployeeFromActiveWeek(employee.id)
                              }
                              type="button"
                            >
                              Uit deze week
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {showHiddenEmployees && hiddenEmployees.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {hiddenEmployees.map((employee) => (
                      <div
                        className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-1"
                        key={employee.id}
                        title={`${getEmployeeDisplayName(
                          employee
                        )} opnieuw tonen in planning`}
                      >
                        <span className="font-semibold text-slate-600">
                          {getEmployeeDisplayName(employee)}
                        </span>
                        <button
                          className="rounded border border-transparent px-1.5 py-0.5 font-semibold text-perceel-green hover:border-emerald-200 hover:bg-white"
                          onClick={() => showPlannerEmployee(employee.id)}
                          type="button"
                        >
                          Terug tonen
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {selectedCell && selectedCellEmployee ? (
            <WorkCardPreview
              date={selectedCell.date}
              employee={selectedCellEmployee}
              items={selectedCellPlanningItems}
              resources={resources}
            />
          ) : null}

          <WeekPlanningBoard
            activeDestinationCell={activeDestinationCell}
            conflicts={conflicts}
            days={days}
            employeeAvailability={employeeAvailability}
            employees={visibleEmployees}
            items={visiblePlanningItems}
            canMoveSelectedCard={canMoveSelectedCard}
            onDeleteCard={deletePlanningItem}
            onGoToCurrentWeek={goToCurrentWeek}
            onGoToNextWeek={goToNextWeek}
            onGoToPreviousWeek={goToPreviousWeek}
            onGoToWeekStartDate={goToWeekStartDate}
            onMoveSelectedCard={moveSelectedCardToActiveDestination}
            onRemoveEmployeeFromWeek={removeEmployeeFromActiveWeek}
            onSelectCard={selectPlanningCard}
            onSelectCell={selectPlanningCell}
            onSetSelectedCellAvailabilityType={setSelectedCellAvailabilityType}
            onToggleSelectedCellAvailability={toggleSelectedCellAvailability}
            resources={resources}
            selectedCard={selectedCard}
            selectedCell={selectedCell}
            selectedCellAvailability={selectedCellAvailability}
            weeklyEmployeeIds={activeWeeklyEmployeeIds}
          />
        </div>
        </section>
      </main>
    </AuthGate>
  );
}
