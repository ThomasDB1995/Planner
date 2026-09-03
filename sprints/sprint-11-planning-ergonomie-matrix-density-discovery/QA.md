# QA - Sprint 11 Planning Ergonomie & Matrix Density Discovery

## Status

Afgerond.

## Doel Van QA

Valideren dat Sprint 11 de dagelijkse planning sneller, compacter en scanbaarder maakt zonder bestaande create/edit/delete/relocation- of conflictflow te breken.

Deze QA is uitgevoerd bij Sprint 11 closure.

## Buildstatus

`npm run build` uitgevoerd bij Sprint 11 closure.

Resultaat:

- build geslaagd;
- TypeScript-validatie geslaagd;
- Next.js static page generation geslaagd.

## Localhoststatus

Uitgevoerd na verse devserver-restart op `http://127.0.0.1:3000`.

Resultaat:

- app rendert;
- browserconsole actueel gecontroleerd;
- geen actuele warnings of errors gezien na serverrestart;
- oude stale devserver-error rond ontbrekende `.next` chunk was niet actueel en verdween na serverrestart.

## QA-Focus

Sprint 11 moet vooral valideren:

- minder formulierdominantie;
- minder resource-dominantie;
- hogere matrixdensity;
- minder visuele ruis op cards;
- snellere create-flow vanuit actieve cel;
- conflictinformatie dichter bij matrixcontext;
- behoud van bewezen Sprint 10-flows.

## Test Matrix

| Test | Verwacht resultaat | Status |
| --- | --- | --- |
| Build uitvoeren | Build slaagt zonder TypeScript errors | Geslaagd |
| Localhost openen | App rendert zonder console errors | Geslaagd |
| Formulier visueel beoordelen | Formulier is compacter en minder dominant | Geslaagd |
| Create/edit onderscheid | Toevoegen en bewerken blijven duidelijk verschillend | Geslaagd |
| Cel selecteren | Taak/project input krijgt focus | Geslaagd |
| Planningitem zonder resource toevoegen | Card verschijnt zonder prominente resource-ruis | Geslaagd |
| Planningitem met resource toevoegen | Resource blijft compact zichtbaar | Geslaagd |
| Resource selector openen/gebruiken | Resource kan gekozen en gewist worden | Geslaagd |
| Resource selector gesloten/compact | Gekozen resource blijft zichtbaar | Geslaagd |
| Enter-flow | Enter submit bestaande create-flow | Geslaagd |
| Na submit | Actieve cel blijft bruikbaar voor volgende taak | Geslaagd |
| Na submit | Taak/project is gereset en opnieuw gefocust | Geslaagd |
| Resource reset/behoud | Gedrag is bewust gekozen en gevalideerd | Geslaagd - resource reset |
| Matrix density | Meer inhoud past zonder onleesbaar te worden | Geslaagd |
| Card selecteren | Card focus blijft zichtbaar | Geslaagd |
| Card editten | Direct local edit blijft werken | Geslaagd |
| Card delete | Delete blijft juiste card verwijderen | Geslaagd |
| Relocation | Verplaats naar actieve cel blijft werken | Geslaagd |
| Dubbele resource plannen | Conflictbadge en summary/integratie verschijnen | Geslaagd |
| Geen conflict | Geen-conflict feedback is compact en niet dominant | Geslaagd |
| Scopecontrole | Geen out-of-scope features toegevoegd | Geslaagd |

## Regressiecontrole

Te behouden gedrag:

- werknemers blijven verticaal als rijen;
- dagen/data blijven horizontaal als kolommen;
- maandag t.e.m. vrijdag blijft standaard;
- celselectie blijft werken;
- actieve celcontext blijft begrijpelijk;
- resource blijft optioneel;
- planningitems zonder resource blijven geldig;
- conflictvalidatie blijft alleen lopen voor aanwezige resources;
- statusselectie blijft verborgen;
- statusbadges blijven verborgen;
- defectstatus blijft gedeprioriteerd;
- selected card blijft compact focusbaar;
- delete blijft werken;
- relocation blijft werken via geselecteerde card + actieve doelcel + expliciete actie;
- edit mode blijft taak/project en resource direct lokaal aanpassen;
- datum en werknemer blijven in edit mode niet direct bewerkbaar;
- conflictvalidatie herberekent via bestaande `planningItems` stateflow.

## Localhost-Validatie Bij Implementatie

Handmatige flow:

