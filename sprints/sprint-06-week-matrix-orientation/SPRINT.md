# Sprint 06 - Week Matrix Orientation

## Sprintstatus

Afgerond met open handmatige datum-input QA

## Sprintdoel

De weekplanning omzetten naar de juiste praktijkrichting:

- werknemers verticaal als rijen;
- dagen/data horizontaal als kolommen.

Deze sprint corrigeert alleen de matrixorientatie. De bestaande planningitems, cell selection en form prefill moeten blijven werken.

## Context

Sprint 05 valideerde cell selection en prefill, maar praktijkvalidatie heeft daarna bevestigd dat de huidige matrixrichting verkeerd is.

Harde requirements voor Sprint 06:

- werknemers links als vaste rijlabels;
- maandag t.e.m. vrijdag bovenaan als kolommen;
- planningcards blijven in werknemer/dag-cellen zichtbaar;
- cel selecteren blijft mogelijk;
- actieve celcontext en formulier-prefill blijven werken;
- geen nieuwe planningarchitectuur.

## In Scope

- bestaande weekmatrix herorienteren;
- werknemers verticaal renderen;
- dagen/data horizontaal renderen;
- bestaande `employeeId + date` celkoppeling behouden;
- bestaande planningcards in de juiste cel tonen;
- bestaande selected-cell state blijven gebruiken;
- bestaande prefill van datum en werknemer behouden;
- lichte selectie-indicatie behouden;
- tekst aanpassen waar nodig om de nieuwe orientatie correct te benoemen;
- weekendoptie alleen documenteren als later.

## Buiten Scope

- drag/drop;
- card delete;
- card selection/focus;
- multi-resource assignment;
- employee availability;
- weekendtoggle implementeren;
- zaterdag/zondag tonen;
- planningstatussen uitbreiden;
- statusworkflow refactoren;
- defectstatus prominenter maken;
- resource seeddata uitbreiden;
- extra werknemers toevoegen;
- database/API/backend;
- persistence;
- nieuwe packages/frameworks;
- nieuwe architectuurlaag.

## Niet-Beslissen In Deze Sprint

- Of weekendweergave een toggle, instelling of view-optie wordt.
- Of planningstatussen later uit de UI verdwijnen.
- Hoe card selection/focus precies werkt.
- Hoe planningcards later verplaatst worden.
- Hoe employee availability wordt vastgelegd.
- Hoe multi-resource assignment in het typecontract komt.

## Verwachte Componentrichting

Waarschijnlijk relevant:

- `src/components/planning/WeekPlanningBoard.tsx`
- `src/components/planning/WeekHeader.tsx`
- `src/components/planning/DayRow.tsx`
- `src/app/page.tsx`
- `src/components/planning/PlanningForm.tsx`

Bij voorkeur blijven `page.tsx` en `PlanningForm.tsx` functioneel ongewijzigd, tenzij propnamen of contextlabels minimaal moeten worden aangepast.

## Ticketvolgorde

1. T601 - Matrix orientation component plan
2. T602 - Matrix header en werknemersrijen herorienteren
3. T603 - Cell selection, prefill en planningcards regressie
4. T604 - QA, scopecontrole en sprint closure

## Sprint Acceptance Criteria

De sprint is klaar wanneer:

- werknemers verticaal als rijen zichtbaar zijn;
- dagen/data horizontaal als kolommen zichtbaar zijn;
- maandag t.e.m. vrijdag de standaardkolommen zijn;
- bestaande planningitems in de juiste werknemer/dag-cel verschijnen;
- cel selecteren werkt in de nieuwe orientatie;
- actieve celcontext toont de juiste werknemer en datum;
- PlanningForm prefill blijft werken;
- statusweergave en defectwaarschuwingen niet prominenter zijn gemaakt;
- geen drag/drop, availability, weekendtoggle of multi-resource is toegevoegd;
- build slaagt;
- localhost handmatig is gecontroleerd;
- QA en `PROJECT_STATE.md` zijn bijgewerkt.

## Test Matrix

| Scenario | Verwacht resultaat |
| --- | --- |
| Lege planning openen | Werknemers staan verticaal, dagen horizontaal |
| Cel Mickael + maandag selecteren | Actieve cel toont Mickael en maandagdatum |
| Item toevoegen voor geselecteerde cel | Card verschijnt in rij Mickael, kolom maandag |
| Werknemer handmatig wijzigen | Item kan bewust in andere werknemersrij terechtkomen |
| Datum handmatig wijzigen | Item kan bewust in andere dagkolom terechtkomen |
| Meerdere werknemers bekijken | Rijlabels blijven scanbaar |
| Maandag-vrijdag controleren | Geen weekendkolommen zichtbaar |
| Conflict veroorzaken | Bestaande conflictflow blijft werken |

## Verificatie

- `npm run build`
- localhost controleren
- scopecontrole uitvoeren tegen deze sprint
- QA bijwerken
- `PROJECT_STATE.md` bijwerken bij closure

## Belangrijkste Risico's

- Per ongeluk T07 availability of weekendtoggle meenemen.
- Celselectie breken bij het omdraaien van de renderloop.
- Planningcards verkeerd groeperen door verwarring tussen dag en werknemer.
- Form prefill breken door propcontracten te wijzigen.
- Status- of defectcomplexiteit meenemen terwijl dit juist gedeprioriteerd is.

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

Sprint 06 is alleen matrixorientatie. Bouw geen nieuwe planningfunctionaliteit.

## Sprintresultaat

Sprint 06 is afgerond als matrixorientatie-slice.

Opgeleverd:

- werknemers staan verticaal als rijen;
- dagen/data staan horizontaal als kolommen;
- maandag t.e.m. vrijdag blijft de standaardweek;
- weekendkolommen zijn niet toegevoegd;
- bestaande `employeeId + date` celkoppeling blijft behouden;
- cell selection blijft werken;
- actieve celcontext en form prefill blijven werken;
- planningcards verschijnen in de juiste werknemer/dag-cel voor geselecteerde cel;
- ResourceSelector en PlanningItem-contract zijn niet gewijzigd.

Build en QA:

- `npm run build` geslaagd;
- localhost gecontroleerd;
- T603 regressie uitgevoerd;
- T604 QA en scopecontrole uitgevoerd.

Open punt:

- handmatige browsercontrole blijft aanbevolen voor native datum wijzigen en submit naar handmatig gekozen datum.

Niet toegevoegd:

- availability;
- drag/drop;
- delete/card delete;
- multi-resource;
- weekendtoggle;
- PlanningItem-contractwijziging;
- ResourceSelector-wijziging;
- database/API/backend;
- nieuwe packages/frameworks.
