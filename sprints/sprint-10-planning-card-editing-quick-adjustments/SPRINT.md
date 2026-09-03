# Sprint 10 - Planning Card Editing & Quick Adjustments

## Sprintstatus

Afgerond.

## Sprintdoel

Bestaande planningcards eenvoudig bewerkbaar maken zonder extra interactiecomplexiteit.

De kleinste gewenste flow:

1. selecteer een bestaande planningcard;
2. open die card in het bestaande `PlanningForm`;
3. pas taak/project en eventueel resource aan;
4. de wijziging wordt direct lokaal toegepast op dezelfde planningcard.

Deze sprint bouwt geen inline editor, drag/drop, persistence, server-autosave of redesign. Het doel is minder herinvoer bij dagelijkse planning, met behoud van de bewezen matrix-, selectie-, delete- en relocation-flow.

## Context

Sprint 09 is afgerond:

- resource is optioneel;
- statusworkflow is uit de hoofdplanningflow gehaald;
- defectstatus is gedeprioriteerd;
- cell selection + prefill werkt;
- card selection, delete en relocation blijven werken;
- planningcards zijn lichter en scanbaarder.

Nieuwe requirement:

- bestaande planningcards moeten eenvoudig bewerkbaar worden;
- card editing moet bestaande selectie, delete en relocation respecteren;
- edit-flow moet create/edit duidelijk onderscheiden;
- minimale extra UX-complexiteit is leidend.

## In Scope

- geselecteerde card openen in het bestaande `PlanningForm`;
- formuliermodus duidelijk maken: toevoegen versus bewerken;
- taak/project direct lokaal aanpassen;
- resource direct lokaal aanpassen of wissen;
- bestaande `PlanningItem` lokaal updaten op basis van id;
- item-id, datum, werknemer en status behouden;
- datum en werknemer in editmodus niet direct bewerkbaar maken;
- relocation behouden als enige flow voor datum/werknemer wijzigen;
- bestaande card selection, delete, relocation, celselectie en prefill behouden;
- conflictvalidatie opnieuw laten afleiden via bestaande `planningItems` stateflow;
- QA en scopecontrole voor de edit-flow.

## Buiten Scope

- inline editor;
- drag/drop;
- backend/API/database/persistence;
- server-autosave;
- undo/history;
- packages/frameworks;
- multi-resource;
- availability;
- statusworkflow;
- defectstatus-focus;
- grote redesign;
- contextmenu;
- modal-first edit-flow;
- bulk edit;
- keyboard shortcuts;
- realtime sync.
- save/cancel-flow.

## Niet-Beslissen In Deze Sprint

- Of card editing later inline in de cel moet kunnen.
- Of edit-flow later een modal, zijpaneel of detailpaneel nodig heeft.
- Hoe persistence of audit/history later werkt.
- Hoe multi-resource editing later wordt vormgegeven.
- Hoe availability of bezette-doelcel ambiguity de edit-flow later beinvloedt.

## Verwachte Componentrichting

Waarschijnlijk relevant:

- `src/app/page.tsx`
- `src/components/planning/PlanningForm.tsx`
- `src/components/planning/WeekPlanningBoard.tsx`
- `src/components/planning/PlanningCard.tsx`
- `src/components/planning/matrix.ts`

Waarschijnlijke kleinste implementatie:

- bereken in `page.tsx` het geselecteerde `PlanningItem` op basis van `selectedCard.planningItemId`;
- geef dit item optioneel door aan `PlanningForm` als edit target;
- voeg naast `onCreate` een `onEditChange` handler toe die exact 1 item op basis van id patcht;
- laat `PlanningForm` zijn velden vullen wanneer een edit target beschikbaar is;
- toon compacte moduslabels zoals `Planningitem toevoegen` en `Planningitem bewerken`;
- behoud de submitknop alleen in create mode;
- update taak/project en resource direct lokaal in edit mode;
- maak datum en werknemer disabled in edit mode;
- bewaar bestaande formulier-prefill vanuit `selectedCell` voor create;
- voorkom dat gewone celselectie per ongeluk een lopende edit overschrijft zonder bewuste keuze.

