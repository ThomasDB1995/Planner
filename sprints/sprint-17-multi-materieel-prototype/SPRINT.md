# Sprint 17 - Multi-Materieel Prototype

## Sprintstatus

Afgerond.

T1701 t/m T1705 zijn uitgevoerd.

## Sprintdoel

Een kleine implementatieslice voorbereiden waarmee planningitems meerdere materieelitems kunnen ondersteunen, zonder de bestaande single-resource flow te breken.

Sprint 17 is uitgevoerd als kleine implementatieslice. Build, localhost-QA, regressie en closure zijn afgerond.

## Context

Sprint 16 heeft bevestigd:

- multi-materieel is een harde praktijkrequirement;
- voorbeelden zijn tractor + frees, camion + aanhangwagen en meerdere machines tegelijk;
- een brede `resourceId` naar `resourceIds` refactor is te riskant;
- de bestaande planner werkt operationeel goed;
- `PlanningItem.resourceId?: string` zit in create, edit, selector, cardweergave, conflictvalidatie en legacy table;
- carddensity en regressiebeperking zijn belangrijker dan brute snelheid.

## Belangrijk Ontwerpbesluit

Sprint 17 mag alleen additief voorbereiden.

Voorlopig blijft compatibel:

- `PlanningItem.resourceId?: string`;
- bestaande single-resource create flow;
- bestaande single-resource edit flow;
- bestaande planning zonder materieel;
- bestaande relocation op `employeeId` en `date`;
- bestaande availability guardrail.

Multi-materieel wordt voorbereid via helpers/adapters die materieelkeuzes normaliseren naar een lijst.

`resourceId` blijft voorlopig de primary mirror voor legacy single-resource compatibiliteit. Er komt geen brede contractrename en geen volledige migratie.

## In Scope

- een kleine helperlaag, conceptueel `planning-resources.ts`;
- `getPlanningItemResourceIds(item)` voor read-normalisatie;
- `normalizeResourceIds(ids)` voor deduplicatie en lege waarden;
- compat write-helper die `resourceId` als primary mirror behoudt;
- compacte cardweergave voor 0, 1, 2 en 3+ materieelitems;
- minimale multi-selector zonder library;
- selected summary;
- wissen per item;
- alles wissen;
- expliciete sluitactie `Klaar`;
- selector open houden tijdens meerdere keuzes;
- conflictvalidatie per afgeleide materieelboeking;
- `PlanningConflict.resourceId` voorlopig enkelvoudig houden;
- Belgische/Nederlandstalige datumweergave in conflictmeldingen bewaken;
- regressievalidatie van create, edit, wissen, delete, relocation, unavailable cells, conflictbadges en datumweergave.

## Buiten Scope

- backend/persistence/API;
- drag/drop;
- packages;
- multi-select library;
- nieuwe frameworks;
- availability-wijzigingen;
- resource CRUD/import;
- volledige planner-redesign;
- materialen/artikelen;
- weekendtoggle;
- tijdslots;
- employee grouping;
- brede `resourceId` naar `resourceIds` contractrename;
- server-autosave;
- realtime sync;
- resourceplanningmodule;
- globale date-library;
- internationalization/i18n.

## Ticketvolgorde

1. T1701 - Adapter/helper en compatcontract
2. T1702 - Compacte cardweergave
3. T1703 - Minimale multi-selector
4. T1704 - Conflictvalidatie per materieelitem
5. T1705 - QA, regressie en closure

## Verplichte Checkpoints

### Checkpoint Na T1701

Na T1701 moet eerst worden gereviewd:

- of `resourceId` single-resource compatibiliteit intact blijft;
- of de helper geen verborgen parallel contract introduceert;
- of lege, enkelvoudige en dubbele resourcewaarden correct genormaliseerd zijn;
- of de write-helper `resourceId` als primary mirror behoudt;
- of verdere UI-aanpassing veilig genoeg is.

Zonder akkoord op dit checkpoint mag T1702 niet starten.

### Checkpoint Na T1703

Na T1703 moet eerst worden gereviewd:

- of de multi-selector compact genoeg blijft onder de sticky form;
- of single-resource flow niet verslechterd is;
- of wissen per item en alles wissen duidelijk zijn;
- of `Klaar` niet aanvoelt als server-save;
- of create en edit nog begrijpelijk zijn.

