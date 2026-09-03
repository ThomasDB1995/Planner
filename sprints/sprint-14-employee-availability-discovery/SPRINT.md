# Sprint 14 - Employee Availability Discovery

## Sprintstatus

Afgerond.

T1401 t/m T1405 zijn uitgevoerd.

## Sprintdoel

Per werknemer per dag lokaal kunnen markeren als niet beschikbaar, met een duidelijke grijze matrixcel als visuele guardrail voor planners.

De planning blijft technisch mogelijk. Onbeschikbaarheid is in deze sprint geen harde blokkering, geen conflictregel en geen personeelsbeheerflow.

## Context

Sprint 13 is afgerond:

- matrixplanning werkt met werknemers als rijen en dagen als kolommen;
- create, edit, delete en relocation werken lokaal;
- het formulier is sticky;
- werknemerlabels zijn sticky links;
- de matrix is compacter gemaakt;
- materieel is optioneel;
- de materieelselector klapt automatisch dicht na keuze;
- bestaande conflictbadges blijven gericht op dubbel materieel;
- drag/drop is nog niet gerechtvaardigd.

Employee Availability is een volgende kleine discovery-slice omdat planners snel moeten zien wanneer een werknemer op een dag niet beschikbaar is. Het doel is scanbaarheid en operationele duidelijkheid, niet administratieve afwezigheidsregistratie.

## Belangrijk Ontwerpbesluit

Availability hoort voorlopig niet in `PlanningItem`.

Availability hoort bij de matrixcel:

- `employeeId`;
- `date`.

Reden:

- onbeschikbaarheid beschrijft de werknemer/dag-combinatie, niet een taak;
- bestaande planningcards moeten zichtbaar kunnen blijven in dezelfde cel;
- planning blijft toegestaan, dus er is geen mutatie nodig aan bestaande `PlanningItem` records;
- de slice blijft klein, lokaal en visueel.

## In Scope

- lokale availability state;
- datastructuur op basis van `employeeId + date`;
- toggle voor de actieve cel;
- grijze unavailable celstijl;
- subtiele indicator `Niet beschikbaar`;
- bestaande cards blijven zichtbaar in unavailable cellen;
- create blijft werken;
- edit blijft werken;
- delete blijft werken;
- relocation blijft werken;
- planning blijft technisch toegestaan;
- geen harde blokkering.

## Buiten Scope

- HR/workforce module;
- ziekte- of verlofworkflow;
- afwezigheidsredenen;
- permissions;
- persistence/backend/API;
- conflictregels;
- harde validatie;
- realtime sync;
- drag/drop;
- packages/frameworks;
- grote redesigns;
- auditlog of historiek;
- rapportering;
- notificaties;
- automatische planning of optimalisatie.

## Ticketvolgorde

1. T1401 - Availability state & contract discovery
2. T1402 - Availability toggle voor actieve cel
3. T1403 - Unavailable cell visual guardrail
4. T1404 - Regressie op planningflows
5. T1405 - QA, scopecontrole en closure

## Verwachte Implementatierichting

De kleinste veilige implementatierichting is:

- introduceer een lokaal availability type of helper op basis van `employeeId` en `date`;
- bewaar availability state in de lokale page state naast `planningItems`, `selectedCell`, `selectedCard` en `activeDestinationCell`;
- geef availability door naar de matrix/rij/celcomponenten;
- voeg een compacte toggle toe voor de actieve cel, waarschijnlijk in of nabij de boardheader of actieve-celcontext;
- laat `PlanningCell` zelf bepalen of de cel unavailable is;
- toon unavailable cellen grijs met een subtiele indicator;
- laat cards in de cel zichtbaar en bedienbaar blijven;
- blokkeer submit, edit, delete of relocation niet.

## Verwachte Bestanden

Waarschijnlijke codebestanden bij latere uitvoering:

