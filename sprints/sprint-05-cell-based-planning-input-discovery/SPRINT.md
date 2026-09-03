# Sprint 05 - Cell-Based Planning Input Discovery

## Sprintstatus

Afgerond

## Sprintdoel

De weekplanning voorbereiden op Excel-achtige, celgebaseerde invoer zonder de bestaande planningarchitectuur uit te breiden.

De slice onderzoekt hoe een planner vanuit een werknemer + datum cel sneller een planningitem kan toevoegen, met behoud van lokale state, bestaande resources en bestaande conflictvalidatie.

## Context

Sprint 04 is volledig afgesloten.

Vaststaande technische uitgangspunten:

- resource contract migration is afgerond;
- oude machine-contracten zijn niet meer aanwezig in `src`;
- build is groen;
- planning draait op lokale state/mockdata;
- geen database, backend, import, CRUD of persistence.

Belangrijkste UX-bevinding:

De huidige weekplanning werkt technisch, maar voelt nog te formuliergestuurd. De gewenste richting is dagelijkse terreinplanning met scanbare cellen en inline interactie.

## In Scope

- bestaande weekplanning behouden als basis;
- planningcel per werknemer + datum selecteerbaar maken;
- geselecteerde werknemer en datum automatisch als invoercontext gebruiken;
- compacte inline of contextuele invoer voor taak/project;
- bestaande `ResourceSelector` blijven gebruiken;
- nieuw planningitem zichtbaar maken in dezelfde cel;
- bestaande statuskleuren en conflictvalidatie behouden;
- tekst en visuele context verbeteren waar dit direct scanbaarheid helpt;
- maandag t.e.m. zondag als expliciete UX-beslissing documenteren of voorbereiden.

## Buiten Scope

- drag/drop;
- database;
- backend/API;
- import/export;
- CRUD voor resources, materialen of projecten;
- materials-module;
- transportmiddelmodule;
- nieuwe frameworks;
- nieuwe packages;
- nieuwe architectuurlaag;
- schaalbaarheidsoptimalisatie;
- autosave;
- login/cloud/realtime samenwerking;
- volledige view mode-architectuur.

## Niet-Beslissen In Deze Sprint

Deze onderwerpen blijven discovery en mogen niet als volwaardige module worden gebouwd:

- materialen/artikelen;
- transportmiddel als aparte laag;
- voorraad of verbruiksgoederenbeheer;
- projectbeheer;
- meerdere view modes;
- definitieve planningstructuur maandag-vrijdag versus maandag-zondag.

## Tickets

Tickets staan sprintgebonden onder `tickets/`.

Aanbevolen volgorde:

1. T501 - Cell interaction discovery en minimale UX-keuze
2. T502 - Celcontext koppelen aan compacte planninginvoer
3. T503 - Scanbaarheid, QA en sprint closure

## Acceptance Criteria

De sprint is klaar wanneer:

- een planner een werknemer + datum cel kan selecteren;
- invoer start vanuit die celcontext;
- werknemer en datum niet opnieuw handmatig gekozen hoeven te worden;
- taak/project en resource kunnen worden ingevuld binnen dezelfde lokale flow;
- het aangemaakte item zichtbaar wordt in de gekozen cel;
- bestaande conflictmeldingen blijven werken;
- de UI scanbaar blijft bij meerdere items in een cel;
- geen out-of-scope domein of infrastructuur is toegevoegd.

## Test Matrix

| Scenario | Verwacht resultaat |
| --- | --- |
| Lege planning openen | Weekplanning blijft zichtbaar en rustig scanbaar |
| Cel selecteren | Werknemer en datum zijn duidelijk als context |
| Vanuit cel item toevoegen | Item verschijnt in dezelfde werknemer/datum cel |
| Resource kiezen | Bestaande ResourceSelector blijft bruikbaar |
| Dubbele resource plannen | Bestaande conflictwaarschuwing blijft zichtbaar |
| Defecte resource plannen | Bestaande waarschuwing blijft zichtbaar |
| Meerdere items in een cel | Cel blijft compact leesbaar |
| Refresh | Data mag verdwijnen, lokale state blijft acceptabel |

## Verificatie

- Build controleren indien code wijzigt.
- Localhost handmatig controleren indien UI wijzigt.
- Scopecontrole uitvoeren tegen deze sprint.
- QA bijwerken.
- `PROJECT_STATE.md` bijwerken bij sprintstart, afronding of belangrijke beslissing.

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

Sprint 05 is een kleine UX/discovery slice. Bouw geen nieuwe module en voeg geen nieuwe infrastructuur toe.

## Sprintresultaat

Sprint 05 is afgerond als kleine UX/discovery slice.

Opgeleverd:

- planningcellen zijn selecteerbaar;
- actieve celcontext toont werknemer en datum;
- formulier vult datum en werknemer vooraf in op basis van de geselecteerde cel;
- velden blijven zichtbaar en wijzigbaar;
- bestaande submitflow, resource selector, planningtypes en weekstructuur zijn behouden;
- QA en discoverybevindingen zijn vastgelegd.

Niet toegevoegd:

- drag/drop;
- database/API/backend;
- materialen/artikelen;
- nieuwe packages/frameworks;
- weekstructuurwijziging;
- nieuwe planningarchitectuur.