## UX-Richting

De planner moet bestaande planning snel kunnen bijwerken zonder de matrix te verlaten.

Gewenste signalen:

- geselecteerde card blijft zichtbaar in de matrix;
- formulier toont duidelijk dat de gebruiker een bestaande card bewerkt;
- wijzigingen in taak/project en resource zijn direct lokaal zichtbaar;
- datum en werknemer worden gewijzigd via de bestaande relocation-flow;
- geen extra knoppen per card behalve bestaande delete;
- geen inline tekstveld in de card.

Belangrijke eenvoud:

- taak/project blijft het primaire editveld;
- resource blijft optioneel;
- status blijft verborgen;
- defectstatus blijft geen hoofdplanningfocus.

## Ticketvolgorde

1. T1001 - Edit-flow plan en statecontract
2. T1002 - PlanningForm create/edit modus
3. T1003 - Lokale updateflow en interactieregressie
4. T1004 - QA, scopecontrole en sprint closure

## Sprint Acceptance Criteria

De sprint is klaar wanneer:

- bestaande planningcard selecteren nog werkt;
- geselecteerde card kan worden geladen in het bestaande formulier;
- formulier toont duidelijk editmodus;
- taak/project kan worden aangepast;
- resource kan worden aangepast of gewist;
- directe edit wijzigt exact 1 bestaand planningitem op basis van id;
- planningitem-id blijft behouden;
- bestaande datum/werknemer blijven behouden in edit mode;
- de aangepaste card blijft zichtbaar in de juiste werknemer/dag-cel;
- conflictbadges en conflictsummary herberekenen na resourcewijziging;
- create-flow blijft werken voor nieuwe planningitems;
- celselectie en prefill blijven werken voor create-flow;
- card delete blijft werken;
- relocation blijft werken;
- geen inline editor, drag/drop, persistence, server-autosave, undo/history, package, multi-resource, availability of grote redesign is toegevoegd;
- build en localhostcontrole zijn uitgevoerd bij implementatie.

## Test Matrix

| Scenario | Verwacht resultaat |
| --- | --- |
| Weekplanning openen | Matrix blijft werknemers verticaal en dagen horizontaal tonen |
| Nieuw item toevoegen | Create-flow blijft werken |
| Card selecteren | Card krijgt focus en formulier kan editmodus tonen |
| Taak/project aanpassen | Card toont direct nieuwe taak/projecttekst |
| Resource toevoegen aan card zonder resource | Resource verschijnt direct op card en conflicten herberekenen |
| Resource wissen | Card toont direct `Geen resource` en resourceconflict verdwijnt indien van toepassing |
| Dubbele resource veroorzaken via edit | Conflictbadge en summary verschijnen |
| Datum/werknemer in edit mode | Niet direct bewerkbaar; relocation blijft leidend |
| Delete na edit | Geselecteerde/aangepaste card kan verwijderd worden |
| Relocation na edit | Aangepaste card kan expliciet verplaatst worden |
| Celselectie na edit | Create-prefill blijft bruikbaar |
| Scopecontrole | Geen out-of-scope features toegevoegd |

## Verificatie Bij Uitvoering

- `npm run build`
- localhost controleren
- handmatige interactiecheck:
  - planningitem zonder resource aanmaken;
  - card selecteren;
  - taak/project direct wijzigen;
  - resource direct kiezen en wissen;
  - conflictcase via resource-edit controleren;
  - controleren dat datum/werknemer disabled zijn in edit mode;
  - nieuw item toevoegen na edit controleren;
  - delete en relocation na edit controleren;
  - out-of-scope checklist doorlopen.

## Belangrijkste Risico's

- Verwarring tussen create en edit wanneer het formulier dezelfde plek gebruikt.
- Celselectie-prefill overschrijft per ongeluk een lopende edit.
- Update wordt per ongeluk als delete+create gebouwd, waardoor item-id of selectiegedrag breekt.
- Cardselectie, destination cell en editmodus gaan door elkaar lopen.
- Conflictweergave wordt stale als updates buiten `planningItems` om gebeuren.
- Scope creep naar inline editor, modal, autosave, undo/history of persistence.

