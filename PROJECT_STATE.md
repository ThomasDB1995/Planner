# PROJECT_STATE.md

## Projectstatus

Status: Final Planner Polish voor praktijkgebruik afgerond

---

## Current Sprint

Geen actieve implementatiesprint. Sprint 32 is afgerond en de zichtbare WorkCard structuurdemo is uit de dagelijkse planner verwijderd. WorkCard types, documentatie en backlog blijven behouden. Planner focust opnieuw op planning, zonder editor, werkbon, nacalculatie, backend/API of persistence.

---

## Active Ticket

Geen actief implementatieticket. Sprint 32 T3201, T3202 en T3203 zijn afgerond en Sprint 32 wordt niet verder uitgebreid zonder nieuwe opdracht.

---

## Completed

- Sprint 32 Work Card Read-Only Preview afgerond
- `WorkCardPreview` toegevoegd als compacte read-only werkkaart voor geselecteerde werknemer/dag
- Werkkaart toont werknemer, datum, unieke resources en planningitems/opdrachten
- Werkkaart gebruikt alleen bestaande planningdata uit selected cell, visible planningitems en resources
- Geen nieuw datamodel, editor, werkbon, nacalculatie, uitvoeringregistratie, backend/API of persistence toegevoegd
- Resources worden uniek gegroepeerd voor de geselecteerde werknemer/dag
- Dubbele resources worden niet dubbel getoond
- Lege dag toont nette lege state voor materieel en opdrachten
- Werkkaart blijft plannercontext en geen werkbon: geen uren, handtekening, uitvoering, print/PDF of export
- Matrix blijft leidend; werkkaart staat compact boven de matrix
- Sprint 32 QA volledig groen: celselectie, werknemer, datum, lege state, opdrachten, resourcegroepering, create/edit/delete, relocation, weeknavigatie/weekjump, update bij andere cel en reset bij weekwissel gevalideerd
- Bugs bij Sprint 32 Slice 1 QA: nee
- Resterend aandachtspunt: later evalueren of de werkkaart inklapbaar moet worden als de extra verticale ruimte in praktijk stoort
- Sprint 32 Slice 2B Lightweight WorkCard Types Discovery afgerond
- `WorkCard`, `WorkCardProject` en `WorkCardTerrain` toegevoegd als toekomstige typebasis
- WorkCard-hiërarchie vastgelegd: dagniveau, projectniveau en terreinniveau
- Dagniveau bevat `employeeId`, `date`, optionele `resourceIds`, optionele `dayNote`, projecten en optionele `sourcePlanningItemIds`
- Projectniveau bevat project/opdrachtnaam, volgorde, optionele projectnotitie en terreinen
- Terreinniveau bevat terrein/deellocatie, werkinstructie, materiaaltekst, werkwijze en optionele opmerking
- Materialen blijven vrije tekst op terreinniveau via `materialText`; geen artikelcatalogus of materialenmodule toegevoegd
- `src/lib/planning/work-card.ts` toegevoegd met read-only/conceptuele helpers en scope-notes
- `PlanningItem` blijft leidend en het contract is intact
- Geen parsing uit `taskName`, geen migratie, geen editor, geen persistence, geen werkbonvelden en geen nacalculatievelden toegevoegd
- Sprint 32 Slice 2B QA groen: build, WorkCardPreview, create/edit/delete, relocation, weekjump en scopecontrole gevalideerd
- Bugs bij Sprint 32 Slice 2B QA: nee
- Sprint 32 Slice 3 Work Card Structured Demo afgerond
- `WorkCardPreview` uitgebreid met een compacte `Structuurdemo`
- Live secties `Materieel vandaag` en `Opdrachten vandaag` blijven zichtbaar op basis van bestaande planningdata
- Structuurdemo toont demo/mock data voor dagmaterieel, projecten, terreinen en instructie/materiaal/werkwijze
- Demo-dagmaterieel toont `0517-TRL-` en `0392-TAL-`
- Demo-projecten tonen `FC Oppuurs` en `Daltons`
- Demo-terreinen tonen `A-terrein` en `B-terrein`
- Demo-instructies tonen compacte regels zoals `Doorzaaien - 200 kg graszaad - 2 richtingen`
- Hierarchie dag -> project -> terrein is visueel gevalideerd
- Werkkaart blijft read-only en voelt niet als werkbon of nacalculatie
- Geen editor, save-flow, persistence, parsing uit `taskName`, werkbonvelden, nacalculatievelden of materialenmodule toegevoegd
- Sprint 32 Slice 3 QA groen: read-only, live secties, demoherkenbaarheid, hierarchie, compactheid, create/edit/delete, relocation en weekjump gevalideerd
- Bugs bij Sprint 32 Slice 3 QA: nee
- Final Planner Polish voor praktijkgebruik uitgevoerd
- Zichtbare WorkCard `Structuurdemo` verwijderd uit de dagelijkse planner
- WorkCard types blijven bestaan
- WorkCard documentatie en backlog blijven behouden
- Werkkaartpreview toont opnieuw alleen live planningdata: werknemer, datum, materieel vandaag en opdrachten vandaag
- Planner focust opnieuw op planning en matrixgebruik
- Werknemernaamkolom volgt nu dezelfde alternerende rijtint als de rest van de rij
- Sticky werknemerkolom, naamgewicht, rijhoogte, gridlijnen, planninglogica, resourcecontract, conflicts en availability blijven behouden
- Sprint 32 documentatie afgerond
- Sprint 31 Real Resource Catalog afgerond
- Volledige echte resourcecatalogus met 239 resources geintegreerd
- Resource-identiteit vastgelegd als volledig nummer plus groep plus beschrijving, bijvoorbeeld `0517-TRL- Vestrum 120`
- Resource `id` wordt stabiel afgeleid uit volledig genormaliseerd nummer
- Resource `number` behoudt het volledige operationele nummer
- Resource `group` wordt afgeleid uit volledig nummer
- Resource `brand` blijft zoekmetadata en wordt niet dominant op planningcards
- Resource `type` bewaart raw `Soort` als detail/searchmetadata
- Resource `category` blijft grove plannercategorie
- Search werkt op nummer, groep, beschrijving/naam en merk
- Selector blijft volledige resource-info tonen
- Planningcards zijn nummergericht: 1 resource toont alleen volledig nummer, met volledige info in tooltip/title
- Multi-resource planningcards blijven compact met nummerchips en volledige info in tooltip/title
- Favorites, multi-resource selectie, conflicts, create/edit/delete, relocation en weekjump blijven werken
- Kleine rooster-polish afgerond: dagheaders gecentreerd, subtiele row shading, weekendcontext en duidelijkere categoriebalken
- Sprint 31 QA groen; bugs: nee
- Sprint 31 documentatie afgerond
- `Resource.group?: string` toegevoegd als optionele mappingvoorbereiding
- Volledig resource `number` blijft behouden en wordt niet gereduceerd naar numerieke prefix
- `group` wordt afgeleid uit volledig nummer
- `id` wordt stabiel afgeleid uit volledig genormaliseerd nummer
- `brand` blijft zoekmetadata en wordt niet dominant op planningcards
- `type` bewaart raw `Soort` als detail/searchmetadata
- `category` blijft grove plannercategorie; `Soort` is niet betrouwbaar genoeg als enige category-bron
- Resource search neemt `group` mee
- Geen catalogusimport, geen seed rewrite, geen 239 resources toegevoegd en geen wijziging aan `resourceId/resourceIds`
- Kleine rooster-polish uitgevoerd: dagheaders gecentreerd en subtiele alternerende row shading toegevoegd
- Availability, selected cell, relocation en planningcards blijven dominant boven row shading
- Sprint 31 QA groen via helper/build/smoke; volledige interactieve browserautomatie beperkt omdat Playwright-runtime `playwright-core` mist
- Sprint 31 documentatie afgerond
- Sprint 30 Weekgebonden Werknemers afgerond
- Matrix toont kernploeg plus werknemers tijdelijk toegevoegd aan actieve ISO-week
- Dagelijkse UI gebruikt `+ Aan deze week toevoegen` en `Uit deze week`
- Oude dagelijkse UI-termen `Niet standaard` en `Standaard maken` verwijderd
- Tijdelijke werknemers verschijnen alleen in de actieve week en blijven in-memory
- Planning en availability blijven datumgebaseerd en komen terug wanneer een tijdelijke werknemer opnieuw aan die week wordt toegevoegd
- Matrixcategorievolgorde vastgelegd: `Werknemer`, `Zelfstandige`, `Flexi-job`, `Vakantiejob`, `Werknemer, bureau`
- Weektoevoeglijst sorteert apart: `Flexi-job`, `Vakantiejob`, `Zelfstandige`, binnen categorie alfabetisch op displaynaam
- Jan Van Ranst en Eric Maes gecorrigeerd naar `Flexi-job`
- Niet-kernploegnamen met omgekeerde volgorde gecorrigeerd naar `Voornaam Achternaam`
- Sprint 30 QA groen: weekgebonden werknemers, categorievolgorde, weektoevoeglijst, naamcorrecties en build gevalideerd
- Sprint 30 documentatie afgerond
- Sprint 29 Week Navigation & Direct Week Jump afgerond
- ISO-weekhelpers toegevoegd voor weeknummer, weekjaar, weekaantal per jaar, weekstartdatum en datumrange
- Directe weekjump toegevoegd met `Week`, `Jaar` en `Ga`
- Week 53-validatie toegevoegd op basis van ISO-weken per jaar
- Weeknavigatie herwerkt naar primaire `Week XX` met pijlen, secundaire datumrange en utility-regel met `Vandaag`
- Week blijft view/filter-context; planningitems blijven datumgebaseerd
- Weekjump en weekwissel wissen selected cell, selected card/edit en relocation source/destination
- Sprint 29 QA volledig groen: weekjump, vandaag, vorige/volgende week, foutmeldingen, compactheid en matrixrust gevalideerd
- Sprint 29 documentatie afgerond
- Projectmap gegenereerd
- Basisdocumentatie gegenereerd
- Intake opgeslagen als JSON
- Minimale Next.js app foundation
- Werknemer seeddata
- Machine seeddata
- Planningitem formulier
- Planningsoverzicht tabel
- Conflictvalidatie voor dubbele machineboeking
- Defecte machine waarschuwing
- Lokale state/mockdata slice
- Weekplanning board
- Werknemers als kolommen
- Werkdagen en datums in board
- Compacte planningcards
- Status `uitgevoerd`
- Statuskleurmapping
- Conflictindicatoren op planningcards
- Compacte invoerstrip
- Resource datamodel refinement
- Uitgebreide resource seeddata
- Resource search helper
- Resource filter helper
- Compacte ResourceSelector
- ResourceSelector integratie in planningformulier
- Resource contract alignment
- `Machine` hernoemd naar `Resource`
- `machineId` hernoemd naar `resourceId`
- `machines` hernoemd naar `resources`
- Resource-brede conflicttypes
- 200+ resource scanability check zonder productdatawijziging
- Cell-based planning cell selection
- Actieve celcontext zichtbaar in planningformulier
- Prefill van datum en werknemer vanuit geselecteerde planningcel
- Sprint 05 QA en discovery closure
- Sprint 06 weekmatrix orientation
- Werknemers verticaal als rijen
- Dagen/data horizontaal als kolommen
- PlanningCell component als herbruikbare matrixcel
- EmployeeRow component voor werknemersrijen
- Sprint 06 QA en closure
- Sprint 07 planningcard interaction discovery voorbereid
- Sprint 07 T701 card selection/focus state
- Sprint 07 T702 compacte PlanningCard focus UI
- Sprint 07 T703 lokale card delete
- Sprint 07 T704 relocation discovery note
- Sprint 07 T705 QA en closure
- Sprint 08 relocation discovery voorbereid voor review
- Sprint 08 T801 actieve doelcel discovery zonder move
- Sprint 08 T802 expliciete move-actie `Verplaats naar actieve cel`
- Sprint 08 T803 relocation UX guardrails en regressievalidatie
- Sprint 08 T804 QA, scopecontrole en closure
- Sprint 09 planning UX simplification & polish
- Resource optioneel bij planningitem aanmaken
- Conflictvalidatie slaat planningitems zonder resource over
- Statusselectie verwijderd uit hoofdformulier
- Statusbadges verwijderd uit planningcards
- Defectstatus gedeprioriteerd in hoofdplanningflow
- Autofocus taak/project na celselectie
- Lichte planningcard cleanup voor scanbaarheid
- Sprint 09 T906 QA en closure
- Sprint 10 Planning Card Editing & Quick Adjustments voorbereid voor review
- Sprint 10 ticketset T1001 t/m T1004 voorbereid
- Sprint 10 QA-startdocument voorbereid
- Sprint 10 T1001 edit-flow checkpoint uitgevoerd
- Minimale `editingPlanningItemId` state toegevoegd
- Geselecteerde planningcard kan edit mode openen in bestaand `PlanningForm`
- `PlanningForm` onderscheidt create mode en edit mode
- Edit mode toont bestaande cardwaarden zonder save/update-logica
- Sprint 10 T1002 directe lokale editupdate uitgevoerd
- Taak/project in edit mode wijzigt direct de bestaande card
- Resource kiezen/wissen in edit mode wijzigt direct de bestaande card
- Datum en werknemer zijn in edit mode niet direct bewerkbaar
- Sprint 10 T1003 regressie en guardrails uitgevoerd
- Edit mode naar create mode via celselectie wist taak/resource voor nieuwe invoer
- Directe edit, conflictvalidatie, delete, relocation en create na edit gevalideerd
- Sprint 10 T1004 QA, scopecontrole en closure uitgevoerd
- Sprint 10 afgerond
- Sprint 11 Planning Ergonomie & Matrix Density Discovery voorbereid
- Sprint 11 T1101 quick planning form compactness uitgevoerd
- Sprint 11 T1102 resource selector de-emphasis uitgevoerd
- Sprint 11 T1103 matrix and card density pass uitgevoerd
- Sprint 11 T1104 quick enter flow refinement uitgevoerd
- Sprint 11 T1105 conflict summary integration discovery uitgevoerd
- Resource selector is compacter en inklapbaar
- Resource reset na create gekozen en gevalideerd
- Planningcards zonder resource tonen geen prominente `Geen resource` tekst meer
- Cellen/cards/header zijn compacter voor hogere matrix density
- Enter in taak/project gebruikt bestaande form-submit
- Na create blijven actieve cel en autofocus behouden
- Conflictinformatie staat compacter dichter bij de matrix
- Sprint 11 QA, scopecontrole en closure uitgevoerd
- Sprint 11 afgerond
- Sprint 12 Large Matrix Ergonomics & Materieel Labeling uitgevoerd
- Zichtbare UI-labels `Resource` naar `Materieel` aangepast zonder contractrefactor
- Interne `Resource`, `resourceId` en `ResourceSelector` contracten behouden
- Vaste werknemerslijst uitgebreid voor density-validatie
- `PlanningForm` sticky gemaakt voor verticale scroll
- Werknemerlabels sticky links gemaakt voor grotere matrixscanbaarheid
- Matrixkolommen, cellen en cards licht compacter gemaakt
- Grotere werknemerslijst, sticky form, sticky werknemerlabels en matrix density gevalideerd
- Sprint 12 QA, scopecontrole en closure uitgevoerd
- Sprint 12 afgerond
- Sprint 13 Materieelselector After-Use Ergonomie uitgevoerd
- Materieelselector klapt automatisch dicht na materieelkeuze
- Gekozen materieel blijft zichtbaar in gesloten summary
- Contextuele knoptekst `Kies materieel` en `Wijzig materieel` toegevoegd
- Materieel wissen en snelle heropening behouden
- Open materieelselector compacter gemaakt met begrensde resultatenlijst
- Interne `Resource`, `resourceId` en `ResourceSelector` contracten behouden
- Planning zonder materieel, planning met materieel, edit/delete/relocation en conflictbadge gevalideerd
- Sprint 13 QA, scopecontrole en closure uitgevoerd
- Sprint 13 afgerond
- Sprint 14 Employee Availability Discovery uitgevoerd
- Lokale employee availability state toegevoegd op basis van `employeeId + date`
- Availability bewust niet in `PlanningItem` opgenomen
- Toggle voor actieve cel toegevoegd: `Niet beschikbaar markeren` en `Beschikbaar maken`
- Unavailable cellen krijgen een duidelijke grijze guardrailstijl
- Subtiele indicator `Niet beschikbaar` toegevoegd
- Planningcards blijven zichtbaar in unavailable cellen
- Planning blijft technisch toegestaan in unavailable cellen
- Create, edit, delete en relocation blijven werken met unavailable cellen
- Selected cell, destination cell en unavailable state blijven samen leesbaar
- Conflictbadges blijven zichtbaar op unavailable cellen
- Dense cell met meerdere cards en unavailable indicator gevalideerd
- Sprint 14 QA, scopecontrole en closure uitgevoerd
- Sprint 14 afgerond
- Sprint 15 Matrix Interaction Polish uitgevoerd
- Cardselectie wordt visueel gewist wanneer na cardselectie een andere cel wordt gekozen
- Relocation blijft werken via een interne relocation-bron nadat cardselectie visueel is gewist
- Datumheader is compacter gemaakt en toont geen dubbele ISO-datumregel meer
- Enter in taak/project voegt in create mode een planningitem toe via bestaande form-submit
- Enter in edit mode veroorzaakt geen ongewenste submit
- Create, edit, delete, relocation, availability guardrail en materieelselector blijven werken
- Sprint 15 build en localhost-QA uitgevoerd
- Sprint 16 Multi-Materieel Assignment Discovery documentair voorbereid
- Sprint 16 SPRINT.md aangemaakt
- Sprint 16 QA.md aangemaakt
- Sprint 16 tickets T1601 t/m T1606 aangemaakt
- `resourceId` touchpoints documentair geinventariseerd
- Toekomstige contractopties vergeleken: `resourceId` behouden, later `resourceIds?: string[]`, overgangsmodel met adapter/helper
- Compacte multi-materieel cardweergave gespecificeerd voor 0, 1, 2 en 3+ materieelitems
- Selector UX zonder library beschreven met togglebare resultaten, selected summary, wissen per item, alles wissen en duidelijke sluitactie
- Conflictvalidatie-impact uitgeschreven als 0..n materieelboekingen per planningitem en conflicten per `date + resourceId`
- Belgische/Nederlandstalige datumnotatieguardrail vastgelegd voor conflictmeldingen, summaries, badges/tooltips, selectorcontext, matrixheaders en toekomstige multi-materieel UX-voorstellen
- Sprint 16 Go/No-Go voorbereid: voorzichtig Go voor kleine Sprint 17 implementatieslice, geen brede `resourceIds` refactor
- Sprint 17 Multi-Materieel Prototype documentair voorbereid
- Sprint 17 SPRINT.md aangemaakt
- Sprint 17 QA.md aangemaakt
- Sprint 17 tickets T1701 t/m T1705 aangemaakt
- Sprint 17 ticketvolgorde vastgelegd: adapter/helper, cardweergave, selector, conflictvalidatie, QA/closure
- Verplicht checkpoint na T1701 vastgelegd voordat card/selector/conflictwerk mag starten
- Verplicht checkpoint na T1703 vastgelegd voordat conflictvalidatie mag worden aangepast
- `PlanningItem.resourceId` blijft voorlopig compatibel en fungeert als primary mirror
- Multi-materieel wordt additief voorbereid via helpers/adapters die naar een lijst normaliseren
- Sprint 17 scope bewaakt: geen brede contractrename, geen backend/persistence/API, geen drag/drop, geen packages, geen availability-wijzigingen en geen grote redesigns
- Sprint 17 T1701 uitgevoerd
- `src/lib/planning/planning-resources.ts` toegevoegd
- `normalizeResourceIds(ids)` toegevoegd voor lege input, trimmen en deduplicatie met behoud van volgorde
- `getPlanningItemResourceIds(item)` toegevoegd om legacy `resourceId` en additieve `resourceIds` als lijst te lezen
- `withPlanningItemResourceIds(item, resourceIds)` toegevoegd om `resourceId` als primary mirror te bewaren
- `PlanningItem.resourceIds?: string[]` additief toegevoegd zonder brede migratie
- T1701 build geslaagd
- T1701 helper sanity-check geslaagd
- T1701 localhost-smoke geslaagd voor planning zonder materieel en planning met 1 materieelitem
- T1701 stop/checkpoint bereikt; geen T1702/T1703/T1704/T1705 gestart
- Sprint 17 T1702 uitgevoerd
- `PlanningCell` gebruikt `getPlanningItemResourceIds(item)` om materieelids te resolven
- `PlanningCard` ontvangt nu een resourcecollectie voor cardpresentatie
- Planningcard toont 0 materieelitems zonder materieelregel
- Planningcard behoudt bij 1 materieelitem de bestaande compacte tekstregel
- Planningcard toont bij 2 materieelitems compacte nummerlabels
- Planningcard toont bij 3+ materieelitems de eerste 2 nummerlabels plus `+n`
- T1702 build geslaagd
- T1702 card-render sanity-check geslaagd voor 0, 1, 2 en 3+ materieelitems
- T1702 localhost-smoke geslaagd voor planning zonder materieel en planning met 1 materieelitem
- T1702 edit/delete/relocation/availability regressie-smoke geslaagd
- T1702 stop bereikt; geen T1703/T1704/T1705 gestart
- Sprint 17 T1703 uitgevoerd
- Bestaande `ResourceSelector` aangepast naar minimale multi-select zonder library
- Selected summary met compacte gekozen materieelchips toegevoegd
- Toggle aan/uit per resultaat toegevoegd
- Wissen per gekozen materieelitem toegevoegd
- `Alles wissen` toegevoegd
- `Klaar` toegevoegd als lokale sluitactie
- Selector blijft open tijdens meerdere keuzes
- Create mode ondersteunt 0..n materieelitems
- Edit mode ondersteunt directe lokale update van 0..n materieelitems
- `PlanningForm` gebruikt `getPlanningItemResourceIds(item)` voor edit-prefill
- Create en edit schrijven via `withPlanningItemResourceIds`
- `resourceId` blijft primary mirror en wordt als eerste gekozen materieelitem bewaard
- T1703 build geslaagd
- T1703 helper/mirror sanity-check geslaagd
- T1703 localhost-smoke geslaagd voor planning zonder materieel, met 1 materieelitem, met 2 materieelitems en met 3+ materieelitems
- T1703 edit toevoegen/verwijderen/alles wissen getest
- T1703 delete/relocation/availability regressie-smoke geslaagd
- T1703 checkpoint bereikt; geen T1704/T1705 gestart
- Sprint 17 T1704 uitgevoerd
- Conflictservice gebruikt `getPlanningItemResourceIds(item)` voor 0..n materieelboekingen
- Planningitems zonder materieel leveren geen conflictboekingen
- Conflicten worden gegroepeerd per `date + resourceId`
- `PlanningConflict.resourceId` blijft enkelvoudig
- Conflictmessages tonen Belgische/Nederlandstalige datumweergave zoals `20/05/2026`
- `ConflictSummary` toont geformatteerde datum in plaats van ruwe ISO-datum
- Relocation herberekent conflicten over alle gekoppelde materieelitems via bestaande state-afleiding
- Availability blijft los van conflictvalidatie
- T1704 build geslaagd
- T1704 conflict sanity-check geslaagd voor 0, 1, 2 en 3+ materieelitems
- T1704 localhost-smoke geslaagd voor single- en multi-materieelconflicten
- T1704 edit toevoegen/verwijderen herberekent conflict
- T1704 relocation herberekent conflict
- T1704 availability toggle wijzigt conflictcount niet
- T1704 stop bereikt; T1705 closure nog niet gestart
- Sprint 17 T1705 QA, regressie en closure uitgevoerd
- Sprint 17 QA.md bijgewerkt met closure-resultaat
- Sprint 17 SPRINT.md bijgewerkt met sprintresultaat
- T1705 ticket bijgewerkt met closure-resultaat
- Sprint 17 build geslaagd bij closure
- Sprint 17 localhost-regressie geslaagd op `http://localhost:3014`
- Planning zonder materieel gevalideerd
- Planning met 1 materieelitem gevalideerd
- Planning met 2 materieelitems gevalideerd
- Planning met 3+ materieelitems gevalideerd
- Create flow met 0..n materieelitems gevalideerd
- Edit flow materieel toevoegen, per item wissen en alles wissen gevalideerd
- Delete gevalideerd
- Relocation gevalideerd
- Availability op cellen gevalideerd zonder conflictregelwijziging
- Conflictbadges gevalideerd
- Conflict summary gevalideerd
- Conflictmeldingen tonen Belgische/Nederlandstalige datumweergave zoals `20/05/2026`
- Geen zichtbare ISO-datum in conflictmeldingen gezien
- `resourceId` primary mirror gecontroleerd
- `resourceIds` compatlaag gecontroleerd
- Selector-density en sticky form beoordeeld als acceptabel voor prototype
- Browserconsole zonder actuele warnings of errors
- Sprint 17 afgerond
- Geen backend/persistence/API, packages, drag/drop, availability-wijzigingen, resource CRUD/import of brede contractrename toegevoegd
- Kleine relocation-context polish uitgevoerd
- Geselecteerde card blijft visueel geselecteerd wanneer daarna een destination cell wordt gekozen
- Active cell en destination cell blijven tegelijk zichtbaar via bestaande celstate
- Relocation wist de visuele cardselectie na uitvoering
- Delete wist selectie en relocationcontext zoals voorheen
- Create, edit, delete en relocation smoke gevalideerd
- Relocation-context polish build geslaagd
- Relocation-context polish localhostcontrole geslaagd op `http://localhost:3015`
- Geen drag/drop, nieuwe interaction layer, backend/API/persistence, packages of nieuwe move-logica toegevoegd
- Strategische productinzichten rond planner-modulegrenzen vastgelegd
- Planner blijft een eigen module binnen een breder Perceel-platform
- Toekomstige platformmodules benoemd: Planner, Mobiele werkbonnen, Nacalculatie, Materieelbeheer, Projecten/klanten en Rapportage
- Availability-types blijven in planner als lichte planningscontext: Niet beschikbaar, Recup, Jaarlijkse vakantie, Weerverlet en Ziekte
- Availability blijft gekoppeld aan `employeeId + date` en niet aan `PlanningItem`
- HR-module expliciet buiten planner-scope gehouden
- Uitgesloten HR-workflows vastgelegd: verlofaanvragen, goedkeuringen, saldo's, loonadministratie, contractbeheer en HR-dossiers
- Personeelstypes vastgelegd als operationele metadata: vaste werknemer terrein, vaste werknemer bureau, zelfstandige en flexi
- Personeelstypes voorlopig alleen gebruiken voor grouping, filtering en scanbaarheid, niet voor HR, rechten of payroll
- Modulegrens vastgelegd: planner mag later data delen met werkbonnen en nacalculatie, maar mag hun workflows niet bevatten
- Sprint 18 Planner Module Boundaries & Availability Types Discovery documentair voorbereid
- Sprint 18 SPRINT.md aangemaakt
- Sprint 18 QA.md aangemaakt
- Sprint 18 tickets T1801 t/m T1806 aangemaakt
- T1801 Planner Module Boundary Map documenteert plannerverantwoordelijkheden en expliciete grenzen richting HR, werkbonnen, nacalculatie, CRM en materieelbeheer CRUD
- T1802 Availability Types UX Discovery beschrijft `Niet beschikbaar`, `Recup`, `Jaarlijkse vakantie`, `Weerverlet` en `Ziekte` als lichte plannercontext
- T1802 bevestigt dat availability gekoppeld blijft aan `employeeId + date` en niet aan `PlanningItem`
- T1803 Availability Visual Hierarchy & Density beschrijft kleur, badge, tooltip, label en density-impact bij volle cellen
- T1803 benoemt stresscases met meerdere cards, conflictbadges, multi-materieel en unavailable states
- T1804 Personeelstype Metadata Discovery bakent vaste werknemer terrein, vaste werknemer bureau, zelfstandige en flexi af als metadata-only
- T1804 sluit rechten, payroll, HR en contractlogica expliciet uit
- T1805 Bureau Versus Terrein Planning Scenarios documenteert afspraken, tijdsdensity, materieelcontext en scanbaarheid
- T1805 sluit een aparte bureauplanner voorlopig expliciet uit
- T1806 QA & Go/No-Go documenteert scope leakage controle en voorwaarden voor een latere kleine implementatieslice
- Sprint 18 scope bewaakt: geen availability-implementatie, geen grouping/filtering implementatie, geen HR-logica, geen persistence/backend/API, geen rechtenmodel, geen werkbonnen/nacalculatie, geen drag/drop en geen packages/frameworks
- `PROJECT_STATE.md`, `docs/Planning_UX_Domain_Findings.md` en `context/DOMAIN_MODEL.md` bijgewerkt voor Sprint 18 documentatie
- Geen codewijzigingen, build of localhost-QA uitgevoerd voor Sprint 18
- Sprint 19 Availability Types Implementation uitgevoerd
- Sprint 19 SPRINT.md aangemaakt
- Sprint 19 QA.md aangemaakt
- Sprint 19 tickets T1901 t/m T1905 aangemaakt
- `AvailabilityType` toegevoegd met `unavailable`, `recovery`, `vacation`, `weather_leave` en `sick_leave`
- `EmployeeAvailability` gemigreerd naar typed availability met `type: AvailabilityType`
- `src/lib/planning/availability.ts` toegevoegd als helperlaag voor keys, lookup, set, clear, toggle, labels, cell labels, indicators en stylingclasses
- Availability blijft lokaal gekoppeld aan `employeeId + date`
- Availability blijft los van `PlanningItem`, resources en conflictengine
- 1-click `Niet beschikbaar` behouden
- Kleine native typekeuze toegevoegd voor `Recup`, `Jaarlijkse vakantie`, `Weerverlet` en `Ziekte`
- Availability wissen gebeurt via `Beschikbaar maken`
- Lege availability-cellen tonen zachte volledige celkleur en compacte Nederlandse labels
- Vacation toont in lege matrixcellen `Vakantie`, maar in select en tooltip/title `Jaarlijkse vakantie`
- Cellen met planningcards tonen availability subtiel als compacte indicator
- Planningcards blijven dominant boven availability-context
- Conflictbadges blijven visueel opvallender dan availability
- Selected/destination cell states blijven zichtbaar boven availability-styling
- Sprint 19 build/typecheck via `npm run build` geslaagd
- Sprint 19 visuele browser-QA geslaagd: alle types zichtbaar, kleuren duidelijk maar niet te fel, selected state zichtbaar, cards dominant, conflictbadges sterker en matrix rustig
- Bugs bij Sprint 19 QA: nee
- Sprint 19 scope bewaakt: geen persistence/backend/API/localStorage, geen permissions, geen HR-module, geen approvals/workflows, geen payroll, geen conflictregels, geen drag/drop, geen packages/frameworks en geen planning/resource contractwijzigingen
- Sprint 20 Resource Favorites uitgevoerd
- Sprint 20 SPRINT.md aangemaakt
- Sprint 20 QA.md aangemaakt
- Sprint 20 tickets T2001 t/m T2004 aangemaakt
- `Resource.isFavorite?: boolean` toegevoegd als minimale favorite-markering
- `toggleFavorite` en `sortFavoritesFirst` toegevoegd in de resource helperlaag
- Enkele operationele seed-favorieten toegevoegd zonder user preferences of persistence
- `ResourceSelector` toont een klein sterretje per resource
- Favoriet togglen is 1-click en staat los van resource-selectie
- Favorieten sorteren meteen bovenaan in de bestaande selector
- Geen aparte favorietensectie toegevoegd om selector-density te behouden
- Multi-materieel selectie blijft intact
- Conflictstatus blijft renderen
- Sprint 20 build/typecheck via `npm run build` geslaagd
- Sprint 20 browser-QA geslaagd: sterretje duidelijk, selectie duidelijk, geen klikverwarring, directe sortering, compacte selector en multi-materieel intact
- Bugs bij Sprint 20 QA: nee
- Sprint 20 scope bewaakt: geen persistence/backend/API/localStorage, geen persoonlijke preferences, geen accounts/permissions, geen ranking engine, geen AI-suggesties, geen analytics, geen aparte favorietenmodule, geen drag/drop, geen packages/frameworks en geen planning/conflictarchitectuurwijzigingen
- Sprint 21 Planner Action Context UX Slice 1 uitgevoerd
- Sprint 21 SPRINT.md aangemaakt
- Sprint 21 QA.md aangemaakt
- Sprint 21 tickets T2101 t/m T2103 aangemaakt
- Compacte action context chip toegevoegd in de sticky `PlanningForm`
- Action context wordt afgeleid uit bestaande state: create, edit en relocation
- `Nieuwe planning` toont geselecteerde cel of `Kies een cel`
- `Bewerken` toont taakcontext plus `kies doelcel om te verplaatsen`
- `Verplaatsen` toont bronkaart en doelcel als `[taak] -> [werknemer] - [datum]`
- Relocation microcopy polish uitgevoerd na QA
- Matrixklikgedrag ongewijzigd gehouden
- Geen nieuwe interacties toegevoegd
- Geen nieuwe state machine of interaction mode toegevoegd
- Sprint 21 Slice 1 build/typecheck via `npm run build` geslaagd
- Sprint 21 browser-QA geslaagd: lege selectie, celselectie, cardselectie, relocationcontext, compacte chip, truncatie, create/edit/delete/relocation en geen drag/drop-gevoel gevalideerd
- Bugs bij Sprint 21 Slice 1 QA: nee
- Sprint 21 Slice 1 scope bewaakt: geen persistence/backend/API, permissions, packages/frameworks, drag/drop, redesign, nieuwe architectuurlaag, conflictengine-wijzigingen of `resourceId/resourceIds` compatlaag-wijzigingen
- Sprint 21 Slice 2 Relocation Visual Context Polish uitgevoerd
- Sprint 21 ticket T2104 aangemaakt
- Bezette cellen krijgen tijdens relocation-context een zachte amber-tint/rand
- Destination cell heeft een sterkere amber-ring
- Source card blijft herkenbaar via selected styling en subtiele accentlijn
- Matrixklikgedrag ongewijzigd gehouden
- Geen nieuwe state, klikzones, labels, overlays, knoppen of interacties toegevoegd
- Geen drag/drop-affordance toegevoegd
- Sprint 21 Slice 2 build/typecheck via `npm run build` geslaagd
- Sprint 21 Slice 2 browser-QA geslaagd: relocation-mode duidelijker, bezette cellen doelbaar zonder nieuwe interactie, amber niet als conflict/warning, conflictbadges belangrijker, planningcards dominant, availability ondergeschikt, source card herkenbaar, destination cell duidelijk en geen drag/drop-gevoel
- Bugs bij Sprint 21 Slice 2 QA: nee
- Sprint 21 Slice 2 scope bewaakt: geen persistence/backend/API, permissions, packages/frameworks, drag/drop, redesign, nieuwe architectuurlaag, conflictengine-wijzigingen, `resourceId/resourceIds` compatlaag-wijzigingen of matrixinteractiewijzigingen
- Sprint 22 Planner Productivity Slice 1 uitgevoerd
- Sprint 22 SPRINT.md aangemaakt
- Sprint 22 QA.md aangemaakt
- Sprint 22 tickets T2201 t/m T2202 aangemaakt
- Compacte create-mode optie `Materieel behouden` toegevoegd in `PlanningForm`
- Optie staat standaard uit
- Met optie uit blijft bestaand resetgedrag behouden
- Met optie aan blijven geselecteerde `resourceIds` behouden na toevoegen
- Een selectie met een resource en meerdere resources blijft behouden wanneer de optie aan staat
- Taak/projectvelden resetten correct na toevoegen
- Actieve cel/context blijft volgens bestaand gedrag
- Edit mode toont checkbox niet en blijft ongemoeid
- Geen persistence/backend/API/localStorage of user preferences toegevoegd
- Geen wijzigingen aan `PlanningItem`, conflictengine, resource helpers of `resourceId/resourceIds` architectuur
- Sprint 22 Slice 1 build/typecheck via `npm run build` geslaagd
- Sprint 22 Slice 1 browser-QA geslaagd: checkbox create-only, standaard uit, reset/retain voor een en meerdere resources, taakreset, active context, edit/delete/relocation/conflictvalidatie en compacte UI gevalideerd
- Bugs bij Sprint 22 Slice 1 QA: nee
- Sprint 22 Slice 1 scope bewaakt: geen persistence/backend/API/localStorage, user preferences, packages/frameworks, redesign, conflictengine-wijzigingen, `PlanningItem`-wijzigingen of `resourceId/resourceIds` compatlaag-wijzigingen
- Sprint 24 Week Navigation Slice 1 uitgevoerd
- Sprint 24 SPRINT.md aangemaakt
- Sprint 24 QA.md aangemaakt
- Sprint 24 tickets T2401 t/m T2402 aangemaakt
- Minimale weeknavigatie toegevoegd: `Vorige week`, `Vandaag`, `Volgende week`
- `getWorkWeek(anchorDate)` toegevoegd als parametriseerbare weekhelper
- `getCurrentWorkWeek()` compatibel behouden
- Actieve week wordt via week-anchor state in `page.tsx` beheerd
- `WeekPlanningBoard` ontvangt actieve `days` via props
- Week blijft view/filter-context; planningitems blijven datumgebaseerd
- Planningitems buiten zichtbare week blijven in state maar worden niet getoond
- Conflictsummary volgt de zichtbare week
- Weekwissel wist selected cell, selected card/edit state, relocation source en destination
- Sprint 24 Slice 1 browser-QA vond bug: donderdag ontbrak in `dayLabels`
- Bugfix beperkt uitgevoerd in `src/lib/planning/week.ts` door `Do` toe te voegen
- Sprint 24 Slice 1 build/typecheck via `npm run build` geslaagd na fix
- Sprint 24 Slice 1 browser-QA geslaagd: huidige/vorige/volgende week, vandaag, item zichtbaar/verbergen/her tonen, availability, conflicts, context reset, create/edit/delete/relocation, resource favorites, `Materieel behouden` en matrixdensity gevalideerd
- Open bugs na Sprint 24 Slice 1 QA: nee
- Sprint 24 Slice 1 scope bewaakt: geen persistence/backend/API, database, routing redesign, employee management, week copy/templates, drag/drop, packages/frameworks, weekendweergave of grote state rewrite
- Sprint 24 correctie T2403 uitgevoerd: volledige week maandag t/m zondag
- `getWorkWeek(anchorDate)` geeft nu zeven dagen terug
- Matrixheader en werknemersrijen gebruiken zeven dagkolommen
- Weekenddagen zijn gewone planbare dagen zonder aparte weekendlogica, conflictregels of availability-wijzigingen
- Sprint 24 weekend-correctie browser-QA geslaagd: zaterdag/zondag zichtbaar en planbaar, availability zetten/wissen, weekendconflicts, create/edit/delete, relocation naar weekenddagen, sticky labels, horizontale layout en matrixdensity gevalideerd
- Sprint 24 correctie T2404 uitgevoerd: vaste headerzones en stabiele weeknavigatie
- Boardheader verdeeld in links titel/context, midden weeknavigatie, rechts availability-acties/move/conflictstatus/weeklabel
- Weeknavigatie blijft stabiel zonder actieve cel, met actieve cel en na availability-toggle
- Availability-controls, conflictstatus en move-actie blijven bruikbaar
- Sprint 24 header polish QA geslaagd: 7-daagse matrix intact en header acceptabel op laptopbreedte
- Sprint 24 correcties build/typecheck via `npm run build` geslaagd
- Open bugs na Sprint 24 correcties QA: nee
- Sprint 25 Lightweight Employee Management Slice 1 uitgevoerd
- Sprint 25 SPRINT.md aangemaakt
- Sprint 25 QA.md aangemaakt
- Sprint 25 ticket T2501 aangemaakt
- Lokale `plannerEmployees` state toegevoegd in `page.tsx`, initieel vanuit seeddata
- `Employee.isHidden?: boolean` toegevoegd als minimale lokale view-state
- `src/lib/planning/employees.ts` toegevoegd met helpers voor zichtbare en verborgen employees
- Zichtbare employees worden doorgegeven aan `PlanningForm` en `WeekPlanningBoard`
- Werknemers kunnen operationeel verborgen worden via compacte `Verbergen`-actie in de werknemerrij
- Verborgen werknemers zijn herstelbaar via compacte `Terug tonen`-acties
- Geen hard delete toegevoegd; planningitems en availability blijven in state
- Bij opnieuw tonen komen bestaande planningitems en availability terug
- Conflictinput gebruikt alleen planningitems van zichtbare werknemers
- Verborgen werknemer-items tellen niet mee in de zichtbare conflictstatus
- Bij verbergen van actieve werknemer worden selected cell, selected card/edit, relocation source en destination gewist indien relevant
- Sprint 25 Slice 1 build/typecheck via `npm run build` geslaagd
- Sprint 25 Slice 1 browser-QA geslaagd: hide/show, select-filtering, planningretentie, availabilityretentie, conflictfiltering, contextreset, create/edit/delete, relocation, weeknavigatie en compacte operationele UI gevalideerd
- Bugs bij Sprint 25 Slice 1 QA: nee
- Sprint 25 Slice 1 scope bewaakt: geen hard delete, planningitem-delete, availability-delete, HR-profielen, permissions, payroll/contractstatus, persistence/backend/API/localStorage, aparte employee-module, packages, drag/drop of redesign toegevoegd
- Sprint 25 Slice 1 UX-polish uitgevoerd
- `Verbergen` per werknemerrij is subtieler gemaakt en verschijnt vooral bij hover/focus
- Verborgen werknemers worden standaard compact getoond als `Verborgen: n` met `Beheren`
- De uitklapbare beheerregel toont werknemernaam apart met actie `Terug tonen`
- Sprint 25 UX-polish QA geslaagd: verbergen, tonen, planning/availability-retentie, conflictfilter, rustigere matrix, geen HR-gevoel en create/edit/delete/relocation/weeknavigatie gevalideerd
- Sprint 25 UX-polish scope bewaakt: geen nieuwe functionaliteit, hard delete, HR-module, persistence/backend/API, employee toevoegen, redesign of packages toegevoegd
- Sprint 25 Slice 2 Werknemer Lokaal Toevoegen uitgevoerd
- Sprint 25 ticket T2502 aangemaakt
- `Employee` uitgebreid met `firstName` en `lastName`
- `Employee.name` compatibel behouden als displayveld
- Seedwerknemers aangevuld met `firstName` en `lastName`
- Employee-helperlaag uitgebreid met `getEmployeeDisplayName`, `createLocalEmployee` en `normalizeEmployeeNameInput`
- Compacte add-flow toegevoegd met `Werknemers`, `+ Werknemer`, `Voornaam`, `Naam` en `Toevoegen`
- Lege voornaam en lege naam worden geblokkeerd
- Dubbele volledige displaynaam wordt geblokkeerd
- Nieuwe werknemers verschijnen direct in matrix en `PlanningForm`-select
- Nieuwe werknemers kunnen planning en availability krijgen
- Nieuwe werknemers gebruiken dezelfde verbergen/tonen-flow als seedwerknemers
- Hide-actie is gepolished naar subtiel `x`-kruisje met tooltip en accessible label
- Werknemernaamkolom is verbreed en lange namen hebben title/tooltip
- Technische copy `Lokaal in planner` is verwijderd
- Werknemer toevoegen en verborgen werknemers beheren zijn gebundeld in Ã©Ã©n compact werknemerskader
- Standaardbeeld toont `Werknemers`, `+ Werknemer` en indien relevant `Verborgen: n Â· Beheren`
- Add-flow opent inline na interactie en klapt na succesvol toevoegen terug in
- `Toon [naam]` is vervangen door naam + `Terug tonen` omdat de oude copy kon lezen als bekijken in plaats van opnieuw zichtbaar maken
- Sprint 25 finale werknemerszone-QA geslaagd: compact kader, toevoegen, annuleren, validatie, duplicate validation, verbergen, `Verborgen: n Â· Beheren`, `Terug tonen`, planning/availability-retentie en create/edit/delete/relocation/weeknavigatie gevalideerd
- Sprint 25 Slice 2 build/typecheck via `npm run build` geslaagd
- Sprint 25 Slice 2 browser-QA geslaagd: 23 QA-punten groen, inclusief validatie, displaynaam, lange namen, hide/show, planning, availability, create/edit/delete, relocation, weeknavigatie, conflictvalidatie, seedwerknemers en layout
- Bugs bij Sprint 25 Slice 2 QA: nee
- Sprint 25 Slice 2 scope bewaakt: geen hard delete, HR-module, persistence/backend/API/localStorage, permissions, payroll, aparte employee-module, packages, drag/drop of redesign toegevoegd
- Sprint 26 Resource Mapping & Normalization Slice 1 uitgevoerd
- Sprint 26 SPRINT.md aangemaakt voor resource-mapping afspraken
- Sprint 26 QA.md aangemaakt
- Sprint 26 ticket T2601 aangemaakt
- `Resource.brand?: string` toegevoegd als optionele context/search metadata
- Resource-helperlaag uitgebreid met Excel-mappingconstante, tekstnormalisatie, soort-naar-category mapping, displaylabel, zoektekst en een record-normalisatiehelper
- Mapping vastgelegd: `nummer -> number`, `beschrijving -> name`, `merk -> brand`, `soort -> type + category`
- `category` blijft grof beperkt tot `machine`, `voertuig`, `werktuig` en `aanhanger`
- `isDefective` blijft lightweight plannerstatus en default `false` in mappinghelper
- ResourceSelector zoekt nu ook via helpertekst op nummer, naam, merk, category en type
- ResourceSelector, PlanningCard en conflictmeldingen gebruiken gedeelde resource-displayhelper
- Bestaande seedresources blijven compatibel en zijn niet massaal vervangen
- Sprint 26 Slice 1 build/typecheck via `npm run build` geslaagd
- Sprint 26 Slice 1 QA groen voor selector openen, bestaande resources, zoeken op nummer/naam/type/category, merk-search helpercheck, favorites-rendering, card/conflict-display en dense matrix
- Sprint 26 Slice 1 QA-beperking: sterretje togglen, multi-select en volledige create/edit/delete/relocation-flow zijn door browserpane-instabiliteit niet volledig opnieuw interactief afgerond
- Sprint 26 resterende aandachtspunten: echte Excel-import later, id-stabiliteit op basis van `nummer`, en later een seed/testresource met `brand` voor browservalidatie
- Sprint 26 Slice 1 scope bewaakt: geen Excel-parser, importflow, backend/API, persistence, packages, fleet ERP, onderhoud, kostprijzen, documenten, telemetrie, resource CRUD, categorie-explosie, 240-resource seedrewrite of `resourceId/resourceIds` contractwijziging toegevoegd
- Sprint 28 Grid Readability & Planner Scanability Slice 1 uitgevoerd
- Sprint 28 SPRINT.md aangemaakt
- Sprint 28 QA.md aangemaakt
- Sprint 28 ticket T2801 aangemaakt
- Roosterlijn-hiÃ«rarchie in de matrix versterkt zonder nieuwe state, interacties of planninglogica
- Dagkolommen zijn visueel duidelijker gemaakt via consistentere header- en celgrenzen
- Werknemerrijen zijn beter afgebakend met subtiele horizontale rijlijnen
- Boardrand en sticky werknemerlabelrand zijn sterker gekoppeld aan het grid
- Availability-cellen behouden zachte kleur maar gebruiken neutrale gridranden zodat het raster doorloopt
- Categorie-separators blijven subtiel en secundair aan het matrixraster
- Planningcards zijn bewust niet gewijzigd
- Selected cell, relocation styling en conflictbadges blijven zichtbaar boven de gridlaag
- Sprint 28 Slice 1 build/typecheck via `npm run build` geslaagd
- Sprint 28 Slice 1 browser-QA geslaagd: matrix voelt duidelijker als rooster/tabel, werknemer x dag is sneller herkenbaar, verticale en horizontale grenzen zijn duidelijk genoeg, geen zware oude Excel-look, availability breekt het rooster niet meer, planningcards blijven dominant en create/edit/delete/relocation/weeknavigatie blijven intact
- Bugs bij Sprint 28 Slice 1 QA: nee
- Sprint 28 Slice 1 resterend aandachtspunt: later eventueel subtiele row/focus-anker slice na praktijkgebruik
- Sprint 28 Slice 1 scope bewaakt: geen hoverlogica, crosshair, card-redesign, grotere cellen, drag/drop, businesslogica, conflictregelwijzigingen, availability-logica, persistence/backend/API of packages/frameworks toegevoegd

