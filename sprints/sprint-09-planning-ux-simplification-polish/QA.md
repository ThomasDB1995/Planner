# QA - Sprint 09 Planning UX Simplification & Polish

## Status

Afgerond.

## Doel Van QA

Valideren dat de Sprint 09-polish de hoofdplanningflow vereenvoudigt zonder bestaande matrix-, selectie-, delete-, relocation- of resourceconflictflow te breken.

## Buildstatus

`npm run build` uitgevoerd bij T906 closure.

Resultaat:

- build geslaagd;
- TypeScript-validatie geslaagd;
- Next.js static page generation geslaagd.

## Lokale UX-Controle

Gecontroleerd op localhost:

- applicatie opent op `http://127.0.0.1:3000`;
- werknemers blijven verticaal als rijen zichtbaar;
- dagen/data blijven horizontaal als kolommen zichtbaar;
- maandag t.e.m. vrijdag blijft standaard;
- celselectie werkt nog;
- actieve celcontext toont correcte werknemer en datum;
- formulier-prefill vanuit cel werkt nog;
- taak/project input krijgt focus na celselectie;
- taak/project input is zichtbaar en actief na celselectie;
- planningitem zonder resource kan worden aangemaakt;
- planningitem zonder resource toont `Geen resource`;
- planningitem met resource kan worden aangemaakt;
- dubbele resourceplanning op dezelfde datum toont conflict;
- items zonder resource veroorzaken geen resourceconflict;
- statusselectie is niet zichtbaar in het formulier;
- statusbadges zijn niet zichtbaar op cards;
- defectbadges zijn niet zichtbaar in selector of cards;
- delete blijft werken;
- relocation blijft werken via geselecteerde card + actieve doelcel + `Verplaats naar actieve cel`;
- geen browserconsole-errors gezien.

## Mogelijke Typing-Regressie

Controle:

- cel geselecteerd;
- taak/project input kreeg focus;
- input was zichtbaar en actief.

Resultaat:

- geen productbug gevonden;
- geen bugfix uitgevoerd.

Automationbeperking:

- echte browsertekstinput kon niet volledig via automation worden gesimuleerd door de bekende virtual-clipboard beperking;
- dit is dezelfde klasse beperking die eerder voor tekstinvoer-QA is genoteerd;
- de focus- en zichtbaarheidssignalen zijn wel browsermatig gecontroleerd.

## Test Matrix

| Test | Verwacht resultaat | Status |
| --- | --- | --- |
| Build uitvoeren | Build slaagt zonder TypeScript errors | Geslaagd |
| Localhost openen | App rendert zonder console errors | Geslaagd |
| Cel selecteren | Datum/werknemer worden geprefilld | Geslaagd |
| Autofocus taak/project | Taak/project input krijgt focus | Geslaagd |
| Tekstinvoer zichtbaar | Input is actief en zichtbaar; automationtyping beperkt | Gedeeltelijk gevalideerd |
| Item zonder resource | Item wordt aangemaakt en toont `Geen resource` | Geslaagd |
| Twee items zonder resource | Geen resourceconflict | Geslaagd |
| Item met resource | Resource wordt subtiel getoond op card | Geslaagd |
| Dubbele resource op datum | Conflictwaarschuwing verschijnt | Geslaagd |
| Statusselectie | Niet zichtbaar in formulier | Geslaagd |
| Statusbadges | Niet zichtbaar op cards | Geslaagd |
| Defectbadge | Niet zichtbaar in hoofdselector/card-UX | Geslaagd |
| Card delete | Geselecteerde card kan verwijderd worden | Geslaagd |
| Relocation | Card kan expliciet naar actieve doelcel verplaatst worden | Geslaagd |
| Scopecontrole | Geen out-of-scope features toegevoegd | Geslaagd |

## Regressiecontrole

Behouden gedrag:

- matrixrichting blijft werknemers verticaal en dagen horizontaal;
- geselecteerde cell blijft zichtbaar;
- card selection/focus blijft werken;
- delete wist de juiste card;
- relocation update alleen `employeeId` en `date`;
- conflictvalidatie herberekent via bestaande `planningItems` stateflow.

## Nieuwe Toekomstige Requirement

Planningcards moeten later bewerkbaar worden.

Vastgelegd als latere UX-slice:

- bestaande taak/project kunnen aanpassen;
- edit-flow mag card selection, delete en relocation niet verstoren;
- geen card editing gebouwd in Sprint 09.

## Open QA-Punten

- Native datum-input handmatig wijzigen en submitten blijft een open handmatige browsercontrole.
- Echte teksttyping na autofocus blijft aanbevolen als korte handmatige check door de automation-clipboardbeperking.
- Bezette doelcel interaction ambiguity uit Sprint 08 blijft open.
- Card editing is nieuwe toekomstige UX-slice, niet geimplementeerd.

## QA-Conclusie

Sprint 09 voldoet aan de closurecriteria.

De hoofdplanningflow is eenvoudiger en scanbaarder geworden zonder drag/drop, availability, multi-resource, persistence, packages, contextmenu, undo/history, nieuwe statusworkflow of card editing toe te voegen.

