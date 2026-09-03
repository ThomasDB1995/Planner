# Sprint 08 - Relocation Discovery

## Sprintstatus

Afgerond.

## Sprintdoel

Onderzoeken en bouwen van de kleinste controleerbare relocation-flow voor planningcards:

1. selecteer een planningcard;
2. selecteer een actieve doelcel;
3. voer expliciet `Verplaats naar actieve cel` uit.

Deze sprint bouwt nog geen drag/drop. Het doel is valideren of een bestaande planningcard lokaal naar een andere werknemer en/of dag kan worden verplaatst zonder nieuwe infrastructuur of interactiecomplexiteit.

## Context

Sprint 07 is afgerond:

- planningcards zijn afzonderlijk selecteerbaar;
- geselecteerde planningcards zijn compact focusbaar;
- planningcards zijn lokaal verwijderbaar;
- card-, cel- en delete-interacties kunnen naast elkaar bestaan;
- conflictvalidatie herberekent na statewijzigingen via `planningItems`.

De veiligste volgende stap is daarom geen muis-drag/drop, maar een expliciete move-actie bovenop bestaande state:

- geselecteerde card = bron;
- geselecteerde cel = doel;
- knop = bewuste actie.

## In Scope

- relocation-flow ontwerpen op basis van bestaande `selectedCard` en `selectedCell`;
- expliciete actie `Verplaats naar actieve cel`;
- lokale update van alleen `PlanningItem.employeeId` en/of `PlanningItem.date`;
- bestaande `planningItems` stateflow behouden;
- bestaande conflictvalidatie opnieuw laten afleiden uit `planningItems`;
- duidelijke disabled/lege staat wanneer card of doelcel ontbreekt;
- no-op of disabled gedrag wanneer card al in de actieve cel staat;
- bestaande celselectie, prefill, cardselectie, focus en delete behouden;
- documentatie en QA voor deze discovery-slice.

## Buiten Scope

- drag/drop;
- drag/drop packages/frameworks;
- backend/API/database/persistence;
- realtime sync;
- undo/history;
- multi-select;
- bulk move;
- keyboard move;
- contextmenu;
- availability-regels;
- multi-resource conflictregels;
- weekendtoggle;
- resource optioneel maken;
- autofocus taak/project na celselectie;
- statusworkflow cleanup;
- defectstatus-focus;
- architectuuruitbreiding.

## Niet-Beslissen In Deze Sprint

- Of echte drag/drop later nodig is.
- Of drag/drop met een package of eigen implementatie moet gebeuren.
- Hoe undo/history werkt wanneer verplaatsen productiekritisch wordt.
- Hoe relocation later met availability blokkeert of waarschuwt.
- Hoe relocation later met multi-resource conflictregels omgaat.
- Of keyboard relocation of contextmenu-acties later nodig zijn.

## Verwachte Componentrichting

Waarschijnlijk relevant:

- `src/app/page.tsx`
- `src/components/planning/WeekPlanningBoard.tsx`
- `src/components/planning/PlanningCell.tsx`
- `src/components/planning/PlanningCard.tsx`
- `src/components/planning/matrix.ts`

Waarschijnlijke kleinste implementatie:

- voeg in `page.tsx` een lokale `moveSelectedCardToSelectedCell` handler toe;
- zoek het geselecteerde planningitem op basis van `selectedCard.planningItemId`;
- update dat item in `planningItems` met `selectedCell.employeeId` en `selectedCell.date`;
- behoud het bestaande item-id;
- behoud bestaande conflictberekening via `findPlanningConflicts(planningItems, resources)`;
- geef een expliciete move-actie door naar het board of toon die in een compacte actiezone rond de weekplanning;
- disable de actie wanneer er geen geselecteerde card of geen actieve cel is;
- disable of behandel als no-op wanneer broncel en doelcel gelijk zijn.

## UX-Richting

De actie moet duidelijk maken dat de actieve cel het doel is.

Minimale gewenste tekst:

- `Verplaats naar actieve cel`

Ondersteunende status mag compact blijven, bijvoorbeeld:

- geen card geselecteerd;
- geen actieve doelcel;
- card staat al in actieve cel.

De UI mag de matrix niet drukker maken. Geen floating drag handles, geen contextmenu en geen extra knoppen per cel.

## Ticketvolgorde

1. T801 - Relocation interaction plan
2. T802 - Explicit move action stateflow
3. T803 - Relocation UX guardrails en regressie
4. T804 - QA, scopecontrole en sprint closure

## Sprint Acceptance Criteria

De sprint is klaar wanneer:

