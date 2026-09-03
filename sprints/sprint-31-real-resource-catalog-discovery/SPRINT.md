# Sprint 31 - Real Resource Catalog

## Status

Afgerond.

## Doel

De echte machinelijst operationeel veilig integreren in de planner, zonder fleetmodule, resource CRUD, backend/API, persistence of wijziging aan het `resourceId/resourceIds` contract.

Sprint 31 bestond uit drie kleine slices:

- Slice 1: resource catalog mappingregels vastleggen;
- Slice 2: volledige resourcecatalogus integreren;
- Slice 3: planningcard resource display nummergericht polishen.

## Scope

Uitgevoerd:

- `Resource.group?: string` toegevoegd als optioneel veld;
- mappingregels vastgelegd voor echte resources;
- volledige resourcecatalogus met 239 resources geintegreerd;
- resource `id` stabiel gebaseerd op volledig genormaliseerd nummer;
- `number` behoudt het volledige operationele nummer;
- `group` wordt afgeleid uit het volledige nummer;
- `name` gebruikt de Excel-beschrijving;
- `brand` blijft optionele zoekmetadata;
- `type` bewaart raw `Soort` als detail/searchmetadata;
- `category` blijft grove plannercategorie;
- search werkt op nummer, groep, beschrijving/naam en merk;
- selector blijft volledige resource-info tonen;
- planningcards zijn nummergericht gemaakt.

Aanvullende kleine rooster-polish tijdens Sprint 31:

- dagheaders gecentreerd;
- subtiele alternerende row shading toegevoegd;
- weekendcontext subtiel zichtbaar gemaakt;
- categoriebalken iets sterker onderscheiden van gewone rijen.

## Gewijzigde Bestanden

Codebestanden gewijzigd tijdens Sprint 31:

- `src/types/planning.ts`
- `src/lib/planning/resources.ts`
- `src/data/seed.ts`
- `src/components/planning/ResourceSelector.tsx`
- `src/components/planning/PlanningCard.tsx`
- `src/components/planning/WeekHeader.tsx`
- `src/components/planning/EmployeeRow.tsx`
- `src/components/planning/PlanningCell.tsx`
- `src/components/planning/WeekPlanningBoard.tsx`

Documentatiebestanden:

- `sprints/sprint-31-real-resource-catalog-discovery/SPRINT.md`
- `sprints/sprint-31-real-resource-catalog-discovery/QA.md`
- `sprints/sprint-31-real-resource-catalog-discovery/tickets/T3101.md`
- `PROJECT_STATE.md`

## Mappingbeslissingen

Resource-identiteit voor materieel:

- `number + group + name`;
- voorbeeld: `0517-TRL- Vestrum 120`.

Strategie per veld:

- `id`: stabiel afgeleid uit het volledige genormaliseerde nummer;
- `number`: volledig operationeel nummer behouden, inclusief groepcode en eindstreep waar aanwezig;
- `group`: afleiden uit het volledige nummer;
- `name`: Excel `Beschrijving`, compacte planner-displaynaam;
- `brand`: Excel `Merk`, optionele zoekmetadata, niet dominant op planningcards;
- `type`: Excel `Soort`, raw detail/searchmetadata;
- `category`: grove plannercategorie, niet blind uit `Soort`.

Belangrijke discoveryconclusie:

- `Soort` is in de echte lijst vaak model/uitvoering;
- `Soort` is daardoor niet betrouwbaar als operationele categorie;
- category blijft bewust grof.

## Catalogusintegratie

De volledige echte resourcecatalogus is geintegreerd:

- aantal resources: 239;
- geen dubbele ids;
- geen wijziging aan `resourceId/resourceIds`;
- geen Excel-importflow;
- geen backend/API of persistence;
- geen resource CRUD.

De catalogus gebruikt de bestaande helperlaag voor normalisatie en id-stabiliteit.

## UX-Beslissingen

Selector:

- toont volledige resource-info;
- zoekt op nummer, groep, beschrijving/naam en merk;
- favorieten blijven bovenaan werken;
- multi-resource selectie blijft compact.

Planningcard:

- resourceweergave is nummergericht;
- bij 1 resource toont de kaart alleen het volledige nummer, bijvoorbeeld `0511-VCB-`;
- de tooltip/title toont volledige info, bijvoorbeeld `0511-VCB- Nissan Townstar`;
- bij meerdere resources blijven compacte nummerchips zichtbaar;
- de multi-resource tooltip/title toont volledige resource-info;
- merk blijft niet dominant op planningcards.

Rooster:

- planning blijft visueel dominant;
- conflicts blijven belangrijker dan availability/context;
- resourcebeschrijvingen worden niet op cards uitgeschreven zodat de matrix rustiger blijft.

## QA-Resultaat

QA bevestigde:

- volledige catalogus laadt correct;
- selector opent vlot met 239 resources;
- zoeken op nummer werkt;
- zoeken op groep werkt;
- zoeken op beschrijving werkt;
- zoeken op merk werkt;
- favorites blijven werken;
- multi-resource selectie blijft werken;
- planningcard met 1 resource toont alleen volledig nummer;
- single-resource tooltip toont volledige info;
- planningcard met meerdere resources blijft compact;
- multi-resource tooltip toont volledige info;
- selector blijft volledige resource-info tonen;
- conflicts blijven werken;
- create/edit/delete blijven intact;
- relocation blijft intact;
- weekjump blijft intact;
- matrix voelt rustiger;
- bugs: nee.

Buildstatus:

- `npm run build` geslaagd tijdens implementatie/QA.

## Non-Goals

Niet toegevoegd:

- fleet ERP;
- onderhoud;
- kostprijzen;
- documenten;
- telemetrie;
- materiaal/artikelbeheer;
- resource CRUD;
- backend/API;
- persistence;
- localStorage;
- importflow;
- selector-redesign;
- nieuwe filters;
- nieuwe packages;
- wijziging aan `resourceId/resourceIds`;
- wijziging aan conflictregels;
- planningdata-modelwijziging.

## Resterende Aandachtspunten

- Type-filter blijft operationeel zwak omdat `Soort` veel modelwaarden bevat; later mogelijk de-emphasis of aparte UX-slice.
- Volledige catalogus blijft in seed/in-memory; persistence/importflow is later een aparte architectuurbeslissing.
- Category-mapping moet bij praktijkgebruik verder gevalideerd worden.
- Selector-scanbaarheid met 239 resources blijft monitoren, maar vereist nu geen grote UX-wijziging.

## Advies

Sprint 31 afronden.

Volgende resource-slice alleen starten na praktijkfeedback, bij voorkeur klein en selectorgericht. Geen fleetmodule of brede resourcebeheerflow toevoegen.
