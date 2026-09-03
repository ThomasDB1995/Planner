# Sprint 28 - Grid Readability & Planner Scanability

## Slice 1 - Roosterlijn-Hiërarchie Versterken

Status: afgerond.

## Doel

De bestaande matrixplanner visueel sterker als rooster laten aanvoelen, zodat planners sneller werknemer x dag herkennen bij realistische aantallen werknemers.

De gewenste richting is moderne dispatchingsoftware met de leesbaarheid van Excel, zonder letterlijk Excel te worden.

## Scope

Sprint 28 Slice 1 is uitgevoerd als kleine styling-slice:

- verticale daggrenzen zijn duidelijker gemaakt;
- horizontale werknemerrijen zijn beter afgebakend;
- boardrand en headerlijnen zijn consistenter gemaakt;
- availability-cellen behouden zachte kleur maar gebruiken neutrale gridranden;
- category separators blijven subtiel;
- planningcards zijn niet gewijzigd;
- selected cell, relocation en conflictbadges blijven zichtbaar.

De wijziging raakt alleen de visuele roosterstructuur. Er is geen nieuwe state, interactie of plannerlogica toegevoegd.

## Gewijzigde bestanden

Codebestanden die tijdens Slice 1 zijn gewijzigd:

- `src/components/planning/WeekHeader.tsx`
- `src/components/planning/EmployeeRow.tsx`
- `src/components/planning/PlanningCell.tsx`
- `src/components/planning/WeekPlanningBoard.tsx`

Documentatiebestanden voor closure:

- `sprints/sprint-28-grid-readability-planner-scanability/SPRINT.md`
- `sprints/sprint-28-grid-readability-planner-scanability/QA.md`
- `sprints/sprint-28-grid-readability-planner-scanability/tickets/T2801.md`
- `PROJECT_STATE.md`

## UX-Beslissing

De roosterstructuur wordt versterkt via subtiele, neutrale gridlijnen in plaats van grotere cellen, zware borders of een spreadsheet-redesign.

Belangrijke keuzes:

- dagkolommen krijgen meer visueel houvast;
- werknemerrijen blijven compact maar beter scanbaar;
- availability blijft zichtbaar als zachte contextlaag;
- gridlijnen blijven zichtbaar boven availability-backgrounds;
- categorie-separators blijven secundair aan het matrixraster;
- planningcards blijven de dominante inhoud in bezette cellen.

De visuele prioriteit blijft:

1. planning;
2. conflicts;
3. selected/relocation context;
4. availability;
5. categorie/context.

## QA-Resultaat

Browser-QA met realistische werknemerslijst bevestigde:

- matrix voelt duidelijker als rooster/tabel;
- werknemer x dag is sneller herkenbaar;
- verticale daggrenzen zijn duidelijk genoeg;
- horizontale werknemerrijen zijn duidelijk genoeg;
- lijnen zijn niet te zwaar en voelen niet als oude Excel;
- availability blijft duidelijk zichtbaar;
- availability breekt het rooster niet meer;
- categorie-separators blijven subtiel;
- planningcards blijven dominant;
- selected cell blijft zichtbaar;
- relocation styling blijft zichtbaar;
- conflictbadges blijven opvallend;
- matrix blijft compact en rustig;
- create, edit, delete, relocation en weeknavigatie blijven intact;
- bugs: nee.

Build/typecheck:

- `npm run build` is geslaagd na implementatie.

## Non-Goals

Niet toegevoegd:

- nieuwe state;
- nieuwe interacties;
- hoverlogica;
- crosshair;
- card-redesign;
- grotere cellen;
- zware zwarte borders;
- letterlijke Excel-look;
- spreadsheet-editinggevoel;
- drag/drop;
- businesslogica;
- planninglogica;
- conflictregelwijzigingen;
- availability-logica;
- persistence/backend/API;
- packages/frameworks.

## Resterend Aandachtspunt

Na langer praktijkgebruik kan eventueel een subtiele row/focus-anker slice onderzocht worden, bijvoorbeeld om de actieve rij of kolom bij focus nog beter te volgen.

Dat is bewust niet in Slice 1 meegenomen, omdat deze slice alleen de basisroosterlijnen mocht versterken zonder nieuwe interactie- of hoverlaag.

## Status

Sprint 28 Slice 1 is afgerond. Sprint 28 wordt niet verder uitgebreid zonder nieuwe opdracht.
