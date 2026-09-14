# QA: werknemers toevoegen aan een week

Datum: 2026-09-14

## Probleem en herstel

De melding `Werknemer niet toegevoegd aan deze week in Supabase.` werd
veroorzaakt door een merge-upsert in `src/lib/supabase/weekly-employees.ts`.
De live tabel `weekly_employee_additions` staat voor `authenticated` SELECT,
INSERT en DELETE toe, maar geen UPDATE. Een merge-upsert vraagt ook bij een
nieuwe inschrijving UPDATE-rechten en faalt daardoor.

De toevoegfunctie gebruikt nu `ignoreDuplicates: true` op de bestaande unieke
sleutel `week_key,employee_id`. Een bestaande inschrijving blijft ongewijzigd,
inclusief de oorspronkelijke aanmaker. Dit blijft een enkele databaseaanvraag.
Er zijn geen schemawijzigingen of extra toegangsrechten nodig.

## Verificatie

- Live tabelkolommen, grants en RLS-policies gecontroleerd.
- Oude fout gereproduceerd als rol `authenticated` in een SQL-transactie.
- Nieuwe insert, dubbele insert, behoud van aanmaker, verwijderen en opnieuw
  toevoegen geslaagd met dezelfde rol. Alle testwrites teruggedraaid met ROLLBACK.
- Werkelijke TypeScript-helper met de geinstalleerde Supabase-client en een
  gesimuleerd netwerk getest: een request met `resolution=ignore-duplicates`,
  correcte sleutel en auditvelden; databasefouten worden doorgegeven.
- `npm run build` geslaagd, inclusief linting en TypeScript-controle.
- Geen volledige interactieve browserregressie uitgevoerd; de UI en overige
  planningflows zijn niet gewijzigd.