- `src/app/page.tsx`
- `src/components/planning/WeekPlanningBoard.tsx`
- `src/components/planning/EmployeeRow.tsx`
- `src/components/planning/PlanningCell.tsx`
- `src/components/planning/matrix.ts`
- mogelijk `src/types/planning.ts`

Documentatiebestanden bij closure:

- `sprints/sprint-14-employee-availability-discovery/QA.md`
- `sprints/sprint-14-employee-availability-discovery/SPRINT.md`
- `sprints/sprint-14-employee-availability-discovery/tickets/T1401.md`
- `sprints/sprint-14-employee-availability-discovery/tickets/T1402.md`
- `sprints/sprint-14-employee-availability-discovery/tickets/T1403.md`
- `sprints/sprint-14-employee-availability-discovery/tickets/T1404.md`
- `sprints/sprint-14-employee-availability-discovery/tickets/T1405.md`
- `PROJECT_STATE.md`
- mogelijk `docs/Planning_UX_Domain_Findings.md`

## Acceptance Criteria

Sprint 14 is klaar wanneer:

- een werknemer/dag-cel lokaal als niet beschikbaar kan worden gemarkeerd;
- dezelfde cel opnieuw beschikbaar gemaakt kan worden;
- unavailable cellen duidelijk grijs zijn;
- de indicator `Niet beschikbaar` zichtbaar maar subtiel is;
- bestaande planningcards in unavailable cellen zichtbaar blijven;
- planning technisch mogelijk blijft in unavailable cellen;
- create, edit, delete en relocation blijven werken;
- availability niet in `PlanningItem` is opgenomen;
- er geen conflictregel of harde blokkering is toegevoegd;
- er geen backend, persistence, permissions, drag/drop, package of grote redesign is toegevoegd;
- QA en sprintclosure zijn bijgewerkt.

## UX-Risico's

- De grijze cel kan te hard aanvoelen als absolute blokkering terwijl planning nog toegestaan blijft.
- De indicator `Niet beschikbaar` kan te veel verticale ruimte innemen in compacte cellen.
- Selected cell, destination cell en unavailable cell kunnen visueel met elkaar concurreren.
- Een unavailable cel met meerdere cards kan druk worden als de indicator niet compact genoeg is.
- De toggle kan verwarrend zijn als selected card en actieve cel tegelijk zichtbaar zijn.

## Regressierisico's

- Cell selection/prefill kan breken wanneer availability-state wordt toegevoegd.
- Relocation destination styling kan botsen met unavailable styling.
- Cards in unavailable cellen kunnen slechter leesbaar worden op grijze achtergrond.
- Delete- en card-click events kunnen onbedoeld cell toggles triggeren als interacties te dicht bij elkaar komen.
- Conflictbadges kunnen visueel wegvallen in unavailable cellen.

## Localhost-Validatie

Bij uitvoering moet minimaal worden gevalideerd:

- cel selecteren en unavailable toggelen;
- unavailable cel weer beschikbaar maken;
- item aanmaken in available cel;
- item aanmaken in unavailable cel;
- bestaande card selecteren in unavailable cel;
- card editten in unavailable cel;
- card verwijderen uit unavailable cel;
- card verplaatsen naar unavailable cel;
- card verplaatsen uit unavailable cel;
- conflictbadge blijft zichtbaar;
- browserconsole zonder actuele errors.

## Discovery-Only

Deze onderwerpen blijven discovery-only:

- harde blokkering bij onbeschikbaarheid;
- waarschuwing of conflictmelding voor onbeschikbare werknemer;
- afwezigheidsredenen;
- ziekte/verlof;
- beschikbaarheid per dagdeel of uur;
- permissions;
- persistence/backend/API;
- synchronisatie;
- auditlog;
- personeelsbeheer;
- drag/drop in combinatie met availability.

## Discovery-Conclusie Vooraf

Sprint 14 moet bewijzen of een simpele visuele availability-laag planners sneller laat scannen zonder de snelle matrixplanning te vertragen.

