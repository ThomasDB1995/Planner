# Sprint 24 - Week Navigation

## Doel

Minimale weeknavigatie toevoegen zodat planners vorige, huidige en toekomstige werkweken kunnen bekijken zonder architectuurrewrite.

De planner blijft datumgebaseerd. De actieve week is alleen view/filter-context.

## Scope

Sprint 24 Slice 1 is uitgevoerd als kleine view-slice:

- weeknavigatie toegevoegd met `Vorige week`, `Vandaag` en `Volgende week`;
- `getWorkWeek(anchorDate)` toegevoegd als parametriseerbare weekhelper;
- `getCurrentWorkWeek()` compatibel behouden;
- actieve week wordt in `page.tsx` beheerd via week-anchor state;
- `WeekPlanningBoard` ontvangt actieve `days` via props;
- planningitems buiten de zichtbare week blijven in state maar worden niet in de matrix getoond;
- conflictvalidatie en conflictsummary worden voor de zichtbare week afgeleid;
- bij weekwissel worden selected cell, selected card/edit state, relocation source en destination gewist.

Na Slice 1 zijn twee beperkte correcties uitgevoerd:

- volledige weekweergave maandag t/m zondag als standaard;
- vaste headerzones zodat weeknavigatie niet verschuift wanneer availability-controls verschijnen.

## Gewijzigde bestanden

Codebestanden die tijdens Slice 1 zijn gewijzigd:

- `src/lib/planning/week.ts`
- `src/app/page.tsx`
- `src/components/planning/WeekPlanningBoard.tsx`

Codebestanden die tijdens Sprint 24-correcties zijn gewijzigd:

- `src/lib/planning/week.ts`
- `src/components/planning/WeekHeader.tsx`
- `src/components/planning/EmployeeRow.tsx`
- `src/components/planning/WeekPlanningBoard.tsx`

Documentatiebestanden voor closure:

- `sprints/sprint-24-week-navigation/SPRINT.md`
- `sprints/sprint-24-week-navigation/QA.md`
- `sprints/sprint-24-week-navigation/tickets/T2401.md`
- `sprints/sprint-24-week-navigation/tickets/T2402.md`
- `sprints/sprint-24-week-navigation/tickets/T2403.md`
- `sprints/sprint-24-week-navigation/tickets/T2404.md`
- `PROJECT_STATE.md`

## UX-beslissing

De weeknavigatie blijft compact in de bestaande boardheader:

- `Vorige week`;
- actieve weekrange;
- `Vandaag`;
- `Volgende week`.

Er is geen nieuwe route, pagina, kalenderpaneel of workflowmodus toegevoegd. Weekwissel wist actieve selectiecontext zodat planners niet per ongeluk edit of relocation uitvoeren op context uit een andere week.

De volledige week is voortaan standaard zichtbaar:

- maandag;
- dinsdag;
- woensdag;
- donderdag;
- vrijdag;
- zaterdag;
- zondag.

Weekenddagen zijn gewone planbare dagen. Er is geen aparte weekendlogica, conflictregel of availability-regel toegevoegd.

Na header-QA is de boardheader minimaal verdeeld in vaste zones:

- links: titel/context;
- midden: weeknavigatie;
- rechts: availability-acties, move-actie, conflictstatus en `Maandag tot zondag`.

Hierdoor blijft de weeknavigatie op een vaste plek staan wanneer celcontext-acties verschijnen.

## Architectuurbeslissing

Week is alleen view/filter-context.

Planningitems blijven gekoppeld aan echte datumstrings via `PlanningItem.date`. Availability blijft gekoppeld aan `employeeId + date`. Conflictvalidatie blijft gebaseerd op `date + resourceId`.

De weekhelper berekent maandag t/m zondag op basis van een anchor date. `getCurrentWorkWeek()` blijft bestaan voor compatibiliteit, maar `WeekPlanningBoard` bepaalt de actieve week niet langer zelf.

## QA-resultaat

Browser-QA bevestigde:

- huidige week opent correct;
- vorige week toont juiste maandag t/m zondag;
- volgende week toont juiste maandag t/m zondag;
- `Vandaag` brengt terug naar de huidige werkweek;
- planningitem toevoegen in week A verschijnt in week A;
- navigeren naar week B verbergt het item uit week A;
- terug naar week A toont het item opnieuw;
- availability op `employeeId + date` blijft correct per week;
- conflictvalidatie werkt binnen de zichtbare week;
- weekwissel wist selected cell en formcontext;
- weekwissel wist edit/selected card;
- weekwissel wist relocation source/destination;
- create, edit, delete en relocation blijven intact na weeknavigatie;
- resource favorites en `Materieel behouden` blijven intact;
- matrix blijft compact en rustig.

Weekend-correctie QA bevestigde:

- huidige, vorige en volgende week tonen maandag t/m zondag;
- zaterdag is zichtbaar en planbaar;
- zondag is zichtbaar en planbaar;
- availability zetten en wissen werkt op zaterdag en zondag;
- conflictvalidatie werkt op zaterdag en zondag;
- create, edit, delete en relocation werken op weekenddagen;
- relocation naar zaterdag/zondag werkt;
- weekwissel wist selected/edit/relocation context;
- sticky werknemerlabels blijven bruikbaar;
- horizontale layout blijft acceptabel op laptopformaat;
- matrix blijft compact genoeg.

Header polish QA bevestigde:

- weeknavigatie blijft stabiel zonder actieve cel;
- weeknavigatie blijft stabiel met actieve cel;
- weeknavigatie blijft stabiel na availability toggle;
- availability-controls blijven bruikbaar;
- conflictstatus blijft zichtbaar;
- move-actie blijft bruikbaar;
- header blijft acceptabel op laptopbreedte;
- 7-daagse matrix blijft intact.

Build/typecheck:

- `npm run build` geslaagd;
- Next production build geslaagd;
- TypeScript-validatie via build geslaagd.

## Bug Tijdens QA

Tijdens browser-QA bleek dat donderdag ontbrak in `dayLabels`, waardoor de week maar vier dagen toonde.

Beperkte fix:

- `src/lib/planning/week.ts`: `Do` toegevoegd aan `dayLabels`.

Na de fix is `npm run build` opnieuw geslaagd en is browser-QA opnieuw uitgevoerd.

Daarna is `dayLabels` uitgebreid naar maandag t/m zondag als productcorrectie voor de volledige weekplanner.

## Expliciete non-goals

Niet gebouwd:

- persistence;
- backend/API;
- database;
- routing redesign;
- employee management;
- week copy;
- templates;
- drag/drop;
- nieuwe packages/frameworks;
- grote state rewrite;
- globale cross-week conflictsummary;
- kalender- of jaarplanningmodule.

## Resterende aandachtspunten

- Er is nog geen persistence; planning blijft lokaal/in-memory.
- Cross-week conflictsummary bestaat niet; conflictsummary volgt de zichtbare week.
- W53/weeknummerlabel is nog niet uitgewerkt.
- Een compact weeknummer/jaarlabel kan later nuttig zijn.

## Status

Sprint 24 Slice 1 en correcties zijn afgerond. Sprint 24 wordt niet verder uitgebreid zonder nieuwe opdracht.
