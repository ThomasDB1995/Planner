# QA - Sprint 04 Resource Contract Alignment & QA Hardening

## Status

Technisch gevalideerd met open handmatige tekstzoek- en conflictcase-check.

---

## QA Doel

Valideer dat Sprint 04 alleen contractalignment uitvoert en geen functionele uitbreiding toevoegt.

---

## Te Valideren Bij Uitvoering

- Build slaagt.
- Localhost rendert.
- ResourceSelector blijft werken.
- Planningformulier kan planningitem toevoegen.
- Weekboard toont planningitem.
- Conflictservice detecteert dubbele resourceboeking.
- Conflictservice toont defecte resource waarschuwing.
- Resource zoek- en filterflow blijft werken.
- 200+ mockdata scanability check is lokaal en tijdelijk.
- Geen verboden features toegevoegd.

---

## Buildvalidatie

Build uitgevoerd met gebundelde Node-runtime:

```bash
C:\Users\Thomas\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe .\node_modules\next\dist\bin\next build
```

Resultaat:

- Next.js compile succesvol.
- TypeScript validatie succesvol via Next build.
- Static route `/` gegenereerd.

---

## Localhostvalidatie

- Devserver gestart op `http://localhost:3008`.
- Browser render gecontroleerd.
- DOM-controle bevestigt:
  - projecttitel zichtbaar;
  - resource-tekst in introductie zichtbaar;
  - ResourceSelector zichtbaar;
  - zoekveld `Zoek resource` zichtbaar;
  - categorie-filter zichtbaar;
  - type-filter zichtbaar;
  - compacte resourceresultaten zichtbaar;
  - defectstatus zichtbaar;
  - weekplanning board zichtbaar;
  - geen-conflict melding zichtbaar.

---

## Contract Controle

Na uitvoering controleren:

- Geen actief `Machine` type meer.
- Geen actieve `machineId` velden meer.
- Geen actieve `machines` seed export meer.
- Geen actieve `duplicate-machine` conflicttype meer.
- Geen actieve `defective-machine` conflicttype meer.
- `Resource`, `resourceId`, `resources`, `duplicate-resource`, `defective-resource` zijn consistent.

Resultaat:

- Contractscan op oude namen in `src` uitgevoerd.
- Geen resterende matches gevonden voor:
  - `Machine`;
  - `machineId`;
  - `machines`;
  - `duplicate-machine`;
  - `defective-machine`;
  - `getMachineLabel`.

---

## Scopecontrole

Controleer dat er geen patronen zijn toegevoegd voor:

- database;
- API/backend;
- Excel-import;
- CRUD;
- drag/drop;
- login/auth;
- cloud;
- autosave;
- localStorage/sessionStorage;
- nieuwe packages;
- nieuwe planningdomeinen.

Resultaat:

- Scope-scan uitgevoerd op `src` en `package.json`.
- Geen verboden patronen gevonden.
- Geen packages toegevoegd.
- Geen database/API/backend/import/CRUD/drag/drop/login/cloud/autosave toegevoegd.

---

## T409 Scanability Check

Uitgevoerd als tijdelijke lokale Node-check zonder bestanden te schrijven en zonder productflow te wijzigen.

Dataset:

- 250 deterministisch gegenereerde resources.
- Categorieen: machine, voertuig, werktuig, aanhanger.
- Types: tractor, kraan, verreiker, graver, kipper, beton, verdichting, werfwagen, platte aanhanger, gesloten aanhanger.

Resultaat:

```json
{
  "total": 250,
  "elapsedMs": 18,
  "byNumber": 1,
  "byName": 25,
  "byCategory": 62,
  "byType": 25,
  "combined": 6,
  "firstNumberMatch": "1120"
}
```

Conclusie:

- De pure zoek/filterlogica blijft snel op 250 lokale resources.
- Er is geen permanente 200+ mockdata toegevoegd aan productflow.
- UI-scanbaarheid met echte 200+ productdata blijft handmatige UX-validatie.

---

## Browserchecks

Uitgevoerd:

- Localhost render gecontroleerd.
- ResourceSelector render gecontroleerd.
- Categorie-filter getest met `werktuig`.
- Type-filter getest met `beton`.
- Filterresultaten tonen/hiden verwachte resources.

Niet volledig via browserautomation getest:

- zoeken op Nummer;
- zoeken op naam/beschrijving;
- planningitem toevoegen;
- dubbele resourceboeking veroorzaken;
- defecte resource waarschuwing visueel veroorzaken.

Reden:

- Browserautomation gaf bij tekstinvoer opnieuw: `Browser Use virtual clipboard is not installed`.

---

## Handmatige Testcases

1. Open localhost.
2. Zoek resource op Nummer.
3. Zoek resource op naam/beschrijving.
4. Filter op categorie.
5. Filter op type.
6. Kies resource.
7. Voeg planningitem toe.
8. Voeg tweede planningitem toe met dezelfde resource en datum.
9. Controleer dubbele resourceboeking waarschuwing.
10. Voeg planningitem toe met defecte resource.
11. Controleer defecte resource waarschuwing.
12. Controleer dat planningcards zichtbaar Nummer en naam tonen.
13. Refresh pagina en bevestig dat lokale state gewist mag zijn.

---

## Browserautomation Risico

Eerdere sprints hadden een browserruntimebeperking bij tekstinvoer:

`Browser Use virtual clipboard is not installed`

Als dit opnieuw voorkomt:

- documenteer welke browserstappen niet geautomatiseerd konden worden;
- bevestig via build/codecontrole wat wel bewezen is;
- markeer tekstzoek en formulier-submit als handmatige validatie indien nodig.

---

## Closure Vereisten

Sprint 04 mag pas als voltooid worden gemarkeerd als:

- T401 t/m T410 status bijgewerkt zijn: uitgevoerd.
- buildvalidatie is uitgevoerd: uitgevoerd.
- localhostvalidatie is uitgevoerd: uitgevoerd.
- scopecontrole is uitgevoerd: uitgevoerd.
- `PROJECT_STATE.md` is bijgewerkt: uitgevoerd.
- open risico's expliciet zijn vastgelegd: uitgevoerd.
