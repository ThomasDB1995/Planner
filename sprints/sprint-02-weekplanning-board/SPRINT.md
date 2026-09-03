# Sprint 02 - Weekplanning Board

## Sprintstatus

Technisch uitgevoerd en gevalideerd met nieuwe architectfeedback op resource-schaalbaarheid.

---

## Sprint Doel

De technisch gevalideerde planningitem-slice uit Sprint 01 omzetten naar een bruikbare desktop-first weekplanning board UX.

Het board moet een Excel-achtig overzicht geven met dagen links en werknemers als duidelijke kolommen. Planningitems blijven lokaal en sessiegebonden.

---

## Relatie Met Sprint 01

Sprint 01 bewees:

- lokale state werkt;
- planningitems kunnen toegevoegd worden;
- conflictservice werkt;
- defecte machine waarschuwing werkt.

Sprint 02 verwerkt de architectfeedback dat de formulier/tabel UI niet de gewenste richting was.

---

## Scope

- T201 - Weekplanning board layout
- T202 - Week header en dagenstructuur
- T203 - Werknemerskolommen
- T204 - Planningcards
- T205 - Statuskleuren
- T206 - Conflictindicatoren
- T207 - Lokale board-state koppeling
- T208 - QA, regressie en sprint closure

---

## Buiten Scope

- Drag/drop
- Drag/drop voorbereiding
- Database
- Login
- Cloud
- Autosave
- Backend/API
- Realtime sync
- Voertuigen
- Exports
- Afwezigheidsbeheer
- Mobile redesign
- Nieuwe domeinen
- Workflowengine
- Automatische statusovergangen
- Automatische conflictcorrectie

---

## Architectuurregels

- Bestaande conflictservice behouden.
- Bestaande types hergebruiken.
- `PlanningStatus` mag alleen uitgebreid worden met `uitgevoerd`.
- Geen nieuwe conflictregels.
- Geen state persistence.
- Geen backend of database.
- Geen drag/drop abstrahering voorbereiden.

---

## Resultaat

- Weekplanning board toegevoegd.
- Werknemers zichtbaar als kolommen.
- Werkdagen en datum zichtbaar links in het board.
- Planningitems worden per werknemer en datum gegroepeerd.
- Planningcards tonen taak/project, machine en status.
- Statusmapping toegevoegd voor `voorlopig`, `bevestigd` en `uitgevoerd`.
- Conflictindicatoren gekoppeld aan bestaande conflictservice.
- Formulier behouden als compacte invoerstrip, niet langer als primaire UX.
- Machinekeuze blijft voorlopig een simpele dropdown.

---

## Verificatie

- Productiebuild succesvol via gebundelde Node-runtime.
- Localhost render succesvol op `http://localhost:3008`.
- Browsercontrole bevestigt:
  - compacte invoerstrip;
  - weekplanning board;
  - werknemerskolommen;
  - werkdagen en datums;
  - statusopties inclusief `Uitgevoerd`;
  - geen-conflict melding.
- Scopecontrole uitgevoerd op verboden patronen.

---

## Open Aandachtspunten

- Browserautomation kan tekstinvoer niet volledig testen door clipboardruntimebeperking.
- Conflictweergave en statuskleurweergave zijn technisch gekoppeld en build-gevalideerd, maar moeten nog handmatig met ingevoerde planningitems visueel worden bevestigd.
- Board is desktop-first en niet bedoeld als mobile redesign.
- De huidige machine-dropdown is tijdelijk en niet schaalbaar genoeg voor 200+ resources.
- Resource-selectie moet schaalbaar worden voordat drag/drop wordt toegevoegd.

---

## Architectfeedback Resource-Schaalbaarheid

Perceel heeft een grote machinelijst met ongeveer 200+ resources, machines, voertuigen en werktuigen. Een simpele machine-dropdown is daarom geen definitieve UX.

Belangrijke inzichten:

- machineplanning moet schaalbaar zijn naar grote resource-aantallen;
- machines moeten uniek herkend worden via Nummer;
- zoeken en filteren wordt belangrijk;
- machine, voertuig, werktuig en aanhanger kunnen later aparte categorieen worden;
- simpele dropdown mag tijdelijk blijven, maar moet als tijdelijke oplossing worden gezien;
- machinekeuze mag later niet onwerkbaar worden bij 200+ resources.

---

## Aanbevolen Volgende Sprint

Sprint 03 - Resource Selector & Machine Filtering.

Doel:
Een schaalbare machine/resource selectie ontwerpen voor grote machinelijsten.

In scope:

- zoeken op machinenummer;
- zoeken op beschrijving;
- filter op soort/type;
- filter op voertuig/machine/werktuig;
- duidelijke resourceweergave;
- behoud conflictvalidatie op uniek Nummer.

Niet in scope:

- database;
- importmodule;
- onderhoudsbeheer;
- drag/drop;
- volledige machine CRUD.