---

## Blockers

- Geen technische blockers bekend.
- Browserautomation kan tekstinvoer niet volledig testen door clipboardruntimebeperking.
- Handmatige tekstzoek- en conflictcase-check blijft aanbevolen.
- Pure zoek/filterlogica is tijdelijk getest met 250 lokale resources.
- Echte 200+ resource UI-scanbaarheid blijft handmatige UX-validatie.
- Browserautomation tekstinvoer blijft beperkt door virtual-clipboard beperking.
- Native datum-input submit naar handmatig gekozen datum vraagt nog handmatige browsercontrole.
- Echte typing na autofocus is beperkt browsermatig gevalideerd door dezelfde virtual-clipboard beperking; korte handmatige check blijft aanbevolen.
- T1205 typing-heavy regressie kon niet volledig opnieuw worden geautomatiseerd door dezelfde Browser Use virtual-clipboard beperking; de flow is tijdens T1201-T1204 smoke gevalideerd en blijft aanbevolen voor korte handmatige nacontrole.
- T1305 browser-QA gebruikte losse keypress-events voor taaknamen omdat `fill`/`type` opnieuw door de Browser Use virtual-clipboard beperking werd geraakt.

---

## Current Focus

Sprint 28 Slice 1 is afgerond. Focus ligt nu op behoud van planner-first scanbaarheid bij realistische werknemersaantallen. Sprint 28 wordt niet verder uitgebreid zonder nieuwe opdracht.

