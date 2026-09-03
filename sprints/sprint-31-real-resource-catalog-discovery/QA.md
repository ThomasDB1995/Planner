# Sprint 31 QA - Real Resource Catalog

## Scope

QA richt zich op:

- resource catalog mappingregels;
- volledige catalogusintegratie met 239 resources;
- selector search/display;
- favorites;
- multi-resource selectie;
- planningcard resource display polish;
- conflicts;
- create/edit/delete/relocation/weekjump regressie.

Niet binnen QA-scope:

- fleet ERP;
- onderhoud;
- kostprijzen;
- documenten;
- telemetrie;
- backend/API;
- persistence;
- resource CRUD;
- importflow;
- selector-redesign;
- nieuwe filters;
- wijziging aan `resourceId/resourceIds`.

## Slice 1 - Mapping QA

| Punt | Resultaat |
| --- | --- |
| `Resource.group?: string` blijft optioneel en compatibel | Groen |
| Volledig nummer blijft behouden | Groen |
| `group` wordt afgeleid uit volledig nummer | Groen |
| `id` wordt stabiel uit volledig genormaliseerd nummer afgeleid | Groen |
| `brand` blijft zoekmetadata | Groen |
| `type` bewaart raw `Soort` als detail/searchmetadata | Groen |
| `category` blijft grof | Groen |
| Search neemt `group` mee | Groen |
| Bestaande resources blijven compatibel | Groen |

Gecontroleerde mappingvoorbeelden:

| Nummer | Group | Id |
| --- | --- | --- |
| `0517-TRL-` | `TRL` | `resource-0517-trl` |
| `0388 TAL` | `TAL` | `resource-0388-tal` |
| `0290-MC5 G-` | `MC5` | `resource-0290-mc5-g` |
| `0258 KMB` | `KMB` | `resource-0258-kmb` |
| `0007 WHM*` | `WHM` | `resource-0007-whm` |
| `250` | leeg | `resource-250` |

## Slice 2 - Full Catalog QA

| Punt | Resultaat |
| --- | --- |
| Volledige catalogus laadt correct | Groen |
| Aantal resources | 239 |
| Geen dubbele ids | Groen |
| Selector opent vlot met volledige catalogus | Groen |
| Zoeken op nummer werkt | Groen |
| Zoeken op groep werkt | Groen |
| Zoeken op beschrijving werkt | Groen |
| Zoeken op merk werkt | Groen |
| Resultaten zijn scanbaar | Groen |
| Category-filter blijft bruikbaar | Groen |
| Type-filter werkt technisch | Groen, maar operationeel zwak door veel raw modelwaarden |
| Favorites togglen werkt | Groen |
| Multi-resource selectie werkt | Groen |
| Planningcard blijft compact | Groen |
| Conflicts werken met echte resources | Groen |
| Create/edit/delete blijven werken | Groen |
| Relocation blijft werken | Groen |
| Weekjump blijft werken | Groen |
| Geen merkwaardige lege filteropties | Groen |
| Matrix blijft rustig | Groen |

UX-risico:

- Type-filter bevat veel `Soort`/modelwaarden en is minder bruikbaar als operationele filter. Dit is geen blokkerende bug, maar wel een mogelijk later polishpunt.

## Slice 3 - Planningcard Resource Display QA

| Punt | Resultaat |
| --- | --- |
| Planningcard met 1 resource toont alleen volledig nummer | Groen |
| Voorbeeld single visible | `0511-VCB-` |
| Single-resource tooltip/title toont volledige info | Groen |
| Voorbeeld single tooltip | `0511-VCB- Nissan Townstar` |
| Planningcard met meerdere resources blijft compact | Groen |
| Multi-resource tooltip/title toont volledige info | Groen |
| Matrix voelt rustiger | Groen |
| Selector toont nog volledige resource-info | Groen |
| Search blijft werken | Groen |
| Conflicts blijven werken | Groen |
| Create/edit/delete blijven werken | Groen |
| Relocation blijft werken | Groen |

Browser-QA bevestigde:

- single-resource card text: `QA single resource x 0511-VCB-`;
- single-resource title: `0511-VCB- Nissan Townstar`;
- multi-resource card text: `QA multi resource x 0511-VCB- 0510-VCB-`;
- multi-resource title: `0511-VCB- Nissan Townstar, 0510-VCB- Volkswagen Crafter`;
- search groen op nummer, groep, beschrijving en merk;
- conflictbadge zichtbaar;
- edit mode actief;
- delete werkt;
- relocation werkt via `Verplaats naar actieve cel`.

## Rooster-Polish QA

Gecontroleerd:

- dagheaders staan visueel gecentreerd;
- werknemerrijen hebben subtiele alternerende shading;
- linkse werknemerkolom werkt als scananker;
- weekendkolommen zijn subtiel herkenbaar;
- categoriebalken onderscheiden zich beter van gewone rijen;
- availability styling blijft dominant boven neutrale row/weekend shading;
- selected cell blijft dominant;
- relocation/destination styling blijft dominant;
- planningcards blijven dominant;
- geen businesslogica gewijzigd.

## Buildstatus

Geslaagd tijdens Sprint 31:

- `npm run build`

## Bugs

Open bugs: nee.

## Advies

Sprint 31 afronden.

Geen verdere polish nodig voor planningcard resource display. Eventuele volgende resource-UX stap moet apart worden besloten en mag geen fleetmodule, importflow of selector-redesign impliceren.
