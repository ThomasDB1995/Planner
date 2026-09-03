# QA - Sprint 18 Planner Module Boundaries & Availability Types Discovery

## Status

Voorbereid voor review.

## Doel Van QA

Valideren dat Sprint 18 volledig documentair is uitgewerkt en geen implementatie, build of codewijziging bevat.

## Buildstatus

Niet uitgevoerd.

Reden:

- Sprint 18 is documentatie-only;
- gebruiker heeft expliciet gevraagd geen build uit te voeren;
- er zijn geen codewijzigingen gedaan.

## Localhoststatus

Niet uitgevoerd.

Reden:

- geen implementatie gestart;
- geen UI-code gewijzigd;
- geen localhost-QA nodig voor deze discovery-sprint.

## Documentatiecontrole

| Controle | Verwacht resultaat | Status |
| --- | --- | --- |
| Sprintdocument | `SPRINT.md` bestaat en beschrijft doel, scope, tickets en Go/No-Go | Te reviewen |
| QA-document | `QA.md` bestaat en bewaakt documentatie-only scope | Te reviewen |
| T1801 | Planner modulegrenzen en verantwoordelijkheden zijn gedocumenteerd | Te reviewen |
| T1802 | Availability-types zijn als UX-context onderzocht zonder workflow/approval | Te reviewen |
| T1803 | Visual hierarchy en density-impact zijn beschreven | Te reviewen |
| T1804 | Personeelstype metadata is afgebakend zonder HR/rechten/payroll | Te reviewen |
| T1805 | Bureau- versus terreinplanning scenario's zijn beschreven | Te reviewen |
| T1806 | QA en Go/No-Go voor latere implementatie zijn vastgelegd | Te reviewen |
| PROJECT_STATE | Projectstatus is bijgewerkt met Sprint 18 discovery | Te reviewen |
| UX findings | Planning UX/domain findings zijn bijgewerkt | Te reviewen |
| DOMAIN_MODEL | Domeinmodel is waar relevant aangescherpt | Te reviewen |
| Scopecontrole | Geen code, build of implementatie toegevoegd | Te reviewen |

## Scopecontrole

Niet uitgevoerd of toegevoegd:

- codewijzigingen;
- build;
- localhost-QA;
- availability implementatie;
- availability type in code;
- grouping/filtering implementatie;
- HR-logica;
- verlofaanvragen;
- approvals;
- saldo's;
- payroll;
- contractbeheer;
- rechtenmodel;
- backend/persistence/API;
- werkbonnen;
- nacalculatie;
- CRM-flow;
- materieelbeheer CRUD/import;
- drag/drop;
- packages/frameworks;
- realtime sync;
- grote planner-redesign.

## Contractreview

Sprint 18 bevestigt dat de volgende bestaande contracten voorlopig blijven:

- availability blijft conceptueel gekoppeld aan `employeeId + date`;
- availability wordt niet aan `PlanningItem` gekoppeld;
- `EmployeeAvailability` wordt in deze sprint niet aangepast;
- `PlanningItem.resourceId` blijft compatibel;
- `PlanningItem.resourceIds` blijft additief via de helperlaag;
- conflictvalidatie blijft materieelgericht en wordt niet uitgebreid met HR-regels.

Belangrijkste contractrisico's voor latere implementatie:

- availability-type kan te snel een HR-status worden;
- typekeuze kan per ongeluk verlofaanvraag- of approval-semantiek krijgen;
- personeelstype kan verkeerd gebruikt worden als rechten- of contractlogica;
- grouping/filtering kan de matrixstructuur te vroeg complexer maken;
- bureauplanning kan onbedoeld uitgroeien tot aparte module of agenda-app;
- visual hierarchy kan planningcards en conflictbadges verdringen.

## Visual Density Controlepunten

Voor latere implementatie verplicht te beoordelen:

- unavailable cel met 0 cards;
- unavailable cel met meerdere cards;
- unavailable cel met conflictbadges;
- selected cell plus availability-state;
- destination cell plus availability-state;
- card met meerdere materieelitems plus availability-context;
- compacte label- of badgeweergave bij lange availability-type namen.

## Go/No-Go Beoordeling

Advies: voorzichtig Go voor een latere kleine implementatieslice, alleen na review.

Toegestane richting:

- lokale availability-type state op `employeeId + date`;
- alleen visuele context;
- compacte badge/label/kleurproef;
- geen persistence;
- geen conflictregelwijziging;
- geen grouping/filtering tegelijk;
- geen HR-workflow.

Geen Go voor:

- HR-module;
- verlofaanvragen;
- approvals;
- saldo's;
- payroll;
- contractbeheer;
- rechtenmodel;
- backend/persistence/API;
- werkbonnen of nacalculatie;
- bureauplanner als aparte view;
- employee grouping en availability-types tegelijk implementeren;
- drag/drop;
- packages/frameworks.

## QA-Conclusie

Sprint 18 is documentair klaar voor review wanneer alle documenten aanwezig zijn en de scopecontrole bevestigt dat geen code, build of implementatie is geraakt.
