import type {
  EmployeeAvailability,
  SelectedPlanningCell
} from "@/components/planning/matrix";
import type { AvailabilityType } from "@/lib/planning/availability";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  getPlannerAuditEmail,
  type PlannerAuditUser
} from "@/lib/supabase/audit";

type SupabaseAvailabilityRow = {
  employee_id: string;
  date: string;
  type: AvailabilityType | string;
};

type AvailabilityChange =
  | { eventType: "DELETE"; availability: EmployeeAvailability }
  | { eventType: "INSERT" | "UPDATE"; availability: EmployeeAvailability };

const availabilitySelect = "employee_id, date, type";

function mapAvailabilityRow(row: SupabaseAvailabilityRow): EmployeeAvailability {
  return {
    employeeId: row.employee_id,
    date: row.date,
    type: row.type as AvailabilityType
  };
}

function toAvailabilityRow(
  cell: SelectedPlanningCell,
  type: AvailabilityType,
  user: PlannerAuditUser
) {
  const email = getPlannerAuditEmail(user);

  return {
    employee_id: cell.employeeId,
    date: cell.date,
    type,
    updated_by: user.id,
    updated_by_email: email,
    created_by_email: email
  };
}

export async function fetchPlannerAvailabilityForDateRange(
  startDate: string,
  endDate: string
): Promise<EmployeeAvailability[]> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { data, error } = await supabase
    .from("employee_availability")
    .select(availabilitySelect)
    .gte("date", startDate)
    .lte("date", endDate);

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) =>
    mapAvailabilityRow(row as SupabaseAvailabilityRow)
  );
}

export async function upsertPlannerAvailability(
  cell: SelectedPlanningCell,
  type: AvailabilityType,
  user: PlannerAuditUser
): Promise<EmployeeAvailability> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { data, error } = await supabase
    .from("employee_availability")
    .upsert(toAvailabilityRow(cell, type, user), {
      onConflict: "employee_id,date"
    })
    .select(availabilitySelect)
    .single();

  if (error) {
    throw error;
  }

  return mapAvailabilityRow(data as SupabaseAvailabilityRow);
}

export async function deletePlannerAvailability(
  cell: SelectedPlanningCell
): Promise<void> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { error } = await supabase
    .from("employee_availability")
    .delete()
    .eq("employee_id", cell.employeeId)
    .eq("date", cell.date);

  if (error) {
    throw error;
  }
}

export function subscribePlannerAvailability(
  onChange: (change: AvailabilityChange) => void
): () => void {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return () => {};
  }

  const channel = supabase
    .channel("planner-employee-availability")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "employee_availability" },
      (payload) => {
        const row = (
          payload.eventType === "DELETE" ? payload.old : payload.new
        ) as SupabaseAvailabilityRow | null;

        if (!row?.employee_id || !row.date || !row.type) {
          return;
        }

        onChange({
          eventType: payload.eventType as AvailabilityChange["eventType"],
          availability: mapAvailabilityRow(row)
        });
      }
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}
