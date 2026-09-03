# Sprint 28 QA - Grid Readability & Planner Scanability

## Scope

QA richt zich op Sprint 28 Slice 1: roosterlijn-hiërarchie versterken in de bestaande matrixplanner.

Niet getest of gebouwd:

- nieuwe state;
- nieuwe interacties;
- hoverlogica;
- crosshair;
- card-redesign;
- grotere cellen;
- drag/drop;
- backend/API;
- persistence;
- packages;
- wijzigingen aan planning-, conflict-, relocation- of availabilitylogica.

## Browser-QA

QA is uitgevoerd op de lokale planner met realistische werknemerslijst.

| Punt | Resultaat |
| --- | --- |
| Matrix voelt duidelijker als rooster/tabel | Ja |
| Werknemer x dag is sneller herkenbaar | Ja |
| Verticale daggrenzen zijn duidelijk genoeg | Ja |
| Horizontale werknemerrijen zijn duidelijk genoeg | Ja |
| Lijnen zijn niet te zwaar of Excel-oud | Ja |
| Availability blijft duidelijk zichtbaar | Ja |
| Availability breekt het rooster niet meer | Ja |
| Categorie-separators blijven subtiel | Ja |
| Planningcards blijven dominant | Ja |
| Selected cell blijft zichtbaar | Ja |
| Relocation styling blijft zichtbaar | Ja |
| Conflictbadges blijven opvallend | Ja |
| Matrix blijft compact en rustig | Ja |
| Create/edit/delete/relocation/weeknavigatie blijven intact | Ja |

## QA-Observaties

- Verticale dagkolommen zijn beter te volgen dan voorheen.
- Horizontale werknemerrijen zijn subtieler dan de daggrenzen, maar voldoende bruikbaar.
- Availability-cellen behouden hun zachte contextkleur zonder het raster visueel te breken.
- Category separators blijven rustig en concurreren niet met de dagheaders.
- Planningcards blijven primair in bezette cellen.
- Selected cell, relocation destination en conflictbadges blijven herkenbaar boven de gridlaag.

## Buildstatus

Geslaagd.

Uitgevoerd na implementatie:

- `npm run build`;
- Next production build;
- TypeScript-validatie via build.

## Bugs

Open bugs: nee.

## Resterend Risico

Bij langdurig praktijkgebruik kan blijken dat rijoriëntatie bij grote employee-aantallen nog sterker moet. De aanbevolen vervolgstap zou dan een subtiele row/focus-anker slice zijn, niet het zwaarder maken van alle gridlijnen.

## Advies

Sprint 28 Slice 1 afronden.
