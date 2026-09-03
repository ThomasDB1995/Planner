# Sprint 09 - Planning UX Simplification & Polish

## Sprintstatus

Afgerond.

## Sprintdoel

De hoofdplanningflow eenvoudiger en sneller maken voor dagelijkse planning:

1. resource optioneel maken;
2. statuskeuze en statusbadges uit de hoofd-UX halen;
3. defectstatus uit de centrale selector/card-UX halen;
4. taak/project na celselectie automatisch focus geven;
5. planningcards lichter en scanbaarder maken.

Deze sprint is uitgevoerd als een veilige UX-polish batch met centrale localhostvalidatie.

## In Scope

- T901 resource optioneel maken.
- T902 statusflow vereenvoudigen.
- T903 defectstatus uit hoofdplanningflow halen.
- T904 autofocus taak/project na celselectie.
- T905 lichte card cleanup en scanbaarheid.
- T906 QA en closure.

## Buiten Scope

- availability;
- multi-resource;
- drag/drop;
- persistence/backend/API;
- packages/frameworks;
- grote redesigns;
- contextmenu;
- undo/history;
- nieuwe statusworkflow;
- card editing;
- Sprint 10 voorbereiding of start.

## Sprintresultaat

Opgeleverd:

- `PlanningItem.resourceId` is optioneel gemaakt;
- formulier valideert alleen datum, werknemer en taak/project als verplichte velden;
- items zonder resource zijn geldig en tonen compact `Geen resource`;
- conflictvalidatie slaat items zonder resource over;
- resourceconflicten blijven werken wanneer een resource aanwezig is;
- statusselectie is verwijderd uit het planningformulier;
- planningcards tonen geen statusbadges of statuslabels meer;
- status blijft alleen als vaste technische default aanwezig om het bestaande typecontract klein te houden;
- defectstatus wordt niet meer prominent getoond in de resource selector of op cards;
- defectconflictwaarschuwingen zijn uit de hoofdplanningflow gehaald;
- klik op een planningcel behoudt datum/werknemer-prefill en focust het taak/project inputveld;
- planningcards tonen taak/project prominenter en resource subtieler;
- delete, card focus en relocation blijven bestaan.

## T906 Closure

Build en localhost-QA zijn uitgevoerd.

Resultaat:

- `npm run build` geslaagd;
- localhost opent op `http://127.0.0.1:3000`;
- geen browserconsole-errors gezien;
- item zonder resource aangemaakt en zichtbaar in juiste cel;
- item met resource aangemaakt en zichtbaar in juiste cel;
- dubbele resourceplanning op dezelfde datum geeft conflict;
- items zonder resource geven geen resourceconflict;
- statusbadges blijven verborgen;
- defectbadges blijven verborgen;
- celselectie focust het taak/project inputveld;
- taak/project input is zichtbaar en actief na celselectie;
- delete blijft werken;
- relocation blijft werken via geselecteerde card + actieve doelcel + expliciete actie.

## Mogelijke UX-Regressie Gecontroleerd

Observatievraag:

- na celselectie focust het taak/project veld;
- controleer of getypte tekst realtime zichtbaar is in het inputveld.

Closurebevinding:

- focus komt correct op het taak/project inputveld;
- inputveld is zichtbaar, actief en heeft normale afmetingen;
- browserautomation kon echte tekstinvoer niet volledig simuleren door de bekende virtual-clipboard beperking;
- er is geen codebug gevonden die tekstweergave verhindert;
- geen bugfix uitgevoerd.

## Nieuwe Toekomstige UX-Slice

Planningcards moeten later bewerkbaar worden.

Toekomstige requirement:

- gebruiker moet een bestaande taak/project kunnen aanpassen;
- edit-flow moet bestaande card selection, delete en relocation respecteren;
- geen inline editor, modal, contextmenu of persistence is in Sprint 09 gebouwd;
- card editing blijft een latere aparte UX-slice.

## Scopecontrole

Niet toegevoegd:

- availability;
- multi-resource;
- drag/drop;
- persistence/backend/API;
- packages/frameworks;
- grote redesigns;
- contextmenu;
- undo/history;
- nieuwe statusworkflow;
- uitgevoerd-flow;
- card editing.

## Gewijzigde Codefiles

- `src/types/planning.ts`
- `src/components/planning/PlanningForm.tsx`
- `src/components/planning/ResourceSelector.tsx`
- `src/components/planning/PlanningCard.tsx`
- `src/components/planning/PlanningCell.tsx`
- `src/components/planning/PlanningTable.tsx`
- `src/lib/planning/conflicts.ts`
- `src/lib/planning/status.ts` verwijderd
- `src/app/page.tsx`

## Closure-Conclusie

Sprint 09 is afgerond als low-risk UX-polish batch.

De planningflow vraagt nu minder verplichte invoer, toont minder status- en defectruis, en ondersteunt sneller typen na celselectie. De bestaande matrixplanning, card selection/delete en relocation-flow blijven behouden.