Focus:

- weekplanning UX;
- weekmatrix orientatie;
- scanbaarheid;
- werknemers verticaal als rijen;
- dagen/data horizontaal als kolommen;
- dagelijkse terreinplanning.
- planningcards afzonderlijk selecteerbaar/focusbaar houden;
- planningcards lokaal verwijderbaar houden;
- relocation via geselecteerde card + actieve doelcel + expliciete actie blijft gevalideerd;
- resource optioneel houden in hoofdplanningflow;
- status- en defectruis uit hoofdplanningflow houden;
- bestaande planningcards via het bestaande formulier in edit mode kunnen openen;
- create/edit-flow duidelijk onderscheiden houden;
- card editing klein houden: taak/project en optionele resource direct lokaal aanpassen;
- bestaande card selection, delete en relocation behouden;
- datum/werknemer alleen via relocation wijzigen;
- geen inline editor, drag/drop, persistence/backend/API, server-autosave, undo/history, multi-resource, availability, packages/frameworks of grote redesign toevoegen.
- open UX-punten: geen undo/redo, selected card versus create mode, bezette doelcel ambiguity, toekomstige persistence.
- ergonomie behouden: compacte form/resource/matrix-flow, resource reset na create, conflictinformatie matrixnabij maar niet dominant.
- UI-label `Materieel` behouden als zichtbare plannerterminologie, terwijl interne resource-contracten voorlopig stabiel blijven.
- sticky form en sticky werknemerlabels behouden als ergonomische basis voor grotere matrixen.
- materieelselector after-use gedrag behouden: automatisch inklappen na keuze, gekozen materieel zichtbaar houden, snelle heropening en wissen behouden.
- open density-punten: bij meerdere opeenvolgende taken met hetzelfde materieel vraagt reset/auto-collapse opnieuw openen; multi-materieel later apart onderzoeken.
- employee availability behouden als lokale, typed visuele guardrail op matrixcelniveau `employeeId + date`.
- availability-cellen blijven niet-blokkerend: planning technisch toelaten, geen conflictregel of harde validatie.
- typed availability voorlopig begrenzen tot `Niet beschikbaar`, `Recup`, `Jaarlijkse vakantie`, `Weerverlet` en `Ziekte`.
- availability zichtbaar houden zonder planningcards of conflictbadges te verdringen.
- indicatorruimte bij zeer volle availability-cellen blijft een open stresscheck.
- bezette-doelcelambiguiteit blijft een bestaand open UX-punt en is geen availability-regressie.
- nieuwe praktijkobservatie: taken binnen dezelfde werknemer/dag-cel moeten later mogelijk handmatig herschikt kunnen worden.
- nieuwe praktijkobservatie: bureauplanning heeft vaker afspraken, tijdstippen en andere density dan terreinplanning.
- employee grouping later onderzoeken als visuele grouping, niet als permissions of HR/workforce module.
- planner blijft eigen module binnen het toekomstige Perceel-platform en mag niet uitgroeien tot alles-in-een HR/CRM/nacalculatie-app.
- availability-types horen in de planner als lichte planningscontext, gekoppeld aan `employeeId + date`, niet aan `PlanningItem`.
- geen HR-module bouwen: geen verlofaanvragen, goedkeuringen, saldo's, loonadministratie, contractbeheer of HR-dossiers.
- personeelstypes later alleen gebruiken als operationele metadata voor grouping, filtering en scanbaarheid.
- planner mag later data delen met mobiele werkbonnen en nacalculatie, maar bevat hun workflows niet.
- matrix interaction polish behouden: celklik na cardselectie wist visuele cardselectie, maar relocation blijft expliciet mogelijk.
- compacte datumheader behouden zonder dubbele ISO-datumregel.
- Enter-to-add behouden in create mode; edit mode niet via Enter submitten.
- multi-materieel requirement voorbereiden zonder Sprint 16-contractwijziging: `PlanningItem.resourceId?: string` blijft voorlopig bestaan.
- toekomstige multi-materieel UX moet 0, 1, 2 en 3+ materieelitems compact tonen zonder carddensity te breken.
- toekomstige selector voor meerdere materieelitems moet library-vrij blijven, open blijven tijdens meerdere keuzes en een duidelijke sluitactie hebben.
- toekomstige conflictvalidatie moet per afgeleide materieelboeking lopen: 0..n boekingen per planningitem, conflict per `date + resourceId`, lege collectie conflictloos.
- datumnotatie overal consequent Belgisch/Nederlandstalig houden: `19/05/2026` of `maandag 18 mei 2026`, geen ISO-datum of maand/dag/jaar in zichtbare UX.

