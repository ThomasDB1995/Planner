# Perceel Werkplanning & Materieelbeheer

## Doel

De planning van werknemers, machines en voertuigen centraliseren zodat planners sneller kunnen werken, minder fouten maken en realtime overzicht hebben over beschikbaarheden en conflicten.

---

## Projectstructuur

- `AGENTS.md`: projectspecifieke instructies voor Codex
- `PROJECT_STATE.md`: actuele projectstatus
- `docs/`: projectdocumentatie
- `architecture/`: technische keuzes
- `sprints/`: sprintplanning en QA
- `tickets/`: losse tickets indien nodig
- `prompts/`: projectspecifieke prompts
- `src/`: broncode indien van toepassing

## Development

```powershell
npm install
npm run dev
```

## Build

```powershell
npm run build
```

## Deployment

Codebeheer loopt via GitHub. Hosting loopt via Vercel.

Zie [docs/DEPLOYMENT_GITHUB_VERCEL.md](docs/DEPLOYMENT_GITHUB_VERCEL.md) voor de setup, automatische deployflow en het Codex-deployscript.

## Belangrijkste Regel

Geen goedgekeurd plan = geen codewijzigingen.
