# Generation Quality Findings

## Doel

Dit document houdt bevindingen bij over de kwaliteit van de automatisch gegenereerde epics, sprints en tickets.

Het doel is niet om alles meteen te verbeteren, maar om patronen te verzamelen voor een latere generation-refinement sprint.

---

## Bevindingen

### Epics

- Epic scopes zijn momenteel te breed.
- Doel en scope overlappen vaak.
- Buiten-scope ontbreekt soms.
- Intakecontext wordt soms te letterlijk gekopieerd.
- Sommige epics bevatten functionaliteit die eigenlijk bij andere epics hoort.

---

### Sprints

- Sprintdoelen zijn soms te generiek.
- Workflowtekst wordt soms letterlijk overgenomen.
- Scope bevat soms te veel domeinen tegelijk.
- Sprints zijn nog niet altijd duidelijk afgebakend als kleine bouwbare fases.

---

### Tickets

- Tickets zijn soms nog te abstract.
- Verwachte deliverables ontbreken soms.
- Domeincontext mag concreter.
- Verwachte bestanden ontbreken vaak.
- Acceptance criteria zijn soms te algemeen.
- Tickets geven Codex nog te veel interpretatieruimte.

---

## Positieve Punten

- Governance werkt goed.
- Preview-before-write werkt goed.
- Domain-aware mapping werkt.
- Intake refinement workflow werkt.
- Traceerbaarheid van mappings werkt goed.
- Sprintgebonden ticketstructuur is correct.
- Documentatie-first aanpak werkt goed.

---

## Voorbeelden Uit Eerste Review

### Epic Taakbeheer

Bevinding:
De epic “Taakbeheer” bevat te veel algemene functionaliteiten en lekt richting machineplanning, voertuigplanning en validaties.

Gewenste verbetering:
Taakbeheer moet focussen op:
- taken/projecten aanmaken;
- taken/projecten koppelen aan werknemers;
- status beheren;
- opmerkingen toevoegen;
- basisoverzicht tonen.

Machinebeschikbaarheid, voertuigbeschikbaarheid en conflictvalidatie horen in aparte epics.

---

### Sprint Machineplanning

Bevinding:
De sprint “Machineplanning” bevat te veel gekopieerde intakecontext en onvoldoende concrete sprintscope.

Gewenste verbetering:
Machineplanning moet focussen op:
- machines tonen;
- machines koppelen aan planningitems;
- beschikbaarheid controleren;
- defectstatus tonen;
- dubbele boekingen detecteren.

Werknemersbeheer, projectbeheer, voertuigplanning en volledige workflowstatussen horen buiten deze sprint.

---

### Ticket Medewerkersplanning

Bevinding:
Het ticket “Medewerkersplanning - structuur en velden” is nog te abstract.

Gewenste verbetering:
Tickets moeten concreet benoemen:
- doel;
- domeincontext;
- minimale datastructuren;
- verwachte UI-onderdelen;
- verwachte bestanden;
- acceptance criteria;
- buiten scope.

---

## Aanbevolen Toekomstige Verbeteringen

- Betere samenvatting van intakecontext.
- Minder intake copy-paste.
- Sterkere scope-afbakening.
- Meer featuregerichte epic templates.
- Concretere sprinttemplates.
- Concretere tickettemplates.
- Altijd duidelijke buiten-scope toevoegen.
- Verwachte bestanden opnemen in tickets.
- Acceptance criteria specifieker maken.
- Scope leakage tussen epics verminderen.
- Eerste implementatieslices moeten niet alleen technisch, maar ook UX-richting valideren.
- Voor planningtools moet de gegenereerde richting eerder naar weekplanning-board dan formulier/tabel gaan.

---

## Sprint 01 UX Feedback

Bevinding:
De eerste technische slice met formulier en tabel valideert lokale state, planningitems en conflictvalidatie, maar sluit nog niet aan op de echte gewenste planningservaring.

Gewenste verbetering:
De volgende planning-UI moet richting Excel-achtige weekplanning:

- werknemers als kolommen;
- dagen/datum zichtbaar;
- planningitems als kaarten of cellen;
- machines zichtbaar per werknemer;
- kleurcodes voor voorlopig, bevestigd en uitgevoerd;
- bestaande conflictvalidatie behouden.

Niet direct meenemen:

- drag/drop;
- database;
- login;
- voertuigen;
- exports;
- afwezigheidsbeheer.

---

## Sprint 02 Weekplanning Board Feedback

Bevinding:
De architect-refined Sprint 02 maakt de UX-richting concreter dan de gegenereerde sprints. De keuze voor een klein weekboard met werknemers als kolommen is beter Codex-uitvoerbaar dan brede planningfunctionaliteit.

Positief patroon:

- refined tickets met expliciete bestanden en scope werken beter;
- UX-richting moet vroeg in implementatieslices worden gevalideerd;
- planningtools hebben baat bij compacte board/grid templates;
- statuskleuren en conflictindicatoren moeten als kleine UI-delen worden gesliced.

Aandachtspunt:
Browserautomation kon tekstinvoer niet volledig testen door een clipboardruntimebeperking. Handmatige conflictcase-review blijft nodig voor definitieve UX-goedkeuring.

Nieuwe architectfeedback:
De weekplanning board richting is technisch bruikbaar, maar de machinekeuze is nog niet schaalbaar genoeg. Perceel werkt met ongeveer 200+ resources, machines, voertuigen en werktuigen. Een simpele machine-dropdown is daarom alleen acceptabel als tijdelijke oplossing.

Gewenste verbetering:
De volgende prioriteit moet `Sprint 03 - Resource Selector & Machine Filtering` zijn.

Deze sprint moet onderzoeken en bouwen:

- zoeken op machinenummer;
- zoeken op beschrijving;
- filter op soort/type;
- filter op voertuig/machine/werktuig;
- duidelijke resourceweergave;
- behoud van conflictvalidatie op uniek Nummer.

Niet direct meenemen:

- database;
- importmodule;
- onderhoudsbeheer;
- drag/drop;
- volledige machine CRUD.

Belangrijk patroon:
Voor planningtools moet resource-selectie eerst schaalbaar zijn voordat drag/drop of verdere planninginteractie wordt toegevoegd.

---

## Sprint 03 Resource Selector Feedback

Bevinding:
De resource selector maakt de machinekeuze schaalbaarder dan een simpele dropdown, maar blijft gebaseerd op voorlopige lokale taxonomy en compacte mockdata.

Positief patroon:

- resource discovery is een eigen implementatieslice waard;
- zoeken en filteren moet eerder komen dan drag/drop;
- zichtbaar Nummer is cruciaal voor snelle herkenning;
- compact resultaat met Nummer, naam, categorie, type en defectstatus is bruikbaarder dan grote cards;
- bestaande conflictvalidatie kan behouden blijven als `machineId` contract intact blijft.

Aandachtspunt:
Echte 200+ resource performance en scanbaarheid zijn nog niet bewezen. Handmatige validatie met realistischere data blijft nodig.

---

## Sprint 04 Resource Contract Feedback

Bevinding:
Na Sprint 03 was `machineId` semantisch te smal voor resource-brede planning. Sprint 04 heeft dit contractueel gecorrigeerd zonder nieuwe functionaliteit toe te voegen.

Positief patroon:

- contractalignment als aparte sprint voorkomt architectural drift;
- `Resource` en `resourceId` maken toekomstige tickets minder dubbelzinnig;
- conflictvalidatie kan resource-breed blijven zonder nieuwe conflictregels;
- tijdelijke 200+ scanability checks moeten QA blijven en geen productfeature worden.

Aandachtspunt:
Tekstzoek en formulier-submit blijven handmatige browservalidatie door de bekende automationbeperking. Echte 200+ resource UI-scanbaarheid moet later met realistische data beoordeeld worden.

---

## Belangrijke Regel

Deze bevindingen zijn input voor een latere refinement sprint.

Niet alles onmiddellijk aanpassen.
Eerst meerdere projecten en gegenereerde outputs reviewen om patronen te herkennen.
