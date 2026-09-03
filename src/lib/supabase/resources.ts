import type { Resource } from "@/types/planning";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type SupabaseResourceRow = {
  id: string;
  number: string;
  group: string | null;
  name: string;
  brand: string | null;
  category: Resource["category"];
  type: string | null;
  is_defective: boolean | null;
  is_favorite: boolean | null;
};

let cachedResources: Resource[] | null = null;

function mapResourceRow(row: SupabaseResourceRow): Resource {
  return {
    id: row.id,
    number: row.number,
    group: row.group ?? undefined,
    name: row.name,
    brand: row.brand ?? undefined,
    category: row.category,
    type: row.type ?? "",
    isDefective: row.is_defective ?? false,
    isFavorite: row.is_favorite ?? false
  };
}

export async function fetchPlannerResources(
  forceRefresh = false
): Promise<Resource[]> {
  if (cachedResources && !forceRefresh) {
    return cachedResources;
  }

  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { data, error } = await supabase
    .from("resources")
    .select(
      "id, number, group, name, brand, category, type, is_defective, is_favorite"
    )
    .order("number", { ascending: false });

  if (error) {
    throw error;
  }

  cachedResources = (data ?? []).map((row) =>
    mapResourceRow(row as SupabaseResourceRow)
  );

  return cachedResources;
}
