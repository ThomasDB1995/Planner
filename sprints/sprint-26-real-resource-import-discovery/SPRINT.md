# Sprint 26 - Real Resource Import Discovery

## Slice 1 - Resource Mapping & Normalization

Status: afgerond.

## Doel

Voorbereiden hoe echte machineparkdata uit Excel later veilig naar planner-resources kan worden gemapt, zonder nu al een importflow, backend, persistence of massale seed-rewrite te bouwen.

## Mapping

Excelvelden worden operationeel gemapt als:

- `nummer` -> `Resource.number`;
- `beschrijving` -> `Resource.name`;
- `merk` -> `Resource.brand?`;
- `soort` -> `Resource.type` en afgeleide grove `Resource.category`.

`Resource.number` blijft het primaire scananker in selector, cards en conflictcontext.

`Resource.name` blijft de compacte displaynaam. Dit hoort een korte operationele beschrijving te zijn, geen volledige fleetomschrijving.

`Resource.brand` is optionele context en zoekmetadata. Het is niet bedoeld als dominante UI-laag in de matrix.

`Resource.type` bewaart de operationele soort. `Resource.category` blijft beperkt tot:

- `machine`;
- `voertuig`;
- `werktuig`;
- `aanhanger`.

`Resource.isDefective` blijft lightweight plannerstatus en krijgt bij genormaliseerde mapping standaard `false`.

## Helperlaag

Voorbereid in `src/lib/planning/resources.ts`:

- `RESOURCE_EXCEL_FIELD_MAPPING`;
- `normalizeResourceText(value)`;
- `mapResourceTypeToCategory(type)`;
- `normalizeResourceMapping(input)`;
- `getResourceDisplayLabel(resource)`;
- `getResourceSearchText(resource)`.

Deze helpers zijn voorbereiding op latere resourcecatalogusdata. Ze voeren nog geen Excel-import uit.

## Gewijzigde bestanden

Codebestanden die tijdens Slice 1 zijn gewijzigd:

- `src/types/planning.ts`
- `src/lib/planning/resources.ts`
- `src/components/planning/ResourceSelector.tsx`
- `src/components/planning/PlanningCard.tsx`
- `src/lib/planning/conflicts.ts`

Documentatiebestanden voor closure:

- `sprints/sprint-26-real-resource-import-discovery/SPRINT.md`
- `sprints/sprint-26-real-resource-import-discovery/QA.md`
- `sprints/sprint-26-real-resource-import-discovery/tickets/T2601.md`
- `PROJECT_STATE.md`

## UX-beslissing

De bestaande compacte selector blijft leidend:

- zoeken op nummer blijft primair;
- zoeken op naam, merk, type en category wordt ondersteund via searchtekst;
- categories blijven grof om categorie-explosie te vermijden;
- favorites blijven in-memory en sorteren bovenaan;
- multi-resource selectie blijft via bestaande compatlaag lopen;
- cards blijven compact en tonen bij meerdere resources vooral nummers.

Display/search beslissingen:

- `getResourceDisplayLabel(resource)` centraliseert compacte labels voor selector, planningcards en conflictmeldingen.
- `getResourceSearchText(resource)` maakt zoeken mogelijk op nummer, naam/beschrijving, merk, category en type/soort.
- De selector-placeholder is voorbereid op echte data: `Nummer, naam, merk of soort`.
- Merk is zoekmetadata en geen dominante matrixcopy.
- `Resource.number` blijft visueel het primaire scananker.

## QA-resultaat

QA bevestigde:

- selector opent correct;
- bestaande resources worden correct getoond;
- zoeken op nummer werkt;
- zoeken op naam/beschrijving werkt;
- zoeken op type/soort werkt;
- zoeken op category werkt;
- merk-search is via helpercheck gevalideerd omdat seeddata nog geen `brand` bevat;
- favorites renderen bovenaan;
- display op cards en conflicts blijft duidelijk;
- dense matrix blijft rustig;
- bugs: nee.

QA-beperking:

- Door browserpane-instabiliteit zijn enkele interacties, zoals sterretje togglen, multi-select en volledige create/edit/delete/relocation-flow, niet volledig opnieuw interactief afgerond.
- Helperchecks en contractcontrole bleven groen.
- Er was geen regressie-indicatie omdat `resourceId/resourceIds`, conflictregels en planningflows niet zijn aangepast.

## Non-goals

Niet gebouwd:

- Excel-parser;
- importflow;
- backend/API;
- persistence;
- localStorage;
- packages;
- onderhouds- of fleetmodule;
- kostprijzen;
- documenten;
- telemetrie;
- resource CRUD;
- categorie-explosie;
- 240 echte resources in seeddata;
- wijziging aan `resourceId/resourceIds`;
- wijziging aan conflictregels.

## Resterende aandachtspunten

- Echte Excel-import blijft een latere aparte slice.
- De soort-naar-category mapping moet later met echte Excelwaarden worden gevalideerd.
- Id-stabiliteit moet bij echte import expliciet gecontroleerd worden, waarschijnlijk op basis van `nummer`.
- Later is een seed/testresource met `brand` nuttig voor browservalidatie van merk-search.
- Merk moet zoekbaar blijven, maar niet de matrix visueel verzwaren.
- Een latere slice mag pas echte data toevoegen na scanability-QA van de selector.
