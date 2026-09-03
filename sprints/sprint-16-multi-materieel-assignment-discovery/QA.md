# QA - Sprint 16 Multi-Materieel Assignment Discovery

## Status

Voorbereid voor review.

## Doel Van QA

Valideren dat Sprint 16 volledig documentair is uitgewerkt en geen implementatie, build of codewijziging bevat.

## Buildstatus

Niet uitgevoerd.

Reden:

- Sprint 16 is documentatie-only;
- gebruiker heeft expliciet gevraagd geen build uit te voeren;
- er zijn geen codewijzigingen gedaan.

## Localhoststatus

Niet uitgevoerd.

Reden:

- geen implementatie gestart;
- geen UI-code gewijzigd;
- geen localhost-QA nodig voor deze discovery-sprint.

## Documentatiecontrole

| Controle | Verwacht resultaat | Status |
| --- | --- | --- |
| Sprintdocument | `SPRINT.md` bestaat en beschrijft doel, scope, tickets en Go/No-Go | Te reviewen |
| QA-document | `QA.md` bestaat en bewaakt documentatie-only scope | Te reviewen |
| T1601 | Contract-impact en `resourceId` touchpoints zijn gedocumenteerd | Te reviewen |
| T1602 | Contractopties zijn vergeleken zonder beslissing te forceren | Te reviewen |
| T1603 | Compacte cardweergave voor 0, 1, 2 en 3+ items is gespecificeerd | Te reviewen |
| T1604 | Selector UX zonder library is beschreven | Te reviewen |
| T1605 | Conflictvalidatie-impact voor 0..n materieelboekingen is beschreven | Te reviewen |
| T1606 | Review / Go-No-Go voor Sprint 17 is vastgelegd | Te reviewen |
| PROJECT_STATE | Projectstatus is bijgewerkt met Sprint 16 discovery | Te reviewen |
| UX findings | Planning UX/domain findings zijn bijgewerkt | Te reviewen |
| Scopecontrole | Geen code, build of implementatie toegevoegd | Te reviewen |

## Scopecontrole

Niet uitgevoerd of toegevoegd:

- codewijzigingen;
- build;
- localhost-QA;
- `resourceIds` implementatie;
- `PlanningItem` contractwijziging;
- selectorwijziging;
- conflictservicewijziging;
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

## Contractreview

Sprint 16 bevestigt dat de volgende bestaande contracten voorlopig blijven:

- `Resource`;
- `resourceId`;
- `ResourceSelector`;
- `PlanningItem.resourceId?: string`;
- enkelvoudige optionele materieelkeuze.

Belangrijkste contractrisico's:

- een directe `resourceIds` refactor raakt create, edit, selector, card, conflictvalidatie en legacy table tegelijk;
- conflictvalidatie moet later per gekoppeld materieelitem lopen, niet per planningitem;
- carddensity kan verslechteren als meerdere materieelitems als volledige namen worden getoond;
- selector auto-collapse uit Sprint 13 past niet vanzelf bij multi-keuze;
- datumnotatie kan inconsistent worden als nieuwe conflictmeldingen ISO-datums blijven tonen.

## Datumnotatiecontrole

Toekomstige multi-materieel voorstellen moeten Belgische/Nederlandstalige datumweergave gebruiken.

Wel:

- `19/05/2026`;
- `maandag 18 mei 2026`.

Niet:

- `2026-05-19`;
- maand/dag/jaar;
- gemengde formaten.

Controlepunten:

- conflictmeldingen;
- summaries;
- badges en tooltips;
- selectorcontext;
- matrixheaders;
- toekomstige multi-materieel UX-voorstellen.

Nog niet doen:

- globale date-library toevoegen;
- i18n-laag bouwen;
- bestaande code formatteren zonder aparte implementatiescope.

## Go/No-Go Beoordeling

Advies: voorzichtig Go voor Sprint 17, alleen als kleine implementatieslice.

Toegestane richting voor Sprint 17:

- eerst adapter/helper of klein contractvoorstel;
- geen brede rename;
- densityregels voor cards respecteren;
- conflictvalidatie per materieelboeking voorbereiden;
- selector zonder library klein houden;
- datumnotatie bewaken.

Geen Go voor:

- brede `resourceId` naar `resourceIds` refactor in een keer;
- multi-select library;
- drag/drop;
- persistence/backend/API;
- availability-herwerking;
- volledige planner-redesign.

## QA-Conclusie

Sprint 16 is documentair klaar voor review wanneer alle documenten aanwezig zijn en de scopecontrole bevestigt dat geen code of build is geraakt.
