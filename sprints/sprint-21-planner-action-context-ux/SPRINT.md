# Sprint 21 - Planner Action Context UX

## Doel

De actieve plannercontext onmiddellijk duidelijker maken in de sticky `PlanningForm`, zonder nieuwe flow, state machine of interaction mode.

## Scope

Sprint 21 Slice 1 is uitgevoerd als kleine UX-slice:

- action context chip toegevoegd in de bestaande sticky `PlanningForm`;
- context wordt afgeleid uit bestaande state;
- create, edit en relocation worden compacter en explicieter benoemd;
- matrixklikgedrag blijft identiek;
- relocation blijft expliciet via bestaande doelcelkeuze en move-knop;
- geen nieuwe interacties toegevoegd.

Sprint 21 Slice 2 is uitgevoerd als kleine visual context polish:

- bezette cellen krijgen tijdens relocation-context een zachte amber-tint/rand;
- destination cell heeft een iets sterkere amber-ring;
- source card blijft herkenbaar via selected styling en subtiele accentlijn;
- matrixklikgedrag blijft identiek;
- cards blijven klikbaar;
- geen nieuwe state, klikzones, labels, overlays, knoppen of interacties toegevoegd.

## Gewijzigde bestanden

Codebestanden die tijdens Slice 1 zijn gewijzigd:

- `src/app/page.tsx`
- `src/components/planning/PlanningForm.tsx`

Codebestanden die tijdens Slice 2 zijn gewijzigd:

- `src/components/planning/PlanningCell.tsx`
- `src/components/planning/PlanningCard.tsx`

Documentatiebestanden voor closure:

- `sprints/sprint-21-planner-action-context-ux/SPRINT.md`
- `sprints/sprint-21-planner-action-context-ux/QA.md`
- `sprints/sprint-21-planner-action-context-ux/tickets/T2101.md`
- `sprints/sprint-21-planner-action-context-ux/tickets/T2102.md`
- `sprints/sprint-21-planner-action-context-ux/tickets/T2103.md`
- `sprints/sprint-21-planner-action-context-ux/tickets/T2104.md`
- `PROJECT_STATE.md`

## UX-beslissingen

De action context chip gebruikt compacte microcopy:

- `Nieuwe planning: [werknemer] - [datum]`
- `Nieuwe planning: Kies een cel`
- `Bewerken: [taak] - kies doelcel om te verplaatsen`
- `Verplaatsen: [taak] -> [werknemer] - [datum]`

De chip blijft in de sticky form omdat daar de actieve handeling al plaatsvindt. Er is geen extra paneel, workflowbar of modal toegevoegd.

Slice 2 gebruikt bestaande matrixstates en styling:

- bezette cellen mogen tijdens relocation-context subtiel doelbaar aanvoelen;
- destination cell moet duidelijker blijven dan gewone relocation-context;
- source card blijft herkenbaar, maar planningcards blijven dominant;
- amber relocation-context mag niet lezen als conflict/warning;
- conflictbadges blijven visueel belangrijker.

## QA-resultaat

Browser-QA bevestigde:

- lege selectie toont duidelijk dat een cel gekozen moet worden;
- geselecteerde cel toont duidelijk dat nieuwe planning wordt aangemaakt;
- geselecteerde planningcard toont duidelijk edit-context;
- relocation na doelcelkeuze toont bronkaart en doelcel;
- chip blijft compact in de sticky form;
- lange taaknamen truncaten aanvaardbaar;
- interaction voelt niet als drag/drop;
- create, edit, delete en relocation blijven functioneel intact;
- bugs: nee.

Na QA is een kleine relocation microcopy polish uitgevoerd:

- edit-context toont nu explicieter `kies doelcel om te verplaatsen`;
- zodra een doelcel actief is, blijft de context `Verplaatsen: [taak] -> [werknemer] - [datum]`.

Slice 2 browser-QA bevestigde:

- relocation-mode is visueel duidelijker;
- bezette cellen voelen doelbaar zonder nieuwe interactie;
- amber leest niet als conflict/warning;
- echte conflictbadges blijven belangrijker;
- planningcards blijven dominant;
- availability in bezette cellen blijft ondergeschikt;
- source card blijft herkenbaar;
- destination cell is duidelijk;
- interaction voelt niet als drag/drop;
- create, edit, delete en relocation blijven functioneel intact;
- bugs: nee.

## Expliciete non-goals

Niet gebouwd:

- nieuwe state machine;
- nieuwe interaction mode;
- workflow engine;
- workflowbar;
- extra paneel;
- modal;
- nieuwe knoppen;
- nieuwe klikzones;
- hoverlabels;
- overlays;
- drag/drop;
- drag/drop-affordance;
- persistence;
- backend/API;
- permissions;
- packages/frameworks;
- redesign;
- nieuwe architectuurlaag;
- conflictengine-wijzigingen;
- `resourceId/resourceIds` compatlaag-wijzigingen.

## Resterend aandachtspunt

Lange chiptekst kan truncaten, vooral bij lange taaknamen plus relocation-instructie. Dit is acceptabel binnen de compacte sticky form; de volledige context blijft beschikbaar via de `title`.

Slice 2 aandachtspunt:

- amber relocation-context kan bij veel bezette cellen iets meer visuele aanwezigheid geven; dit blijft acceptabel zolang conflictbadges, planningcards en selected/destination states sterker blijven.

## Status

Sprint 21 Slice 2 is afgerond. Sprint 21 wordt niet verder uitgebreid zonder nieuwe opdracht.
