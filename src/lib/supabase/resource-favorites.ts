import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { PlannerAuditUser } from "@/lib/supabase/audit";

type SupabaseResourceFavoriteRow = {
  resource_id: string;
};

type ResourceFavoriteChange =
  | { eventType: "DELETE"; resourceId: string }
  | { eventType: "INSERT" | "UPDATE"; resourceId: string };

export async function fetchPlannerResourceFavoriteIds(): Promise<string[]> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { data, error } = await supabase
    .from("resource_favorites")
    .select("resource_id");

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => String(row.resource_id));
}

export async function addPlannerResourceFavorite(
  resourceId: string,
  _user: PlannerAuditUser
): Promise<void> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { data: existingFavorite, error: lookupError } = await supabase
    .from("resource_favorites")
    .select("resource_id")
    .eq("resource_id", resourceId)
    .maybeSingle();

  if (lookupError) {
    throw lookupError;
  }

  if (existingFavorite) {
    return;
  }

  const { error } = await supabase
    .from("resource_favorites")
    .insert({ resource_id: resourceId });

  if (error && error.code !== "23505") {
    throw error;
  }
}

export async function removePlannerResourceFavorite(
  resourceId: string
): Promise<void> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase is niet ingesteld.");
  }

  const { error } = await supabase
    .from("resource_favorites")
    .delete()
    .eq("resource_id", resourceId);

  if (error) {
    throw error;
  }
}

export function subscribePlannerResourceFavorites(
  onChange: (change: ResourceFavoriteChange) => void
): () => void {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return () => {};
  }

  const channel = supabase
    .channel("planner-resource-favorites")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "resource_favorites" },
      (payload) => {
        const row = (
          payload.eventType === "DELETE" ? payload.old : payload.new
        ) as SupabaseResourceFavoriteRow | null;

        if (!row?.resource_id) {
          return;
        }

        onChange({
          eventType: payload.eventType as ResourceFavoriteChange["eventType"],
          resourceId: row.resource_id
        });
      }
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}
