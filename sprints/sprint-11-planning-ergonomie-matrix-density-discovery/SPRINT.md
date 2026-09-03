# Sprint 11 - Planning Ergonomie & Matrix Density Discovery

## Sprintstatus

Afgerond.

## Sprintdoel

De dagelijkse plannerflow sneller, compacter en scanbaarder maken zonder nieuwe domeincomplexiteit.

De belangrijkste workflow voor deze sprint is:

1. klik een werknemer/dag-cel;
2. typ taak/project;
3. druk Enter;
4. de taak verschijnt in de gekozen cel;
5. de invoer blijft klaar voor de volgende taak.

Deze sprint is een ergonomie- en density-slice. De bestaande matrixplanning, card create/edit/delete, relocation en optionele resource-flow blijven het vertrekpunt.

## Context

Sprint 10 is afgerond:

- matrixplanning werkt;
- card create/edit/delete/relocation werkt;
- resource is optioneel;
- direct local editing werkt;
- datum en werknemer worden in edit mode via relocation gewijzigd;
- drag/drop is nog niet gerechtvaardigd.

Nieuwe localhost-observaties:

- formulier bovenaan voelt nog te dominant;
- ResourceSelector neemt veel visuele ruimte in;
- matrix density wordt belangrijker;
- quick planning flow lijkt kernworkflow;
- conflictbox rechts voelt nog los van de matrix;
- `Geen resource` veroorzaakt mogelijk visuele ruis;
- dubbele datumweergave voelt redundant;
- desktop-first blijft correct.

## In Scope

- formulier compacter maken;
- header/context in `PlanningForm` kleiner maken;
- create/edit onderscheid behouden;
- resourcekeuze secundair maken;
- ResourceSelector compacter of collapsible maken;
- gekozen resource zichtbaar houden;
- matrixcellen en planningcards compacter maken;
- whitespace verminderen zonder scanbaarheid te verliezen;
- `Geen resource` minder prominent maken;
- actieve cel behouden na toevoegen;
- taak/project resetten na toevoegen;
- autofocus op taak/project behouden;
- Enter-flow valideren als hoofdworkflow;
- onderzoeken of resource behouden of resetten na submit sneller voelt;
- conflicts dichter bij de matrix brengen;
- conflictweergave compacter integreren;
- bestaande conflictregels behouden;
- QA en scopecontrole voor ergonomie en density.

## Buiten Scope

- availability;
- multi-resource;
- drag/drop;
- backend/API/database/persistence;
- mobile redesign;
- packages/frameworks;
- inline editor;
- undo/history;
- contextmenu;
- statusworkflow;
- nieuwe conflictregels;
- nieuw domeinmodel;
- nieuwe resource-entiteiten;
- employee management;
- grote redesign;
- keyboard navigation of hotkeys;
- autosave of server-autosave;
- realtime sync.

## Niet-Beslissen In Deze Sprint

- Of echte drag/drop later nodig is.
- Of availability als grijze cel werkt.
- Hoe multi-resource assignment wordt gemodelleerd.
- Hoe persistence of sync later werkt.
- Of een aparte dagfocus-view nodig is.
- Of resources later los van taak/project gepland worden.
- Of er later een inline editor komt.
- Of undo/redo nodig is zodra snelle invoer belangrijker wordt.
- Definitieve visual design system keuzes buiten de bestaande Tailwind-stijl.

## Verwachte Componentrichting

Waarschijnlijk relevant:

- `src/components/planning/PlanningForm.tsx`
- `src/components/planning/ResourceSelector.tsx`
- `src/components/planning/PlanningCell.tsx`
- `src/components/planning/PlanningCard.tsx`
- `src/components/planning/ConflictSummary.tsx`
- `src/app/page.tsx`

Alleen indien nodig:

- `src/components/planning/WeekPlanningBoard.tsx`
- `src/components/planning/WeekHeader.tsx`
- `src/components/planning/EmployeeRow.tsx`

Geen verwachte wijzigingen:

- `src/types/planning.ts`
- `src/lib/planning/conflicts.ts`
- `src/lib/planning/resources.ts`
- `src/data/seed.ts`

## UX-Richting

De matrix moet meer als dagelijks werkbord voelen en minder als formulieromgeving.

Gewenste signalen:

- formulier voelt als compacte commandostrip;
- taak/project is visueel en interactief het primaire veld;
- resource blijft beschikbaar maar is duidelijk secundair;
- lege resource-informatie veroorzaakt geen cardruis;
- matrix toont meer planningitems in dezelfde ruimte;
- conflictinformatie hoort bij de matrixcontext;
- create/edit blijft begrijpelijk ondanks compactere UI.

