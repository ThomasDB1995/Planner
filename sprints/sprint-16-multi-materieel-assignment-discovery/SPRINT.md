# Sprint 16 - Multi-Materieel Assignment Discovery

## Sprintstatus

Voorbereid voor review.

T1601 t/m T1606 zijn documentair uitgewerkt.

## Sprintdoel

Voorbereiden hoe planningitems later meerdere materieelitems kunnen bevatten zonder matrixdensity, conflictvalidatie of bestaande planner-UX te breken.

Sprint 16 is bewust discovery-only. Er wordt geen code gewijzigd, geen build uitgevoerd en geen implementatie gestart.

## Context

Sprint 15 is afgerond:

- matrixplanning is operationeel sterker geworden;
- create, edit, delete en relocation werken lokaal;
- directe lokale editing werkt via het bestaande formulier;
- sticky ergonomie en compacte density zijn behouden;
- availability werkt als visuele guardrail;
- materieel is optioneel;
- zichtbare UI gebruikt `Materieel`;
- interne contracten blijven voorlopig `Resource`, `resourceId` en `ResourceSelector`;
- drag/drop is nog niet gerechtvaardigd.

Nieuwe harde praktijkrequirement:

- per taak/project moeten later meerdere materieelitems mogelijk zijn;
- voorbeelden: tractor + frees, camion + aanhangwagen, meerdere machines tegelijk;
- planningitems zonder materieel blijven geldig.

## Belangrijk Ontwerpbesluit

Sprint 16 wijzigt geen contract.

Voorlopig blijft bestaan:

- `PlanningItem.resourceId?: string`;
- enkelvoudige `ResourceSelector`;
- bestaande conflictservice;
- bestaande cardweergave;
- bestaande create/edit/relocation-flow.

Er wordt geen `resourceIds` implementatie toegevoegd in Sprint 16.

## In Scope

- `resourceId` touchpoints documenteren;
- contractimpact van 0..n materieelitems voorbereiden;
- toekomstige contractopties vergelijken;
- compacte cardweergave voor 0, 1, 2 en 3+ materieelitems specificeren;
- selector-UX voor meerdere keuzes ontwerpen zonder library;
- conflictvalidatie-impact uitschrijven;
- Belgische/Nederlandstalige datumnotatie bewaken in toekomstige voorstellen;
- Go/No-Go bepalen voor een mogelijke Sprint 17 implementatieslice.

## Buiten Scope

- codewijzigingen;
- build uitvoeren;
- localhost-QA;
- `resourceIds` implementeren;
- `PlanningItem` contract wijzigen;
- `ResourceSelector` aanpassen;
- conflictservice wijzigen;
- backend/persistence/API;
- drag/drop;
- realtime sync;
- packages;
- multi-select library;
- availability-wijzigingen;
- resource CRUD/import;
- volledige planner-redesign;
- globale date-library;
- internationalization/i18n.

## Ticketvolgorde

1. T1601 - Contract-impact inventariseren
2. T1602 - Future contract decision voorbereiden
3. T1603 - Compacte cardweergave specificeren
4. T1604 - Selector UX discovery
5. T1605 - Conflictvalidatie-impact uitschrijven
6. T1606 - Review / Go-No-Go

## Contract-Impact Samenvatting

Huidige single-resource touchpoints:

- `PlanningItem.resourceId?: string`;
- `PlanningFormState.resourceId`;
- `onEditChange` met `Partial<Pick<PlanningItem, "taskName" | "resourceId">>`;
- `ResourceSelectorProps.selectedResourceId`;
- `ResourceSelectorProps.onSelect(resourceId)`;
- `PlanningCell` zoekt exact 1 resource voor een card;
- `PlanningCard` ontvangt `resource: Resource | undefined`;
- `findPlanningConflicts` groepeert op `date + resourceId`;
- `PlanningConflict.resourceId`;
- legacy `PlanningTable` toont 1 materieelitem;
- create reset wist 1 resourcekeuze;
- edit mode wijzigt 1 resourcekeuze direct lokaal.

Belangrijkste risico:

Een directe rename van `resourceId` naar `resourceIds` lijkt klein, maar raakt bijna alle create/edit/card/conflict-paden. Daarom is eerst een kleine implementatieslice met adapter/helper veiliger dan een brede contractrefactor.

## Toekomstige Contractopties

### Optie A - Huidig `resourceId` behouden

Voordelen:

- geen regressierisico;
- huidige UX blijft stabiel;
- conflictvalidatie blijft eenvoudig;
- geschikt zolang maximaal 1 materieelitem nodig is.

Nadelen:

- voldoet niet aan de praktijkrequirement;
- tractor + frees of camion + aanhangwagen blijft niet correct modelleerbaar;
- workaround via meerdere planningcards vervuilt planningdensity en conflictcontext.

### Optie B - Later `resourceIds?: string[]`

Voordelen:

- sluit direct aan op 0..n materieelitems;
- conflictvalidatie kan per gekoppeld materieelitem lopen;
- cardweergave kan compacte collecties tonen;
- lege array of undefined blijft geldig voor planning zonder materieel.

Nadelen:

- brede contractwijziging;
- create/edit/selector/card/conflicts/legacy table moeten tegelijk mee;
- migratiepad van bestaande `resourceId` moet expliciet zijn;
- risico op densityverlies als UI niet compact genoeg is.

### Optie C - Overgangsmodel met adapter/helper

Voordelen:

- bestaande `resourceId` kan voorlopig blijven;
- helper kan resources normaliseren naar een array voor UI/conflictvoorstellen;
- implementatieslice kan kleiner starten;
- migratierisico wordt zichtbaar voordat het typecontract definitief wijzigt.

