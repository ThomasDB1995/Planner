# Sprint 07 - Planningcard Interaction Discovery

## Sprintstatus

Afgerond.

## Sprintdoel

Planningcards afzonderlijk selecteerbaar, visueel focusbaar en lokaal verwijderbaar maken als kleine interaction-discovery slice.

Deze sprint bereidt latere relocation voor, maar bouwt nog geen verplaatsing en geen drag/drop.

## Context

Sprint 06 heeft de weekmatrix correct gezet:

- werknemers verticaal als rijen;
- dagen/data horizontaal als kolommen;
- planningcards in werknemer/dag-cellen;
- cell selection en formulier-prefill werken.

Na praktijkvalidatie is Sprint 07 bijgestuurd. Sprint 07 is niet langer Employee Availability. Availability schuift door, omdat planningcard-selectie en delete eerst nodig zijn om de dagelijkse planninginteractie bruikbaarer te maken.

## In Scope

- card selection/focus state;
- compacte focus UI op planningcards;
- lokale delete uit `planningItems` state;
- bestaande celselectie behouden;
- bestaande prefill behouden;
- bestaande conflictvalidatie behouden;
- relocation discovery note;
- documentatie en QA-checklist voor deze interaction slice.

## Buiten Scope

- drag/drop;
- echte move naar andere cel;
- availability;
- multi-resource;
- weekendtoggle;
- packages/frameworks;
- backend/database/persistence;
- statusworkflow cleanup;
- defectstatus-focus;
- architectuuruitbreiding;
- undo/history;
- contextmenu;
- bulk acties;
- keyboard relocation.

## Niet-Beslissen In Deze Sprint

- Of drag/drop uiteindelijk nodig is.
- Of relocation via knoppen, inline actie, menu of drag/drop gebeurt.
- Hoe keyboard relocation later werkt.
- Hoe multi-resource conflictregels relocation beinvloeden.
- Hoe availability later planning verplaatsing blokkeert of waarschuwt.
- Of statusvelden later uit de hoofdplanning verdwijnen.

## T704 Relocation Discovery Note

T701 t/m T703 tonen dat planningcards eigen interacties kunnen hebben zonder de bestaande celinteractie te breken:

- cards zijn afzonderlijk selecteerbaar;
- geselecteerde cards zijn compact focusbaar;
- delete-acties kunnen los van celacties bestaan;
- event bubbling is beheersbaar met expliciete event-afhandeling.

Latere relocation betekent in het huidige model waarschijnlijk:

- `PlanningItem.employeeId` wijzigen wanneer werk naar een andere werknemer gaat;
- `PlanningItem.date` wijzigen wanneer werk naar een andere dag gaat;
- beide wijzigen wanneer werk tegelijk naar een andere werknemer en andere dag verhuist.

De aanbevolen eerste move-slice bouwt nog geen echte drag/drop. Test eerst een expliciete, controleerbare flow:

1. selecteer een planningcard;
2. selecteer een doelcel;
3. voer een duidelijke actie uit zoals `Verplaats naar actieve cel`;
4. update alleen `employeeId` en/of `date` van het geselecteerde planningitem;
5. laat bestaande conflictvalidatie opnieuw afleiden uit `planningItems`.

Waarom eerst zonder drag/drop:

- de planner ziet welke card geselecteerd is;
- de doelcel is expliciet zichtbaar;
- accidental moves zijn makkelijker te vermijden;
- event bubbling blijft controleerbaar;
- conflictvalidatie kan stap voor stap gevalideerd worden;
- undo/history en persistence hoeven nog niet meteen ontworpen te worden.

Echte drag/drop blijft discovery-only tot na een geslaagde eenvoudige relocation-slice.

Niet combineren met relocation:

- drag/drop;
- drag/drop packages/frameworks;
- multi-select;
- bulk move;
- keyboard move;
- contextmenu;
- undo/history;
- realtime sync;
- backend/API/persistence;
- availability-regels;
- multi-resource conflictregels.

## Verwachte Componentrichting

Waarschijnlijk relevant voor latere implementatie:

- `src/app/page.tsx`
- `src/components/planning/WeekPlanningBoard.tsx`
- `src/components/planning/EmployeeRow.tsx`
- `src/components/planning/PlanningCell.tsx`
- `src/components/planning/PlanningCard.tsx`
- `src/components/planning/matrix.ts`

De kleinste richting:

- `page.tsx` houdt naast `selectedCell` ook een selected-card id bij;
- `PlanningCard` krijgt props voor selectie, focusstatus en delete-actie;
- `PlanningCell` geeft cardselectie door zonder de celprefill te breken;
- delete filtert lokaal het planningitem uit `planningItems`;
- conflicts blijven uit de bestaande `findPlanningConflicts(planningItems, resources)` flow komen.

## Ticketvolgorde

1. T701 - Card selection/focus state
2. T702 - PlanningCard focus UI
3. T703 - Card delete local state
4. T704 - Relocation discovery note
5. T705 - QA en scopecontrole

