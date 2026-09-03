# QA - Sprint 01 Handmatige Planning & Conflictvalidatie

## Status

Technisch gevalideerd met architectfeedback op UX-richting.

---

## Uitgevoerde Tickets

- T001 - App foundation en minimale route: voltooid.
- T002 - Domeintypes en seeddata: voltooid.
- T003 - Conflictvalidatie service: voltooid.
- T004 - Planningitem formulier: voltooid.
- T005 - Planningsoverzicht tabel: voltooid.
- T006 - Formulier en overzicht koppelen: voltooid.
- T007 - Conflictmeldingen tonen: voltooid.
- T008 - QA, regressie en sprint closure: uitgevoerd.

---

## Buildvalidatie

- `npm install --legacy-peer-deps` uitgevoerd om de goedgekeurde Next.js/React stack te installeren.
- `npm run build` faalde in deze shell met `Toegang geweigerd`.
- Directe build succesvol:

```bash
node .\node_modules\next\dist\bin\next build
```

Resultaat:

- Next.js compile succesvol.
- TypeScript validatie succesvol.
- Static route `/` gegenereerd.

---

## Localhostvalidatie

- Devserver gestart op `http://localhost:3008`.
- HTTP status: 200.
- DOM-controle:
  - projecttitel zichtbaar;
  - lege planningstaat zichtbaar;
  - conflictsummary zichtbaar met geen-conflict melding.

---

## Functionele Controle

Gecontroleerd via code/build:

- `Employee`, `Machine`, `PlanningItem` en `PlanningConflict` types bestaan.
- Seeddata bevat 3 werknemers.
- Seeddata bevat 4 machines.
- Seeddata bevat 1 defecte machine.
- Conflictservice detecteert op `date + machineId`.
- Defecte machine wordt als waarschuwing gemodelleerd.
- Er is geen automatische correctie.
- Formulier bevat alleen datum, werknemer, taak/project, machine en status.
- Tabel bevat alleen datum, werknemer, taak/project, machine en status.
- Conflictsummary toont waarschuwingen.
- Lokale state werkt.
- Planningitems kunnen toegevoegd worden.
- Conflictservice werkt.
- Defecte machine waarschuwing werkt.

Niet volledig via browserautomation getest:

- Planningitem toevoegen via formulier.
- Dubbele machineboeking via formulier veroorzaken.
- Defecte machine waarschuwing via formulier veroorzaken.

Reden:

- De in-app browserautomation gaf bij tekstinvoer een clipboardruntimefout: `Browser Use virtual clipboard is not installed`.

---

## Scopecontrole

Controle uitgevoerd op verboden patronen in `src` en `package.json`.

Vaststelling:

- Geen database toegevoegd.
- Geen login/auth toegevoegd.
- Geen cloud toegevoegd.
- Geen autosave/localStorage/sessionStorage toegevoegd.
- Geen drag/drop toegevoegd.
- Geen voertuigen toegevoegd.
- Geen AI/LLM toegevoegd.
- Geen backend/API toegevoegd.

---

## Openstaande Risico's

- UX voldoet nog niet aan de echte gewenste richting.
- Huidige UI is te veel formulier/tabel.
- Gewenste richting is een Excel-achtige weekplanning met werknemers als kolommen.
- Next.js 15.0.0 meldt via npm een security warning; stack is bewust gelijk gehouden aan de Project Launch Wizard en niet geupgraded binnen deze sprint.
- `npm run build` geeft `Toegang geweigerd` in deze shell; directe Node/Next build werkt wel.

---

## Aanbevolen Handmatige Test

1. Open localhost.
2. Voeg item toe met machine `250 Case tractor` op datum X.
3. Voeg tweede item toe met dezelfde machine op dezelfde datum.
4. Controleer dubbele machineboeking waarschuwing.
5. Voeg item toe met machine `120 Verreiker (defect)`.
6. Controleer defecte machine waarschuwing.
7. Refresh pagina en bevestig dat lokale state gewist mag zijn.

---

## Architectfeedback

- Huidige UI is te veel formulier/tabel.
- Gewenste richting is weekplanning-board.
- Werknemers als kolommen.
- Datum/week bovenaan.
- Machines zichtbaar per werknemer.
- Kleurcodes voor voorlopig/bevestigd/uitgevoerd.
- Excel-achtige planning.
- Drag/drop later, niet direct.

---

## Volgende Aanbevolen Sprint

Sprint 02 - Weekplanning Board.

Scope:

- weekoverzicht;
- werknemers als kolommen;
- dagen/datum zichtbaar;
- planningitems als kaarten/cellen;
- machines zichtbaar in planningitem;
- statuskleuren;
- bestaande conflictvalidatie behouden.

Niet in scope:

- drag/drop;
- database;
- login;
- voertuigen;
- exports;
- afwezigheidsbeheer.
