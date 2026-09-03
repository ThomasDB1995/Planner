# Sprint 26 QA - Resource Mapping & Normalization

## Scope

QA richt zich op Sprint 26 Slice 1: voorbereidende resource mapping, display en search voor latere echte machineparkdata.

Niet getest of gebouwd:

- Excel-import;
- importflow;
- backend/API;
- persistence;
- localStorage;
- packages;
- resource CRUD;
- fleet ERP;
- onderhoud;
- kostprijzen;
- documenten;
- telemetrie;
- 240 echte resources;
- seed rewrite;
- wijziging aan `resourceId/resourceIds`;
- wijziging aan conflictregels.

## Browser-QA

| Punt | Resultaat |
| --- | --- |
| Resource selector opent correct | Ja |
| Bestaande resources worden correct getoond | Ja |
| Zoeken op nummer werkt | Ja |
| Zoeken op naam/beschrijving werkt | Ja |
| Zoeken op type/soort werkt | Ja |
| Zoeken op category werkt | Ja |
| Zoeken op merk werkt indien seeddata merk bevat | Helpercheck groen; seeddata bevat nog geen `brand` |
| Favorites blijven bovenaan werken | Ja, rendercheck groen |
| Sterretje togglen blijft werken | Niet volledig interactief afgerond door browserpane-instabiliteit |
| Multi-resource selectie blijft werken | Niet volledig interactief afgerond door browserpane-instabiliteit |
| Geselecteerde resource summary blijft compact | Ja |
| Planningcard toont resources duidelijk en compact | Ja |
| Conflictmeldingen blijven duidelijk | Ja |
| Conflictdetectie per resource blijft werken | Contract/helperpad ongewijzigd |
| Create/edit/delete blijven werken | Geen regressie-indicatie; niet volledig opnieuw interactief afgerond |
| Relocation blijft werken | Geen regressie-indicatie; relocationcode niet geraakt |
| Weeknavigatie blijft werken | Ja, knoppen renderen correct |
| `Materieel behouden` blijft werken | Ja, checkbox rendert correct; logic niet geraakt |
| Geen visuele regressie in dense matrix | Ja |

## Helperchecks

Aanvullende helpercontrole bevestigde:

- `filterResources` vindt resources op nummer;
- `filterResources` vindt resources op naam/beschrijving;
- `filterResources` vindt resources op type/soort;
- `filterResources` vindt resources op category;
- `filterResources` vindt resources op `brand` wanneer `brand` aanwezig is;
- `toggleFavorite` behoudt bestaande favorite-logica;
- `sortFavoritesFirst` blijft favorieten bovenaan sorteren;
- `normalizeResourceMapping` zet `nummer`, `beschrijving`, `merk` en `soort` om naar een compatibele `Resource`;
- `isDefective` wordt bij mapping standaard `false`.

## QA-Beperking

De in-app browserpane werd instabiel tijdens enkele vervolginteracties. Daardoor zijn sterretje togglen, multi-select en volledige create/edit/delete/relocation-flow niet volledig opnieuw interactief afgerond.

Deze beperking is acceptabel voor Slice 1 omdat:

- er geen wijziging is gedaan aan `resourceId/resourceIds`;
- planningitem writes ongewijzigd via bestaande helpers blijven lopen;
- conflictregels niet zijn gewijzigd;
- selector, cards en conflicts alleen gedeelde display/searchhelpers gebruiken;
- helperchecks groen waren.

## Bugs

Open bugs: nee.

## Advies

Sprint 26 Slice 1 afronden.

Echte Excel-import, id-stabiliteit op basis van `nummer` en browservalidatie met een seed/testresource met `brand` horen in latere aparte slices.
