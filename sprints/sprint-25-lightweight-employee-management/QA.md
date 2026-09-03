# Sprint 25 QA - Lightweight Employee Management

## Scope

QA richt zich op Sprint 25 Slice 1: werknemers lokaal verbergen en opnieuw tonen in de planner.

Niet getest of gewijzigd:

- hard delete;
- persistence;
- backend/API;
- localStorage;
- HR-profielen;
- permissions;
- payroll;
- contractstatus;
- user management;
- aparte employee-module;
- nieuwe packages/frameworks;
- redesign.

## Browser-QA

| Punt | Resultaat |
| --- | --- |
| Werknemer verbergen verwijdert rij uit matrix | Ja |
| Werknemer verbergen verwijdert werknemer uit `PlanningForm`-select | Ja |
| Herstelregel toont duidelijk dat er verborgen werknemers zijn | Ja |
| `Terug tonen` zet werknemer terug | Ja |
| Bestaande planning van verborgen werknemer komt terug na tonen | Ja |
| Availability van verborgen werknemer komt terug na tonen | Ja |
| Verborgen werknemer-items tellen niet mee in zichtbare conflictstatus | Ja |
| Na tonen tellen items opnieuw mee in conflictstatus | Ja |
| Verbergen van werknemer met actieve selected cell wist selectie/formcontext | Ja |
| Verbergen van werknemer met selected card/edit wist editcontext | Ja |
| Verbergen tijdens relocation wist relocation source/destination | Ja |
| Create/edit/delete blijven werken | Ja |
| Relocation blijft werken | Ja |
| Weeknavigatie blijft werken | Ja |
| UI blijft compact en voelt niet als HR-module | Ja |
| Teksten zijn Nederlands en operationeel: verbergen/tonen, niet inactive/status | Ja |

## QA-observaties

- Verborgen werknemers verdwijnen uit de matrix en uit de werknemerselectie.
- Verborgen werknemers blijven herstelbaar via compacte `Terug tonen`-acties.
- Planningitems blijven in state en worden opnieuw zichtbaar bij tonen.
- Availability blijft gekoppeld aan `employeeId + date` en komt terug bij tonen.
- Conflicts volgen de zichtbare matrix: verborgen werknemer-items tellen tijdelijk niet mee.
- Selection, edit en relocation context worden gewist wanneer de betrokken werknemer verborgen wordt.
- De UI blijft operationeel en compact.

## UX-Polish QA

| Punt | Resultaat |
| --- | --- |
| Werknemer verbergen werkt | Ja |
| Hide-actie is subtiel maar vindbaar | Ja |
| Verborgen werknemers summary is compact | Ja |
| `Beheren` opent herstelopties | Ja |
| `Terug tonen` herstelt werknemer | Ja |
| Planning/availability komen terug | Ja |
| Conflictfilter blijft correct | Ja |
| Matrix voelt rustiger dan voordien | Ja |
| UI voelt niet als HR-module | Ja |
| Create/edit/delete/relocation/weeknavigatie blijven intact | Ja |

## UX-Polish Observaties

- `Verbergen` is standaard visueel terughoudend en verschijnt bij hover/focus.
- De standaardweergave toont alleen `Verborgen: n` met `Beheren`.
- De uitgeklapte beheerregel toont de naam apart met actie `Terug tonen`.
- De herstelbaarheid blijft duidelijk, maar de matrix toont minder administratieve knoppen.
- Er is geen nieuwe functionaliteit of HR-taal toegevoegd.

## Slice 2 QA - Werknemer Toevoegen