Zonder akkoord op dit checkpoint mag T1704 niet starten.

## Contractrichting

De implementatie mag later additief werken met een 0..n helpermodel.

Conceptuele helperverantwoordelijkheden:

- `getPlanningItemResourceIds(item)` geeft altijd een lijst terug;
- bestaande `item.resourceId` wordt gelezen als lijst met 0 of 1 item;
- toekomstige `item.resourceIds` mag alleen additief en via helper worden gelezen als dit expliciet wordt goedgekeurd;
- duplicaten worden verwijderd;
- lege strings, `undefined` en ontbrekende waarden worden genegeerd;
- `resourceId` blijft de eerste geselecteerde resource of `undefined`;
- planningitems zonder materieel blijven conflictloos.

Geen directe volledige rename:

- geen massale propwijziging zonder helper;
- geen verwijdering van `resourceId`;
- geen migratie van alle bestaande callsites in 1 keer;
- geen wijziging die legacy single-resource gedrag breekt.

## Cardweergave

Regels:

- 0 materieelitems: niets tonen;
- 1 materieelitem: huidige compacte regel behouden;
- 2 materieelitems: compacte badges/chips tonen met materieelnummers;
- 3+ materieelitems: eerste 2 tonen en daarna `+n`;
- volledige namen alleen in tooltip/title of detailcontext;
- taak/project blijft de primaire scanregel;
- conflictbadges blijven zichtbaar;
- cardhoogte mag niet structureel groeien.

## Selector UX

De minimale multi-selector moet zonder library worden voorbereid.

Gedrag:

- zoeken en filteren blijven bestaan;
- resultaten zijn togglebaar;
- gekozen items verschijnen in een selected summary;
- gekozen items kunnen per item worden gewist;
- `Alles wissen` wist alle gekozen items;
- selector blijft open tijdens meerdere keuzes;
- `Klaar` sluit de selector zonder server-save semantiek;
- bestaande single-resource flow mag niet kapot gaan.

## Conflictvalidatie

Regel:

- elk planningitem levert 0..n materieelboekingen;
- elke boeking is conceptueel `planningItemId + date + resourceId`;
- conflicten ontstaan per `date + resourceId`;
- `PlanningConflict.resourceId` blijft voorlopig enkelvoudig;
- conflictmeldingen gebruiken Belgische/Nederlandstalige datumweergave;
- availability-regels blijven onaangeraakt.

## Datumnotatie Guardrail

Wel gebruiken:

- `19/05/2026`;
- `maandag 18 mei 2026`.

Niet gebruiken:

- `2026-05-19`;
- maand/dag/jaar;
- gemengde formaten.

Controlepunten:

- conflictmessages;
- `ConflictSummary`;
- card badge titles/tooltips;
- selectorcontext als die datum toont;
- QA-notities.

## Acceptance Criteria

Sprint 17 is klaar wanneer:

- adapter/helperlaag is toegevoegd;
- `resourceId` compatibel blijft;
- `resourceIds` additief is;
- compacte cardweergave 0, 1, 2 en 3+ ondersteunt;
- minimale multi-selector werkt zonder library;
- conflictvalidatie per materieelitem loopt;
- build geslaagd is;
- localhost-QA geslaagd is;
- `PROJECT_STATE.md` is bijgewerkt;
- `docs/Planning_UX_Domain_Findings.md` is bijgewerkt;
- geen out-of-scope features zijn toegevoegd.

## Sprintresultaat

Sprint 17 Multi-Materieel Prototype is geslaagd.

Opgeleverd:

- `PlanningItem.resourceIds?: string[]` additief toegevoegd;
- `resourceId` blijft primary mirror;
- helperlaag voor lezen/schrijven van resourcekoppelingen;
- compacte multi-materieel cardweergave;
- minimale multi-selector zonder library;
- create/edit flow met 0..n materieelitems;
- conflictvalidatie per `date + resourceId`;
- Belgische/Nederlandstalige datumweergave in conflictmeldingen;
- build en localhost-regressie geslaagd.

Niet toegevoegd:

- backend/persistence/API;
- packages;
- drag/drop;
- availability-wijzigingen;
- resource CRUD/import;
- brede contractrename;
- grote redesigns.
