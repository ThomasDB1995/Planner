# QA - Sprint 08 Relocation Discovery

## Status

Afgerond.

## Doel Van QA

Valideren dat een geselecteerde planningcard via een expliciete actie naar de actieve doelcel kan worden verplaatst, zonder drag/drop en zonder bestaande matrix-, invoer-, selectie-, delete- of conflictflow te breken.

## Buildstatus

`npm run build` uitgevoerd bij T804 closure.

Resultaat:

- build geslaagd;
- TypeScript-validatie geslaagd;
- Next.js static page generation geslaagd.

## Lokale UX-Controle

Gecontroleerd op localhost bij T804 closure:

- werknemers blijven verticaal als rijen zichtbaar;
- dagen/data blijven horizontaal als kolommen zichtbaar;
- maandag t.e.m. vrijdag blijft standaard;
- celselectie werkt nog;
- actieve celcontext toont correcte werknemer en datum;
- formulier-prefill vanuit cel werkt nog;
- planningcard kan afzonderlijk geselecteerd worden;
- geselecteerde planningcard blijft compact focusbaar;
- `Verplaats naar actieve cel` is alleen bruikbaar wanneer card en doelcel geselecteerd zijn en van elkaar verschillen;
- move naar lege cel werkt;
- move naar bezette cel werkt via klik op lege celruimte;
- move naar dezelfde cel toont geen move-actie en muteert niets;
- move naar andere dag wijzigt de kolom;
- move naar andere werknemer wijzigt de rij;
- planningitem-id blijft behouden;
- conflictbadges worden na move opnieuw berekend;
- conflictsummary wordt na move opnieuw berekend;
- delete blijft werken na move;
- geen browserconsole-errors.

## T804 Closure Controle

| Controle | Resultaat | Status |
| --- | --- | --- |
| Relocation naar lege cel | Card verhuist naar lege doelcel | Geslaagd |
| Relocation naar bezette cel | Card verhuist naar bezette doelcel via klik op lege celruimte | Geslaagd met UX-opmerking |
| `selectedCard` gedrag | Geselecteerde card blijft behouden na move; delete wist selectie | Geslaagd |
| `activeDestinationCell` gedrag | Wordt gezet bij geldige doelcel en gewist na move/delete | Geslaagd |
| Move-knop guardrails | Alleen zichtbaar bij selected card + destination + andere bron/doelcel | Geslaagd |
| Move naar dezelfde cel | Geen knop, geen mutatie | Geslaagd |
| Conflict-herberekening | Conflictbadges en conflictsummary herberekenen na move | Geslaagd |
| Delete na move | Moved card kan verwijderd worden; selectie en destination worden gewist | Geslaagd |
| Celselectie/prefill regressie | Actieve celcontext en form prefill blijven werken | Geslaagd |
| Browserconsole | Geen errors gezien | Geslaagd |

## Regressietests

| Test | Verwacht resultaat | Status |
| --- | --- | --- |
| Weekplanning openen | Matrix toont werknemers links en werkdagen bovenaan | Geslaagd |
| Cel selecteren | Geselecteerde werknemer/datum is zichtbaar | Geslaagd |
| Prefill controleren | Formulier vult datum en werknemer vanuit cel | Geslaagd |
| Planningitem toevoegen | Item verschijnt in juiste rij en kolom | Geslaagd |
| Card selecteren | Alleen gekozen card krijgt focus | Geslaagd |
| Move-actie zonder card | Actie is disabled of veilig niet uitvoerbaar | Geslaagd |
| Move-actie zonder doelcel | Actie is disabled of veilig niet uitvoerbaar | Geslaagd |
| Card naar lege cel verplaatsen | Card verschijnt in doelcel | Geslaagd |
| Card naar bezette cel verplaatsen | Card verschijnt in doelcel via klik op lege celruimte | Geslaagd met UX-opmerking |
| Klik op bestaande card in doelcel | Bestaande card wordt geselecteerd, destination wordt niet gezet | Open UX-beslissing |
| Card naar andere dag verplaatsen | Card verschijnt in doelkolom | Geslaagd |
| Card naar andere werknemer verplaatsen | Card verschijnt in doelrij | Geslaagd |
| Card naar zelfde cel verplaatsen | Geen dubbele card en geen fout | Geslaagd |
| Conflictcase na move | Conflictbadges en summary herberekenen | Geslaagd |
| Card na move verwijderen | Alleen gekozen card verdwijnt | Geslaagd |
| Weekendcontrole | Zaterdag/zondag zijn niet zichtbaar | Geslaagd |
| Scopecontrole | Geen out-of-scope features toegevoegd | Geslaagd |

