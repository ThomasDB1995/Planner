# QA - Sprint 10 Planning Card Editing & Quick Adjustments

## Status

Afgerond.

## Doel Van QA

Valideren dat bestaande planningcards lokaal kunnen worden aangepast via het bestaande `PlanningForm`, zonder bestaande matrix-, create-, selectie-, delete-, relocation- of conflictflow te breken.

## Buildstatus

`npm run build` uitgevoerd bij T1004 closure.

Resultaat:

- build geslaagd;
- TypeScript-validatie geslaagd;
- Next.js static page generation geslaagd.

## T1004 Closure Smoke

Gecontroleerd op localhost:

- applicatietitel zichtbaar;
- planningformulier zichtbaar;
- weekmatrix zichtbaar;
- maandag tot vrijdag zichtbaar;
- browserconsole zonder warnings of errors.

## Lokale UX-Controle

Te controleren op localhost:

- applicatie opent zonder console-errors;
- werknemers blijven verticaal als rijen zichtbaar;
- dagen/data blijven horizontaal als kolommen zichtbaar;
- maandag t.e.m. vrijdag blijft standaard;
- celselectie werkt nog;
- actieve celcontext toont correcte werknemer en datum;
- formulier-prefill vanuit cel werkt nog voor nieuwe items;
- planningitem zonder resource kan nog worden aangemaakt;
- planningitem met resource kan nog worden aangemaakt;
- bestaande planningcard kan geselecteerd worden;
- geselecteerde planningcard opent in editmodus in het bestaande formulier;
- editmodus is duidelijk anders dan toevoegen;
- taak/project kan direct lokaal worden aangepast;
- resource kan direct lokaal worden aangepast;
- resource kan direct lokaal worden gewist;
- directe edit wijzigt exact 1 bestaande card;
- planningitem-id blijft behouden;
- datum en werknemer zijn in editmodus niet direct bewerkbaar;
- conflictbadges en conflictsummary herberekenen na resource-edit;
- nieuwe planning toevoegen na edit blijft werken;
- delete blijft werken;
- relocation blijft werken via geselecteerde card + actieve doelcel + `Verplaats naar actieve cel`.

## Test Matrix

| Test | Verwacht resultaat | Status |
| --- | --- | --- |
| Build uitvoeren | Build slaagt zonder TypeScript errors | Geslaagd bij T1003 |
| Localhost openen | App rendert zonder console errors | Geslaagd bij T1003 |
| Nieuw item zonder resource | Item wordt aangemaakt en toont `Geen resource` | Geslaagd bij T1003 |
| Nieuw item met resource | Resource wordt subtiel getoond op card | Geslaagd bij T1003 |
| Card selecteren | Card krijgt focus; editmodus kan starten | Geslaagd bij T1003 |
| Taak/project editten | Card toont direct aangepaste tekst | Geslaagd bij T1003 |
| Resource toevoegen | Card toont direct gekozen resource | Geslaagd bij T1003 |
| Resource wissen | Card toont direct `Geen resource` | Geslaagd bij T1003 |
| Dubbele resource via edit | Conflictwaarschuwing verschijnt | Geslaagd bij T1003 |
| Conflict oplossen via edit | Conflictwaarschuwing verdwijnt | Geslaagd bij T1003 |
| Datum/werknemer editmodus | Niet direct bewerkbaar; uitleg over verplaatsen zichtbaar | Geslaagd bij T1003 |
| Create na edit | Nieuw item toevoegen werkt nog | Geslaagd bij T1003 |
| Celselectie na edit | Datum/werknemer-prefill blijft werken | Geslaagd bij T1003 |
| Card delete | Geselecteerde/aangepaste card kan verwijderd worden | Geslaagd bij T1003 |
| Relocation na edit | Aangepaste card kan verplaatst worden | Geslaagd bij T1003 |
| Scopecontrole | Geen out-of-scope features toegevoegd | Geslaagd bij T1003 |

## T1003 Test Matrix