---

## Laatste beslissing

Project aangemaakt via Project Launch Wizard op 2026-05-18T19:31:54.763Z.

Sprint 01 gebruikt alleen lokale state/mockdata. Er is geen database, login, cloud, autosave, drag/drop, voertuigflow, AI of backend toegevoegd.

Technische validatie bevestigd:

- lokale state werkt;
- planningitems kunnen toegevoegd worden;
- conflictservice werkt;
- defecte machine waarschuwing werkt.

Architectfeedback:

- huidige UI is te veel formulier/tabel;
- gewenste richting is een Excel-achtige weekplanning;
- werknemers als kolommen;
- datum/week bovenaan;
- machines zichtbaar per werknemer;
- kleurcodes voor voorlopig/bevestigd/uitgevoerd;
- drag/drop later, niet direct.

Sprint 02 uitgevoerd:

- weekplanning board centraal gezet;
- werknemers als kolommen getoond;
- werkdagen en datums zichtbaar gemaakt;
- planningcards toegevoegd;
- machines zichtbaar gemaakt in planningcards;
- statuskleuren toegevoegd voor voorlopig, bevestigd en uitgevoerd;
- bestaande conflictservice behouden;
- formulier behouden als compacte invoerstrip;
- geen database, login, cloud, autosave, drag/drop, voertuigen, AI of backend toegevoegd.

