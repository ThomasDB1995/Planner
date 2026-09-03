export type PlannerAuditUser = {
  id: string;
  email?: string | null;
};

export function getPlannerAuditEmail(user: PlannerAuditUser): string | null {
  return user.email?.trim() || null;
}
