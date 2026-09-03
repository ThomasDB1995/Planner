import {
  getPlanningItemResourceIds,
  withPlanningItemResourceIds
} from "@/lib/planning/planning-resources";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { PlanningItem, PlanningStatus } from "@/types/planning";

type SupabasePlanningItemRow = {
  id: string;
  date: string;
  employee_id: string;
  task_name: string;
  resource_id: string | null;
  resource_ids: string[] | null;
  status: PlanningStatus | string | null;
};

const planningItemSelect =
  "id, date, employee_id, task_name, resource_id, resource_ids, status";

function normalizePlanningStatus(
  status: PlanningStatus | string | null
): PlanningStatus {
  if (
    status === "voorlopig" ||
    status === "bevestigd" ||
    status === "uitgevoerd"
  ) {
    return status;
  }

  return "voorlopig";
}

function mapPlanningItemRow(row: SupabasePlanningItemRow): PlanningItem {
  return withPlanningItemResourceIds(
    {
      id: row.id,
      date: row.date,
      employeeId: row.employee_id,
      taskName: row.task_name,
      status: normalizePlanningStatus(row.status)
    },
    row.resource_ids ?? (row.resource_id ? [row.resource_id] : [])
  );
}

function toPlanningItemRow(item: PlanningItem) {
  const resourceIds = getPlanningItemResourceIds(item);

  return {
    id: item.id,
    date: item.date,
    employee_id: item.employeeId,
    task_name: item.taskName,
    resource_id: resourceIds[0] ?? null,
    resource_ids: resourceIds,
    status: item.status
  };
}

export async function fetchPlannerPlanningItemsForDateRange(
  startDate: string,
  endDate: string
): Promise<PlanningItem[]> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { data, error } = await supabase
    .from("planning_items")
    .select(planningItemSelect)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) =>
    mapPlanningItemRow(row as SupabasePlanningItemRow)
  );
}

export async function createPlannerPlanningItem(
  item: PlanningItem
): Promise<PlanningItem> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { data, error } = await supabase
    .from("planning_items")
    .insert(toPlanningItemRow(item))
    .select(planningItemSelect)
    .single();

  if (error) {
    throw error;
  }

  return mapPlanningItemRow(data as SupabasePlanningItemRow);
}

export async function updatePlannerPlanningItem(
  item: PlanningItem
): Promise<PlanningItem> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { data, error } = await supabase
    .from("planning_items")
    .update(toPlanningItemRow(item))
    .eq("id", item.id)
    .select(planningItemSelect)
    .single();

  if (error) {
    throw error;
  }

  return mapPlanningItemRow(data as SupabasePlanningItemRow);
}

export async function deletePlannerPlanningItem(id: string): Promise<void> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { error } = await supabase.from("planning_items").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