- een geselecteerde planningcard herkenbaar blijft;
- een actieve cel als doelcel herkenbaar blijft;
- `Verplaats naar actieve cel` alleen beschikbaar is wanneer card en doelcel bestaan;
- verplaatsen alleen `employeeId` en/of `date` van het gekozen planningitem wijzigt;
- het planningitem-id behouden blijft;
- de card na verplaatsing in de doelcel verschijnt;
- bestaande celselectie en formulier-prefill blijven werken;
- bestaande cardselectie, focus en delete blijven werken;
- conflictbadges en conflictsummary na verplaatsing opnieuw kloppen via bestaande stateflow;
- verplaatsen naar dezelfde cel veilig niets breekt;
- geen drag/drop, package, backend, persistence, undo/history, realtime sync, availability, multi-resource of contextmenu is toegevoegd;
- build en localhostcontrole zijn uitgevoerd bij implementatie.

## Test Matrix

| Scenario | Verwacht resultaat |
| --- | --- |
| Weekplanning openen | Matrixrichting blijft werknemers verticaal en dagen horizontaal |
| Cel selecteren | Actieve celcontext en prefill blijven werken |
| Card selecteren | Alleen gekozen card krijgt focus |
| Card + andere doelcel selecteren | Move-actie wordt beschikbaar |
| Verplaats naar actieve cel | Card verschijnt in doelcel met hetzelfde item-id |
| Verplaats naar zelfde cel | Geen dubbele card en geen statebreuk |
| Move met resourceconflict | Conflictbadges en summary herberekenen |
| Moved card verwijderen | Bestaande delete-flow blijft werken |
| Nieuwe planning na move | Bestaande formulierflow blijft werken |
| Scopecontrole | Geen drag/drop, packages, persistence, undo/history of multi-resource toegevoegd |

## Verificatie Bij Uitvoering

- `npm run build`
- localhost controleren
- handmatige interactiecheck:
  - planningitem toevoegen;
  - card selecteren;
  - doelcel selecteren;
  - expliciet verplaatsen;
  - conflictcase na verplaatsing controleren;
  - delete na verplaatsing controleren;
  - out-of-scope checklist doorlopen.

## Belangrijkste Risico's

- Verwarring tussen actieve invoercel en actieve doelcel.
- Accidental move als de actie te prominent of te weinig gedisabled is.
- Cardselectie verliezen waardoor de gebruiker niet ziet wat wordt verplaatst.
- Conflictweergave stale maken door buiten `planningItems` om state bij te houden.
- Verplaatsen als delete+create implementeren en daarmee item-id of selectiegedrag breken.
- Scope creep naar drag/drop, undo/history, contextmenu of availability.

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

Sprint 08 is alleen expliciete relocation discovery. Bouw geen drag/drop en voeg geen package, backend, persistence, undo/history, realtime sync, availability of multi-resource gedrag toe.

## Sprintresultaat

Sprint 08 is afgerond als eenvoudige relocation-discovery slice.

Opgeleverd:

- `activeDestinationCell` state toegevoegd naast `selectedCell` en `selectedCard`;
- actieve doelcel wordt alleen gezet wanneer er een planningcard geselecteerd is;
- destination cell krijgt een minimale amberkleurige focusstijl;
- expliciete actie `Verplaats naar actieve cel` toegevoegd;
- move-actie verschijnt alleen bij selected card + destination cell + andere bron/doelcel;
- move naar dezelfde cel toont geen actie en muteert niets;
- move update exact 1 planningitem op basis van id;
- alleen `employeeId` en `date` worden gewijzigd;
- planningitem-id en overige velden blijven behouden;
- `selectedCard` blijft behouden na move;
- `activeDestinationCell` wordt na move gewist;
- conflictvalidatie herberekent via bestaande `planningItems` stateflow;
- delete na move blijft werken;
- celselectie en formulier-prefill blijven werken.

Build en QA:

- `npm run build` geslaagd;
- localhost gecontroleerd;
- relocation naar lege cel gevalideerd;
- relocation naar bezette cel via lege celruimte gevalideerd;
- move-knop guardrails gevalideerd;
- conflictbadges en conflictsummary na move gevalideerd;
- delete na move gevalideerd;
- geen browserconsole-errors gezien.

Open UX-beslissing:

- bezette doelcellen blijven ambigu wanneer de gebruiker op een bestaande card klikt in plaats van op lege celruimte;
- klikken op een bestaande card in de doelcel selecteert die card en zet geen destination;
- deze interaction ambiguity moet later apart onderzocht worden;
- drag/drop is na Sprint 08 nog niet gerechtvaardigd.

Niet toegevoegd:

- drag/drop;
- keyboard move;
- contextmenu;
- undo/history;
- persistence/backend/API;
- packages/frameworks;
- availability;
- multi-resource;
- interaction redesign;
- `PlanningItem` typewijziging.
