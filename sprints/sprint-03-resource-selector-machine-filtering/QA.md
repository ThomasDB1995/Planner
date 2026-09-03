# QA - Sprint 03 Resource Selector & Machine Filtering

## Status

Technisch gevalideerd met open handmatige tekstzoek- en conflictcase-check.

---

## Uitgevoerde Tickets

- T301 - Resource data model refinement: voltooid.
- T302 - Seeddata uitbreiden: voltooid.
- T303 - Resource search helper: voltooid.
- T304 - Resource filter helper: voltooid.
- T305 - Resource selector component: voltooid.
- T306 - Integratie in planningformulier: voltooid.
- T307 - Conflictvalidatie behouden: voltooid.
- T308 - QA, regressie en sprint closure: uitgevoerd.

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
  - ResourceSelector zichtbaar;
  - zoekveld `Zoek resource` zichtbaar;
  - categorie-filter zichtbaar;
  - type-filter zichtbaar;
  - compacte resultatenlijst zichtbaar;
  - resource Nummer zichtbaar;
  - resource naam/beschrijving zichtbaar;
  - categorie zichtbaar;
  - type/soort zichtbaar;
  - defectstatus zichtbaar;
  - weekplanning board blijft zichtbaar.

---

## Functionele Controle

Gecontroleerd via code/build/browser-DOM:

- `Machine` ondersteunt voorlopig `category` en `type`.
- Seeddata bevat machines, voertuigen, werktuigen en aanhangers.
- Seeddata bevat zichtbare unieke nummers.
- Seeddata bevat een defecte resource.
- Search/filter helper is deterministic en packagevrij.
- ResourceSelector gebruikt zoeken, categorie-filter en type-filter.
- Planningformulier gebruikt ResourceSelector in plaats van simpele machine-dropdown.
- Planningitems blijven `machineId` gebruiken.
- Bestaande conflictservice is behouden.
- Conflictregel blijft: zelfde `machineId` + zelfde `date` = conflict.
- Defecte resource blijft waarschuwing.
- Er is geen automatische correctie.

---

## Browserchecks

Uitgevoerd:

- Localhost render gecontroleerd.
- Categorie-filter getest met `werktuig`.
- Type-filter getest met `beton`.
- Filterresultaten tonen/hiden verwachte resources.

Niet volledig via browserautomation getest:

- zoeken op nummer;
- zoeken op beschrijving;
- planningitem toevoegen met resource;
- dubbele resourceboeking veroorzaken;
- defecte resource waarschuwing visueel veroorzaken.

Reden:

- De in-app browserautomation gaf bij tekstinvoer opnieuw een clipboardruntimefout: `Browser Use virtual clipboard is not installed`.
- Een latere toetsinvoer poging liep vast op browserruntime-interactie.

---

## Scopecontrole

Controle uitgevoerd op verboden patronen in `src` en `package.json`.

Vaststelling:

- Geen database toegevoegd.
- Geen Excel-import toegevoegd.
- Geen resource CRUD toegevoegd.
- Geen onderhoudsbeheer toegevoegd.
- Geen drag/drop toegevoegd.
- Geen backend/API toegevoegd.
- Geen login/auth toegevoegd.
- Geen cloud toegevoegd.
- Geen autosave/localStorage/sessionStorage toegevoegd.
- Geen AI/LLM toegevoegd.
- Geen nieuwe packages toegevoegd.

---

## Aanbevolen Handmatige Test

1. Open `http://localhost:3008`.
2. Zoek op resource Nummer `250`.
3. Controleer dat `250 Case tractor` zichtbaar blijft.
4. Zoek op beschrijving `kraan`.
5. Controleer dat `310 Kraan` zichtbaar blijft.
6. Filter categorie `werktuig`.
7. Controleer dat `Betonmolen` en `Trilplaat` zichtbaar zijn.
8. Filter type `beton`.
9. Controleer dat alleen `Betonmolen` relevant blijft.
10. Kies resource `250 Case tractor`.
11. Voeg een planningitem toe.
12. Voeg een tweede planningitem toe met dezelfde resource op dezelfde datum.
13. Controleer dubbele resourceboeking waarschuwing.
14. Kies defecte resource `120 Verreiker`.
15. Controleer defecte resource waarschuwing.
16. Refresh pagina en bevestig dat lokale state gewist mag zijn.

---

## Open Risico's

- Resource taxonomy is voorlopig.
- Echte 200+ resource performance is nog niet getest.
- ResourceSelector moet handmatig beoordeeld worden op scanbaarheid met grotere data.
- Tekstzoekflow vereist handmatige browservalidatie door automationbeperking.
