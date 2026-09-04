"use client";

import { useEffect, useRef, useState } from "react";
import type { SelectedPlanningCell } from "@/components/planning/matrix";
import { ResourceSelector } from "@/components/planning/ResourceSelector";
import { getEmployeeDisplayName } from "@/lib/planning/employees";
import {
  getPlanningItemResourceIds,
  withPlanningItemResourceIds
} from "@/lib/planning/planning-resources";
import type { PlannerAuditUser } from "@/lib/supabase/audit";
import type { Employee, PlanningItem, Resource } from "@/types/planning";

type PlanningFormProps = {
  employees: Employee[];
  resources: Resource[];
  resourcesAreLoading?: boolean;
  resourcesLoadError?: boolean;
  auditUser?: PlannerAuditUser;
  editingItem?: PlanningItem;
  actionContext: {
    label: string;
    detail: string;
    tone: "create" | "edit" | "move";
  };
  onCreate: (item: Omit<PlanningItem, "id">) => void;
  onEditChange: (
    planningItemId: string,
    updates: Partial<Pick<PlanningItem, "taskName" | "resourceIds">>,
    debounce?: boolean
  ) => void;
  onFlushPendingEdits?: () => void;
  selectedCell: SelectedPlanningCell | null;
};

type PlanningFormState = {
  date: string;
  employeeId: string;
  taskName: string;
  resourceIds: string[];
};

const initialFormState: PlanningFormState = {
  date: "",
  employeeId: "",
  taskName: "",
  resourceIds: []
};

