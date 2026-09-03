# Supabase Planning Persistence

De planner bewaart nieuwe planningitems in `public.planning_items`.

## Gedrag

- Planningitems worden weekgericht geladen voor de actieve maandag-zondag week.
- Alle aangemelde gebruikers lezen en schrijven dezelfde planningtabel.
- Create, delete en relocation schrijven direct naar Supabase.
- Edit blijft lokaal direct voelbaar en wordt kort gedebounced opgeslagen om onnodige writes tijdens typen te beperken.
- Planningitems blijven datumgebaseerd; weeknavigatie blijft alleen view/filter-context.

## Mapping

- `id` -> `PlanningItem.id`
- `date` -> `PlanningItem.date`
- `employee_id` -> `PlanningItem.employeeId`
- `task_name` -> `PlanningItem.taskName`
- `resource_id` -> compatibel primair resource-id
- `resource_ids` -> additieve multi-resource ids
- `status` -> `PlanningItem.status`

## Bewuste keuzes

- Geen harde foreign keys naar employees/resources zolang lokale employee-weekflows nog in-memory bestaan.
- Geen realtime-sync in deze slice; andere users zien gedeelde data na laden/herladen/weekwissel.
- Geen persistence voor availability, employee hide/show, weektoevoegingen of resource favorites in deze stap.
- Geen werkbon, nacalculatie, workflow of approvals.
