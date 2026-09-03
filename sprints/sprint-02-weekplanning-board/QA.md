# QA - Sprint 02 Weekplanning Board

## Status

Technisch gevalideerd met open handmatige UX-check voor ingevoerde conflictcases en nieuw resource-selector schaalbaarheidsrisico.

---

## Uitgevoerde Tickets

- T201 - Weekplanning board layout: voltooid.
- T202 - Week header en dagenstructuur: voltooid.
- T203 - Werknemerskolommen: voltooid.
- T204 - Planningcards: voltooid.
- T205 - Statuskleuren: voltooid.
- T206 - Conflictindicatoren: voltooid.
- T207 - Lokale board-state koppeling: voltooid.
- T208 - QA, regressie en sprint closure: uitgevoerd.

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
  - compacte invoerstrip zichtbaar;
  - statusopties `Voorlopig`, `Bevestigd`, `Uitgevoerd` zichtbaar;
  - weekplanning board zichtbaar;
  - kolommen `Mickael`, `Bram`, `Ronny` zichtbaar;
  - werkdagen en datums zichtbaar;
  - geen-conflict melding zichtbaar.

---

## Functionele Controle

Gecontroleerd via code/build/browser-DOM:

- `PlanningStatus` ondersteunt `voorlopig`, `bevestigd` en `uitgevoerd`.
- Statuslabels en statuskleuren zijn centraal gemapt.
- Board gebruikt bestaande werknemers en machines.
- Board groepeert planningitems op `employeeId` en `date`.
- Planningcards tonen taak/project, machine en status.
- Conflictindicatoren gebruiken bestaande `PlanningConflict.planningItemIds`.
- Bestaande conflictservice is behouden.
- Conflictregel blijft: zelfde `machineId` + zelfde `date` = conflict.
- Defecte machine blijft waarschuwing.
- Er is geen automatische correctie.
- Formulier is behouden als compacte invoerstrip.
- Weekboard is de primaire UX.
- Machinekeuze werkt technisch via dropdown, maar is alleen tijdelijk geschikt.

---

## Scopecontrole

Controle uitgevoerd op verboden patronen in `src` en `package.json`.

Vaststelling:

- Geen database toegevoegd.
- Geen login/auth toegevoegd.
- Geen cloud toegevoegd.
- Geen autosave/localStorage/sessionStorage toegevoegd.
- Geen drag/drop toegevoegd.
- Geen drag/drop voorbereiding toegevoegd.
- Geen voertuigen toegevoegd.
- Geen AI/LLM toegevoegd.
- Geen backend/API toegevoegd.
- Geen realtime sync toegevoegd.

---

## Browserbeperking

Volledige browserinput via automation kon niet worden afgerond.

Reden:

- De in-app browserautomation gaf bij tekstinvoer opnieuw een clipboardruntimefout: `Browser Use virtual clipboard is not installed`.

Gevolg:

- Planningitem toevoegen via browserautomation is niet volledig bewezen.
- Dubbele machineboeking visueel veroorzaken via browserautomation is niet volledig bewezen.
- Defecte machine waarschuwing visueel veroorzaken via browserautomation is niet volledig bewezen.

Wel bevestigd:

- De UI rendert correct.
- De statusopties zijn zichtbaar.
- De boardstructuur is zichtbaar.
- De conflictservice is ongewijzigd en build-gevalideerd.

---

## Aanbevolen Handmatige Test

1. Open `http://localhost:3008`.
2. Voeg een item toe op `2026-05-18` voor `Mickael` met machine `250 Case tractor`.
3. Voeg een tweede item toe op `2026-05-18` voor `Bram` met dezelfde machine.
4. Controleer dubbele machineboeking indicator.
5. Voeg een item toe met machine `120 Verreiker (defect)`.
6. Controleer defecte machine waarschuwing.
7. Voeg een item toe met status `Uitgevoerd`.
8. Controleer statuskleur en label.
9. Refresh pagina en bevestig dat lokale state gewist mag zijn.

---

## UX Controle

Gecontroleerd:

- Board staat centraal.
- Formulier is compact en niet langer primaire UX.
- Werknemers staan als kolommen.
- Dagen en datums zijn zichtbaar.
- Grid voelt meer Excel-achtig dan formulier/tabel.
- Spacing is compact gehouden.
- Conflictbox rekt niet onnodig uit naast het board.

Open:

- Scanbaarheid met meerdere echte planningitems moet handmatig verder beoordeeld worden.
- Horizontale schaalbaarheid bij meer werknemers is nog niet getest.
- Machinekeuze is nog niet schaalbaar getest met 200+ resources.
- Simpele machine-dropdown is niet geschikt als definitieve UX.

---

## Resource-Schaalbaarheid

Nieuwe architectfeedback:

- Perceel heeft ongeveer 200+ resources, machines, voertuigen en werktuigen.
- Machineplanning moet schaalbaar worden voor grote resource-aantallen.
- Machines moeten uniek herkenbaar blijven via Nummer.
- Zoeken/filteren is nodig voor definitieve bruikbaarheid.
- Machine, voertuig, werktuig en aanhanger kunnen later aparte categorieen worden.

Conclusie:

- Sprint 02 werkt technisch.
- De huidige machine-dropdown is tijdelijk.
- De volgende UX/architectuurprioriteit is `Sprint 03 - Resource Selector & Machine Filtering`.
- Drag/drop blijft later.
- Eerst moet resource-selectie schaalbaar worden.
