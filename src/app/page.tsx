"use client";

import type { Session } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
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
  hideEmployee,
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
import { fetchPlannerResources } from "@/lib/supabase/resources";
import type { PlanningItem, Resource } from "@/types/planning";

type ResourceLoadState = "idle" | "loading" | "ready" | "error";

export default function Home() {
  const [plannerEmployees, setPlannerEmployees] = useState(() => employees);
  const [authSession, setAuthSession] = useState<Session | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceLoadState, setResourceLoadState] =
    useState<ResourceLoadState>("idle");
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
      setResources([]);
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

  function addPlanningItem(item: Omit<PlanningItem, "id">) {
    setPlanningItems((currentItems) => [
      ...currentItems,
      {
        ...item,
        id: `planning-${currentItems.length + 1}`
      }
    ]);
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

  function hidePlannerEmployee(employeeId: string) {
    setPlannerEmployees((currentEmployees) =>
      hideEmployee(currentEmployees, employeeId)
    );
    clearPlannerSelectionForEmployee(employeeId);
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

    setWeeklyEmployeeIdsByWeek((currentEmployeesByWeek) => {
      const currentWeekEmployeeIds =
        currentEmployeesByWeek[activeWeekKey] ?? [];

      if (currentWeekEmployeeIds.includes(employeeId)) {
        return currentEmployeesByWeek;
      }

      return {
        ...currentEmployeesByWeek,
        [activeWeekKey]: [...currentWeekEmployeeIds, employeeId]
      };
    });
    setWeekEmployeeToAddId("");
  }

  function removeEmployeeFromActiveWeek(employeeId: string) {
    setWeeklyEmployeeIdsByWeek((currentEmployeesByWeek) => {
      const currentWeekEmployeeIds =
        currentEmployeesByWeek[activeWeekKey] ?? [];
      const nextWeekEmployeeIds = currentWeekEmployeeIds.filter(
        (currentEmployeeId) => currentEmployeeId !== employeeId
      );

      if (nextWeekEmployeeIds.length === currentWeekEmployeeIds.length) {
        return currentEmployeesByWeek;
      }

      const nextEmployeesByWeek = { ...currentEmployeesByWeek };

      if (nextWeekEmployeeIds.length === 0) {
        delete nextEmployeesByWeek[activeWeekKey];
        return nextEmployeesByWeek;
      }

      nextEmployeesByWeek[activeWeekKey] = nextWeekEmployeeIds;
      return nextEmployeesByWeek;
    });
    clearPlannerSelectionForEmployee(employeeId);
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
    updates: Partial<Pick<PlanningItem, "taskName" | "resourceIds">>
  ) {
    setPlanningItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== planningItemId) {
          return item;
        }

        const nextItem = {
          ...item,
          ...updates
        };

        if ("resourceIds" in updates) {
          return withPlanningItemResourceIds(nextItem, updates.resourceIds);
        }

        return nextItem;
      })
    );
  }

  function deletePlanningItem(planningItemId: string) {
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
      setEmployeeAvailability((currentAvailability) =>
        clearEmployeeAvailability(currentAvailability, selectedCell)
      );
      return;
    }

    setEmployeeAvailability((currentAvailability) =>
      setEmployeeAvailabilityType(
        currentAvailability,
        selectedCell,
        "unavailable"
      )
    );
  }

  function setSelectedCellAvailabilityType(type: AvailabilityType) {
    if (!selectedCell) {
      return;
    }

    setEmployeeAvailability((currentAvailability) =>
      setEmployeeAvailabilityType(currentAvailability, selectedCell, type)
    );
  }

  function moveSelectedCardToActiveDestination() {
    if (!activeRelocationCard || !activeDestinationCell || !selectedPlanningItem) {
      return;
    }

    if (!canMoveSelectedCard) {
      return;
    }

    setPlanningItems((currentItems) =>
      currentItems.map((item) =>
        item.id === activeRelocationCard.planningItemId
          ? {
              ...item,
              employeeId: activeDestinationCell.employeeId,
              date: activeDestinationCell.date
            }
          : item
      )
    );
    setActiveDestinationCell(null);
    setRelocationSourceCard(null);
    setSelectedCard(null);
  }

  return (
    <AuthGate onSessionChange={handleAuthSessionChange}>
      <main className="min-h-screen bg-perceel-soft px-3 pb-5 pt-16 sm:px-5 sm:py-4 lg:px-6">
        <section className="mx-auto max-w-[1500px]">
          <header className="rounded-md border border-perceel-line bg-white/90 px-3 py-3 shadow-sm sm:px-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
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
              <p className="w-fit rounded border border-emerald-100 bg-emerald-50 px-2 py-1 text-xs font-semibold text-slate-600">
                Datalaag: {resourceStatusLabel}
              </p>
            </div>
          </header>

        <div className="mt-3 space-y-3">
          <PlanningForm
            actionContext={actionContext}
            employees={visibleEmployees}
            resources={resources}
            resourcesAreLoading={resourceLoadState === "loading"}
            resourcesLoadError={resourceLoadState === "error"}
            editingItem={editingPlanningItem}
            key={currentWeekStartDate}
            onCreate={addPlanningItem}
            onEditChange={updatePlanningItem}
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
            onHideEmployee={hidePlannerEmployee}
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
