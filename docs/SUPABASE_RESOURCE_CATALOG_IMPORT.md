# Supabase Resource Catalog Import

Deze bestanden zetten de huidige materieelcatalogus klaar voor Supabase.
De planner leest materieel na login uit `public.resources`.

## Bestanden

- `supabase/resources_schema.sql`: tabeldefinitie, constraints, grants en read-policy voor aangemelde gebruikers.
- `supabase/resources_seed.sql`: volledige catalogus als idempotente SQL insert/update.
- `supabase/resources_catalog.csv`: dezelfde catalogus als CSV voor Supabase Table Editor import.

## Catalogus

- Aantal resources: 239
- Dubbele ids: geen
- Dubbele nummers: geen
- Categorieverdeling:
  - aanhanger: 9
  - machine: 143
  - voertuig: 28
  - werktuig: 59

## Mapping

- `id`: stabiel afgeleid uit volledig genormaliseerd nummer.
- `number`: volledige operationele nummercode, niet reduceren.
- `group`: afgeleid uit volledige nummercode. In SQL wordt dit als `"group"` geschreven omdat `GROUP` een SQL-keyword is.
- `name`: beschrijving/displaynaam.
- `brand`: optionele zoekmetadata, niet dominant op planningkaart.
- `category`: grove planner-categorie: `machine`, `voertuig`, `werktuig`, `aanhanger`.
- `type`: raw soort/type als detail- en zoekmetadata.
- `is_defective`: lightweight plannerstatus, standaard `false`.
- `is_favorite`: standaard `false`; huidige favorieten blijven voorlopig in-memory tot we expliciet persistence bouwen.

## Aanbevolen import

1. Open Supabase SQL Editor.
2. Run eerst `supabase/resources_schema.sql`.
3. Run daarna `supabase/resources_seed.sql`.
4. Controleer met:

```sql
select count(*) from public.resources;
select category, count(*) from public.resources group by category order by category;
select id, number, "group", name, brand, category, type from public.resources order by number desc limit 20;
```

## Bewuste non-goals

- Geen resource writes vanuit de app in deze stap.
- Geen resource CRUD.
- Geen fleet management.
- Geen onderhoud, kostprijzen, documenten of telemetrie.
- Geen wijziging aan `resourceId/resourceIds`.
- Geen push/deploy zonder expliciete toestemming.
