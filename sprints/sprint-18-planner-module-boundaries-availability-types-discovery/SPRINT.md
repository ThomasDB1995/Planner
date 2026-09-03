# Sprint 18 - Planner Module Boundaries & Availability Types Discovery

## Sprintstatus

Voorbereid voor review.

T1801 t/m T1806 zijn documentair uitgewerkt.

## Sprintdoel

Planner-modulegrenzen en availability-types scherp afbakenen voordat verdere implementatie start.

Sprint 18 is bewust discovery-only. Er wordt geen code gewijzigd, geen build uitgevoerd en geen implementatie gestart.

## Context

Sprint 17 is afgerond:

- multi-materieel werkt als prototype;
- `PlanningItem.resourceId` blijft compatibel als primary mirror;
- `PlanningItem.resourceIds?: string[]` is additief;
- resource reads en writes lopen via de helperlaag;
- conflictvalidatie loopt per `date + resourceId`;
- availability bleef onaangeraakt en staat los van conflictvalidatie.

Na Sprint 17 is strategisch vastgelegd dat de planner een aparte module blijft binnen een groter Perceel-platform.

De planner mag operationele planning ondersteunen, maar mag niet uitgroeien tot:

- HR-module;
- werkbonmodule;
- nacalculatieflow;
- CRM;
- materieelbeheeromgeving;
- rechten- of payrollsysteem.

## Belangrijk Ontwerpbesluit

Sprint 18 wijzigt geen applicatiegedrag.

Availability-types en personeelstypes worden alleen documentair onderzocht als lichte plannercontext.

Availability blijft conceptueel gekoppeld aan:

- `employeeId`;
- `date`;
- optioneel later een type.

Availability wordt niet gekoppeld aan `PlanningItem`.

Personeelstype blijft metadata op werknemer-niveau voor scanbaarheid, grouping of filtering. Het is geen rechten-, payroll-, contract- of HR-logica.

## In Scope

- modulegrenzen van de planner documenteren;
- bepalen welke verantwoordelijkheden bij de planner horen;
- expliciet vastleggen wat buiten de planner valt;
- availability-types als UX-context onderzoeken;
- visuele hierarchie van availability-types onderzoeken;
- density-impact in volle matrixcellen beschrijven;
- personeelstype metadata documenteren;
- bureau- versus terreinplanning scenario's beschrijven;
- Go/No-Go bepalen voor een latere kleine implementatieslice.

## Buiten Scope

- codewijzigingen;
- build uitvoeren;
- localhost-QA;
- availability implementeren;
- availability type aan code toevoegen;
- grouping/filtering implementeren;
- HR-logica;
- verlofaanvragen;
- approvals;
- saldo's;
- payroll;
- contractbeheer;
- rechtenmodel;
- backend/persistence/API;
- werkbonnen bouwen;
- nacalculatieflow bouwen;
- CRM/projectbeheerflow bouwen;
- materieelbeheer CRUD/import;
- drag/drop;
- packages/frameworks;
- realtime sync;
- grote planner-redesign.

## Ticketvolgorde

1. T1801 - Planner Module Boundary Map
2. T1802 - Availability Types UX Discovery
3. T1803 - Availability Visual Hierarchy & Density
4. T1804 - Personeelstype Metadata Discovery
5. T1805 - Bureau Versus Terrein Planning Scenarios
6. T1806 - QA & Go/No-Go

## Modulegrens Samenvatting

De planner is verantwoordelijk voor:

- weekplanning per werknemer en dag;
- planningitems aanmaken, scannen, bewerken, verwijderen en verplaatsen;
- materieel koppelen aan planningitems;
- conflictwaarschuwingen tonen voor planningcontext;
- lichte availability-context tonen per werknemer/dag;
- operationele metadata gebruiken om de matrix scanbaarder te maken.

De planner is niet verantwoordelijk voor:

- verlofaanvragen of goedkeuringen;
- HR-dossiers;
- payroll;
- contractbeheer;
- rechtenmodel;
- werkbonuitvoering;
- nacalculatie;
- CRM of klantenbeheer;
- materieelbeheer CRUD/import;
- voorraad- of asset lifecycle beheer.

Integraties mogen later data delen met andere modules, maar mogen hun workflow niet in de planner trekken.

## Availability Types

Te onderzoeken planner availability-types:

