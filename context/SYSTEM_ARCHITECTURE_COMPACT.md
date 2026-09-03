# System Architecture Compact

## Architectuurstijl

- Local-first.
- Desktop-first.
- Governance-first.
- Documentatie is bron van waarheid.
- ChatGPT is architect.
- Codex is builder.
- Geen goedgekeurd plan = geen codewijzigingen.

## Belangrijkste Mappen

- `AGENTS.md`: projectspecifieke Codex-regels.
- `PROJECT_STATE.md`: actuele projectstatus.
- `docs/`: intake, projectbrief en bevindingen.
- `epics/`: gegenereerde epics.
- `sprints/`: gegenereerde sprintplanning en tickets.
- `src/`: broncode indien software wordt gebouwd, momenteel leeg.
- `context/`: compacte bootstrapcontext voor AI-sessies.

## Bounded Contexts

- Planning: planningitems per datum/werknemer.
- Taken/projecten: werk dat ingepland wordt.
- Werknemers: personen die werk uitvoeren of planning beheren.
- Materieel: machines en voertuigen.
- Beschikbaarheid: afwezigheden, ziekte, defectstatussen.
- Validatie: conflictcontrole en meldingen.

## Data Ownership

- Intake en projectdocumentatie zijn bron van waarheid zolang er geen applicatiedata bestaat.
- Planningitems worden eigenaar van koppelingen tussen datum, werknemer, taak/project, machines, voertuigen en status.
- Machines en voertuigen houden eigen beschikbaarheid/defectstatus bij.
- Conflictvalidatie leest planningitems en materieelstatussen, maar beslist niet automatisch zonder gebruikersactie.

## Governanceflow

Architect review -> sprintplanning -> ticketgeneratie -> Codex plan -> expliciete goedkeuring -> build -> QA -> sprint closure.

## Generation Flow

Intake -> deterministic generation -> preview-before-write -> human approval -> epics/sprints/tickets.

## Implementation Flow

1. Codex leest verplichte context.
2. Codex vat begrip samen.
3. Codex geeft plan en verwachte bestanden.
4. Codex benoemt risico's en buiten scope.
5. Gebruiker keurt expliciet goed.
6. Codex implementeert klein en verifieerbaar.
7. QA en PROJECT_STATE worden bijgewerkt bij closure.

## Constraints

- Geen AI/LLM-generatie.
- Geen automatische aannames.
- Geen cloud, login, database of sync zonder expliciete beslissing.
- Geen drag/drop, mobile app of automatische optimalisatie in eerste implementatie.
- Generated output mag niet blind gevolgd worden wanneer quality findings scopeproblemen tonen.

## Niet Aanpassen Zonder Expliciete Beslissing

- Architectuurstijl.
- Dataopslagkeuze.
- Login/auth.
- Cloud/sync.
- Mobile app.
- Scope van gegenereerde epics/sprints.
- Perceel governanceflow.

