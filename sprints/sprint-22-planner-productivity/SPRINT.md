# Sprint 22 - Planner Productivity

## Doel

Kleine productivity-wins toevoegen die planners minder herhaalde handelingen geven zonder de compacte plannerarchitectuur te verbreden.

Slice 1 richt zich op opeenvolgende planningitems met hetzelfde materieel: geselecteerd materieel kan optioneel behouden blijven na toevoegen.

## Scope

Sprint 22 Slice 1 is uitgevoerd als kleine create-flow slice:

- compacte checkbox `Materieel behouden` toegevoegd in de bestaande `PlanningForm`;
- checkbox is alleen zichtbaar in create mode;
- checkbox staat standaard uit;
- met checkbox uit blijft het bestaande resetgedrag behouden;
- met checkbox aan blijven geselecteerde `resourceIds` behouden na toevoegen;
- een selectie met een resource blijft behouden;
- een selectie met meerdere resources blijft behouden;
- taak/projectvelden resetten na toevoegen zoals voordien;
- actieve cel/context blijft volgens bestaand gedrag;
- edit mode wordt niet beinvloed.

## Gewijzigde bestanden

Codebestand dat tijdens Slice 1 is gewijzigd:

- `src/components/planning/PlanningForm.tsx`

Documentatiebestanden voor closure:

- `sprints/sprint-22-planner-productivity/SPRINT.md`
- `sprints/sprint-22-planner-productivity/QA.md`
- `sprints/sprint-22-planner-productivity/tickets/T2201.md`
- `sprints/sprint-22-planner-productivity/tickets/T2202.md`
- `PROJECT_STATE.md`

## UX-beslissing

De optie blijft klein en lokaal in de sticky `PlanningForm`, omdat de handeling direct bij het aanmaken van planningitems hoort.

De checkbox staat standaard uit. Dat houdt het bestaande veilige resetgedrag intact en voorkomt dat planners per ongeluk materieel blijven meenemen wanneer ze dat niet verwachten.

De keuze is bewust geen preference of permanente instelling. Er is geen persistence, localStorage, backend/API of user-accountlogica toegevoegd.

## Architectuurbeslissing

De slice gebruikt bestaande form state en bestaande `resourceIds`.

Niet gewijzigd:

- `PlanningItem`;
- `resourceId/resourceIds` compatlaag;
- resource helpers;
- conflictengine;
- backend/API;
- persistence;
- localStorage.

## QA-resultaat

Browser-QA bevestigde:

- checkbox `Materieel behouden` is zichtbaar in create mode;
- checkbox staat standaard uit;
- met checkbox uit reset materieel zoals voordien;
- met checkbox aan blijft een geselecteerde resource behouden na toevoegen;
- met checkbox aan blijven meerdere geselecteerde resources behouden na toevoegen;
- taak/projectvelden resetten correct na toevoegen;
- actieve cel/context blijft logisch;
- edit mode wordt niet beinvloed;
- delete blijft intact;
- relocation blijft intact;
- conflictvalidatie per resource blijft intact;
- UI blijft compact en niet verwarrend;
- bugs: nee.

Build/typecheck:

- `npm run build` geslaagd;
- Next production build geslaagd;
- TypeScript-validatie via build geslaagd.

## Expliciete non-goals

Niet gebouwd:

- persistence;
- backend/API;
- localStorage;
- user preferences;
- accounts/permissions;
- nieuwe packages/frameworks;
- redesign;
- aparte productivitymodule;
- wijzigingen aan `PlanningItem`;
- wijzigingen aan `resourceId/resourceIds`;
- wijzigingen aan resource helpers;
- wijzigingen aan conflictengine;
- wijzigingen aan edit-flow;
- drag/drop.

## Resterend aandachtspunt

De checkbox vergeten aan te laten kan foutgevoelig zijn bij reeksen planningitems met hetzelfde materieel. Daarom blijft de optie standaard uit, zichtbaar lokaal in de create-flow en niet persistent over reloads of sessies.

## Status

Sprint 22 Slice 1 is afgerond. Sprint 22 wordt niet verder uitgebreid zonder nieuwe opdracht.
