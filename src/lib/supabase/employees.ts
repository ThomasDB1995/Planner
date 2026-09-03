import type { Employee, EmployeeCategory } from "@/types/planning";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type SupabaseEmployeeRow = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  name: string;
  category: EmployeeCategory;
  sort_order: number | string | null;
  is_default_visible: boolean | null;
  is_hidden: boolean | null;
};

let cachedEmployees: Employee[] | null = null;

function mapEmployeeRow(row: SupabaseEmployeeRow): Employee {
  return {
    id: row.id,
    firstName: row.first_name ?? "",
    lastName: row.last_name ?? "",
    name: row.name,
    category: row.category,
    sortOrder: Number(row.sort_order ?? 0),
    isDefaultVisible: row.is_default_visible ?? true,
    isHidden: row.is_hidden ?? false
  };
}

export async function fetchPlannerEmployees(): Promise<Employee[]> {
  if (cachedEmployees) {
    return cachedEmployees;
  }

  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { data, error } = await supabase
    .from("employees")
    .select(
      "id, first_name, last_name, name, category, sort_order, is_default_visible, is_hidden"
    )
    .order("sort_order", { ascending: true });

  if (error) {
    throw error;
  }

  cachedEmployees = (data ?? []).map((row) =>
    mapEmployeeRow(row as SupabaseEmployeeRow)
  );

  return cachedEmployees;
}