De slice is bewust klein: lokaal, celniveau, visueel, niet-blokkerend.

## Ticketresultaat

### T1401 - Availability state & contract discovery

Uitgevoerd.

- minimale lokale availability state toegevoegd;
- availability wordt vastgelegd op basis van `employeeId + date`;
- availability hoort bij de matrixcel, niet bij `PlanningItem`;
- geen backendmodel, persistence, conflictregel of harde validatie toegevoegd.

### T1402 - Availability toggle voor actieve cel

Uitgevoerd.

- compacte toggle toegevoegd voor de actieve cel;
- knoptekst wisselt tussen `Niet beschikbaar markeren` en `Beschikbaar maken`;
- toggle werkt op `selectedCell`;
- selected card, edit mode en relocation blijven functioneel behouden;
- planning blijft toegestaan.

### T1403 - Unavailable cell visual guardrail

Uitgevoerd.

- unavailable cellen krijgen een duidelijke grijze basisstijl;
- indicator `Niet beschikbaar` wordt subtiel in de cel getoond;
- bestaande cards blijven zichtbaar;
- selected cell, destination cell en unavailable state blijven samen leesbaar;
- conflictbadges blijven zichtbaar op cards in unavailable cellen.

### T1404 - Regressie op planningflows

Uitgevoerd.

- create op beschikbare en unavailable cellen gevalideerd;
- edit op beschikbare en unavailable cellen gevalideerd;
- delete op unavailable cellen gevalideerd;
- relocation naar en vanuit unavailable cellen gevalideerd;
- conflictbadge op unavailable cel gevalideerd;
- dense cell met meerdere cards en unavailable indicator gevalideerd;
- togglepositie naast relocation beoordeeld.

### T1405 - QA, scopecontrole en closure

Uitgevoerd.

- `npm run build` geslaagd;
- localhost gecontroleerd op `http://localhost:3006`;
- browserconsole zonder actuele warnings of errors;
- QA en projectdocumentatie bijgewerkt;
- scopecontrole uitgevoerd.

## Sprintresultaat

Sprint 14 heeft een lokale, visuele employee availability-laag toegevoegd op matrixcelniveau.

Opgeleverd:

- employee availability state op basis van `employeeId + date`;
- compacte toggle voor de actieve cel;
- grijze unavailable celstijl;
- subtiele indicator `Niet beschikbaar`;
- planningcards blijven zichtbaar in unavailable cellen;
- create, edit, delete en relocation blijven werken;
- conflictbadges blijven zichtbaar;
- planning blijft technisch toegestaan.

## UX-Conclusie

De unavailable cel werkt logisch als visuele guardrail. De grijze achtergrond geeft planners snel signaal zonder als systeemslot te voelen.

De indicator `Niet beschikbaar` is compact genoeg voor de huidige dense-cell validatie. Bij zeer volle cellen blijft indicatorruimte wel een open stresscheck.

De toggle naast relocation is functioneel leesbaar. Wanneer een card geselecteerd is en een actieve doelcel bestaat, staan beide acties naast elkaar zonder nieuwe interaction mode.

## Closure-Conclusie

Sprint 14 is afgerond als kleine Employee Availability discovery-slice.

Availability blijft lokaal, visueel en niet-blokkerend. Er is geen HR/workforce module, geen conflictregel, geen backend/persistence/API, geen drag/drop en geen redesign toegevoegd.

## Open UX-Punten

- indicatorruimte bij zeer volle unavailable cellen blijft een latere stresscheck;
- bezette-doelcelambiguiteit blijft bestaan wanneer de gebruiker op een bestaande card klikt in plaats van lege celruimte;
- die bezette-doelcelambiguiteit is geen availability-regressie en blijft een open UX-punt uit eerdere relocation discovery;
- harde blokkering of waarschuwingen voor onbeschikbaarheid blijven discovery-only.