Nieuwe architectfeedback resource-schaalbaarheid:

- Perceel heeft een grote machinelijst met ongeveer 200+ resources, machines, voertuigen en werktuigen.
- De simpele machine-dropdown werkt technisch, maar is alleen tijdelijk geschikt.
- Machines/resources moeten uniek herkenbaar blijven via Nummer.
- Zoeken en filteren op grote resource-aantallen wordt een prioriteit.
- Machine, voertuig, werktuig en aanhanger kunnen later aparte categorieen worden.
- Drag/drop blijft later; eerst moet resource-selectie schaalbaar worden.

Sprint 03 uitgevoerd:

- resource taxonomy voorlopig gehouden;
- `category` en `type` toegevoegd aan resources;
- seeddata uitgebreid met machines, voertuigen, werktuigen en aanhangers;
- resource zoeken/filteren helper toegevoegd;
- compacte ResourceSelector toegevoegd;
- simpele machine-dropdown vervangen door resource discovery;
- bestaande `machineId` flow behouden;
- bestaande conflictservice behouden;
- geen database, Excel-import, CRUD, onderhoudsbeheer, drag/drop, backend, login, cloud, autosave of nieuwe planningdomeinen toegevoegd.

Sprint 04 uitgevoerd:

- resource-brede contractalignment uitgevoerd;
- `Resource`, `resourceId`, `resources`, `duplicate-resource` en `defective-resource` consistent gemaakt in actieve broncode;
- oude contractnamen zijn niet meer aanwezig in `src`;
- behavior behouden;
- geen database, API, backend, Excel-import, CRUD, onderhoudsbeheer, drag/drop, login, cloud, autosave, nieuwe packages of nieuwe planningdomeinen toegevoegd;
- buildvalidatie succesvol;
- localhost render succesvol;
- categorie- en typefilter browsermatig gecontroleerd;
- tijdelijke 250-resource scanability check uitgevoerd zonder permanente mockdata of productflowwijziging.

Sprint 05 voorbereid:

- oude generated Sprint 05 validaties/meldingen-scope vervangen;
- sprintmap hernoemd naar `sprints/sprint-05-cell-based-planning-input-discovery`;
- Sprint 05 afgebakend als UX/discovery slice;
- tickets T501 t/m T503 herschreven rond celinteractie, celcontext en QA;
- QA-startdocument toegevoegd;
- geen codewijzigingen uitgevoerd;
- geen database, backend, import, CRUD, drag/drop, nieuwe packages of nieuwe frameworks toegevoegd.

Sprint 05 uitgevoerd:

- T501: planningcellen selecteerbaar gemaakt en actieve celcontext zichtbaar gemaakt;
- T502: datum en werknemer worden vooraf ingevuld vanuit geselecteerde cel;
- velden blijven zichtbaar en wijzigbaar;
- submitflow blijft bestaand gedrag;
- geselecteerde cel blijft zichtbaar na submit;
- formulier reset na submit blijft bestaand gedrag en is als UX-bevinding genoteerd;
- `PlanningItem` type niet gewijzigd;
- `ResourceSelector` niet gewijzigd;
- weekstructuur maandag t.e.m. vrijdag niet gewijzigd;
- `npm run build` succesvol;
- localhost gecontroleerd;
- T503 QA afgerond met bekende browserautomationbeperking voor tekstinvoer.

