# GitHub en Vercel deployment

## Doel

De planner wordt beheerd in GitHub en gehost op Vercel.

Gewenste flow:

1. Codex voert een kleine wijziging uit.
2. Codex draait lokaal `npm run build`.
3. Wijziging wordt gecommit en gepusht naar GitHub.
4. Vercel deployt automatisch vanuit de gekoppelde GitHub-repository.

## Repository

Aanbevolen repositorynaam:

`perceel-werkplanning-materieelbeheer`

Aanbevolen branchbeleid:

- `main` is productie.
- Kleine wijzigingen mogen via branch/PR als review gewenst is.
- Push naar `main` triggert production deployment in Vercel zodra GitHub-integratie gekoppeld is.

## Bestanden

Toegevoegd voor GitHub/Vercel:

- `.gitignore`: sluit buildoutput, dependencies, lokale env en Vercel-link uit.
- `.vercelignore`: houdt deploy-upload klein door documentatie/sprintmateriaal buiten Vercel-build te houden.
- `vercel.json`: legt Next.js framework, install en build vast.
- `.github/workflows/ci.yml`: draait `npm ci` en `npm run build` op GitHub.
- `.env.example`: bevestigt dat de app geen Vercel runtime environment variables nodig heeft.
- `scripts/deploy-vercel.ps1`: lokaal/Codex deployscript voor Vercel.

## Vercel koppelen

Gebruik bij voorkeur de Vercel GitHub-integratie:

1. Maak of open het GitHub-repo.
2. Push dit project naar GitHub.
3. Maak in Vercel een nieuw project.
4. Importeer het GitHub-repo.
5. Framework preset: `Next.js`.
6. Install command: `npm ci`.
7. Build command: `npm run build`.
8. Production branch: `main`.

Na deze koppeling deployt Vercel automatisch bij elke push naar `main`.

## Deploy vanuit Codex

Voor directe deploys vanuit Codex/lokale terminal is een Vercel-token nodig.

Lokale environment variables, niet in Vercel invullen:

```powershell
$env:CODEX_VERCEL_TOKEN="..."
$env:CODEX_VERCEL_ORG_ID="..."
$env:CODEX_VERCEL_PROJECT_ID="..."
```

Preview deployment:

```powershell
.\scripts\deploy-vercel.ps1
```

Production deployment:

```powershell
.\scripts\deploy-vercel.ps1 -Production
```

Het script doet bewust eerst:

1. `npm ci`
2. `npm run build`
3. `npx vercel@latest deploy`

Zo wordt er niet gedeployd wanneer de build faalt.

## Secrets

Niet committen:

- `CODEX_VERCEL_TOKEN`
- `.env.local`
- `.vercel/project.json`

Wel veilig om te committen:

- `.env.example`
- `vercel.json`
- `.github/workflows/ci.yml`
- `scripts/deploy-vercel.ps1`

## Codex werkwijze

Voor elke toekomstige wijziging:

1. Werk in kleine slice.
2. Run `npm run build`.
3. Commit alleen relevante bestanden.
4. Push naar GitHub.
5. Controleer Vercel deployment.

Bij deploymentproblemen:

- eerst buildlog lezen;
- geen plannerlogica wijzigen zonder concrete oorzaak;
- Vercel config alleen aanpassen als de build/deploylog dat onderbouwt.
