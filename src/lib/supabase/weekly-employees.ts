import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  getPlannerAuditEmail,
  type PlannerAuditUser
} from "@/lib/supabase/audit";

type SupabaseWeeklyEmployeeRow = {
  week_key: string;
  employee_id: string;
};

type WeeklyEmployeeChange =
  | { eventType: "DELETE"; weekKey: string; employeeId: string }
  | { eventType: "INSERT" | "UPDATE"; weekKey: string; employeeId: string };

export async function fetchPlannerWeeklyEmployeeIds(
  weekKey: string
): Promise<string[]> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { data, error } = await supabase
    .from("weekly_employee_additions")
    .select("employee_id")
    .eq("week_key", weekKey);

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => String(row.employee_id));
}

export async function addPlannerWeeklyEmployee(
  weekKey: string,
  employeeId: string,
  user: PlannerAuditUser
): Promise<void> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { error } = await supabase.from("weekly_employee_additions").upsert(
    {
      week_key: weekKey,
      employee_id: employeeId,
      created_by: user.id,
      created_by_email: getPlannerAuditEmail(user)
    },
    { onConflict: "week_key,employee_id" }
  );

  if (error) {
    throw error;
  }
}

export async function removePlannerWeeklyEmployee(
  weekKey: string,
  employeeId: string
): Promise<void> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { error } = await supabase
    .from("weekly_employee_additions")
    .delete()
    .eq("week_key", weekKey)
    .eq("employee_id", employeeId);

  if (error) {
    throw error;
  }
}

export function subscribePlannerWeeklyEmployees(
  onChange: (change: WeeklyEmployeeChange) => void
): () => void {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return () => {};
  }

  const channel = supabase
    .channel("planner-weekly-employees")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "weekly_employee_additions" },
      (payload) => {
        const row = (
          payload.eventType === "DELETE" ? payload.old : payload.new
        ) as SupabaseWeeklyEmployeeRow | null;

        if (!row?.week_key || !row.employee_id) {
          return;
        }

        onChange({
          eventType: payload.eventType as WeeklyEmployeeChange["eventType"],
          weekKey: row.week_key,
          employeeId: row.employee_id
        });
      }
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}