## T803 Klikintentie Bevindingen

| Klikscenario | Resultaat | UX-oordeel |
| --- | --- | --- |
| Lege doelcel | Destination wordt gezet en knop verschijnt | Duidelijk genoeg |
| Lege ruimte in bezette doelcel | Destination wordt gezet en knop verschijnt | Werkbaar, maar vraagt precisie |
| Bestaande card in doelcel | Die card wordt geselecteerd; destination wordt niet gezet | Verwarrend risico |
| Broncard opnieuw klikken | Broncard blijft geselecteerd; destination wordt gewist | Logisch genoeg |
| Andere lege cel zonder card | Destination wordt gezet en knop verschijnt | Duidelijk genoeg |

Open UX-beslissing:

- Bij bezette doelcellen is klikintentie nog niet vanzelfsprekend genoeg.
- Er is geen drag/drop, contextmenu, keyboard move of nieuw interaction framework toegevoegd.
- Dit blijft na T804 een open UX-beslissing voor een latere aparte interaction slice.

## Scopecontrole

Niet toevoegen:

- drag/drop;
- drag/drop packages/frameworks;
- backend/database/persistence;
- realtime sync;
- undo/history;
- multi-select;
- bulk move;
- keyboard move;
- contextmenu;
- availability;
- multi-resource;
- weekendtoggle;
- resource optioneel maken;
- autofocus taak/project na celselectie;
- statusworkflow cleanup;
- defectstatus-focus;
- architectuuruitbreiding.

## Open Handmatige QA-Punten

Open uit Sprint 06:

- datum handmatig wijzigen in echte browser;
- submit uitvoeren naar handmatig gekozen datum;
- controleren dat de card in de juiste datumkolom verschijnt.

Open door productbeslissing:

- resource optioneel maken is alleen gedocumenteerd en nog niet geimplementeerd;
- huidige code vereist nog een resource bij submit;
- conflictvalidatie voor optionele resource moet later apart worden aangepast.

Open UX-polish:

- na klik op een planningcel moet focus/cursor later automatisch naar het taak/project inputveld gaan;
- deze autofocus is gedocumenteerd als latere kleine polish-slice en blijft buiten Sprint 08.

## Verwachte Gewijzigde Codefiles Bij Implementatie

Waarschijnlijk:

- `src/app/page.tsx`
- `src/components/planning/WeekPlanningBoard.tsx`

Alleen indien nodig:

- `src/components/planning/PlanningCell.tsx`
- `src/components/planning/PlanningCard.tsx`
- `src/components/planning/matrix.ts`

## QA-Conclusie

Sprint 08 bevestigt dat de expliciete relocation-flow technisch werkt en regressies onder controle blijven.

Relocation discovery is geslaagd:

- cardselectie, doelcelselectie en expliciete move-actie kunnen samen bestaan;
- verplaatsen kan lokaal zonder drag/drop;
- conflictvalidatie herberekent via bestaande `planningItems` stateflow;
- bestaande celselectie, formulier-prefill en delete blijven werken.

Belangrijkste open UX-punt:

- bezette doelcellen blijven UX-matig ambigu wanneer de gebruiker op een bestaande card klikt in plaats van op lege celruimte.

Closure-conclusie:

- Sprint 08 is afgerond als geslaagde eenvoudige relocation-discovery;
- drag/drop is nog niet gerechtvaardigd;
- interaction ambiguity rond bezette doelcellen moet later apart onderzocht worden;
- er is geen extra interactiemechaniek gebouwd in T804.