## Ticketvolgorde

1. T1101 - Quick planning form compactness
2. T1102 - Resource selector de-emphasis
3. T1103 - Matrix and card density pass
4. T1104 - Quick enter flow refinement
5. T1105 - Conflict summary integration discovery

## Sprint Acceptance Criteria

De sprint is klaar wanneer:

- formulier boven de matrix minder dominant is;
- create/edit mode nog duidelijk te onderscheiden is;
- taak/project snel bereikbaar en typklaar blijft na celselectie;
- resourcekeuze beschikbaar blijft maar visueel secundair is;
- gekozen resource zichtbaar blijft;
- planningcards zonder resource minder ruis veroorzaken dan `Geen resource` als prominente regel;
- cellen/cards compacter zijn zonder cardselectie, delete of conflictbadge te breken;
- actieve cel na create behouden kan blijven;
- taak/project na create reset;
- autofocus na create terug naar taak/project gaat;
- Enter-flow als dagelijkse planningflow gevalideerd is;
- gekozen aanpak voor resource behouden/resetten na create expliciet is gevalideerd of als open UX-beslissing is vastgelegd;
- conflictweergave dichter bij matrixcontext staat;
- bestaande conflictregels ongewijzigd blijven;
- card create/edit/delete/relocation blijven werken;
- resource optioneel blijft;
- geen out-of-scope feature is toegevoegd;
- build en localhostcontrole worden pas bij implementatie uitgevoerd, niet tijdens deze documentatieslice.

## Test Matrix

| Scenario | Verwacht resultaat |
| --- | --- |
| Weekplanning openen | Formulier, matrix en conflictweergave zijn zichtbaar en compacter |
| Cel selecteren | Taak/project krijgt focus en actieve celcontext blijft duidelijk |
| Nieuw item zonder resource toevoegen | Item verschijnt in gekozen cel zonder prominente resource-ruis |
| Nieuw item met resource toevoegen | Gekozen resource blijft compact zichtbaar |
| Enter in taak/project veld | Create-flow werkt als normale form-submit |
| Submit na celkeuze | Actieve cel blijft bruikbaar voor volgende taak |
| Submit na celkeuze | Taak/project is leeggemaakt en opnieuw gefocust |
| Resource na submit | Behouden/resetten is bewust gekozen of als UX-bevinding vastgelegd |
| Card selecteren | Edit mode blijft duidelijk |
| Card editten | Direct local edit blijft werken |
| Card delete | Delete blijft de juiste card verwijderen |
| Relocation | Verplaatsen via actieve doelcel blijft werken |
| Dubbele resource plannen | Conflictbadge en conflictintegratie blijven zichtbaar |
| Geen conflicten | Geen-conflict feedback is compact en niet dominant |
| Scopecontrole | Geen availability, multi-resource, drag/drop of persistence toegevoegd |

## Verificatie Bij Implementatie

Deze documentatieslice voert geen build en geen localhostcontrole uit.

Bij latere implementatie:

- `npm run build`;
- localhost openen;
- browserconsole controleren;
- handmatige quick-flow check:
  - cel aanklikken;
  - taak typen;
  - Enter;
  - controleren dat card in dezelfde cel verschijnt;
  - controleren dat invoer klaarstaat voor volgende taak;
- create/edit/delete/relocation regressie controleren;
- conflictcase controleren.

## Belangrijkste UX-Risico's

- Formulier wordt te compact en create/edit onderscheid wordt onduidelijk.
- Resource wordt te ver verstopt waardoor planners resource-informatie vergeten.
- Collapsible resource selector introduceert extra klikfrictie.
- Card density maakt planningitems minder leesbaar.
- `Geen resource` verbergen kan onbedoeld doen lijken alsof resource ontbreekt door een fout.
- Actieve cel behouden na submit kan onverwacht zijn wanneer gebruiker eigenlijk van cel wil wisselen.
- Resource behouden na submit kan per ongeluk dezelfde resource op meerdere taken zetten.
- Resource resetten na submit kan extra werk geven bij opeenvolgende taken met dezelfde resource.
- Conflictinformatie dichter bij de matrix kan de header of matrix visueel druk maken.
- Compactere conflictweergave kan waarschuwingen te subtiel maken.

## Codex-Risico's

- Per ongeluk code implementeren tijdens documentatievoorbereiding.
- Sprint 11 verwarren met availability, multi-resource of drag/drop.
- Quick enter flow uitbreiden naar keyboard navigation, hotkeys of inline editor.
- Resource de-emphasis verwarren met verwijderen van resourcefunctionaliteit.
- Conflictintegratie verwarren met nieuwe conflictregels.
- Density pass laten uitgroeien tot grote redesign.
- Build of localhost draaien terwijl deze opdracht alleen documentatie vraagt.

