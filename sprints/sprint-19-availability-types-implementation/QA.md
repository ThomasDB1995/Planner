# QA - Sprint 19 Availability Types Implementation

## Status

Afgerond.

## Doel Van QA

Valideren dat Sprint 19 typed availability toevoegt zonder regressie in planningflows, matrixdensity, conflictweergave, resourcecompatibiliteit of modulegrenzen.

## Scopecontrole

Toegevoegd:

- typed availability state op `employeeId + date`;
- helperlaag voor availability;
- compacte typekeuze;
- typed availability rendering in de matrix;
- visuele polish voor lege en bezette availability-cellen.

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
- drag/drop;
- packages/frameworks;
- popover/modal library;
- wijzigingen aan `PlanningItem`;
- wijzigingen aan `resourceId` / `resourceIds`;
- wijzigingen aan de conflictengine.

## Contractcontrole

Bevestigd:

- availability blijft gekoppeld aan `employeeId + date`;
- availability hoort niet bij `PlanningItem`;
- availability hoort niet bij resource allocation;
- availability wordt niet meegegeven aan `findPlanningConflicts`;
- planning blijft toegestaan op availability-cellen;
- `PlanningItem.resourceId` blijft compatibel;
- `PlanningItem.resourceIds` blijft additief via de bestaande helperlaag.

## Availability Types

Geimplementeerde interne types:

- `unavailable`;
- `recovery`;
- `vacation`;
- `weather_leave`;
- `sick_leave`.

Nederlandse UI-labels:

- `Niet beschikbaar`;
- `Recup`;
- `Vakantie` in lege matrixcellen;
- `Jaarlijkse vakantie` in select/dropdown en tooltip/title;
- `Weerverlet`;
- `Ziekte`.

## Helperlaag

Toegevoegd in `src/lib/planning/availability.ts`:

- `AvailabilityType`;
- `getAvailabilityKey(employeeId, date)`;
- `findEmployeeAvailability(employeeAvailability, cell)`;
- `hasEmployeeAvailability(employeeAvailability, cell)`;
- `setEmployeeAvailabilityType(current, cell, type)`;
- `clearEmployeeAvailability(current, cell)`;
- `toggleUnavailableAvailability(current, cell)`;
- `getAvailabilityLabel(type)`;
- `getAvailabilityShortLabel(type)`;
- `getAvailabilityCellLabel(type)`;
- `getAvailabilityIndicator(type)`;
- `getAvailabilityClassName(type, density)`.

## Buildstatus

Geslaagd.

Uitgevoerd:

- `npm run build`;
- Next production build;
- TypeScript-validatie via build.

Opmerking:

- los `npm run lint` vroeg om interactieve ESLint-configuratie en is niet geconfigureerd, omdat dat buiten scope viel.

## Browser-QA Resultaat

Gecontroleerd:

1. Alle availability types zichtbaar in lege cellen:
   - `Niet beschikbaar`;
   - `Recup`;
   - `Vakantie`;
   - `Weerverlet`;
   - `Ziekte`.

2. Volledige celkleur:
   - duidelijk genoeg;
   - zacht/muted;
   - niet te fel.

3. Selected cell:
   - selected border/ring blijft zichtbaar boven availabilitykleur.

4. Planningcards op availability-cellen:
   - cards blijven dominant;
   - availability blijft compacte indicator.

5. Conflictbadges:
   - conflictbadges blijven opvallender dan availability.

6. Matrixrust:
   - matrix blijft rustig;
   - geen regenboogeffect.

Resultaat:

- bugs: nee;
- advies: Sprint 19 afronden.

## Regressiecontrole

Beoordeeld als intact:

- create flow;
- edit flow;
- delete;
- relocation;
- sticky planningform;
- sticky werknemerlabels;
- multi-materieel compatlaag;
- conflictbadges;
- conflict summary;
- planning op availability-cellen.

## Resterende Risico's

- zeer volle availability-cellen blijven een density stresscase;
- toekomstige persistence moet apart worden ontworpen;
- availability-labels mogen later niet uitgroeien tot HR- of approvalsemantiek;
- bij toekomstige grouping/filtering moet opnieuw scope review gebeuren.

## QA-Conclusie

Sprint 19 is QA-matig akkoord.

Typed availability is zichtbaar genoeg voor planning, blijft ondergeschikt aan planningcards en conflictbadges, en blijft binnen de afgesproken planner-modulegrenzen.
