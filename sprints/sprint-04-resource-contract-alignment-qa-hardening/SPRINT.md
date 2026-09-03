# Sprint 04 - Resource Contract Alignment & QA Hardening

## Sprintstatus

Uitgevoerd en technisch gevalideerd.

---

## Sprint Doel

Breng de codecontracten in lijn met de resource-brede architectuur die in Sprint 03 is ontstaan.

Sprint 03 maakte resource discovery bruikbaar, maar liet oude machine-naming bewust staan om de slice klein te houden. Sprint 04 corrigeert dit contractueel:

- `Machine` wordt `Resource`;
- `machineId` wordt `resourceId`;
- `machines` wordt `resources`;
- machine-specifieke conflict-naming wordt resource-breed.

Er wordt geen nieuwe functionaliteit gebouwd.

---

## Waarom Deze Sprint Belangrijk Is

De applicatie plant nu niet alleen machines, maar ook voertuigen, werktuigen en aanhangers als resources. Als de code `Machine` en `machineId` blijft gebruiken, ontstaat architecturale drift en meer interpretatierisico voor toekomstige Codex-sprints.

Deze sprint maakt het contract consistent voordat er nieuwe planninginteractie, drag/drop, import of echte dataopslag wordt overwogen.

---

## Relatie Met Sprint 03

Sprint 03 bewees:

- ResourceSelector werkt technisch;
- zoeken/filteren is deterministic;
- lokale resource seeddata bevat meerdere categorieen;
- bestaande conflictservice bleef werken;
- `machineId` is technisch nog werkbaar, maar semantisch achterhaald.

Sprint 04 behoudt behavior en wijzigt alleen naming/contracten en QA-hardening.

---

## In Scope

- Type `Machine` hernoemen naar `Resource`.
- `PlanningItem.machineId` hernoemen naar `PlanningItem.resourceId`.
- `PlanningConflict.machineId` hernoemen naar `PlanningConflict.resourceId`.
- Conflicttypes resource-breed maken.
- Seeddata export `machines` hernoemen naar `resources`.
- Props, helpers en lokale variabelen resource-breed maken.
- UI-labels consistent maken waar ze over alle resources gaan.
- Bestaande behavior behouden.
- Regressie- en scopecontrole documenteren.
- Tijdelijke lokale mockdatahelper voor 200+ resource scanability check voorbereiden indien nodig.

---

## Buiten Scope

- Database.
- API/backend.
- Excel-import.
- Resource CRUD.
- Onderhoudsbeheer.
- Drag/drop.
- Login.
- Cloud.
- Autosave.
- Nieuwe packages.
- Nieuwe persistence.
- Definitieve taxonomie.
- Complex categoriebeheer.
- Nieuwe conflictregels.
- Nieuwe planningdomeinen.
- UI-redesign.

---

## Execution Defaults

- `Machine` => `Resource`.
- `machineId` => `resourceId`.
- `machines` => `resources`.
- `duplicate-machine` => `duplicate-resource`.
- `defective-machine` => `defective-resource`.
- Bestaande behavior behouden.
- Zichtbaar Nummer blijft primaire gebruikersidentificatie.
- Resource taxonomy blijft voorlopig.

---

## Dependency Order

1. T401 - Resource Type Rename
2. T402 - PlanningItem Contract Alignment
3. T403 - PlanningConflict Contract Alignment
4. T404 - Seeddata Naming Alignment
5. T405 - Resource Helper Contract Cleanup
6. T406 - ResourceSelector Contract Cleanup
7. T407 - PlanningForm Integration Cleanup
8. T408 - Board/Card/Conflict UI Label Alignment
9. T409 - 200+ Resource Scanability Check
10. T410 - Sprint 04 QA & Closure

Belangrijk:

- T401 t/m T404 vormen het contract-fundament.
- T405 t/m T408 mogen pas na contractalignment.
- T409 is alleen QA-hardening, geen productfeature.
- T410 sluit pas na build, localhost en scopecontrole.

---

## File Ownership

- T401-T403: `src/types/planning.ts`, `src/lib/planning/conflicts.ts`.
- T404: `src/data/seed.ts`, imports in consumers.
- T405: `src/lib/planning/resources.ts`.
- T406: `src/components/planning/ResourceSelector.tsx`.
- T407: `src/components/planning/PlanningForm.tsx`, `src/app/page.tsx`.
- T408: `src/components/planning/PlanningCard.tsx`, `src/components/planning/DayRow.tsx`, `src/components/planning/WeekPlanningBoard.tsx`, `src/components/planning/ConflictSummary.tsx`.
- T409: tijdelijke lokale helper of testdata binnen `src/lib/planning/` of `src/data/`, alleen als nodig voor scanability check.
- T410: `sprints/sprint-04-resource-contract-alignment-qa-hardening/QA.md`, `PROJECT_STATE.md`, eventueel `docs/Generation_Quality_Findings.md`.

