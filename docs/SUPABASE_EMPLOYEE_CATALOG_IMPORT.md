# Supabase Employee Catalog Import

Deze bestanden zetten de lightweight planner-werknemerslijst klaar voor Supabase. De planner leest werknemers na login uit `public.employees`.

## Bestanden

- `supabase/employees_schema.sql`: tabeldefinitie, constraints, grants en read-policy voor aangemelde gebruikers.
- `supabase/employees_seed.sql`: werknemerslijst als idempotente SQL insert/update.
- `supabase/employees_catalog.csv`: dezelfde werknemerslijst als CSV voor Supabase Table Editor import.

## Catalogus

- Aantal werknemers: 32
- Standaard zichtbaar/kernploeg: 14
- Niet standaard: 18
- Dubbele ids: geen
- Dubbele namen: geen
- Categorieverdeling:
  - Werknemer: 4
  - Zelfstandige: 10
  - Flexi-job: 12
  - Werknemer, bureau: 5
  - Vakantiejob: 1

## Mapping

- `id`: bestaande stabiele planner-id.
- `first_name`: bestaande `firstName`.
- `last_name`: bestaande `lastName`, vaak leeg omdat roepnaam/displaynaam historisch volledig in `firstName` zit.
- `name`: compatibele displaynaam.
- `category`: lichte planner-categorie, geen HR-status.
- `sort_order`: operationele volgorde binnen categorie.
- `is_default_visible`: kernploeg/default zichtbaarheid.
- `is_hidden`: operationeel verbergen, standaard `false`; hide/show blijft voorlopig lokaal in-memory tot expliciete persistence.

## Controlequeries

```sql
select count(*) from public.employees;
select category, count(*) from public.employees group by category order by category;
select id, name, category, sort_order, is_default_visible from public.employees order by sort_order;
```

## Bewuste non-goals

- Geen HR-module.
- Geen payroll, contracten, rollen of permissions.
- Geen employee writes vanuit de app in deze stap.
- Geen hard delete.
- Geen wijziging aan planningitems, availability of conflicts.
