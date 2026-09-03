# QA - Sprint 07 Planningcard Interaction Discovery

## Status

Afgerond.

## Doel Van QA

Valideren dat planningcards afzonderlijk selecteerbaar, focusbaar en lokaal verwijderbaar zijn zonder bestaande matrix- en invoerflow te breken.

## Buildstatus

`npm run build` uitgevoerd.

Resultaat:

- build geslaagd;
- TypeScript-validatie geslaagd;
- Next.js static page generation geslaagd.

## Lokale UX-Controle

Localhost gecontroleerd op `http://127.0.0.1:3000`.

Gecontroleerd gedrag:

- werknemers blijven verticaal als rijen zichtbaar;
- dagen/data blijven horizontaal als kolommen zichtbaar;
- maandag t.e.m. vrijdag blijft standaard;
- zaterdag/zondag zijn niet zichtbaar;
- celselectie werkt nog;
- actieve celcontext toont correcte werknemer en datum;
- formulier-prefill vanuit cel werkt nog na celselectie;
- planningcard kan afzonderlijk geselecteerd worden;
- geselecteerde planningcard krijgt compacte focus UI;
- focus wisselt naar de laatst geselecteerde card;
- cardselectie triggert geen ongewenste celklik;
- planningcard kan lokaal verwijderd worden;
- delete verwijdert precies de gekozen card;
- delete van een niet-geselecteerde card behoudt de geselecteerde card;
- delete van de geselecteerde card wist `selectedCard`;
- celselectie blijft zichtbaar na card-delete;
- conflictbadges worden na delete opnieuw berekend;
- geen browserconsole-errors.

## Regressietests

| Test | Verwacht resultaat | Status |
| --- | --- | --- |
| Weekplanning openen | Matrix toont werknemers links en werkdagen bovenaan | Geslaagd |
| Cel selecteren | Geselecteerde werknemer/datum is zichtbaar | Geslaagd |
| Prefill controleren | Formulier vult datum en werknemer vanuit cel | Geslaagd |
| Planningitem toevoegen | Item verschijnt in juiste rij en kolom | Geslaagd |
| Card selecteren | Alleen gekozen card krijgt focus | Geslaagd |
| Card focus wisselen | Focus verplaatst naar nieuwe card | Geslaagd |
| Card verwijderen | Alleen gekozen card verdwijnt | Geslaagd |
| Niet-geselecteerde card verwijderen | Huidige cardselectie blijft behouden | Geslaagd |
| Geselecteerde card verwijderen | `selectedCard` wordt gewist | Geslaagd |
| Conflictcase verwijderen | Conflictbadges herberekenen en verdwijnen wanneer conflict wegvalt | Geslaagd |
| Lege cel na delete selecteren | Celselectie en prefill blijven werken | Geslaagd |
| Weekendcontrole | Zaterdag/zondag zijn niet zichtbaar | Geslaagd |
| Scopecontrole | Geen out-of-scope features toegevoegd | Geslaagd |

## QA Details

Gebruikte browsercontrole:

- drie planningitems aangemaakt;
- twee items met dezelfde resource op dezelfde datum gezet om conflictbadges te tonen;
- cardselectie gecontroleerd met precies 1 geselecteerde card;
- focus UI gecontroleerd via geselecteerde card;
- niet-geselecteerde conflictcard verwijderd;
- conflictbadges gingen van 2 naar 0;
- geselecteerde card daarna verwijderd;
- `selectedCard` ging naar 0 geselecteerde cards;
- lege cel geselecteerd en prefill opnieuw gecontroleerd.

Opmerking:

- Browserautomation blijft beperkt voor tekstinvoer via standaard `fill` door de bekende virtual-clipboard beperking. De QA is uitgevoerd met directe browser-keypress invoer.

## Scopecontrole

Niet toegevoegd:

- drag/drop;
- echte move naar andere cel;
- availability;
- multi-resource;
- weekendtoggle;
- zaterdag/zondag renderen;
- packages/frameworks;
- backend/database/persistence;
- statusworkflow cleanup;
- defectstatus-focus;
- architectuuruitbreiding;
- undo/history;
- contextmenu;
- bulk acties;
- keyboard relocation.

Uitgevoerde scopechecks:

- `PlanningItem` contract is niet gewijzigd;
- `ResourceSelector` is niet gewijzigd;
- weekstructuur maandag t.e.m. vrijdag blijft behouden;
- bestaande conflictvalidatie blijft hergebruikt;
- delete werkt alleen op lokale component state;
- relocation is alleen gedocumenteerd;
- geen packageconfig-wijziging uitgevoerd.

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
- deze autofocus is gedocumenteerd als latere kleine polish-slice en is nog niet gebouwd.

## Gewijzigde Codefiles In Sprint 07

- `src/app/page.tsx`
- `src/components/planning/WeekPlanningBoard.tsx`
- `src/components/planning/EmployeeRow.tsx`
- `src/components/planning/DayRow.tsx`
- `src/components/planning/PlanningCell.tsx`
- `src/components/planning/PlanningCard.tsx`
- `src/components/planning/matrix.ts`

## UX-Conclusie

Sprint 07 bewijst dat planningcards als afzonderlijke interactielaag bovenop de matrix kunnen bestaan.

Belangrijkste conclusie:

- cardselectie en celselectie kunnen naast elkaar bestaan;
- card focus is compact genoeg voor discovery;
- delete-acties kunnen los van celacties bestaan;
- event bubbling is beheersbaar;
- conflictvalidatie blijft via bestaande stateflow herberekenen.

De deleteknop is functioneel compact. Bij verdere UI-polish moet nog bewaakt worden dat drukke cellen niet te onrustig worden.

## Advies Volgende Stap Na Sprint 07

Aanbevolen eerst:

- kleine UX-polish micro-slice: autofocus taak/project na celselectie.

Daarna:

- relocation discovery beoordelen op basis van selected card + doelcel;
- eventueel eenvoudige move-actie onderzoeken, bijvoorbeeld `Verplaats naar actieve cel`;
- valideer een move-slice eerst zonder echte drag/drop;
- echte drag/drop discovery-only houden;
- availability blijft doorgeschoven en mag niet met card interaction worden gecombineerd.

## T704 Relocation QA-Notitie

Geen functionele relocation-QA uitgevoerd, omdat T704 documentatie-only was.

Bij een toekomstige relocation-slice moeten minimaal deze checks worden toegevoegd:

- geselecteerde card blijft herkenbaar voor de move-actie;
- doelcel is expliciet zichtbaar voor de move-actie;
- move wijzigt alleen `employeeId` en/of `date`;
- celselectie en cardselectie blijven begrijpelijk naast elkaar bestaan;
- accidental move is moeilijker dan bewust verplaatsen;
- conflictvalidatie herberekent na verplaatsing;
- geen drag/drop, packages, undo/history, persistence of realtime sync toegevoegd.
