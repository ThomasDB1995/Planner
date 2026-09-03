param(
  [switch]$Production
)

$ErrorActionPreference = "Stop"

function Require-Env($Name) {
  if (-not [Environment]::GetEnvironmentVariable($Name)) {
    throw "$Name ontbreekt. Zet deze lokaal als environment variable voordat je deployt."
  }
}

Require-Env "CODEX_VERCEL_TOKEN"

if (-not (Test-Path -LiteralPath ".\package-lock.json")) {
  throw "package-lock.json ontbreekt. Deployment verwacht npm ci."
}

if (-not (Test-Path -LiteralPath ".\.vercel\project.json")) {
  if ($env:CODEX_VERCEL_ORG_ID -and $env:CODEX_VERCEL_PROJECT_ID) {
    New-Item -ItemType Directory -Force -Path ".\.vercel" | Out-Null
    @{
      orgId = $env:CODEX_VERCEL_ORG_ID
      projectId = $env:CODEX_VERCEL_PROJECT_ID
    } | ConvertTo-Json | Set-Content -LiteralPath ".\.vercel\project.json" -Encoding UTF8
  } else {
    throw ".vercel/project.json ontbreekt. Zet CODEX_VERCEL_ORG_ID en CODEX_VERCEL_PROJECT_ID of link het project eenmalig met Vercel."
  }
}

npm ci
npm run build

$deployArgs = @("vercel@latest", "deploy", "--yes", "--token", $env:CODEX_VERCEL_TOKEN)

if ($Production) {
  $deployArgs += "--prod"
}

npx @deployArgs
