# Sprint 24 QA - Week Navigation

## Scope

QA richt zich op Sprint 24 Slice 1: minimale weeknavigatie voor de bestaande matrixplanner.

Niet getest of gewijzigd:

- persistence;
- backend/API;
- database;
- routing;
- employee management;
- week copy/templates;
- drag/drop;
- weekendweergave;
- nieuwe packages/frameworks.

## Browser-QA

| Punt | Resultaat |
| --- | --- |
| Huidige week opent correct | Ja, initieel maandag-vrijdag; na correctie maandag t/m zondag |
| Vorige week toont juiste week | Ja, initieel maandag-vrijdag; na correctie maandag t/m zondag |
| Volgende week toont juiste week | Ja, initieel maandag-vrijdag; na correctie maandag t/m zondag |
| `Vandaag` brengt terug naar huidige werkweek | Ja |
| Planningitem toevoegen in week A verschijnt in week A | Ja |
| Navigeren naar week B verbergt item uit week A | Ja |
| Terug naar week A toont item opnieuw | Ja |
| Availability op `employeeId + date` blijft correct per week | Ja |
| Conflictvalidatie werkt binnen zichtbare week | Ja |
| Weekwissel wist selected cell en formcontext | Ja |
| Weekwissel wist edit/selected card | Ja |
| Weekwissel wist relocation source/destination | Ja |
| Create/edit/delete/relocation blijven intact na weeknavigatie | Ja |
| Resource favorites en `Materieel behouden` blijven intact | Ja |
| Matrix blijft compact en rustig | Ja |

## QA-observaties

- Planningitems blijven datumgebaseerd en worden alleen zichtbaar wanneer hun datum in de actieve week valt.
- Availability blijft correct gekoppeld aan `employeeId + date`.
- Weekwissel wist actieve context en voorkomt stale edit- of relocation-state.
- Conflicts worden voor de zichtbare week afgeleid.
- Resource favorites blijven bovenaan in de selector.
- `Materieel behouden` blijft werken na weeknavigatie.
- Weekenddagen zijn na correctie gewone planbare dagen.
- Headerzones houden weeknavigatie stabiel wanneer availability-controls verschijnen.

## Weekend-Correctie QA

| Punt | Resultaat |
| --- | --- |
| Huidige week toont maandag t/m zondag | Ja |
| Vorige week toont maandag t/m zondag | Ja |
| Volgende week toont maandag t/m zondag | Ja |
| `Vandaag` brengt terug naar huidige volledige week | Ja |
| Zaterdag is zichtbaar en planbaar | Ja |
| Zondag is zichtbaar en planbaar | Ja |
| Availability zetten/wissen werkt op zaterdag | Ja |
| Availability zetten/wissen werkt op zondag | Ja |
| Conflictvalidatie werkt op zaterdag | Ja |
| Conflictvalidatie werkt op zondag | Ja |
| Create/edit/delete werkt op weekenddagen | Ja |
| Relocation naar zaterdag/zondag werkt | Ja |
| Weekwissel wist selected/edit/relocation context | Ja |
| Sticky werknemerlabels blijven bruikbaar | Ja |
| Horizontale scroll/layout blijft acceptabel op laptopformaat | Ja |
| Matrix blijft compact genoeg en niet onleesbaar | Ja |

## Header Polish QA

| Punt | Resultaat |
| --- | --- |
| Weeknavigatie blijft stabiel zonder actieve cel | Ja |
| Weeknavigatie blijft stabiel met actieve cel | Ja |
| Weeknavigatie blijft stabiel na availability toggle | Ja |
| Availability-controls blijven bruikbaar | Ja |
| Conflictstatus blijft zichtbaar | Ja |
| Move-actie blijft bruikbaar | Ja |
| Header blijft acceptabel op laptopbreedte | Ja |
| 7-daagse matrix blijft intact | Ja |

## Bug en Fix

Tijdens QA bleek dat donderdag ontbrak in de werkweeklabels. Daardoor toonde de matrix vier dagen in plaats van maandag-vrijdag.

Beperkte fix:

- `src/lib/planning/week.ts`: `Do` toegevoegd aan `dayLabels`.

Na de fix:

- week toont opnieuw maandag t/m vrijdag;
- `npm run build` geslaagd;
- browser-QA opnieuw uitgevoerd en groen.

Later is dit verder gecorrigeerd naar volledige weekweergave maandag t/m zondag. Die correctie is browsermatig gevalideerd.

## Buildstatus

Geslaagd.

Uitgevoerd:

- `npm run build`;
- Next production build;
- TypeScript-validatie via build.

## Bugs

Bug gevonden tijdens QA en beperkt opgelost.

Open bugs na fix: nee.

## Resterend Risico

Er is nog geen persistence. Planningitems buiten de zichtbare week blijven alleen bestaan zolang de lokale sessie leeft.

Cross-week conflictsummary bestaat niet. Dit is bewust acceptabel voor Slice 1 omdat weeknavigatie alleen view/filter-context toevoegt.

W53 en weeknummer/jaarlabel zijn nog niet uitgewerkt.

## Advies

Sprint 24 Slice 1 en correcties afronden.
