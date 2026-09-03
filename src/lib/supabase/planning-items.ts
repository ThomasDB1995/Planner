import {
  getPlanningItemResourceIds,
  withPlanningItemResourceIds
} from "@/lib/planning/planning-resources";
import {
  getPlannerAuditEmail,
  type PlannerAuditUser
} from "@/lib/supabase/audit";
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
  created_by: string | null;
  updated_by: string | null;
  created_by_email: string | null;
  updated_by_email: string | null;
  created_at: string | null;
  updated_at: string | null;
};

const planningItemSelect =
  "id, date, employee_id, task_name, resource_id, resource_ids, status, created_by, updated_by, created_by_email, updated_by_email, created_at, updated_at";

type PlanningItemChange =
  | { eventType: "DELETE"; itemId: string; date?: string }
  | { eventType: "INSERT" | "UPDATE"; item: PlanningItem };

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
      status: normalizePlanningStatus(row.status),
      createdBy: row.created_by ?? undefined,
      updatedBy: row.updated_by ?? undefined,
      createdByEmail: row.created_by_email ?? undefined,
      updatedByEmail: row.updated_by_email ?? undefined,
      createdAt: row.created_at ?? undefined,
      updatedAt: row.updated_at ?? undefined
    },
    row.resource_ids ?? (row.resource_id ? [row.resource_id] : [])
  );
}

function toPlanningItemRow(item: PlanningItem, user?: PlannerAuditUser) {
  const resourceIds = getPlanningItemResourceIds(item);
  const email = user ? getPlannerAuditEmail(user) : null;

  return {
    id: item.id,
    date: item.date,
    employee_id: item.employeeId,
    task_name: item.taskName,
    resource_id: resourceIds[0] ?? null,
    resource_ids: resourceIds,
    status: item.status,
    updated_by: user?.id ?? item.updatedBy ?? null,
    updated_by_email: email ?? item.updatedByEmail ?? null
  };
}

function toNewPlanningItemRow(item: PlanningItem, user?: PlannerAuditUser) {
  return {
    ...toPlanningItemRow(item, user),
    created_by: user?.id ?? item.createdBy ?? null,
    created_by_email:
      (user ? getPlannerAuditEmail(user) : null) ?? item.createdByEmail ?? null
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
  item: PlanningItem,
  user?: PlannerAuditUser
): Promise<PlanningItem> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { data, error } = await supabase
    .from("planning_items")
    .insert(toNewPlanningItemRow(item, user))
    .select(planningItemSelect)
    .single();

  if (error) {
    throw error;
  }

  return mapPlanningItemRow(data as SupabasePlanningItemRow);
}

export async function updatePlannerPlanningItem(
  item: PlanningItem,
  user?: PlannerAuditUser
): Promise<PlanningItem> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { data, error } = await supabase
    .from("planning_items")
    .update(toPlanningItemRow(item, user))
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

export function subscribePlannerPlanningItems(
  onChange: (change: PlanningItemChange) => void
): () => void {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return () => {};
  }

  const channel = supabase
    .channel("planner-planning-items")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "planning_items" },
      (payload) => {
        if (payload.eventType === "DELETE") {
          const oldRow = payload.old as Partial<SupabasePlanningItemRow>;

          if (oldRow.id) {
            onChange({
              eventType: "DELETE",
              itemId: oldRow.id,
              date: oldRow.date
            });
          }

          return;
        }

        const row = payload.new as SupabasePlanningItemRow | null;

        if (!row?.id) {
          return;
        }

        onChange({
          eventType: payload.eventType as "INSERT" | "UPDATE",
          item: mapPlanningItemRow(row)
        });
      }
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}
