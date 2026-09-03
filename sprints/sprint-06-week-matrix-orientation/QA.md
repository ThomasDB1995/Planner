# QA - Sprint 06 Week Matrix Orientation

## Status

Afgerond met open handmatige datum-input controle.

## Doel Van QA

Valideren dat de matrixrichting is gecorrigeerd zonder nieuwe functionaliteit toe te voegen.

## Buildstatus

`npm run build` uitgevoerd.

Resultaat:

- build geslaagd;
- TypeScript-validatie geslaagd;
- Next.js static page generation geslaagd.

## Lokale UX-Controle

Localhost gecontroleerd op `http://127.0.0.1:3000`.

Gecontroleerd gedrag:

- werknemers staan verticaal als rijen;
- dagen/data staan horizontaal als kolommen;
- maandag t.e.m. vrijdag blijft standaard;
- weekendkolommen zijn niet toegevoegd;
- cellen blijven selecteerbaar;
- actieve celcontext toont correcte werknemer en datum;
- form prefill blijft werken;
- bestaande ResourceSelector blijft bruikbaar;
- planningitem toevoegen werkt via bestaande submitflow;
- card verschijnt in de juiste werknemer/dag-cel voor geselecteerde cel;
- werknemer handmatig wijzigen werkt en plaatst de card in de handmatig gekozen werknemersrij;
- selectie blijft visueel correct met precies 1 geselecteerde cel;
- geen browserconsole-errors.

## T603 Regressieresultaten

| Test | Verwacht resultaat | Status |
| --- | --- | --- |
| Weekplanning openen | Matrix toont werknemers links en werkdagen bovenaan | Geslaagd |
| Cel selecteren | Geselecteerde werknemer/datum is zichtbaar | Geslaagd |
| Prefill controleren | Formulier vult datum en werknemer vanuit cel | Geslaagd |
| Planningitem toevoegen | Item verschijnt in juiste rij en kolom | Geslaagd |
| Resource kiezen | Bestaande ResourceSelector werkt | Geslaagd |
| Werknemer wijzigen | Item kan bewust in andere werknemersrij terechtkomen | Geslaagd |
| Datum wijzigen | Item kan bewust in andere dagkolom terechtkomen | Open handmatige QA |
| Meerdere cards in matrix | Cards blijven zichtbaar in matrixcellen | Beperkt bevestigd |
| Conflictcase | Bestaande conflictmelding blijft beschikbaar | Niet volledig opnieuw getest |
| Weekendcontrole | Zaterdag/zondag zijn niet zichtbaar | Geslaagd |
| Scopecontrole | Geen out-of-scope features toegevoegd | Geslaagd |

## Datum-Input Beperking

Browserautomation blijft beperkt betrouwbaar voor native date inputs.

Tijdens T603 kon de DOM-value van het datumveld wel naar een andere datum worden gezet, maar de submit in de automation-check volgde niet betrouwbaar de handmatig gekozen datum. Dit wordt beschouwd als browserautomationbeperking en niet als vastgestelde applicatiebug.

Open handmatige browsercheck:

- datum handmatig wijzigen in echte browser;
- submit uitvoeren naar handmatig gekozen datum;
- controleren dat de card in de juiste datumkolom verschijnt.

Deze check blijft aanbevolen voordat Sprint 07 functioneel wordt uitgevoerd.

## Scopecontrole

Niet toegevoegd:

- availability;
- drag/drop;
- delete/card delete;
- multi-resource;
- weekendtoggle;
- zaterdag/zondag renderen;
- PlanningItem-contractwijziging;
- ResourceSelector-wijziging;
- database/API/backend;
- nieuwe packages/frameworks;
- statusworkflow-uitbreiding;
- prominentere defectstatus.

Uitgevoerde scopechecks:

- `src/types/planning.ts` gecontroleerd: `PlanningItem` contract ongewijzigd.
- `src/components/planning/ResourceSelector.tsx` gecontroleerd: geen wijziging aan ResourceSelector.
- `src/lib/planning/week.ts` gecontroleerd: maandag t.e.m. vrijdag behouden.
- tekstscan in `src` uitgevoerd op verboden scopewoorden zoals availability, drag/drop, delete, multi-resource en weekend.

## Gewijzigde Codefiles In Sprint 06

- `src/components/planning/matrix.ts`
- `src/components/planning/PlanningCell.tsx`
- `src/components/planning/EmployeeRow.tsx`
- `src/components/planning/DayRow.tsx`
- `src/components/planning/WeekHeader.tsx`
- `src/components/planning/WeekPlanningBoard.tsx`
- `src/components/planning/PlanningForm.tsx`
- `src/app/page.tsx`

T604 heeft alleen documentatie gewijzigd.

## UX-Conclusie

De harde praktijkrichting is technisch en visueel doorgevoerd:

- werknemers als rijen;
- dagen/data als kolommen;
- cell selection en prefill blijven werken;
- de matrix voelt beter aan als basis voor dagelijkse terreinplanning.

De matrix is nog sober. Dat is passend voor Sprint 06, omdat verdere interacties zoals availability, card focus, relocation en drag/drop buiten scope blijven.

## Open UX-Beslissingen Na Sprint 06

- Moet de actieve celcontext dichter bij de matrix worden getoond?
- Is de linkerkolom breed genoeg voor echte werknemersnamen?
- Hoeveel planningcards blijven scanbaar in een rij/kolom-cel?
- Wanneer wordt weekendweergave als aparte slice opgepakt?
- Wanneer wordt card selection/focus als aparte slice opgepakt?

## Advies Volgende Stap

Voer eerst de open handmatige datum-input controle uit.

Daarna aanbevolen volgens de bijgewerkte roadmap:

- Sprint 07 - Planningcard Interaction Discovery uitvoeren;
- planningcards afzonderlijk selecteerbaar/focusbaar maken;
- planningcards lokaal verwijderbaar maken;
- relocation alleen documenteren;
- Employee Availability doorschuiven naar een latere aparte slice;
- geen drag/drop, availability, multi-resource of weekendtoggle combineren met Sprint 07.
