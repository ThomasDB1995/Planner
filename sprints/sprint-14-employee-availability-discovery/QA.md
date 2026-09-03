# QA - Sprint 14 Employee Availability Discovery

## Status

Afgerond.

## Doel Van QA

Valideren dat Sprint 14 een lokale, visuele availability-laag toevoegt zonder planning technisch te blokkeren en zonder bestaande create/edit/delete/relocation flows te breken.

## Buildstatus

`npm run build` uitgevoerd bij T1405 closure.

Resultaat:

- build geslaagd;
- TypeScript-validatie geslaagd;
- Next.js static page generation geslaagd.

## Localhoststatus

Gecontroleerd op `http://localhost:3006`.

Resultaat:

- app rendert correct;
- Tailwind CSS wordt correct toegepast;
- browserconsole zonder actuele warnings of errors.

## Test Matrix

| Test | Verwacht resultaat | Status |
| --- | --- | --- |
| Build uitvoeren | Build slaagt zonder TypeScript errors | Geslaagd |
| Localhost openen | App rendert zonder console errors | Geslaagd |
| Cel selecteren | Actieve cel blijft zichtbaar en formulier prefill blijft werken | Geslaagd |
| Availability toggle op actieve cel | Actieve cel wordt lokaal niet beschikbaar | Geslaagd |
| Toggle opnieuw gebruiken | Cel wordt weer beschikbaar | Geslaagd |
| Unavailable celstijl | Cel wordt duidelijk grijs | Geslaagd |
| Indicator | `Niet beschikbaar` is zichtbaar maar subtiel | Geslaagd |
| Cards zichtbaar houden | Bestaande cards blijven zichtbaar in unavailable cel | Geslaagd |
| Create in unavailable cel | Planningitem kan nog steeds worden aangemaakt | Geslaagd |
| Edit in unavailable cel | Taak/project en optioneel materieel blijven direct lokaal wijzigbaar | Geslaagd |
| Delete in unavailable cel | Card kan verwijderd worden | Geslaagd |
| Relocation naar unavailable cel | Card kan naar unavailable cel worden verplaatst | Geslaagd |
| Relocation uit unavailable cel | Card kan uit unavailable cel worden verplaatst | Geslaagd |
| Conflictbadge | Dubbel materieel blijft zichtbaar | Geslaagd |
| Scopecontrole | Geen out-of-scope features toegevoegd | Geslaagd |

## T1404 Regressieresultaat

T1404 is uitgevoerd als regressievalidatie na T1401 t/m T1403.

Build:

- `npm run build` geslaagd;
- TypeScript-validatie geslaagd;
- Next.js static generation geslaagd.

Localhost:

- gecontroleerd op `http://localhost:3005`;
- app rendert correct;
- browserconsole zonder actuele warnings of errors.

Gevalideerd:

- cel markeren als niet beschikbaar;
- cel terug beschikbaar maken;
- create op beschikbare cel;
- create op unavailable cel;
- edit op beschikbare cel;
- edit op unavailable cel;
- delete op unavailable cel;
- relocation naar unavailable cel;
- relocation vanuit unavailable cel;
- selected cell + unavailable state;
- destination cell + unavailable state;
- conflictbadge op unavailable cel;
- dense cell met meerdere cards + unavailable indicator;
- togglepositie naast relocation.

Resultaat:

- alle T1404-checks geslaagd;
- planning blijft toegestaan;
- unavailable blijft een visuele guardrail, geen blokkering;
- er zijn geen nieuwe conflictregels of validation rules toegevoegd.

UX-observaties:

- de grijze cel is duidelijk en logisch als guardrail;
- `Niet beschikbaar` neemt in een dense cel beperkte extra hoogte in en blijft acceptabel;
- bij zeer volle cellen moet indicatorruimte later opnieuw beoordeeld worden;
- de bestaande bezette-doelcelambiguiteit blijft bestaan wanneer de gebruiker op een card klikt in plaats van lege celruimte;
- toggle naast relocation is leesbaar, maar vraagt in T1405 nog een closurebeoordeling op rust en prioriteit.

## Regressieflows

Minimaal opnieuw controleren:

- snelle invoerflow: cel klikken, taak/project typen, toevoegen;
- planning zonder materieel;
- planning met materieel;
- materieel kiezen, wijzigen en wissen;
- card selecteren en edit mode openen;
- delete;
- relocation via geselecteerde card en actieve doelcel;
- conflictbadge bij dubbel materieel;
- sticky form en sticky werknemerlabels;
- compacte matrixscanbaarheid.

Resultaat: geslaagd.

## T1405 Closure Resultaat

T1405 is uitgevoerd als QA, scopecontrole en closure.

Build:

- `npm run build` geslaagd;
- TypeScript-validatie geslaagd;
- Next.js static generation geslaagd.

Localhost:

- gecontroleerd op `http://localhost:3006`;
- app rendert correct;
- browserconsole zonder actuele warnings of errors.

Closure bevestigt:

- availability toggle werkt op de actieve cel;
- unavailable celstijl is duidelijk grijs;
- `Niet beschikbaar` blijft subtiel zichtbaar;
- create, edit, delete en relocation blijven werken op unavailable cellen;
- selected, destination en unavailable states blijven samen leesbaar;
- conflictbadges blijven zichtbaar op unavailable cellen;
- dense cell met meerdere cards en unavailable indicator blijft acceptabel;
- togglepositie naast relocation is functioneel leesbaar;
- planning blijft toegestaan.

## Scopecontrole

Niet toevoegen:

- HR/workforce module;
- ziekte- of verlofworkflow;
- permissions;
- persistence/backend/API;
- conflictregels voor availability;
- harde blokkering bij planning;
- realtime sync;
- drag/drop;
- packages/frameworks;
- grote redesigns.

## Verwachte QA-Conclusie

Sprint 14 is geslaagd wanneer unavailable cellen direct scanbaar zijn, planning technisch mogelijk blijft en bestaande planninginteracties niet regressief aanvoelen.

De grijze cel moet een visuele guardrail zijn, geen systeemslot.

## QA-Conclusie

Sprint 14 voldoet aan de closurecriteria.

Unavailable is bevestigd als visuele guardrail, geen blokkering. Availability zit op `employeeId + date` en niet in `PlanningItem`. Planning blijft technisch toegestaan.

De indicatorruimte bij volle cellen blijft een open stresscheck. De bestaande bezette-doelcelambiguiteit blijft een open UX-punt, maar is geen availability-regressie.

## Browserautomation Notitie

De bestaande Browser Use virtual-clipboard beperking kan opnieuw invloed hebben op typing-heavy tests. Wanneer dat gebeurt, mag de QA-flow gebruikmaken van eenvoudige keypress-events of een korte handmatige nacontrole voor tekstinvoer.

## Open UX-Punten Voor Closure

Tijdens QA expliciet beoordelen:

- is de grijze cel duidelijk genoeg zonder te dominant te worden;
- blijft tekst op cards leesbaar op de grijze achtergrond;
- blijft selected/destination styling herkenbaar wanneer een cel ook unavailable is;
- is de toggle vindbaar zonder extra workflowlaag;
- voelt planning in unavailable cel toegestaan maar duidelijk gewaarschuwd.