## Rollback Op Sprintniveau

Omdat deze voorbereiding alleen documentatie aanmaakt:

- verwijder de map `sprints/sprint-11-planning-ergonomie-matrix-density-discovery`;
- laat broncode, `PROJECT_STATE.md` en bestaande sprintdocumentatie ongemoeid;
- geen data-impact;
- geen build- of runtime-impact.

## Discovery-Only Houden

Deze onderwerpen blijven expliciet discovery-only:

- echte drag/drop;
- bezette doelcel interaction ambiguity;
- availability;
- multi-resource assignment;
- persistence/backend/API;
- undo/history;
- keyboard relocation;
- keyboard navigation en hotkeys;
- contextmenu;
- inline editor;
- resource los van taak/project plannen;
- dagfocus of meerdere view modes;
- conflictregels voor 0..n resources;
- server-backed direct editing.

## Codex Instructie Voor Deze Sprint

Codex mag pas implementeren na expliciete goedkeuring van een specifieke ticketaanpak.

Voor implementatie:

1. verplichte context lezen;
2. opdracht samenvatten;
3. concreet plan tonen;
4. verwachte bestanden benoemen;
5. risico's en buiten scope benoemen;
6. wachten op expliciete goedkeuring;
7. klein implementeren;
8. build en localhostcontrole uitvoeren;
9. QA en closure documenteren.

## Belangrijkste Regel

Sprint 11 gaat alleen over ergonomie, density en quick planning flow binnen de bestaande lokale matrix. Bouw geen availability, multi-resource, drag/drop, backend, persistence, mobile redesign, packages/frameworks, inline editor, undo/history, contextmenu, statusworkflow of grote redesign.

## Sprintresultaat

Sprint 11 is afgerond als ergonomie- en matrix-density slice.

Opgeleverd:

- `PlanningForm` compacter gemaakt;
- actieve celcontext subtieler gemaakt;
- create/edit onderscheid behouden;
- ResourceSelector visueel secundair en inklapbaar gemaakt;
- gekozen resource zichtbaar gehouden;
- resource blijft optioneel;
- planningcards compacter gemaakt;
- planningcellen en matrixrijen compacter gemaakt;
- `Geen resource` wordt niet meer prominent op cards getoond;
- resource wordt alleen op cards getoond wanneer aanwezig;
- Enter in taak/project gebruikt de bestaande form-submit;
- na create blijft actieve cel behouden;
- na create wordt taak/project gereset;
- na create blijft autofocus op taak/project;
- resource wordt na create gereset;
- conflictinformatie is compacter en dichter bij de matrix geplaatst;
- conflictregels en conflictengine zijn niet gewijzigd.

QA en closure:

- `npm run build` geslaagd;
- localhost gecontroleerd na verse serverrestart;
- actuele browserconsole zonder warnings of errors;
- snelle repetitieve planning gevalideerd;
- planning met en zonder resource gevalideerd;
- edit, delete en relocation gevalideerd;
- conflictbadge en compacte waarschuwing gevalideerd;
- matrix density en scanbaarheid beoordeeld.

UX-conclusie:

- de matrix voelt meer centraal;
- het formulier voelt meer als snelle invoerstrip;
- resource is beschikbaar maar minder dominant;
- resource reset na submit is gekozen om onbedoeld hergebruik van machines/resources te vermijden;
- conflictinformatie voelt minder los doordat ze in de matrixheader staat.

Open punten:

- resource reset kan extra klikwerk geven bij opeenvolgende taken met dezelfde resource;
- resource selector blijft open na gebruik en kan visueel ruimte innemen;
- compacte conflictweergave moet bij veel waarschuwingen opnieuw beoordeeld worden;
- selected card versus actieve cel blijft een bekend UX-punt;
- bezette doelcel ambiguity blijft open;
- T1105 rechtvaardigt nog geen nieuwe conflictregels.

Scopecontrole:

- geen availability toegevoegd;
- geen multi-resource toegevoegd;
- geen drag/drop toegevoegd;
- geen backend/API/database/persistence toegevoegd;
- geen packages/frameworks toegevoegd;
- geen inline editor toegevoegd;
- geen undo/history toegevoegd;
- geen contextmenu toegevoegd;
- geen keyboard navigation of hotkeys toegevoegd;
- geen statusworkflow toegevoegd;
- geen grote redesign toegevoegd.

Closure-conclusie:

Sprint 11 is afgerond. De planning is compacter en sneller voor dagelijkse invoer, terwijl de bestaande create/edit/delete/relocation- en conflictflows behouden blijven.