- Niet beschikbaar;
- Recup;
- Jaarlijkse vakantie;
- Weerverlet;
- Ziekte.

Guardrails:

- availability blijft `employeeId + date`;
- availability hoort niet bij `PlanningItem`;
- availability is context of waarschuwing, geen workflow;
- geen aanvraag-, goedkeurings- of saldologica;
- ziekte is alleen planningcontext, geen medisch of HR-dossier;
- bestaande planningitems blijven zichtbaar.

## Visual Hierarchy Richting

Te onderzoeken:

- kleur als celbasis of subtiele statuslaag;
- badge of korte labeltekst;
- tooltip/title voor extra type-uitleg;
- impact op bestaande conflictbadges;
- impact op cellen met meerdere planningcards;
- leesbaarheid naast selected cell en destination cell;
- prioriteit tussen tasknaam, materieel, conflict en availability.

Density blijft leidend: availability mag de planner helpen scannen, maar mag planningcards niet verdringen.

## Personeelstype Metadata

Voorlopige waarden:

- vaste werknemer terrein;
- vaste werknemer bureau;
- zelfstandige;
- flexi.

Gebruik:

- grouping;
- filtering;
- scanbaarheid;
- matrixorganisatie;
- density-keuzes.

Niet gebruiken voor:

- rechten;
- payroll;
- HR-processen;
- contractlogica;
- personeelsdossiers;
- aparte personeelsbeheerworkflow.

## Bureau Versus Terrein Planning

Bureauplanning heeft mogelijk andere scanbehoeften:

- meer afspraken;
- vaker tijdstippen;
- hogere density per dag;
- minder materieelcontext;
- mogelijk meer korte blokken.

Terreinplanning blijft vaker:

- daggericht;
- materieelgericht;
- ploeg- en werknemergericht;
- conflictgevoelig door machines, voertuigen en werktuigen.

Sprint 18 bouwt geen aparte bureauplanner. De vraag is eerst of de bestaande matrix met metadata en lichte visuele hierarchie voldoende richting geeft.

## Acceptance Criteria

Sprint 18 is klaar wanneer:

- `SPRINT.md` is aangemaakt;
- `QA.md` is aangemaakt;
- tickets T1801 t.e.m. T1806 zijn aangemaakt;
- modulegrenzen zijn gedocumenteerd;
- availability-types zijn beschreven als plannercontext;
- visual hierarchy en density-risico's zijn beschreven;
- personeelstype metadata is afgebakend;
- bureau- versus terreinplanning scenario's zijn beschreven;
- Go/No-Go voor latere implementatie is vastgelegd;
- `PROJECT_STATE.md` is bijgewerkt;
- `docs/Planning_UX_Domain_Findings.md` is bijgewerkt;
- `context/DOMAIN_MODEL.md` is waar relevant bijgewerkt;
- geen code is gewijzigd;
- geen build is uitgevoerd;
- geen implementatie is gestart.

## Discovery-Conclusie

Availability-types en personeelstype metadata zijn nuttig voor planning, maar alleen zolang ze operationele scanbaarheid verbeteren.

De planner moet niet het systeem worden waar HR, approvals, werkbonnen, nacalculatie, CRM of materieelbeheer in samenkomen als workflows.

De veilige vervolgrichting is:

1. eerst modulegrenzen expliciet vastleggen;
2. availability-types als lichte celcontext ontwerpen;
3. density en matrixscanbaarheid toetsen;
4. personeelstypes alleen als metadata behandelen;
5. pas daarna een kleine implementatieslice overwegen.

## Go/No-Go Voor Latere Implementatie

Advies: voorzichtig Go voor een latere kleine implementatieslice, maar alleen na review.

Mogelijke veilige implementatieslice na Sprint 18:

- availability-type als lokale UI-state op `employeeId + date`;
- compacte typeweergave in de cel;
- geen persistence;
- geen HR-workflow;
- geen conflictregelwijziging;
- geen grouping/filtering tegelijk implementeren.

Geen Go voor:

- HR-module;
- verlofaanvragen;
- approvals;
- payroll;
- rechtenmodel;
- backend/persistence/API;
- werkbonnen of nacalculatie;
- employee grouping en availability-types tegelijk bouwen;
- bureauplanner als aparte view;
- drag/drop;
- packages/frameworks.