Sprint 06 uitgevoerd:

- T601: veilige componentstructuur voorbereid met `PlanningCell` en gedeeld selected-cell type;
- T602: matrixrichting omgedraaid naar werknemers als rijen en dagen/data als kolommen;
- T603: regressie uitgevoerd op celselectie, prefill, resourcekeuze, submit en cardlocatie;
- T604: QA, scopecontrole en sprint closure uitgevoerd;
- maandag t.e.m. vrijdag behouden;
- geen weekendtoggle toegevoegd;
- geen availability toegevoegd;
- geen drag/drop toegevoegd;
- geen delete toegevoegd;
- geen multi-resource toegevoegd;
- geen `PlanningItem` contractwijziging uitgevoerd;
- geen `ResourceSelector` wijziging uitgevoerd;
- `npm run build` succesvol;
- localhost gecontroleerd;
- open handmatige QA: datum handmatig wijzigen en submit naar handmatig gekozen datum.

Nieuwe harde praktijkrequirements na Sprint 05:

- werknemers moeten verticaal als rijen in de weekmatrix;
- dagen/data moeten horizontaal als kolommen;
- huidige matrixrichting is verkeerd voor de praktijkflow;
- standaardweek blijft maandag t.e.m. vrijdag;
- zaterdag en zondag moeten later optioneel mee te tonen zijn;
- meerdere machines/voertuigen/resources moeten later per taak/project geselecteerd kunnen worden;
- resources moeten later ook los van project/taak ingepland kunnen worden;
- huidige resource seeddata is te beperkt en echte Perceel-machines moeten later toegevoegd worden;
- er is een vaste standaard werknemerslijst nodig;
- handmatig extra werknemers toevoegen moet later mogelijk worden zonder volledig personeelsbeheer;
- werknemer-onbeschikbaarheid moet per werknemer per dag zichtbaar kunnen worden gemaakt met een grijze cel;
- deze requirements zijn documentair vastgelegd en nog niet gebouwd.

Nieuwe harde requirement planningcard-manipulatie:

- planningitems/taken/projecten moeten afzonderlijk selecteerbaar worden;
- planningitems/taken/projecten moeten visueel focusbaar worden;
- planningitems/taken/projecten moeten later met de muis verplaatsbaar worden;
- verplaatsing moet later kunnen naar andere dag en andere werknemer;
- dit gebeurt frequent in echte planningworkflow;
- dit is vastgelegd als toekomstige requirement, maar drag/drop is nog niet gebouwd;
- geen packages/frameworks, undo/history, persistence/backend/API of realtime sync toegevoegd.

Vereenvoudigde productrichting na praktijkvalidatie:

- planningitems zijn standaard impliciet gepland;
- resource/machine/voertuig is niet verplicht bij het toevoegen van een planningitem;
- minimale verplichte invoer is datum, werknemer en taak/project;
- resource is optioneel en kan later volgen;
- sommige taken hebben geen resource nodig;
- minimale invoerfrictie is belangrijker dan volledige registratie bij aanmaken;
- na celselectie moet het taak/project inputveld automatisch focus krijgen;
- gebruiker moet na celklik direct kunnen typen;
- autofocus op taak/project is een UX-polish requirement, geen inline editor of keyboard navigation;
- conflictvalidatie rond resources hoort alleen te lopen wanneer een resource aanwezig is;
- geen resource betekent geen resourceconflictcontrole;
- workflowstatussen `voorlopig` en `bevestigd` zijn voorlopig overbodig;
- focus verschuift weg van workflowadministratie;
- een eenvoudige `uitgevoerd`-markering kan later onderzocht worden;
- defectstatus van resources/machines is momenteel geen prioriteit in de hoofdplanningflow;
- defectstatus hoort mogelijk later bij onderhoud/assetbeheer;
- huidige codeconcepten worden nu niet verwijderd;
- huidige codevalidatie en conflictservice zijn nog niet aangepast;
- multi-resource is nog niet gebouwd;
- geen rechter muisklik/contextmenu, maintenance-module of asset lifecycle gebouwd.

Sprint 07 herplanning:

- Sprint 07 is niet langer Employee Availability;
- availability schuift door naar een latere aparte slice;
- Sprint 07 is voorbereid als Planningcard Interaction Discovery;
- doel is card selection/focus, compacte focus UI, lokale delete en relocation discovery;
- geen drag/drop, echte move, availability, multi-resource, weekendtoggle, backend/database/persistence, packages/frameworks of architectuuruitbreiding.

Sprint 07 T704 relocation discovery:

- T701 t/m T703 tonen dat cards selecteerbaar/focusbaar zijn en delete-acties los van celacties kunnen bestaan;
- event bubbling tussen card, deleteknop en cel is beheersbaar gebleken;
- latere relocation betekent waarschijnlijk `PlanningItem.employeeId` en/of `PlanningItem.date` wijzigen;
- aanbevolen eerste move-slice is geen drag/drop, maar geselecteerde card + doelcel + expliciete actie `Verplaats naar actieve cel`;
- conflictvalidatie moet na relocation opnieuw via bestaande `planningItems` stateflow afgeleid worden;
- undo/history, persistence/backend/API, realtime sync, multi-select, bulk move, keyboard move, contextmenu, drag/drop en packages blijven buiten scope voor de eerste relocation-slice.

Sprint 07 uitgevoerd:

- T701: selected-card state toegevoegd naast selected-cell state;
- T702: geselecteerde planningcard krijgt compacte focus UI;
- T703: planningcards zijn lokaal verwijderbaar uit `planningItems`;
- delete van geselecteerde card wist `selectedCard`;
- delete van niet-geselecteerde card behoudt de huidige cardselectie;
- deleteklik triggert geen ongewenste card- of celklik;
- conflictbadges herberekenen na delete via bestaande stateflow;
- T704: relocation discovery gedocumenteerd;
- T705: build, localhostcontrole, regressie en scopecontrole afgerond;
- `npm run build` succesvol;
- geen drag/drop, echte move, availability, multi-resource, weekendtoggle, packages/frameworks, backend/API/persistence, undo/history, contextmenu, bulk acties of keyboard relocation toegevoegd.

Sprint 08 voorbereid voor review:

- nieuwe sprintmap `sprints/sprint-08-relocation-discovery` toegevoegd;
- sprintdoel afgebakend als geselecteerde card + actieve doelcel + expliciete actie `Verplaats naar actieve cel`;
- ticketset T801 t/m T804 voorbereid;
- QA-startdocument toegevoegd;
- verwachte implementatierichting benoemd rond lokale update van `PlanningItem.employeeId` en/of `PlanningItem.date`;
- item-id behouden bij verplaatsing als acceptance criterium vastgelegd;
- conflictvalidatie blijft opnieuw afgeleid worden via bestaande `planningItems` stateflow;
- geen code-implementatie uitgevoerd;
- geen drag/drop, packages/frameworks, backend/API/persistence, undo/history, realtime sync, multi-resource, availability, contextmenu, bulk move of keyboard relocation toegevoegd.

Sprint 08 T801 uitgevoerd:

- minimale `activeDestinationCell` state toegevoegd naast `selectedCell` en `selectedCard`;
- actieve doelcel wordt alleen gezet wanneer er al een planningcard geselecteerd is;
- klikken op een matrixcel blijft ook de bestaande `selectedCell` zetten voor formulier-prefill;
- destination cell krijgt minimale amberkleurige focusstijl;
- geselecteerde card blijft behouden wanneer een doelcel wordt gekozen;
- planningitems worden niet gemuteerd;
- geen move-actie of moveknop toegevoegd;
- `npm run build` geslaagd;
- localhost gecontroleerd;
- geen browserconsole-errors gezien;
- geen drag/drop, keyboard move, contextmenu, availability, multi-resource, persistence/backend/API, packages/frameworks of echte relocation toegevoegd.

Sprint 08 T802 uitgevoerd:

- compacte expliciete actie `Verplaats naar actieve cel` toegevoegd;
- knop verschijnt alleen wanneer er een geselecteerde card is, een actieve doelcel is en de destination verschilt van de huidige card-cel;
- move naar dezelfde cel toont geen actie en muteert niets;
- klik op de knop update exact 1 planningitem op basis van id;
- alleen `employeeId` en `date` worden gewijzigd;
- planningitem-id en overige velden blijven behouden;
- `selectedCard` blijft behouden na move;
- `activeDestinationCell` wordt na move gewist;
- conflictvalidatie herberekent via bestaande `planningItems` stateflow;
- `npm run build` geslaagd;
- localhost gecontroleerd;
- move naar andere werknemer en andere datum gevalideerd;
- conflictbadges na move gevalideerd;
- celselectie en formulier-prefill blijven werken;
- UX-risico genoteerd: klikken op een bezette doelcel kan een bestaande card selecteren in plaats van de cel als destination zetten;
- geen drag/drop, keyboard move, contextmenu, backend/API/persistence, packages/frameworks, availability, multi-resource, undo, confirm modal, bulk move of `PlanningItem` typewijziging toegevoegd.

Sprint 08 T803 uitgevoerd:

- relocation naar lege cel gevalideerd;
- relocation naar bezette cel via lege celruimte gevalideerd;
- klikken op lege ruimte in doelcel zet `activeDestinationCell`;
- klikken op bestaande card in doelcel selecteert die card en zet geen destination;
- broncard opnieuw klikken behoudt cardselectie en wist destination;
- andere lege cel zonder card zet destination en toont move-actie;
- `selectedCard` blijft logisch behouden na move;
- `activeDestinationCell` wordt na move correct gewist;
- knop verschijnt alleen bij geldige bron + doelcel + andere bron/doelcombinatie;
- move update alleen `employeeId` en `date`;
- conflictbadges en conflictsummary herberekenen;
- celselectie en formulier-prefill blijven werken;
- delete blijft werken na move;
- `npm run build` geslaagd;
- localhost gecontroleerd;
- geen browserconsole-errors gezien;
- open UX-beslissing: bezette doelcel blijft ambigu wanneer de gebruiker op een bestaande card klikt in plaats van op lege celruimte;
- geen codewijzigingen uitgevoerd in T803;
- geen drag/drop, keyboard move, contextmenu, undo/history, persistence/backend/API, packages, availability of multi-resource toegevoegd.

Sprint 08 T804 uitgevoerd:

- `npm run build` geslaagd;
- localhost closure-QA uitgevoerd;
- relocation naar lege cel gevalideerd;
- relocation naar bezette cel via lege celruimte gevalideerd;
- `selectedCard` gedrag gevalideerd;
- `activeDestinationCell` gedrag gevalideerd;
- move-knop guardrails gevalideerd;
- move naar dezelfde cel toont geen knop en muteert niets;
- conflictbadges en conflictsummary herberekenen na move;
- delete na move werkt;
- celselectie en formulier-prefill blijven werken;
- geen browserconsole-errors gezien;
- Sprint 08 QA bijgewerkt;
- Sprint 08 SPRINT bijgewerkt met sprintresultaat;
- T804 ticket bijgewerkt met closure-resultaat;
- relocation discovery is geslaagd;
- open UX-beslissing: bezette doelcel blijft ambigu wanneer de gebruiker op een bestaande card klikt in plaats van op lege celruimte;
- drag/drop is nog niet gerechtvaardigd;
- interaction ambiguity moet later apart onderzocht worden;
- geen nieuwe features, drag/drop, interaction redesign, packages/frameworks, persistence/backend/API, availability, multi-resource, undo/history, keyboard move of contextmenu toegevoegd.

Sprint 09 voorbereid en uitgevoerd als snelle polish-batch:

- Sprint 09 naam: Planning UX Simplification & Polish;
- T901 t/m T905 als Ã©Ã©n veilige UX-batch uitgevoerd;
- T906 QA en closure uitgevoerd;
- `PlanningItem.resourceId` is optioneel gemaakt;
- planningformulier vereist alleen datum, werknemer en taak/project;
- items zonder resource zijn geldig;
- cards zonder resource tonen compact `Geen resource`;
- resource kan nog steeds gekozen en gewist worden;
- conflictvalidatie slaat items zonder resource over;
- dubbele resourceplanning op dezelfde datum blijft een waarschuwing geven wanneer een resource aanwezig is;
- defectstatus is uit de hoofdplanningflow gehaald;
- defectbadges worden niet meer prominent getoond in selector of cards;
- defectconflictwaarschuwingen zijn uit de hoofdplanningflow gehaald;
- statusselectie is uit het formulier gehaald;
- statusbadges en statuslabels zijn uit planningcards gehaald;
- `PlanningStatus` blijft alleen als intern typecontract bestaan;
- nieuwe items krijgen nog een vaste technische default `voorlopig`, zonder zichtbare workflow;
- geen `uitgevoerd`-flow gebouwd;
- klik op planningcel focust het taak/project inputveld;
- taak/project input is zichtbaar en actief na celselectie;
- browserautomation kon echte teksttyping niet volledig simuleren door virtual-clipboard beperking;
- geen productbug gevonden rond verborgen inputtekst;
- planningcards zijn lichter en scanbaarder gemaakt;
- delete, card focus en relocation blijven werken;
- `npm run build` geslaagd;
- localhost closure-QA uitgevoerd;
- geen browserconsole-errors gezien;
- nieuwe toekomstige requirement vastgelegd: bestaande planningcards moeten later bewerkbaar worden;
- card editing is niet geimplementeerd;
- geen availability, multi-resource, drag/drop, persistence/backend/API, packages/frameworks, grote redesigns, contextmenu, undo/history, nieuwe statusworkflow of Sprint 10 gestart.

Sprint 10 voorbereid en uitgevoerd:

- nieuwe sprintmap `sprints/sprint-10-planning-card-editing-quick-adjustments` toegevoegd;
- sprintdoel afgebakend als bestaande planningcards bewerken via het bestaande `PlanningForm`;
- ticketset T1001 t/m T1004 voorbereid;
- QA-startdocument toegevoegd;
- verwachte implementatierichting benoemd rond geselecteerde card als edit target;
- update van bestaande planningcard gebeurt lokaal via `planningItems` stateflow;
- item-id moet behouden blijven bij update;
- taak/project en optionele resource zijn de primaire editvelden;
- create/edit-flow moet duidelijk onderscheiden worden;
- card selection, delete en relocation moeten behouden blijven;
- conflictvalidatie wordt opnieuw afgeleid via bestaande `planningItems` stateflow;
- T1001 uitgevoerd als minimale editmode-checkpoint implementatie;
- `editingPlanningItemId` state toegevoegd naast `selectedCard`;
- cardselectie opent de geselecteerde card in edit mode in `PlanningForm`;
- `PlanningForm` toont create mode of edit mode;
- edit mode vult datum, werknemer, taak/project en optionele resource vanuit de bestaande card;
- edit mode gebruikt directe lokale update voor taak/project en resource;
- celselectie schakelt terug naar create mode en behoudt selected card voor relocation;
- delete wist editmode wanneer de bewerkte card wordt verwijderd;
- T1002 uitgevoerd volgens directe lokale editrichting;
- `updatePlanningItem` handler toegevoegd;
- edit mode heeft geen saveknop en geen cancelknop;
- taak/project wijziging past direct exact 1 bestaand planningitem aan;
- resource kiezen past direct exact 1 bestaand planningitem aan;
- resource wissen zet `resourceId` naar `undefined`;
- datum en werknemer zijn disabled in edit mode;
- formulier toont uitleg: `Gebruik verplaatsen om datum/werknemer te wijzigen.`;
- `npm run build` geslaagd;
- localhost gecontroleerd;
- card openen in edit mode, directe taak/project-edit, resource kiezen/wissen, conflictvalidatie, create mode, relocation en delete gevalideerd;
- T1003 regressie- en guardrailvalidatie uitgevoerd;
- initiele UX-frictie gevonden: edit mode naar create mode liet taak/resource uit de bewerkte card staan;
- kleine guardrail-fix uitgevoerd in `PlanningForm`;
- bij overgang van edit mode naar create mode via celselectie worden taak/project en resource nu leeggemaakt;
- datum en werknemer worden nog steeds vanuit de gekozen cel geprefilld;
- selected card blijft behouden voor relocation;
- nieuw item toevoegen na edit mode gevalideerd;
- T1004 QA, scopecontrole en closure uitgevoerd;
- `npm run build` bij closure geslaagd;
- localhost closure-smoke uitgevoerd;
- browserconsole zonder warnings of errors;
- Sprint 10 QA bijgewerkt;
- Sprint 10 SPRINT bijgewerkt met sprintresultaat;
- T1004 ticket bijgewerkt met closure-resultaat;
- Planning UX/domain findings bijgewerkt;
- Sprint 10 is afgerond;
- geen browserconsole-errors of warnings gezien;
- geen inline editor, drag/drop, backend/API/database/persistence, server-autosave, undo/history, packages/frameworks, multi-resource, availability, contextmenu, statusworkflow, defectstatus-focus, save/cancel-flow of grote redesign toegevoegd.

Sprint 11 voorbereid en uitgevoerd:

- nieuwe sprintmap `sprints/sprint-11-planning-ergonomie-matrix-density-discovery` toegevoegd;
- sprintdoel afgebakend als ergonomie- en density-discovery slice;
- ticketset T1101 t/m T1105 voorbereid;
- QA-startdocument toegevoegd;
- T1101 t/m T1104 uitgevoerd als ergonomie/density batch;
- formulier boven de matrix compacter gemaakt;
- actieve celcontext subtieler gemaakt;
- create/edit onderscheid behouden;
- ResourceSelector compacter en collapsible gemaakt;
- gekozen resource blijft zichtbaar;
- resource blijft optioneel;
- na create wordt resource gereset;
- planningcards en cellen compacter gemaakt;
- `Geen resource` wordt niet meer prominent op resource-loze cards getoond;
- resource wordt alleen getoond wanneer aanwezig;
- Enter in taak/project triggert de bestaande form-submit;
- na create blijft actieve cel behouden;
- na create wordt taak/project gereset;
- na create blijft autofocus op taak/project;
- T1105 uitgevoerd als veilige conflict-summary presentatiewijziging;
- conflictinformatie staat compacter in de matrixheader;
- conflictengine en conflictregels zijn niet gewijzigd;
- `npm run build` geslaagd;
- localhost gecontroleerd na verse devserver-restart;
- actuele browserconsole zonder warnings of errors;
- snelle repetitieve planning gevalideerd;
- planning met en zonder resource gevalideerd;
- edit/delete/relocation regressie gevalideerd;
- conflictbadge en waarschuwing gevalideerd;
- matrix density en scanbaarheid beoordeeld;
- oude stale devserver-error rond ontbrekende `.next` chunk genoteerd als niet-actueel na serverrestart;
- geen availability, multi-resource, drag/drop, backend/API/database/persistence, packages/frameworks, inline editor, undo/history, contextmenu, keyboard navigation/hotkeys, statusworkflow, nieuwe conflictregels of grote redesign toegevoegd.

Sprint 12 uitgevoerd:

- nieuwe sprintmap `sprints/sprint-12-large-matrix-ergonomics-materieel-labeling` toegevoegd;
- Sprint 12 T1201 t/m T1204 als ergonomie/density batch uitgevoerd;
- T1205 QA, density-validatie en closure uitgevoerd;
- zichtbare UI-copy gebruikt nu `Materieel` in plaats van `Resource`;
- interne TypeScript-contracten `Resource`, `resourceId` en `ResourceSelector` zijn bewust behouden;
- vaste werknemerslijst uitgebreid naar 12 werknemers voor densityvalidatie;
- `PlanningForm` is sticky gemaakt zodat invoer zichtbaar blijft tijdens verticale scroll;
- werknemerlabels zijn sticky links gemaakt voor grotere matrixscanbaarheid;
- matrixkolommen, cellen en cards zijn licht compacter gemaakt;
- `npm run build` bij closure geslaagd;
- localhost gecontroleerd op `http://localhost:3001` na verse devserver-restart;
- actuele browserconsole zonder warnings of errors;
- grotere werknemerslijst, sticky form, sticky werknemerlabels, materieellabels en matrix density gevalideerd;
- quick planning flow, planning met en zonder materieel, edit/delete/relocation en conflictbadges zijn tijdens T1201-T1204 smoke gevalideerd;
- T1205 typing-heavy herhaling bleef beperkt door bekende Browser Use virtual-clipboard beperking;
- open UX-punt: open materieelselector neemt onder de sticky form merkbaar verticale ruimte in;
- open discoverypunt: multi-materieel blijft een aparte latere fase met impact op card-density en conflictvalidatie;
- geen multi-materieel, `resourceIds`, availability, drag/drop, backend/API/database/persistence, packages/frameworks, personeelsbeheer, resource CRUD/import, conflictregelwijzigingen, virtualisatie of grote redesign toegevoegd.

Sprint 13 uitgevoerd:

- nieuwe sprintmap `sprints/sprint-13-materieelselector-after-use-ergonomie` toegevoegd;
- Sprint 13 T1301 t/m T1304 als compacte UX-ergonomie batch uitgevoerd;
- T1305 QA, regressie en closure uitgevoerd;
- huidige after-use probleem vastgelegd: open materieelselector nam onder de sticky form te veel verticale ruimte in;
- materieelselector klapt nu automatisch dicht na keuze van 1 materieelitem;
- gekozen materieel blijft zichtbaar in de gesloten summary via nummerbadge en naam;
- knoptekst is contextueel: `Kies materieel` zonder selectie en `Wijzig materieel` met selectie;
- `Wissen` blijft beschikbaar wanneer materieel gekozen is;
- open selector is compacter gemaakt met compactere zoek/filterrij, compactere resultatenrijen en begrensde interne scroll;
- `npm run build` bij closure geslaagd;
- localhost gecontroleerd op `http://localhost:3003` na verse devserver-start;
- actuele browserconsole zonder warnings of errors;
- planning zonder materieel, planning met materieel, auto-collapse, gekozen summary, opnieuw openen/wijzigen, wissen, edit mode wijzigen/wissen, delete, relocation, conflictbadge en sticky density gevalideerd;
- auto-collapse voelt natuurlijk omdat een enkelvoudige materieelkeuze een afgeronde micro-actie is;
- trade-off genoteerd: bij meerdere opeenvolgende taken met hetzelfde materieel moet de planner opnieuw openen en kiezen;
- interne TypeScript-contracten `Resource`, `resourceId` en `ResourceSelector` zijn bewust behouden;
- geen multi-materieel, `resourceIds`, nieuwe conflictregels, backend/API/database/persistence, drag/drop, availability, CRUD/import, packages/frameworks, popover/modal-framework, virtualisatie of grote redesign toegevoegd.

Sprint 14 uitgevoerd:

