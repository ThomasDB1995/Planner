# QA - Sprint 17 Multi-Materieel Prototype

## Status

Afgerond.

## Doel Van QA

Valideren dat Sprint 17 als kleine multi-materieel implementatieslice is afgerond zonder scopegroei.

## Buildstatus

Geslaagd.

Uitgevoerd:

- `npm run build`

Resultaat:

- Next.js production build geslaagd;
- TypeScript-validatie geslaagd;
- static generation geslaagd.

## Localhoststatus

Geslaagd.

Uitgevoerd:

- devserver gestart op `http://localhost:3014`;
- localhost-regressie uitgevoerd;
- browserconsole gecontroleerd.

Resultaat:

- app rendert;
- browserconsole zonder actuele warnings of errors;
- devserver na QA gestopt;
- tijdelijke devserverlogs opgeruimd.

## Testresultaten

| Scenario | Resultaat | Status |
| --- | --- | --- |
| Planning zonder materieel | Card toont geen materieelregel en geeft geen conflict | Geslaagd |
| Planning met 1 materieel | Card behoudt compacte tekstregel, conflict werkt | Geslaagd |
| Planning met 2 materieelitems | Card toont compacte nummerlabels | Geslaagd |
| Planning met 3+ materieelitems | Card toont eerste 2 nummers plus `+n` | Geslaagd |
| Create flow | 0, 1, 2 en 3+ materieelitems aangemaakt | Geslaagd |
| Edit toevoegen | Materieel toevoegen aan bestaand item werkt direct lokaal | Geslaagd |
| Edit per item wissen | Gekozen materieel per item wissen werkt | Geslaagd |
| Edit alles wissen | `Alles wissen` verwijdert alle gekoppelde materieelitems | Geslaagd |
| Delete | Card verwijderen werkt en ruimt conflictcontext mee op | Geslaagd |
| Relocation | Verplaatsen wijzigt datum/werknemer en herberekent conflicts | Geslaagd |
| Availability | Unavailable cell blijft visuele guardrail; conflictcount wijzigt niet door availability | Geslaagd |
| Conflictbadges | Badges blijven compact zichtbaar op betrokken cards | Geslaagd |
| Conflict summary | Summary toont juiste materieelitems en waarschuwingcount | Geslaagd |
| Datumweergave conflictmeldingen | Conflictregels tonen `20/05/2026`, geen ISO-datum | Geslaagd |
| `resourceId` primary mirror | Eerste gekozen materieelitem blijft primary mirror | Geslaagd |
| `resourceIds` compatlaag | Additieve lijst werkt via helperlaag | Geslaagd |
| Selector-density/sticky form | Selector blijft compact genoeg voor prototype | Geslaagd |
| Browserconsole | Geen actuele warnings of errors | Geslaagd |

## Contractcontrole

Vastgelegd en gevalideerd:

- `PlanningItem.resourceId?: string` blijft compatibel;
- `PlanningItem.resourceIds?: string[]` is additief;
- `resourceId` blijft primary mirror en bewaart het eerste gekozen materieelitem;
- helperlaag is het verplichte pad voor toekomstige resource-writes;
- `getPlanningItemResourceIds(item)` is het pad om resourcekoppelingen te lezen;
- `withPlanningItemResourceIds(item, resourceIds)` is het pad om resourcekoppelingen te schrijven;
- `PlanningConflict.resourceId` blijft voorlopig enkelvoudig;
- conflictvalidatie loopt per afgeleide materieelboeking.

## Datumnotatiecontrole

Geslaagd voor conflictmeldingen:

- summary toont `20/05/2026`;
- conflictmessage toont `20/05/2026`;
- conflictbadge tooltip/title toont `20/05/2026`;
- geen zichtbare ISO-datum in conflictmeldingen.

Bekend buiten deze scope:

- formuliercontext en native datuminput kunnen nog technische datumwaarden zoals `2026-05-20` tonen;
- dat is geen T1704/T1705-regressie omdat deze sprint conflictmeldingen bewaakte.

## Scopecontrole

Niet toegevoegd:

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
- global date-library;
- i18n-laag.

## UX-Conclusie

Multi-materieel is bruikbaar als prototype binnen de bestaande planner.

De selector is compact genoeg voor deze fase:

- gekozen items zijn scanbaar in de summary;
- `Klaar` werkt als lokale sluitactie;
- selector blijft open tijdens meerdere keuzes;
- sticky form blijft bruikbaar.

Open UX-aandachtspunt:

- bij veel gekozen materieelitems kan de selected summary extra hoogte vragen;
- veel conflictbadges op 1 card kunnen de card drukker maken.

## QA-Beperkingen

- Browserautomation tekstinvoer blijft beperkt door virtual-clipboardgedrag;
- QA gebruikte waar nodig keypress-gestuurde tekstinvoer;
- echte praktijkstress met 200+ resources blijft later handmatig te beoordelen.

## QA-Conclusie

Sprint 17 Multi-Materieel Prototype is QA-matig geslaagd.

De implementatie voldoet aan de afgesproken scope:

- multi-materieel prototype werkt;
- `resourceId` blijft compatibel;
- `resourceIds` is additief;
- conflictvalidatie loopt per materieelitem;
- bestaande create/edit/delete/relocation/availability flow blijft werken;
- geen out-of-scope features toegevoegd.
