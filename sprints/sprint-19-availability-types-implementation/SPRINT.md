# Sprint 19 - Availability Types Implementation

## Sprintstatus

Afgerond.

Sprint 19 is uitgevoerd als kleine gecontroleerde implementatiesprint rond typed availability-context in de planner.

## Sprintdoel

Typed availability-context toevoegen op `employeeId + date`, met minimale regressierisico's en zonder de planner richting HR-, workflow-, payroll- of approvalfunctionaliteit te duwen.

Availability blijft lichte operationele plannercontext:

- zichtbaar in de matrix;
- gekoppeld aan werknemer en datum;
- los van planningitems;
- los van materieel;
- los van conflictvalidatie;
- niet blokkerend.

## Context

Sprint 18 heeft de modulegrenzen en availability-types documentair afgebakend.

Belangrijke guardrails uit Sprint 18:

- availability blijft gekoppeld aan `employeeId + date`;
- availability wordt niet gekoppeld aan `PlanningItem`;
- availability wordt geen HR-workflow;
- planning blijft technisch toegestaan;
- conflictregels blijven materieelgericht;
- matrixdensity blijft leidend.

Sprint 17 blijft relevant omdat multi-materieel via de compatlaag werkt:

- `PlanningItem.resourceId` blijft primary mirror;
- `PlanningItem.resourceIds?: string[]` is additief;
- resource reads en writes blijven via helperlaag lopen;
- conflictvalidatie blijft per `date + resourceId`.

## Uitgevoerde Slices

### Slice 1 - Availability Helperlaag En Type Model

Uitgevoerd:

- `AvailabilityType` toegevoegd;
- `EmployeeAvailability` gemigreerd van `isUnavailable: true` naar `type: AvailabilityType`;
- helperbestand `src/lib/planning/availability.ts` toegevoegd;
- directe availability lookups gecentraliseerd;
- 1-click unavailable toggle behouden;
- build/typecheck uitgevoerd en geslaagd.

Toegevoegde helperverantwoordelijkheden:

- availability key bepalen;
- availability zoeken;
- availability bestaan controleren;
- availability type zetten;
- availability wissen;
- unavailable toggle ondersteunen;
- labels en indicatoren leveren.

### Slice 2 - Typed Rendering En Minimale Typekeuze

Uitgevoerd:

- `PlanningCell` ontvangt typed `availabilityType?: AvailabilityType`;
- resterende boolean-semantiek uit `PlanningCell` verwijderd;
- compacte typed indicatoren toegevoegd;
- native select toegevoegd voor secundaire types;
- bestaande 1-click unavailable knop behouden;
- planningcards, conflicts en resource flows ongemoeid gelaten;
- build/typecheck uitgevoerd en geslaagd.

### Slice 3 - UX Polish En Visuele Leesbaarheid

Uitgevoerd:

- primary availability-knop verduidelijkt:
  - zonder availability: `Niet beschikbaar`;
  - met availability: `Beschikbaar maken`.
- type-select toont actuele secundaire typekeuze;
- type-select wist availability niet;
- availability wissen gebeurt via `Beschikbaar maken`;
- indicatoren aangepast naar `NB`, `REC`, `VAK`, `WV`, `ZK`;
- lege availability-cellen kregen leesbare celtekst;
- `Vakantie` wordt gebruikt als zichtbare celtekst;
- `Jaarlijkse vakantie` blijft gebruikt in select en tooltip/title;
- lege availability-cellen kregen zachte volledige celkleur;
- bezette availability-cellen tonen availability subtiel zodat planningcards dominant blijven;
- build/typecheck uitgevoerd en geslaagd.

### Visuele QA

Uitgevoerd in browser op localhost.

Resultaat:

- alle availability types zijn zichtbaar in lege cellen;
- volledige celkleur is duidelijk maar niet te fel;
- selected cell blijft zichtbaar boven availability-kleur;
- planningcards blijven dominant op availability-cellen;
- conflictbadges blijven opvallender dan availability;
- matrix blijft rustig en krijgt geen regenboogeffect;
- bugs: nee;
- advies: Sprint 19 afronden.

## Availability Types

Interne types:

- `unavailable`;
- `recovery`;
- `vacation`;
- `weather_leave`;
- `sick_leave`.

Zichtbare Nederlandse labels:

- `Niet beschikbaar`;
- `Recup`;
- `Vakantie` in lege matrixcellen;
- `Jaarlijkse vakantie` in type-select en tooltip/title;
- `Weerverlet`;
- `Ziekte`.

## Gewijzigde Codebestanden Tijdens Sprint 19

- `src/lib/planning/availability.ts`;
- `src/components/planning/matrix.ts`;
- `src/app/page.tsx`;
- `src/components/planning/WeekPlanningBoard.tsx`;
- `src/components/planning/EmployeeRow.tsx`;
- `src/components/planning/DayRow.tsx`;
- `src/components/planning/PlanningCell.tsx`.

## UX-Beslissingen

- 1-click blijft beschikbaar voor `Niet beschikbaar`;
- andere availability types worden gekozen via een kleine native select;
- availability wissen gebeurt via `Beschikbaar maken`;
- lege availability-cellen mogen volledige zachte celkleur krijgen;
- bezette availability-cellen houden alleen een compacte indicator;
- planningcards blijven visueel dominant;
- conflictbadges blijven sterker dan availability;
- selected/destination cell states blijven boven availability-styling zichtbaar;
- UI-labels blijven Nederlands.

## Visuele Hierarchie

Prioriteit in de matrix:

1. planningcards en taak/project;
2. conflictbadges;
3. materieelcontext;
4. availability-context;
5. celachtergrond en subtiele statuskleur.

Availability helpt bij scannen, maar overschrijft planninginhoud niet.

## Expliciete Non-Goals

Niet toegevoegd:

- persistence;
- backend/API;
- localStorage;
- permissions;
- HR-module;
- verlofaanvragen;
- approvals;
- saldo's;
- payroll;
- contractlogica;
- conflictregelwijzigingen;
- harde blokkering;
- drag/drop;
- packages/frameworks;
- popover/modal library;
- employee grouping/filtering;
- bureauplanner;
- wijzigingen aan `PlanningItem`;
- wijzigingen aan `resourceId` / `resourceIds`;
- wijzigingen aan de conflictengine.

## Build En QA

Uitgevoerd:

- `npm run build` meerdere keren uitgevoerd en geslaagd;
- Next build heeft TypeScript-validatie uitgevoerd;
- visuele browser-QA uitgevoerd op localhost;
- no-go scope gecontroleerd.

Niet apart afgerond:

- `npm run lint` als los script vraagt om interactieve ESLint-configuratie. Die configuratie is niet toegevoegd omdat dat buiten Sprint 19 viel. De Next production build voerde wel lint/type-validatie uit.

## Resterende Aandachtspunten

- Eventueel later beoordelen of `toggleUnavailableAvailability` nog nodig is als publieke helper;
- bij veel planningcards in een availability-cel blijft density een stresscase;
- bij toekomstige persistence moet availability sync apart ontworpen worden;
- availability mag ook later geen HR-, approval-, payroll- of conflictsemantiek krijgen.

## Resultaat

Sprint 19 is afgerond.

Typed availability werkt lokaal als visuele plannercontext op `employeeId + date`, zonder persistence, backend, HR-workflows, conflictregelwijzigingen, drag/drop, packages of wijzigingen aan planning/resource-contracten.