## Sprint Acceptance Criteria

De sprint is klaar wanneer:

- planningcards afzonderlijk selecteerbaar zijn;
- geselecteerde planningcard compact visueel focusbaar is;
- cardselectie niet concurreert met bestaande celselectie;
- bestaande celselectie blijft werken;
- bestaande formulier-prefill vanuit cel blijft werken;
- planningcard lokaal verwijderbaar is;
- delete verwijdert precies het gekozen planningitem uit lokale state;
- bestaande conflictvalidatie na delete vanzelf opnieuw klopt;
- relocation discovery is gedocumenteerd zonder move UI te bouwen;
- geen drag/drop, availability, multi-resource, weekendtoggle, backend, persistence of package is toegevoegd;
- build en localhostcontrole alleen in T705 plaatsvinden wanneer Sprint 07 later wordt uitgevoerd.

## Test Matrix

| Scenario | Verwacht resultaat |
| --- | --- |
| Weekplanning openen | Matrixrichting uit Sprint 06 blijft behouden |
| Cel selecteren | Actieve celcontext en prefill blijven werken |
| Card selecteren | Alleen de gekozen card krijgt focus |
| Andere card selecteren | Focus verplaatst naar de nieuwe card |
| Lege cel selecteren | Celselectie werkt zonder cardselectie te forceren |
| Card verwijderen | Card verdwijnt uit de juiste cel |
| Conflictcard verwijderen | Conflictsummary wordt opnieuw berekend |
| Na delete opnieuw plannen | Bestaande formulierflow blijft werken |
| Scopecontrole | Geen drag/drop, availability, multi-resource of weekendtoggle toegevoegd |

## Verificatie Bij Uitvoering

- `npm run build`
- localhost controleren
- handmatige interactiecheck:
  - cel selecteren;
  - planningitem toevoegen;
  - card selecteren;
  - card verwijderen;
  - conflictcase na delete controleren;
  - out-of-scope checklist doorlopen.

Deze sprintvoorbereiding zelf voert geen build uit en wijzigt geen code.

## Belangrijkste Risico's

- Cardklik triggert ook celklik en maakt selectie ambigu.
- Delete wordt te breed en verwijdert meerdere items.
- Delete UI maakt cellen drukker en schaadt scanbaarheid.
- Card focus lijkt op statuskleur of conflictindicatie.
- Relocation discovery glijdt door naar echte move of drag/drop.
- Eenvoudige relocation kan accidental moves veroorzaken als de doelcel niet expliciet genoeg is.
- Conflictvalidatie kan stale lijken als move-state niet via de bestaande `planningItems` flow loopt.
- Undo-behoefte kan snel ontstaan zodra verplaatsen mogelijk wordt, maar blijft buiten de eerste move-slice.
- Availability komt per ongeluk terug in Sprint 07.
- Statusworkflow of defectstatus wordt onbedoeld meegenomen.

## Codex Instructie Voor Deze Sprint

Codex mag pas implementeren na expliciete goedkeuring van de specifieke ticketaanpak.

Voor implementatie:

1. verplichte context lezen;
2. opdracht samenvatten;
3. concreet plan tonen;
4. verwachte bestanden benoemen;
5. risico's en buiten scope benoemen;
6. wachten op expliciete goedkeuring.

## Sprintresultaat

Sprint 07 is afgerond als planningcard interaction-discovery slice.

Opgeleverd:

- planningcards zijn afzonderlijk selecteerbaar;
- geselecteerde planningcard krijgt compacte focus UI;
- cardselectie en celselectie blijven naast elkaar werken;
- planningcards zijn lokaal verwijderbaar uit `planningItems`;
- delete verwijdert precies het gekozen planningitem;
- delete van geselecteerde card wist `selectedCard`;
- delete van andere card behoudt bestaande cardselectie;
- delete-actie triggert geen ongewenste card- of celklik;
- conflictbadges herberekenen na delete via bestaande stateflow;
- relocation discovery is gedocumenteerd zonder move UI te bouwen.

Build en QA:

- `npm run build` geslaagd;
- localhost gecontroleerd;
- matrixrichting regressie geslaagd;
- celselectie en prefill regressie geslaagd;
- card selection/focus/delete QA geslaagd;
- scopecontrole geslaagd.

Niet toegevoegd:

- drag/drop;
- echte move naar andere cel;
- availability;
- multi-resource;
- weekendtoggle;
- packages/frameworks;
- backend/API/persistence;
- undo/history;
- contextmenu;
- bulk acties;
- keyboard relocation.

Open punten:

- Sprint 06 native datum-input handmatige QA blijft open;
- resource optioneel maken is alleen gedocumenteerd en nog niet geimplementeerd;
- autofocus taak/project na celselectie is gedocumenteerd als latere polish-slice en nog niet gebouwd.

## Belangrijkste Regel

Sprint 07 is alleen planningcard interaction discovery. Bouw geen drag/drop, availability, multi-resource, weekendtoggle, backend, persistence of architectuuruitbreiding.