export function PlanningForm({
  employees,
  resources,
  resourcesAreLoading = false,
  resourcesLoadError = false,
  auditUser,
  editingItem,
  actionContext,
  onCreate,
  onEditChange,
  onFlushPendingEdits,
  selectedCell
}: PlanningFormProps) {
  const [formState, setFormState] = useState<PlanningFormState>(initialFormState);
  const [error, setError] = useState("");
  const [keepResourceSelection, setKeepResourceSelection] = useState(false);
  const taskNameInputRef = useRef<HTMLInputElement>(null);
  const wasEditingRef = useRef(false);
  const isEditMode = Boolean(editingItem);
  const selectedEmployee = employees.find(
    (employee) => employee.id === selectedCell?.employeeId
  );
  const editingEmployee = employees.find(
    (employee) => employee.id === editingItem?.employeeId
  );
  const actionContextStyle = {
    create: "border-emerald-200 bg-emerald-50 text-emerald-800",
    edit: "border-sky-200 bg-sky-50 text-sky-800",
    move: "border-amber-200 bg-amber-50 text-amber-900"
  }[actionContext.tone];

  useEffect(() => {
    if (!selectedCell || isEditMode) {
      return;
    }

    const shouldResetEditFields = wasEditingRef.current;

    setFormState((currentState) => ({
      ...currentState,
      date: selectedCell.date,
      employeeId: selectedCell.employeeId,
      taskName: shouldResetEditFields ? "" : currentState.taskName,
      resourceIds: shouldResetEditFields ? [] : currentState.resourceIds
    }));
    wasEditingRef.current = false;
    taskNameInputRef.current?.focus();
  }, [isEditMode, selectedCell]);

  useEffect(() => {
    if (!editingItem) {
      return;
    }

    setFormState({
      date: editingItem.date,
      employeeId: editingItem.employeeId,
      taskName: editingItem.taskName,
      resourceIds: getPlanningItemResourceIds(editingItem)
    });
    wasEditingRef.current = true;
    setError("");
    taskNameInputRef.current?.focus();
  }, [editingItem]);

  function updateField<K extends keyof PlanningFormState>(
    field: K,
    value: PlanningFormState[K]
  ) {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value
    }));

    if (!editingItem) {
      return;
    }

    if (field === "taskName") {
      onEditChange(editingItem.id, { taskName: value as string });
    }

  }

  function updateResourceIds(resourceIds: string[]) {
    setFormState((currentState) => ({
      ...currentState,
      resourceIds
    }));

    if (!editingItem) {
      return;
    }

    onEditChange(editingItem.id, { resourceIds }, false);
  }

  function submitPlanningItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isEditMode) {
      return;
    }

    if (
      !formState.date ||
      !formState.employeeId ||
      !formState.taskName.trim()
    ) {
      setError("Vul datum, werknemer en taak/project in.");
      return;
    }

    onCreate(withPlanningItemResourceIds({
      date: formState.date,
      employeeId: formState.employeeId,
      taskName: formState.taskName.trim(),
      status: "voorlopig"
    }, formState.resourceIds));
    setFormState({
      date: selectedCell?.date ?? formState.date,
      employeeId: selectedCell?.employeeId ?? formState.employeeId,
      taskName: "",
      resourceIds: keepResourceSelection ? formState.resourceIds : []
    });
    setError("");
    taskNameInputRef.current?.focus();
  }

  return (
    <form
      className="relative isolate z-[100] rounded-md border border-perceel-line bg-white p-3 shadow-sm lg:sticky lg:top-3"
      onSubmit={submitPlanningItem}
    >
      <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase text-perceel-green">
            {isEditMode ? "Bewerken" : "Invoer"}
          </p>
          <div className="mt-0.5 flex min-w-0 flex-wrap items-center gap-2">
            <h2 className="text-base font-bold text-perceel-dark">
              {isEditMode ? "Planningitem bewerken" : "Planningitem toevoegen"}
            </h2>
            <span
              className={`inline-flex max-w-full items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-semibold lg:max-w-[520px] ${actionContextStyle}`}
              title={`${actionContext.label}: ${actionContext.detail}`}
            >
              <span className="shrink-0">{actionContext.label}</span>
              <span className="truncate text-slate-600">
                {actionContext.detail}
              </span>
            </span>
          </div>
        </div>
        <div className="min-w-0 rounded-md border border-slate-100 bg-slate-50/70 px-2.5 py-1.5 text-left lg:max-w-[260px] lg:text-right">
          <p className="text-[10px] font-semibold uppercase leading-3 text-slate-400">
            {isEditMode ? "Geselecteerde card" : "Actieve cel"}
          </p>
          <p className="truncate text-xs font-semibold text-slate-700">
            {isEditMode && editingItem && editingEmployee
              ? `${getEmployeeDisplayName(editingEmployee)} - ${
                  editingItem.date
                }`
              : selectedCell && selectedEmployee
              ? `${getEmployeeDisplayName(selectedEmployee)} - ${
                  selectedCell.date
                }`
              : "Geen cel geselecteerd"}
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2.5 md:grid-cols-[130px_145px_minmax(260px,1fr)]">
        <label className="text-xs font-semibold text-slate-700">
          Datum
          <input
            className={`mt-1 h-9 w-full rounded-md border border-perceel-line px-2 py-1 text-sm ${
              isEditMode ? "bg-slate-100 text-slate-500" : ""
            }`}
            disabled={isEditMode}
            onChange={(event) => updateField("date", event.target.value)}
            type="date"
            value={formState.date}
          />
        </label>

        <label className="text-xs font-semibold text-slate-700">
          Werknemer
          <select
            className={`mt-1 h-9 w-full rounded-md border border-perceel-line px-2 py-1 text-sm ${
              isEditMode ? "bg-slate-100 text-slate-500" : ""
            }`}
            disabled={isEditMode}
            onChange={(event) => updateField("employeeId", event.target.value)}
            value={formState.employeeId}
          >
            <option value="">Kies werknemer</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {getEmployeeDisplayName(employee)}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs font-semibold text-slate-700">
          Taak/project
          <input
            className="mt-1 h-9 w-full rounded-md border border-perceel-line px-2 py-1 text-sm"
            onBlur={onFlushPendingEdits}
            onChange={(event) => updateField("taskName", event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== "Enter") {
                return;
              }

              event.preventDefault();

              if (!isEditMode) {
                event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder="Bijvoorbeeld: werf voorbereiden"
            ref={taskNameInputRef}
            type="text"
            value={formState.taskName}
          />
        </label>
      </div>

      {isEditMode ? (
        <p className="mt-1.5 text-xs font-semibold text-slate-500">
          Gebruik verplaatsen om datum/werknemer te wijzigen.
        </p>
      ) : null}

      <div className="mt-2">
        <ResourceSelector
          onChange={updateResourceIds}
          resources={resources}
          isLoading={resourcesAreLoading}
          hasLoadError={resourcesLoadError}
          auditUser={auditUser}
          selectedResourceIds={formState.resourceIds}
        />
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {!isEditMode ? (
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <input
                checked={keepResourceSelection}
                className="h-3.5 w-3.5 rounded border-perceel-line"
                onChange={(event) =>
                  setKeepResourceSelection(event.target.checked)
                }
                type="checkbox"
              />
              Materieel behouden
            </label>
          ) : (
            <p className="text-xs font-semibold leading-4 text-slate-500">
              Direct lokaal bijgewerkt.
            </p>
          )}
          {!isEditMode ? (
            <button
              className="h-9 w-full rounded-md bg-perceel-green px-4 text-sm font-semibold text-white hover:bg-emerald-800 sm:w-auto"
              type="submit"
            >
              Toevoegen
            </button>
          ) : null}
        </div>
      </div>

      {error ? (
        <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800">
          {error}
        </p>
      ) : null}
    </form>
  );
}