| Test | Verwacht resultaat | Status |
| --- | --- | --- |
| Build uitvoeren | Build slaagt zonder TypeScript errors | Geslaagd |
| Localhost openen | App rendert zonder console errors | Geslaagd |
| Card selecteren | Card krijgt focus en editmodus start | Geslaagd |
| Taak/project editten | Card toont direct aangepaste tekst | Geslaagd |
| Resource wissen | Card toont direct `Geen resource`; conflict verdwijnt | Geslaagd |
| Resource opnieuw kiezen | Resource verschijnt; conflict herberekent | Geslaagd |
| Dubbele resource via edit | Conflictbadge en summary verschijnen | Geslaagd |
| Datum/werknemer editmodus | Niet direct bewerkbaar; uitleg over verplaatsen zichtbaar | Geslaagd |
| Edit naar create via cel | Create mode toont gekozen datum/werknemer en lege taak/resource | Geslaagd na guardrail-fix |
| Create na edit | Nieuw item toevoegen werkt | Geslaagd |
| Relocation na edit | Edited card kan verplaatst worden | Geslaagd |
| Card delete | Edited/moved card kan verwijderd worden | Geslaagd |
| Browserconsole | Geen warnings of errors | Geslaagd |
| Scopecontrole | Geen out-of-scope features toegevoegd | Geslaagd |

## Regressiecontrole

Te behouden gedrag:

- matrixrichting blijft werknemers verticaal en dagen horizontaal;
- resource blijft optioneel;
- statusselectie blijft verborgen;
- statusbadges blijven verborgen;
- defectbadges blijven uit hoofdselector/card-UX;
- selected card blijft compact focusbaar;
- delete wist de juiste card;
- relocation update alleen `employeeId` en `date`;
- conflictvalidatie herberekent via bestaande `planningItems` stateflow.

## Open QA-Punten

Open uit eerdere sprints:

- native datum-input handmatig wijzigen en submitten blijft een open handmatige browsercontrole;
- echte teksttyping na autofocus blijft aanbevolen als korte handmatige check door de automation-clipboardbeperking;
- bezette doelcel interaction ambiguity uit Sprint 08 blijft open.

Nieuwe Sprint 10-risico's:

- create/edit-modus kan verwarrend worden wanneer dezelfde formulierplek wordt gebruikt;
- celselectie-prefill mag een lopende edit niet stil overschrijven;
- update mag niet als delete+create worden gebouwd;
- directe lokale edit heeft nog geen undo/redo;
- datum/werknemer moeten via relocation blijven lopen.

T1003 bevindingen:

- overgang van edit mode naar create mode was aanvankelijk ambigu omdat taak/project en resource uit de bewerkte card bleven staan;
- dit is met een kleine guardrail opgelost: alleen bij verlaten van edit mode via celselectie worden taak/project en resource voor create leeggemaakt;
- selected card blijft behouden, waardoor relocation na celselectie mogelijk blijft;
- dit vraagt visueel blijvende aandacht omdat selected card en create mode tegelijk zichtbaar kunnen zijn.

## Scopecontrole

Niet toevoegen:

- inline editor;
- drag/drop;
- drag/drop packages/frameworks;
- backend/database/API/persistence;
- server-autosave;
- undo/history;
- realtime sync;
- multi-resource;
- availability;
- statusworkflow;
- defectstatus-focus;
- contextmenu;
- modal-first edit-flow;
- bulk edit;
- keyboard shortcuts;
- grote redesign.
- save/cancel-flow.

## Verwachte Gewijzigde Codefiles Bij Implementatie

Waarschijnlijk:

- `src/app/page.tsx`
- `src/components/planning/PlanningForm.tsx`

Alleen indien nodig:

- `src/components/planning/WeekPlanningBoard.tsx`
- `src/components/planning/PlanningCard.tsx`
- `src/components/planning/matrix.ts`

## QA-Conclusie

Sprint 10 voldoet aan de closurecriteria.

Gevalideerd:

- edit mode openen;
- taak/project direct wijzigen;
- resource kiezen en wissen;
- conflictvalidatie na resourcewijziging;
- datum/werknemer disabled in edit mode;
- create mode na edit mode;
- create/edit scheiding;
- selected card versus actieve cel;
- delete na edit;
- relocation na edit;
- buildstatus;
- browserconsole.

Open UX-punten blijven:

- directe lokale edit heeft nog geen undo/redo;
- selected card kan zichtbaar blijven terwijl het formulier terug in create mode staat;
- bezette doelcel ambiguity uit Sprint 08 blijft open;
- toekomstige server-backed persistence vereist later een aparte infrastructure sprint.

Scopecontrole geslaagd:

- geen inline editor;
- geen drag/drop;
- geen persistence/backend/API;
- geen server-autosave;
- geen undo/redo;
- geen packages/frameworks;
- geen multi-resource;
- geen availability;
- geen redesign;
- geen save/cancel-flow.