---

## Sprint Acceptance Criteria

- Build slaagt.
- Localhost rendert.
- ResourceSelector blijft zichtbaar en bruikbaar.
- Planningitem toevoegen blijft contractueel buildbaar; handmatige browservalidatie blijft aanbevolen.
- Dubbele resourceboeking op dezelfde datum blijft contractueel via conflictservice behouden; handmatige browservalidatie blijft aanbevolen.
- Defecte resource blijft contractueel via conflictservice behouden; handmatige browservalidatie blijft aanbevolen.
- Er zijn geen resterende `Machine`, `machineId`, `machines`, `duplicate-machine` of `defective-machine` contractnamen in actieve broncode, behalve indien expliciet historisch gedocumenteerd.
- Geen database, API, CRUD, import, drag/drop, login, cloud, autosave of nieuwe packages toegevoegd.
- QA documenteert open browserautomationbeperkingen transparant.

---

## Resultaat

- `Machine` type hernoemd naar `Resource`.
- `machineId` contract hernoemd naar `resourceId`.
- `machines` seed export en props hernoemd naar `resources`.
- `duplicate-machine` hernoemd naar `duplicate-resource`.
- `defective-machine` hernoemd naar `defective-resource`.
- Conflictservice resource-breed gemaakt zonder nieuwe conflictregels.
- ResourceSelector, PlanningForm, WeekPlanningBoard, DayRow, PlanningCard en PlanningTable contractueel uitgelijnd.
- UI-labels resource-breed gemaakt waar ze categorie-overstijgend zijn.
- Tijdelijke 250-resource scanability check uitgevoerd zonder productdata of productflow te wijzigen.

---

## Verificatie

- Productiebuild succesvol via gebundelde Node-runtime.
- Localhost render succesvol op `http://localhost:3008`.
- Browser-DOM bevestigt ResourceSelector, resourcefilters, resources en weekboard.
- Categorie-filter browsergetest.
- Type-filter browsergetest.
- Contractscan op oude namen in `src` schoon.
- Scope-scan op verboden patronen schoon.

---

## Open Aandachtspunten

- Browserautomation kan tekstinvoer niet volledig testen door clipboardruntimebeperking.
- Zoeken op Nummer/naam blijft handmatige browservalidatie.
- Planningitem toevoegen, dubbele resourceboeking en defecte resource waarschuwing blijven handmatige QA-punten.
- T409 heeft filterperformance lokaal met 250 gegenereerde resources getest; echte productflow gebruikt geen permanente 200+ mockdata.

---

## Sprint Test Matrix

| Scenario | Verwacht resultaat |
| --- | --- |
| Build uitvoeren | Build slaagt |
| Localhost openen | App rendert |
| Resource zoeken op Nummer | Correcte resource blijft vindbaar |
| Resource zoeken op naam | Correcte resource blijft vindbaar |
| Filter op categorie | Alleen passende resources zichtbaar |
| Filter op type | Alleen passend type zichtbaar |
| Resource kiezen | Gekozen resource zichtbaar |
| Planningitem toevoegen | Item verschijnt in weekboard |
| Zelfde resource zelfde datum tweemaal plannen | `duplicate-resource` waarschuwing zichtbaar |
| Defecte resource plannen | `defective-resource` waarschuwing zichtbaar |
| Refresh | Lokale state mag verdwijnen |
| Scope scan | Geen verboden features gevonden |

---

## Rollback Op Sprintniveau

- Omdat er geen database of persistence is, is rollback beperkt tot broncode- en documentatiebestanden.
- Revert contractwijzigingen alleen als volledige chain T401-T408 niet buildbaar wordt.
- Niet half terugrollen naar gemengde `Machine`/`Resource` naming.
- Bij blokkade: stop na het eerst falende ticket, documenteer exacte breuk en vraag architectbeslissing.

---

## Belangrijkste Risico's

- Half gemigreerde naming breekt TypeScript of runtime lookups.
- `machineId` en `resourceId` tijdelijk door elkaar gebruiken.
- Conflictservice hernoemen en tegelijk behavior wijzigen.
- Seeddata hernoemen zonder alle imports aan te passen.
- UI-labels te breed veranderen en nieuwe domeinbetekenis suggereren.
- T409 onbedoeld uitbreiden naar echte import of performancefeature.

---

## Codex Instructie Voor Uitvoering

Codex mag deze sprint pas implementeren na expliciete goedkeuring.

Werk ticket per ticket in volgorde. Per ticket:

1. Lees actuele bestanden.
2. Vat begrip samen.
3. Voer alleen de ticket-scope uit.
4. Run relevante build/typecheck zodra zinvol.
5. Documenteer regressierisico's.
6. Ga pas door naar het volgende ticket als het contract buildbaar is.

Geen verborgen refactors. Geen nieuwe features.
