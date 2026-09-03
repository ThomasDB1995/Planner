# Project Brief

## Projectdoel

Perceel Werkplanning & Materieelbeheer moet de planning van werknemers, projecten/taken, machines en voertuigen centraliseren. Het doel is sneller plannen, minder fouten maken en beter zicht krijgen op beschikbaarheden, conflicten en planningstatussen.

## Businesscontext

- De huidige planning gebeurt in een gedeeld Excelbestand via SharePoint.
- Meerdere mensen kunnen wijzigingen doen, wat fouten en verwarring kan veroorzaken.
- Machines kunnen dubbel ingepland worden zonder automatische waarschuwing.
- Defecte machines en beschikbaarheden worden manueel gecontroleerd.
- Mickael is hoofdverantwoordelijke voor de planning.
- Primaire gebruikers: Mickael, Bram, Ronny, Kim en Thomas.

## Huidige Fase

- Project is gegenereerd via de Project Launch Wizard.
- Architectfase en sprintplanning zijn voorbereid, maar nog niet gevalideerd als implementatieplan.
- Er is nog geen werkende applicatiecode.
- Generated epics, sprints en tickets bestaan, maar de eerste review toont dat ze te breed en te abstract zijn voor directe Codex-uitvoering.

## Tech Stack

- Nog te bepalen voor dit project.
- Projectstructuur bevat een lege `src/` map.
- Geen packageconfig of frameworkbestanden aanwezig.
- Perceel-standaard: desktop-first, local-first, documentatie als bron van waarheid.

## Belangrijkste Modules

Conceptuele modules op basis van intake:

- Planningsoverzicht: dag/weekoverzicht van planningitems.
- Taakbeheer: taken/projecten aanmaken en koppelen.
- Medewerkersplanning: werknemers, beschikbaarheden en afwezigheden.
- Machineplanning: machines koppelen en beschikbaarheid controleren.
- Voertuigplanning: voertuigen koppelen en beschikbaarheid controleren.
- Validaties en meldingen: dubbele boekingen, defectstatussen en conflictwaarschuwingen.

## Operationeel

- Projectmap is aangemaakt.
- Basisdocumentatie is aanwezig.
- Intake is opgeslagen als JSON.
- Generated epics, sprints en tickets zijn aanwezig.
- Generation quality findings zijn vastgelegd.

## Huidige Focus

De beste volgende stap is een kleine implementatievalidatie met een verticale slice:

**Handmatige planning + conflictvalidatie**

Deze slice moet bewijzen dat de kern van het domein werkt: een planner maakt handmatig een planningitem aan, koppelt werknemer en machine, en ziet een conflict bij dubbele machineplanning.

## Expliciet Buiten Scope

- AI-planning.
- Automatische optimalisatie.
- Drag/drop planning.
- Realtime sync.
- Cloudplatform.
- Login.
- Mobile app.
- Automatische notificaties.
- Realtime GPS tracking.
- Geavanceerde rapportering.
- Multi-company ondersteuning.
- Database- of migratiewerk zonder expliciete architectbeslissing.

## Belangrijkste Risico's

- Verlies van planningdata.
- Dubbele boekingen.
- Foutieve beschikbaarheden.
- Defecte machines toch ingepland.
- Systeemuitval tijdens planning.
- Scope leakage tussen werknemersplanning, machineplanning, voertuigplanning en validaties.
- Generated tickets geven Codex nog te veel interpretatieruimte.

