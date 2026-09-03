# Sprint 03 - Resource Selector & Machine Filtering

## Sprintstatus

Technisch uitgevoerd en gevalideerd met open handmatige tekstzoek- en conflictcase-check.

---

## Sprint Doel

Een schaalbare resource discovery workflow toevoegen voor grote machinelijsten, zonder database, importmodule of CRUD.

De kernvraag is niet hoe de dropdown verbeterd wordt, maar hoe een planner snel de juiste machine/resource vindt.

---

## Relatie Met Sprint 02

Sprint 02 bewees:

- weekplanning board werkt technisch;
- lokale planningstate werkt;
- planningitems kunnen een resource koppelen;
- bestaande conflictservice werkt;
- machine-dropdown is technisch bruikbaar maar niet schaalbaar.

Sprint 03 vervangt de simpele machine-dropdown door een compacte ResourceSelector met zoeken, filtering en duidelijke resourceweergave.

---

## Scope

- T301 - Resource data model refinement
- T302 - Seeddata uitbreiden
- T303 - Resource search helper
- T304 - Resource filter helper
- T305 - Resource selector component
- T306 - Integratie in planningformulier
- T307 - Conflictvalidatie behouden
- T308 - QA, regressie en sprint closure

---

## Buiten Scope

- Database
- Excel-import
- Resource CRUD
- Onderhoudsbeheer
- Drag/drop
- Backend/API
- Login
- Cloud
- Autosave
- Nieuwe planningdomeinen
- Definitieve resource-taxonomie
- Complex categoriebeheer

---

## Architectuurregels

- Resource taxonomy is voorlopig.
- Gebruik voorlopig alleen categorie, type/soort, zichtbaar Nummer, beschrijving/naam en defectstatus.
- Unieke identificatie blijft via `machineId` en zichtbaar Nummer.
- Bestaande conflictservice blijft behouden.
- Geen nieuwe conflictregels.
- Geen nieuwe packages.
- Utilitair en compact boven decoratief.

---

## Resultaat

- `Machine` minimaal uitgebreid met `category` en `type`.
- Seeddata uitgebreid met representatieve resources.
- Resource search/filter helper toegevoegd.
- Compacte `ResourceSelector` toegevoegd.
- Machine-dropdown vervangen door resource discovery in het bestaande planningformulier.
- Planningformulier blijft lokale state gebruiken.
- Planningitems blijven `machineId` gebruiken.
- Conflictvalidatie blijft gebaseerd op `machineId` + `date`.

---

## Verificatie

- Productiebuild succesvol via gebundelde Node-runtime.
- Localhost render succesvol op `http://localhost:3008`.
- Browser-DOM bevestigt:
  - zoekveld;
  - categorie-filter;
  - type-filter;
  - compacte resource-resultaten;
  - zichtbaar Nummer;
  - naam/beschrijving;
  - categorie;
  - type/soort;
  - defectstatus.
- Categorie-filter browsergetest.
- Type-filter browsergetest.
- Scopecontrole uitgevoerd op verboden patronen.

---

## Open Aandachtspunten

- Browserautomation kan tekstinvoer niet volledig testen door clipboardruntimebeperking.
- Zoeken op nummer en beschrijving moet handmatig in de browser bevestigd worden.
- Planningitem toevoegen met resource moet handmatig bevestigd worden.
- Dubbele resourceboeking en defecte resource waarschuwing moeten handmatig visueel bevestigd worden.
- Taxonomie blijft voorlopig en mag niet als definitief domeinmodel worden behandeld.