1. open localhost;
2. controleer dat formulier, matrix en conflictweergave zichtbaar zijn;
3. klik een lege planningcel;
4. controleer dat taak/project focus krijgt;
5. typ taak/project;
6. druk Enter;
7. controleer dat card in gekozen cel verschijnt;
8. controleer dat actieve cel behouden blijft;
9. controleer dat taak/project leeg en opnieuw gefocust is;
10. voeg nog een taak toe in dezelfde cel;
11. kies een resource en voeg taak toe;
12. controleer resourceweergave;
13. controleer gekozen reset/behoud gedrag van resource;
14. selecteer card en edit taak/project;
15. wijzig/wis resource in edit mode;
16. verwijder card;
17. verplaats card via actieve doelcel;
18. veroorzaak dubbele resourceplanning;
19. controleer conflictweergave;
20. controleer browserconsole.

## Open QA-Punten

- Browserautomation met clipboard-gebaseerde `fill`/`type` blijft beperkt door bekende virtual-clipboardbeperking.
- Closure-QA is daarom uitgevoerd met DOM-keypress acties en aparte reset/autofocus-check.
- Resource reset na submit is gekozen en gevalideerd.
- Compactere conflictweergave is visueel dichter bij de matrix geplaatst.
- Density is gecontroleerd met meerdere cards per cel.

## Resource Reset Keuze

Resource wordt na succesvolle create gereset.

Reden:

- resource is optioneel;
- snelle planning draait primair om werknemer, datum en taak/project;
- reset voorkomt onbedoeld hergebruik van dezelfde machine op opeenvolgende taken;
- conflictvalidatie blijft daardoor minder snel per ongeluk lawaai maken.

Nadeel:

- bij meerdere opeenvolgende taken met dezelfde resource vraagt dit extra selectie.

## Scopecontrole

Niet toevoegen:

- availability;
- multi-resource;
- drag/drop;
- backend/database/API/persistence;
- mobile redesign;
- packages/frameworks;
- inline editor;
- undo/history;
- contextmenu;
- statusworkflow;
- nieuwe conflictregels;
- nieuwe domeinmodellen;
- employee management;
- resource CRUD/import;
- keyboard navigation of hotkeys;
- autosave;
- realtime sync;
- grote redesign.

## Verwachte Gewijzigde Codefiles Bij Implementatie

Waarschijnlijk:

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

Niet verwacht:

- `src/types/planning.ts`
- `src/lib/planning/conflicts.ts`
- `src/lib/planning/resources.ts`
- `src/data/seed.ts`

## T1105 Closure Resultaat

T1105 is uitgevoerd als kleine presentatie-aanpassing:

- conflictinformatie staat nu compact in de matrixheader van `WeekPlanningBoard`;
- geen-conflict feedback is ingekort naar `Geen conflicten`;
- waarschuwingen tonen compact `Waarschuwingen (aantal)`;
- bestaande conflictmessages blijven behouden;
- conflictbadges op cards blijven behouden;
- `findPlanningConflicts` en conflictregels zijn niet gewijzigd.

## Resterende UX-Risico's

- Resource reset kan trager voelen bij meerdere opeenvolgende taken met dezelfde resource.
- De resource selector blijft open na gebruik; dit is handig bij resourcewerk maar kan visueel ruimte innemen.
- Compactere conflictwaarschuwingen mogen niet te subtiel worden bij veel waarschuwingen.
- Selected card en actieve cel kunnen nog tegelijk betekenis hebben; dit blijft een bekend UX-punt.
- Bezette doelcel ambiguity uit Sprint 08 blijft open.

## QA-Conclusie

Sprint 11 voldoet aan de closurecriteria.

Gevalideerd:

- snelle repetitieve planning;
- actieve cel behouden na submit;
- taak/project reset na submit;
- resource reset na submit;
- autofocus na submit;
- planning met en zonder resource;
- edit/delete/relocation regressie;
- conflictbadge en compacte waarschuwing;
- matrix density en scanbaarheid;
- buildstatus;
- actuele browserconsole na serverrestart.

Scopecontrole geslaagd:

- geen availability;
- geen multi-resource;
- geen drag/drop;
- geen backend/API/database/persistence;
- geen packages/frameworks;
- geen inline editor;
- geen undo/history;
- geen contextmenu;
- geen keyboard navigation of hotkeys;
- geen nieuwe conflictregels;
- geen grote redesign.