## Codex Instructie Voor Deze Sprint

Codex mag pas implementeren na expliciete goedkeuring van de specifieke ticketaanpak.

Voor implementatie:

1. verplichte context lezen;
2. opdracht samenvatten;
3. concreet plan tonen;
4. verwachte bestanden benoemen;
5. risico's en buiten scope benoemen;
6. wachten op expliciete goedkeuring.

## Belangrijkste Regel

Sprint 10 is alleen planningcard editing via het bestaande formulier en lokale state. Bouw geen inline editor, drag/drop, backend, persistence, autosave, undo/history, packages/frameworks, multi-resource, availability, contextmenu of grote redesign.

## T1003 Resultaat

T1003 is uitgevoerd als regressie- en guardrailvalidatie rond directe edit mode.

Opgeleverd:

- directe edit van taak/project opnieuw gevalideerd;
- resource kiezen en wissen opnieuw gevalideerd;
- conflictvalidatie na resourcewijziging opnieuw gevalideerd;
- datum en werknemer blijven disabled in edit mode;
- delete na edit mode werkt;
- relocation na edit mode werkt;
- create na edit mode werkt;
- browserconsole zonder warnings of errors.

Kleine guardrail-fix:

- bij overgang van edit mode naar create mode via celselectie worden taak/project en resource leeggemaakt;
- datum en werknemer blijven vanuit de gekozen cel geprefilld;
- selected card blijft behouden voor relocation.

Open UX-punten:

- directe editing heeft nog geen undo/redo;
- selected card kan zichtbaar blijven terwijl het formulier alweer in create mode staat;
- bezette doelcel interaction ambiguity uit Sprint 08 blijft open.

Niet toegevoegd:

- inline editor;
- drag/drop;
- persistence/backend/API;
- server-autosave;
- undo/redo;
- packages/frameworks;
- multi-resource;
- availability;
- save/cancel-flow;
- nieuwe features buiten de guardrail-fix.

## Sprintresultaat

Sprint 10 is afgerond als Planning Card Editing & Quick Adjustments slice.

Opgeleverd:

- geselecteerde planningcard opent in edit mode in het bestaande `PlanningForm`;
- taak/project kan direct lokaal aangepast worden;
- optionele resource kan direct lokaal gekozen of gewist worden;
- resource wissen zet `resourceId` terug naar `undefined`;
- datum en werknemer zijn disabled in edit mode;
- datum en werknemer blijven via relocation gewijzigd worden;
- create mode blijft de bestaande `Toevoegen`-flow gebruiken;
- edit mode heeft geen saveknop en geen cancelknop;
- update wijzigt exact 1 bestaand planningitem op id;
- item-id, status en overige velden blijven behouden;
- conflictvalidatie herberekent via bestaande `planningItems` stateflow;
- delete na edit werkt;
- relocation na edit werkt.

T1004 Closure:

- `npm run build` geslaagd;
- localhost gecontroleerd;
- browserconsole zonder warnings of errors;
- QA-resultaten vastgelegd in `QA.md`;
- `PROJECT_STATE.md` bijgewerkt;
- Planning UX/domain findings bijgewerkt.

Open UX-punten:

- directe lokale edit heeft nog geen undo/redo;
- selected card kan zichtbaar blijven terwijl het formulier terug in create mode staat;
- bezette doelcel ambiguity uit Sprint 08 blijft open;
- toekomstige server-backed persistence vereist later een aparte infrastructure sprint.

Scopecontrole:

- geen inline editor toegevoegd;
- geen drag/drop toegevoegd;
- geen persistence/backend/API toegevoegd;
- geen server-autosave toegevoegd;
- geen undo/redo toegevoegd;
- geen packages/frameworks toegevoegd;
- geen multi-resource toegevoegd;
- geen availability toegevoegd;
- geen redesign toegevoegd;
- geen save/cancel-flow toegevoegd.

Closure-conclusie:

Sprint 10 is afgerond. De planning blijft local-first en direct manipuleerbaar: bestaande cards zijn sneller aanpasbaar zonder extra workflowlaag, terwijl create, delete, relocation en conflictvalidatie behouden blijven.