Nadelen:

- tijdelijk twee denkmodellen;
- helper mag geen verborgen pseudo-contract worden;
- vraagt discipline om geen half geimplementeerde multi-materieel UI te maken.

## Adviesrichting

Advies voor Sprint 17: alleen starten als een kleine implementatieslice wordt goedgekeurd die begint met een adapter/helper en compacte card/selector-regels.

Niet starten met een brede rename naar `resourceIds`.

Mogelijke Sprint 17-richting:

- voeg een kleine read-helper toe die `PlanningItem.resourceId` als 0..1 array behandelt;
- toon de toekomstige cardweergave nog niet volledig tenzij het contract expliciet wordt uitgebreid;
- of maak eerst een prototype/fixture-only UX-documentatie zonder productcode.

Voor echte multi-materieel implementatie is later waarschijnlijk `resourceIds?: string[]` logisch, maar die beslissing wordt in Sprint 16 nog niet geforceerd.

## Compacte Cardweergave

Toekomstige UX-regels:

- 0 materieelitems: niets tonen;
- 1 materieelitem: huidige compacte regel behouden;
- 2 materieelitems: compacte badges/chips met nummers tonen;
- 3+ materieelitems: eerste 2 tonen plus `+n`;
- volledige namen alleen in tooltip/title of detailcontext;
- materieel blijft secundair onder taak/project;
- conflictbadges blijven zichtbaar en mogen niet verdrongen worden;
- cardhoogte mag niet structureel groeien door lange materieelnamen.

Density blijft leidend.

## Selector UX Discovery

Toekomstige selector zonder library:

- resultaten zijn togglebaar;
- gekozen items verschijnen in een selected summary;
- elk gekozen item kan apart gewist worden;
- er is een `Alles wissen` actie wanneer meerdere items gekozen zijn;
- selector blijft open tijdens meerdere keuzes;
- duidelijke sluitactie, bijvoorbeeld `Klaar`;
- bestaande zoek/filterfunctionaliteit blijft bruikbaar;
- geen multi-select library;
- geen popover/modal-framework;
- geen drag/drop binnen selectie;
- geen bulk-acties buiten de selector.

Belangrijk verschil met Sprint 13:

- auto-collapse blijft logisch bij enkelvoudige keuze;
- bij multi-materieel zou auto-collapse na elke keuze juist frictie geven;
- daarom moet multi-keuze een expliciete afronding krijgen.

## Conflictvalidatie Impact

Toekomstige regel:

- elk planningitem levert 0..n materieelboekingen;
- conflicten ontstaan per `date + resourceId`;
- een planningitem zonder materieel levert geen materieelboekingen;
- een lege collectie is conflictloos;
- dezelfde resource gekoppeld aan meerdere planningitems op dezelfde datum geeft een waarschuwing;
- relocation herberekent conflicten over alle gekoppelde materieelitems op de nieuwe datum;
- conflictmeldingen moeten Belgische/Nederlandstalige datumnotatie gebruiken.

Voorbeeld gewenst formaat:

- `19/05/2026`;
- `maandag 18 mei 2026`.

Niet gewenst:

- `2026-05-19`;
- maand/dag/jaar;
- gemengde formaten.

## Datumnotatie Guardrail

Sprint 16 legt vast dat toekomstige multi-materieel UX-voorstellen consistente Belgische/Nederlandstalige datumnotatie moeten bewaken in:

- conflictmeldingen;
- summaries;
- badges en tooltips;
- selectorcontext;
- matrixheaders;
- toekomstige multi-materieel reviewdocs.

Er wordt nog geen globale date-library toegevoegd en geen i18n-laag gebouwd.

## Acceptance Criteria

Sprint 16 is klaar wanneer:

- `SPRINT.md` is aangemaakt;
- `QA.md` is aangemaakt;
- tickets T1601 t.e.m. T1606 zijn aangemaakt;
- alle gevraagde touchpoints zijn documentair benoemd;
- toekomstige contractopties zijn vergeleken;
- compacte cardweergave is gespecificeerd;
- selector-UX zonder library is beschreven;
- conflictvalidatie-impact is uitgeschreven;
- datumnotatieguardrail is vastgelegd;
- `PROJECT_STATE.md` is bijgewerkt;
- `docs/Planning_UX_Domain_Findings.md` is bijgewerkt;
- geen code is gewijzigd;
- geen build is uitgevoerd;
- geen implementatie is gestart.

## Discovery-Conclusie

Multi-materieel is functioneel gerechtvaardigd door de praktijkvoorbeelden, maar technisch en UX-matig breder dan een simpele veldwijziging.

De veiligste lijn is:

1. huidige single-resource contracten voorlopig stabiel houden;
2. multi-materieel eerst als 0..n concept ontwerpen;
3. densityregels vastzetten voordat selector/card-code wijzigt;
4. conflictvalidatie per materieelboeking modelleren;
5. pas daarna een kleine Sprint 17 implementatieslice goedkeuren.

## Go/No-Go Voor Sprint 17

Advies: voorzichtig Go voor een kleine implementatieslice, mits strikt afgebakend.

Voorwaarden:

- geen backend/persistence/API;
- geen drag/drop;
- geen packages of multi-select library;
- geen availability-wijzigingen;
- geen brede planner-redesign;
- eerst adapter/helper of klein contractvoorstel expliciet goedkeuren;
- carddensity en conflictvalidatie blijven leidend;
- Belgische/Nederlandstalige datumnotatie wordt bewaakt.

Geen Go voor een brede `resourceId` naar `resourceIds` refactor in een keer.