- nieuwe sprintmap `sprints/sprint-14-employee-availability-discovery` toegevoegd;
- Sprint 14 T1401 t/m T1403 als kleine availability discovery-batch uitgevoerd;
- T1404 regressievalidatie uitgevoerd;
- T1405 QA, scopecontrole en closure uitgevoerd;
- minimale lokale employee availability state toegevoegd op basis van `employeeId + date`;
- availability hoort voorlopig bij de matrixcel en niet bij `PlanningItem`;
- `PlanningItem` contract is niet gewijzigd;
- compacte toggle toegevoegd voor de actieve cel;
- knoptekst wisselt tussen `Niet beschikbaar markeren` en `Beschikbaar maken`;
- unavailable cellen krijgen een duidelijke grijze basisstijl;
- indicator `Niet beschikbaar` wordt subtiel in de cel getoond;
- bestaande planningcards blijven zichtbaar in unavailable cellen;
- planning blijft technisch toegestaan;
- create op beschikbare en unavailable cellen gevalideerd;
- edit op beschikbare en unavailable cellen gevalideerd;
- delete op unavailable cellen gevalideerd;
- relocation naar en vanuit unavailable cellen gevalideerd;
- selected cell, destination cell en unavailable state blijven samen leesbaar;
- conflictbadge op unavailable cel gevalideerd;
- dense cell met meerdere cards en unavailable indicator gevalideerd;
- togglepositie naast relocation beoordeeld als functioneel leesbaar;
- `npm run build` bij closure geslaagd;
- localhost gecontroleerd op `http://localhost:3006`;
- actuele browserconsole zonder warnings of errors;
- open UX-punt: indicatorruimte bij zeer volle unavailable cellen blijft stresscheck;
- bestaande bezette-doelcelambiguiteit blijft open en is geen availability-regressie;
- geen HR/workforce module, ziekte/verlofworkflow, permissions, persistence/backend/API, conflictregels, harde validatie, realtime sync, drag/drop, packages/frameworks of grote redesigns toegevoegd.

Nieuwe praktijkinzichten na Sprint 14:

- taken binnen dezelfde werknemer/dag-cel kunnen later volgordegevoelig zijn;
- voorbeeld bureauplanning: `Bureau`, `09:00u Afspraak Philippe Mallaerts`, `11:00u Afspraak Dragon Golf`, `13:00u WAOW`;
- huidige volgorde is impliciet op basis van toevoegvolgorde;
- later onderzoeken of cards binnen een cel met omhoog/omlaag acties herschikt moeten worden;
- optionele tijdslots of tijdlabels later onderzoeken, zonder tijd verplicht te maken;
- sorteren op tijd blijft discovery-only;
- drag/drop is nog steeds niet automatisch gerechtvaardigd;
- bureaupersonen werken mogelijk anders dan terreinmedewerkers;
- bureauplanning bevat vaker afspraken, tijdstippen, minder materieel en hogere planningdensity;
- later onderzoeken of werknemers visueel gegroepeerd moeten worden in bijvoorbeeld terreinploeg, bureau en eventueel flexi's/externen;
- employee grouping is voorlopig visuele matrixorganisatie, geen HR/workforce module en geen permissions;
- geen tijdslotmodel, employee grouping, aparte bureauplanner, backend/API/persistence, permissions, drag/drop of nieuwe sprint gestart.

Sprint 15 uitgevoerd:

- Matrix Interaction Polish uitgevoerd als kleine UX-polish op localhost-observaties;
- cardselectie wissen bij celklik toegevoegd;
- wanneer een geselecteerde card naar een andere cel wordt verplaatst, wordt de card visueel gedeselecteerd zodra de doelcel gekozen wordt;
- relocation blijft logisch via de expliciete actie `Verplaats naar actieve cel`;
- datumheader vereenvoudigd van dubbele weergave naar compacte dag/datumweergave;
- secundaire ISO-datumregel uit de header verwijderd;
- Enter in taak/projectveld triggert in create mode de bestaande form-submit;
- Enter in edit mode doet geen submit en veroorzaakt geen ongewenste update;
- `npm run build` geslaagd;
- localhost gecontroleerd op `http://localhost:3007`;
- card selecteren, andere cel klikken, relocation, datumheader, Enter-to-add, edit, delete en availability gevalideerd;
- browserconsole zonder actuele warnings of errors;
- geen task ordering, tijdslotmodel, employee grouping, drag/drop, backend/API/persistence, packages/frameworks of nieuwe domeinlaag toegevoegd.

Sprint 16 documentair voorbereid:

- nieuwe sprintmap `sprints/sprint-16-multi-materieel-assignment-discovery` toegevoegd;
- `SPRINT.md`, `QA.md` en tickets T1601 t/m T1606 aangemaakt;
- sprint afgebakend als discovery/documentatie-only;
- geen code gewijzigd;
- geen build uitgevoerd;
- geen implementatie gestart;
- harde praktijkrequirement vastgelegd: per taak/project moeten later meerdere materieelitems mogelijk zijn, zoals tractor + frees, camion + aanhangwagen en meerdere machines tegelijk;
- expliciet vastgelegd dat `PlanningItem.resourceId?: string` voorlopig blijft bestaan;
- geen `resourceIds` implementatie toegevoegd;
- geen selectorwijziging uitgevoerd;
- geen conflictservicewijziging uitgevoerd;
- `resourceId` touchpoints gedocumenteerd in types, page state, PlanningForm, ResourceSelector, PlanningCell, PlanningCard, conflictvalidatie en legacy PlanningTable;
- toekomstige contractopties vergeleken:
  - huidig `resourceId` behouden;
  - later `resourceIds?: string[]`;
  - overgangsmodel met adapter/helper.
- adviesrichting voorbereid: Sprint 17 alleen als kleine implementatieslice, bij voorkeur adapter/helper of expliciet klein contractvoorstel, geen brede rename;
- compacte cardweergave gespecificeerd:
  - 0 materieelitems: niets tonen;
  - 1 materieelitem: huidige compacte regel;
  - 2 materieelitems: compacte badges/chips;
  - 3+ materieelitems: eerste 2 plus `+n`.
- selector UX discovery beschreven zonder library:
  - togglebare resultaten;
  - selected summary;
  - wissen per item;
  - alles wissen;
  - selector blijft open tijdens meerdere keuzes;
  - duidelijke sluitactie.
- conflictvalidatie-impact beschreven:
  - elk planningitem levert 0..n materieelboekingen;
  - conflicten per `date + resourceId`;
  - lege collectie is conflictloos;
  - relocation herberekent over alle gekoppelde materieelitems.
- nieuwe datumnotatieguardrail vastgelegd:
  - gebruik `19/05/2026` of `maandag 18 mei 2026`;
  - vermijd `2026-05-19`, maand/dag/jaar en gemengde formaten;
  - controleer conflictmeldingen, summaries, badges/tooltips, selectorcontext, matrixheaders en toekomstige multi-materieel UX-voorstellen.
- geen backend/persistence/API, drag/drop, realtime sync, packages, multi-select library, availability-wijzigingen, resource CRUD/import, volledige planner-redesign, date-library of i18n toegevoegd.

Sprint 17 documentair voorbereid:

- nieuwe sprintmap `sprints/sprint-17-multi-materieel-prototype` toegevoegd;
- `SPRINT.md`, `QA.md` en tickets T1701 t/m T1705 aangemaakt;
- sprint afgebakend als kleine multi-materieel implementatieslice die pas na review mag starten;
- geen code gewijzigd;
- geen build uitgevoerd;
- geen implementatie gestart;
- belangrijk ontwerpbesluit vastgelegd: `PlanningItem.resourceId` blijft voorlopig compatibel;
- `resourceId` blijft primary mirror voor legacy single-resource flow;
- multi-materieel wordt additief voorbereid via helpers/adapters;
- T1701 beschrijft `planning-resources.ts`, `getPlanningItemResourceIds(item)`, `normalizeResourceIds(ids)` en compat write-helper;
- T1702 beschrijft compacte cardweergave:
  - 0 materieelitems: niets tonen;
  - 1 materieelitem: huidige compacte regel;
  - 2 materieelitems: compacte badges/chips;
  - 3+ materieelitems: eerste 2 plus `+n`.
- T1703 beschrijft minimale multi-selector zonder library:
  - selected summary;
  - wissen per item;
  - alles wissen;
  - `Klaar`;
  - selector open houden tijdens meerdere keuzes;
  - bestaande single-flow niet breken.
- T1704 beschrijft conflictvalidatie per materieelitem:
  - elk planningitem levert 0..n boekingen;
  - conflicten per `date + resourceId`;
  - `PlanningConflict.resourceId` voorlopig enkelvoudig houden;
  - Belgische/Nederlandstalige datumweergave bewaken.
- T1705 beschrijft QA voor create/edit/wissen/delete, relocation, planning zonder materieel, 1/2/3+ materieelitems, unavailable cells, conflictbadges en datumweergave;
- verplicht checkpoint na T1701 vastgelegd;
- verplicht checkpoint na T1703 vastgelegd;
- expliciet buiten scope gehouden: backend/persistence/API, drag/drop, packages, multi-select library, availability-wijzigingen, resource CRUD/import, volledige planner-redesign, materialen/artikelen, weekendtoggle, tijdslots, employee grouping en brede contractrename.

---

## Volgende stap

Sprint 32 is afgerond en final planner polish voor praktijkgebruik is uitgevoerd. De planner heeft een read-only werkkaartpreview voor geselecteerde werknemer/dag en een lightweight WorkCard typebasis. De zichtbare structured demo is uit de dagelijkse planner verwijderd. Er is geen actieve implementatiesprint.

Deploymentvoorbereiding is toegevoegd:

- GitHub wordt gebruikt voor codebeheer;
- Vercel wordt gebruikt voor hosting;
- `.gitignore`, `.vercelignore`, `vercel.json`, GitHub CI en een Codex/Vercel deployscript zijn toegevoegd;
- deploymentdocumentatie staat in `docs/DEPLOYMENT_GITHUB_VERCEL.md`;
- secrets blijven buiten de repository.

Aanbevolen volgende richtingen, alleen na expliciete nieuwe opdracht:

1. Work Card praktijkvalidatie
   - valideren of de werkkaartpositie boven de matrix in dagelijks gebruik goed voelt;
   - later eventueel inklapbaar maken als de extra verticale ruimte stoort;
   - geen editor, werkbon, nacalculatie, materialenmodule of persistence zonder aparte beslissing.

2. Work Card structured preview discovery
   - structured demo is gevalideerd en daarna uit de dagelijkse planner verwijderd;
   - later bepalen of project/terreinstructuur opnieuw structureel read-only zichtbaar moet worden;
   - materialen alleen als vrije tekst op terreinniveau behandelen;
   - geen parsing uit `taskName`, editor, persistence of werkbonflow.

3. Resource selector praktijkpolish
   - beoordelen of 239 resources in dagelijks gebruik voldoende scanbaar blijven;
   - eventueel type-filter de-emphasis onderzoeken omdat `Soort` veel raw modelwaarden bevat;
   - geen nieuwe filterarchitectuur, resource CRUD, importflow of fleetmodule zonder aparte beslissing.

4. Resource catalog persistence/import discovery
   - alleen onderzoeken als de seed/in-memory catalogus niet langer volstaat;
   - id-stabiliteit op volledig nummer behouden;
   - geen backend/API of importflow combineren met selector-redesign.

5. Planner productivity refinement
   - kleine praktijkfricties kiezen op basis van dagelijks gebruik;
   - planning-first en dense UX behouden;
   - geen drag/drop, workflow engine, HR-module of grote redesigns.

6. Licht undo-onderzoek
   - later onderzoeken of de laatste planneractie ongedaan gemaakt kan worden;
   - voorkeursrichting: lichte `Ongedaan maken`-toast na create, delete, relocation of edit;
   - nog geen volledige undo/redo engine, historylaag of nieuwe state-engine bouwen.

Niet nu bouwen:

- fleet ERP;
- onderhoud;
- kostprijzen;
- documenten;
- telemetrie;
- resource CRUD;
- materiaal/artikelbeheer;
- werkbonnen;
- nacalculatie;
- werkkaarteditor;
- parsing uit `taskName`;
- print/PDF/WhatsApp;
- backend/API/persistence;
- nieuwe packages;
- drag/drop;
- workflow engine;
- HR/payroll/permissions;
- brede wijziging aan `resourceId/resourceIds`;
- grote selector- of planner-redesigns.

---

## Belangrijke regel

Dit bestand moet na elke sprint of belangrijke wijziging bijgewerkt worden.
