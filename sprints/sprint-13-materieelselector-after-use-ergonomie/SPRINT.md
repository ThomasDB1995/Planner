# Sprint 13 - Materieelselector After-Use Ergonomie

## Sprintstatus

Afgerond.

T1301 t/m T1305 zijn uitgevoerd.

## Sprintdoel

De bestaande enkelvoudige materieelselector minder dominant maken onder de sticky planningform, zonder het interne resourcecontract of de planningflow te wijzigen.

De selector blijft werken met:

- `Resource`;
- `resourceId`;
- `ResourceSelector`;
- exact 0 of 1 gekozen materieelitem per planningitem.

## Context

Sprint 12 is afgerond:

- de matrix blijft bruikbaar met 12 werknemers;
- `PlanningForm` is sticky;
- werknemerlabels zijn sticky links;
- zichtbare UI-copy gebruikt `Materieel`;
- interne resourcecontracten zijn behouden;
- create, edit, delete, relocation en conflictbadges werken.

Open UX-punt na Sprint 12:

- de gesloten sticky form voelt compact genoeg;
- de open materieelselector neemt onder de sticky form te veel verticale ruimte in;
- na een materieelkeuze blijft de selector open terwijl de planner meestal terug wil naar de matrix.

## In Scope

- huidige after-use probleem documenteren;
- selector automatisch inklappen na materieelkeuze;
- gekozen materieel zichtbaar houden in gesloten toestand;
- snelle heropening behouden;
- wissen behouden;
- knoptekst contextueel maken:
  - `Kies materieel`;
  - `Wijzig materieel`;
- open selector compacter maken;
- zoek/filterfunctionaliteit behouden;
- resultatenlijst begrenzen met interne scroll.

## Buiten Scope

- multi-materieel;
- `resourceIds`;
- nieuwe conflictregels;
- backend/API/database/persistence;
- drag/drop;
- availability;
- CRUD/import;
- packages/frameworks;
- popover/modal-framework;
- virtualisatie;
- grote redesigns;
- submit/save-semantiek voor materieel;
- nieuwe interaction layer;
- multi-select;
- nieuwe state-complexiteit.

## Ticketresultaat

### T1301 - Ergonomie baseline

Uitgevoerd.

- after-use probleem vastgelegd als open selector die veel sticky vertical space inneemt;
- scope beperkt tot UX/ergonomie van de bestaande `ResourceSelector`;
- geen contractwijziging uitgevoerd.

### T1302 - Auto-collapse na materieelkeuze

Uitgevoerd.

- selector klapt dicht na keuze van een materieelitem;
- gekozen materieel blijft zichtbaar in de gesloten summary;
- bestaande `onSelect(resource.id)` contract blijft behouden;
- materieel blijft optioneel.

### T1303 - Snelle heropening en wissen

Uitgevoerd.

- gesloten summary toont gekozen materieel duidelijker met nummerbadge en naam;
- heropenknop blijft direct bereikbaar;
- knoptekst is contextueel: `Kies materieel` of `Wijzig materieel`;
- wissen blijft beschikbaar wanneer materieel gekozen is.

### T1304 - Compactere open selector

Uitgevoerd.

- zoek/filterrij is compacter gemaakt;
- resultatenrijen zijn compacter gemaakt;
- resultatenlijst blijft begrensd met interne scroll;
- scanbaarheid via nummer, naam, categorie en type blijft behouden.

### T1305 - QA, regressie en closure

Uitgevoerd.

- `npm run build` geslaagd;
- localhost gecontroleerd op `http://localhost:3003` na verse devserver-start;
- planning zonder materieel gevalideerd;
- planning met materieel gevalideerd;
- auto-collapse na materieelkeuze gevalideerd;
- gekozen materieel blijft zichtbaar in de gesloten summary;
- opnieuw openen, wijzigen en wissen gevalideerd;
- edit mode materieel wijzigen/wissen gevalideerd;
- delete en relocation regressie gevalideerd;
- conflictbadge bij dubbele materieelplanning gevalideerd;
- sticky form density gecontroleerd;
- browserconsole zonder warnings of errors.

## UX-Conclusie

Auto-collapse voelt natuurlijk omdat de keuze van 1 materieelitem een afgeronde micro-actie is. De gesloten summary houdt context zichtbaar via nummer en naam, terwijl de planner sneller terug kan naar taak/project of matrix.

De trade-off blijft dat een planner bij meerdere opeenvolgende taken met hetzelfde materieel opnieuw moet openen en kiezen. Dat past voorlopig bij de bestaande beslissing dat materieel optioneel is en na create wordt gereset.

## Closure-Conclusie

Sprint 13 is afgerond als kleine UX-ergonomie slice. De materieelselector is minder dominant onder de sticky form, zonder nieuw materieelcontract, zonder multi-materieel en zonder wijzigingen aan conflictregels of persistence.

## Scopecontrole

Niet toegevoegd:

- multi-materieel;
- `resourceIds`;
- nieuwe conflictregels;
- backend/API/database/persistence;
- drag/drop;
- availability;
- CRUD/import;
- packages/frameworks;
- popover/modal-framework;
- virtualisatie;
- grote redesigns.