| Punt | Resultaat |
| --- | --- |
| Nieuwe werknemer toevoegen met Voornaam + Naam werkt | Ja |
| Lege Voornaam wordt geblokkeerd | Ja |
| Lege Naam wordt geblokkeerd | Ja |
| Dubbele volledige naam wordt geblokkeerd | Ja |
| Nieuwe werknemer verschijnt direct als rij in matrix | Ja |
| Nieuwe werknemer verschijnt direct in `PlanningForm`-select | Ja |
| Displaynaam is overal consistent `Voornaam Naam` | Ja |
| Lange namen zijn voldoende leesbaar in de matrix | Ja |
| Volledige naam is beschikbaar via title/tooltip | Ja |
| Het `x`-kruisje is subtiel maar begrijpelijk als verbergen | Ja |
| Het `x`-kruisje voelt niet als hard delete | Ja |
| Verborgen werknemer verschijnt in compacte verborgen-werknemers summary | Ja |
| `Terug tonen` herstelt werknemer | Ja |
| Planning/availability van verborgen werknemer komen terug na tonen | Ja |
| Nieuwe werknemer kan planning krijgen | Ja |
| Nieuwe werknemer kan availability krijgen | Ja |
| Create/edit/delete blijven werken | Ja |
| Relocation blijft werken | Ja |
| Weeknavigatie blijft werken | Ja |
| Conflictvalidatie blijft werken | Ja |
| Bestaande seedwerknemers tonen correct | Ja |
| UI blijft compact en voelt niet als HR-module | Ja |
| Layout blijft acceptabel op laptopbreedte/horizontale scroll | Ja |

## Slice 2 Observaties

- Displaynaam wordt opgebouwd als `Voornaam Naam`.
- `name` blijft compatibel aanwezig naast `firstName` en `lastName`.
- Nieuwe werknemers zijn direct planbaar.
- Nieuwe werknemers gebruiken dezelfde availability- en hide/show-flow.
- Verbergen blijft het verwijderpad; er is geen hard delete toegevoegd.
- Nieuwe werknemers zijn alleen in-memory.

## Finale Werknemerszone QA

| Punt | Resultaat |
| --- | --- |
| Werknemerszone is een compact enkel kader | Ja |
| `+ Werknemer` werkt | Ja |
| Toevoegen met `Voornaam` + `Naam` werkt | Ja |
| `Annuleren` werkt | Ja |
| Validatie blijft werken | Ja |
| Duplicate validation blijft werken | Ja |
| Verbergen werkt | Ja |
| `Verborgen: n · Beheren` werkt | Ja |
| Naam + `Terug tonen` is duidelijk | Ja |
| `Terug tonen` herstelt werknemer | Ja |
| Planning/availability komen terug na herstellen | Ja |
| Create/edit/delete/relocation/weeknavigatie blijven intact | Ja |
| UI voelt compact en niet als HR-module | Ja |

## Finale Werknemerszone Observaties

- Werknemer toevoegen en verborgen werknemers beheren zitten nu in één kader `Werknemers`.
- `+ Werknemer` opent pas na interactie een compacte inline form.
- Na succesvol toevoegen klapt de add-flow terug in.
- De verborgen summary blijft compact als `Verborgen: n · Beheren`.
- `Toon [naam]` is vervangen door naam + `Terug tonen`, omdat de oude copy als bekijken kon lezen in plaats van opnieuw zichtbaar maken.
- Er is geen extra functionele scope toegevoegd.

## Buildstatus

Geslaagd.

Uitgevoerd na implementatie:

- `npm run build`;
- Next production build;
- TypeScript-validatie via build.
- finale browser-QA uitgevoerd op `http://localhost:3031`.

## Bugs

Open bugs: nee.

## Resterend Risico

Verborgen werknemers maken bestaande planning tijdelijk onzichtbaar. Dit is bewust gedrag en herstelbaar via `Beheren` en `Terug tonen`.

Omdat er geen persistence is, reset de verborgen/getoonde employee-state bij reload.

De hide-actie is minder prominent. Dit vergroot de rust in de matrix, maar maakt de actie bewust iets minder zichtbaar dan een vaste knop.

Nieuwe werknemers zijn nog niet persistent en verdwijnen bij reload.

Er is nog geen employee-edit. Foutief toegevoegde werknemers kunnen voorlopig alleen verborgen worden.

## Advies

Sprint 25 Slice 2 afronden.
