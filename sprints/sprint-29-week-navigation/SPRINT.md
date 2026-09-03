# Sprint 29 - Week Navigation & Direct Week Jump

## Status

Afgerond.

## Doel

Weeknavigatie geschikt maken voor jaarplanning en snelle terugkeer naar specifieke weken, zonder planningdata, routing of persistence te wijzigen.

Sprint 29 bestaat uit twee gecontroleerde delen:

- directe ISO-weekjump toevoegen;
- weeknavigatie visueel herordenen zodat het weeknummer het primaire anker is.

## Scope

Uitgevoerd:

- ISO-weekhelpers toegevoegd voor weeknummer, weekjaar, aantal weken per jaar, weekstartdatum en datumrange;
- actieve week blijft view/filter-context;
- planningitems blijven datumgebaseerd;
- directe weekjump toegevoegd met `Week`, `Jaar`, `Ga`;
- validatie toegevoegd voor weeknummer en jaar;
- week 53 is alleen geldig in jaren met 53 ISO-weken;
- selectie-, edit- en relocationcontext worden gewist bij weekwissel en weekjump;
- weeknavigatie herwerkt naar duidelijke informatiehierarchie:
  - primair: vorige/volgende pijlen rond `Week XX`;
  - secundair: datumrange;
  - utility: `Week [xx] Jaar [xxxx] [Ga] Vandaag`.

## Gewijzigde bestanden

Codebestanden die tijdens Sprint 29 zijn gewijzigd:

- `src/lib/planning/week.ts`
- `src/components/planning/WeekPlanningBoard.tsx`
- `src/app/page.tsx`

Documentatiebestanden voor closure:

- `sprints/sprint-29-week-navigation/SPRINT.md`
- `sprints/sprint-29-week-navigation/QA.md`
- `sprints/sprint-29-week-navigation/tickets/T2901.md`
- `PROJECT_STATE.md`

## UX-Hiërarchiebeslissing

Het weeknummer is het centrale navigatieanker. Planners moeten eerst zien in welke week ze werken, daarna pas de datumrange lezen.

Definitieve structuur:

- primair: `Vorige week` en `Volgende week` als compacte pijlen rond `Week XX`;
- secundair: datumrange zoals `1 juni - 7 juni 2026`;
- utility: directe jump met `Week`, `Jaar`, `Ga` en `Vandaag`.

`Vandaag` is bewust geen hoofdknop meer. Het blijft een snelle utility naast de weekjump.

De matrix blijft de primaire werkruimte. De navigatiezone is compacter en duidelijker, maar introduceert geen nieuwe plannerflow.

## Architectuurbeslissing

Week blijft alleen view/filter-context.

Niet gewijzigd:

- `PlanningItem.date` blijft leidend;
- availability blijft gekoppeld aan `employeeId + date`;
- conflictvalidatie blijft datum- en resourcegebaseerd;
- relocation blijft `employeeId + date` wijzigen;
- planningitems buiten de zichtbare week blijven in state en worden alleen niet getoond.

## QA-Resultaat

Functionele Sprint 29 QA bevestigde:

- huidige week toont correct weeknummer, jaar en datumrange;
- vorige/volgende week passen weeknummer en datumrange correct aan;
- vandaag springt correct terug;
- direct naar week 5 werkt;
- direct naar week 40 werkt;
- direct naar week 1 werkt;
- jaargrenzen werken correct;
- week 53 wordt alleen geaccepteerd in jaren met 53 ISO-weken;
- ongeldige weken en ongeldige jaren geven compacte foutmeldingen;
- planningitems blijven datumgebaseerd;
- items verschijnen en verdwijnen volgens actieve week;
- availability blijft correct per `employeeId + date`;
- conflicts blijven correct binnen zichtbare week;
- weekjump wist selected cell, formcontext, selected card/edit en relocation source/destination;
- create, edit, delete, relocation en weeknavigatie blijven intact.

UX-polish QA bevestigde:

- weeknummer is eerste visuele focus;
- pijlen rond weeknummer voelen logisch;
- datumrange is duidelijk maar secundair;
- weekjump-regel voelt gegroepeerd;
- `Vandaag` voelt als utility, niet als hoofdknop;
- weekjump werkt;
- vandaag werkt;
- vorige/volgende week werkt;
- ongeldige week geeft foutmelding;
- layout blijft compact op laptopbreedte;
- matrixlayout blijft rustig;
- bugs: nee.

Build/typecheck:

- `npm run build` is geslaagd na implementatie.
- `npm run build` is opnieuw geslaagd na UX-polish.

## Non-Goals

Niet toegevoegd:

- routing;
- backend/API;
- persistence;
- localStorage;
- kalender- of maandview;
- jaaroverzicht;
- week-copy;
- templates;
- employee management;
- wijziging aan planningdata-model;
- wijziging aan conflictregels;
- wijziging aan availability-logica;
- drag/drop;
- nieuwe packages;
- brede header- of planner-redesign.

## Resterend Aandachtspunt

Compactheid op smallere schermen blijven bewaken. De huidige layout is groen op laptopbreedte, maar bij smallere viewports kan de weeknavigatie later eventueel nog compacter worden gemaakt zonder de weeklogica te wijzigen.

## Status

Sprint 29 is afgerond. Geen open bugs. Sprint 29 wordt niet verder uitgebreid zonder nieuwe opdracht.
