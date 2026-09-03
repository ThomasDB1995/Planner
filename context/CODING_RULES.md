# Coding Rules

## Basisregels

- Werk in het Nederlands voor documentatie.
- Desktop-first.
- Local-first tenzij expliciet anders beslist.
- UI simpel, duidelijk en functioneel.
- Geen onnodige complexiteit.
- Geen refactors buiten scope.
- Geen aannames over businessprocessen zonder bevestiging.

## Codex-uitvoering

Voor elke implementatie moet Codex eerst:

1. verplichte context lezen;
2. opdracht samenvatten;
3. concreet plan tonen;
4. verwachte bestanden benoemen;
5. risico's en onduidelijkheden benoemen;
6. buiten scope expliciet maken;
7. wachten op expliciete goedkeuring.

Geen goedgekeurd plan = geen codewijzigingen.

## Code Conventions

- Nog geen bestaande codeconventies in dit project.
- Kies bij eerste implementatie eenvoudige, modulaire structuur.
- Kleine herbruikbare functies.
- Duidelijke bestandsnamen.
- Geen duplicate logic.
- Domeinlogica apart houden van UI wanneer mogelijk.

## Naming Conventions

- Gebruik duidelijke domeinnamen: `PlanningItem`, `Employee`, `Machine`, `Vehicle`, `Availability`, `Conflict`.
- Vermijd vage namen zoals `data`, `item`, `thing` wanneer domeincontext bekend is.
- Houd Nederlandstalige UI-labels en Engelstalige code-entiteiten consistent indien een TypeScript stack gekozen wordt.

## Test Expectations

- Elke sprint moet buildvalidatie hebben zodra er code is.
- Controleer kernflow handmatig op localhost.
- Test minstens:
  - planningitem aanmaken;
  - machine koppelen;
  - dubbele machineboeking detecteren;
  - defecte machine waarschuwing tonen indien in scope;
  - geen out-of-scope features toegevoegd.

## Migratie/Database Regels

- Geen database of migraties uitvoeren zonder expliciete architectbeslissing.
- Start eerste slice eventueel met in-memory of lokale mockdata als dat expliciet wordt goedgekeurd.
- Dataverliesrisico altijd benoemen bij opslagkeuzes.

## UI Regels

- Desktop-first.
- Rustige layout.
- Duidelijke knoppen.
- Tabellen of lijsten voor planningdata.
- Filters bovenaan of links indien nodig.
- KPI-kaarten alleen als ze functioneel helpen.
- Geen overbodige animaties.
- Geen drag/drop in eerste slice.

## Verboden Zonder Toestemming

- AI-generatie.
- Automatische planning of optimalisatie.
- Login/auth.
- Cloud sync.
- Database/migraties.
- Package installs.
- GitHub-integratie.
- Mobile app.
- Drag/drop planning.
- Realtime collaboration.
- Wijzigingen aan bestaande governance zonder architectbeslissing.

