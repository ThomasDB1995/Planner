# QA: machinegebruik bij meerdere taken

Datum: 2026-09-14

## Regel

Een werknemer mag op dezelfde dag meerdere taken plannen met dezelfde machine.
Er ontstaat alleen een resourceconflict als dezelfde machine op dezelfde datum
bij minstens twee verschillende werknemers staat. Bij zo'n conflict blijven
alle betrokken taken gekoppeld aan de waarschuwing. De waarschuwing benoemt nu
expliciet dat het om meerdere werknemers gaat.

De aanpassing zit in `src/lib/planning/conflicts.ts`. De bestaande datumgroepering,
legacy `resourceId`, multi-resource `resourceIds` en deelname van opties blijven
behouden. Er zijn geen databasewijzigingen nodig.

## Controle

`node --test scripts/test-planning-conflicts.cjs`: zes tests geslaagd.

- Meerdere taken en opties met dezelfde machines bij dezelfde werknemer: geen conflict.
- Dezelfde machine bij verschillende werknemers: een conflict met alle betrokken taken.
- Andere dagen, andere machines of geen machine: geen conflict.
- Multi-resource en legacy resourceId: alleen de gedeelde machine geeft een conflict,
  ook als de resource dubbel voorkomt in de resourcevelden.
- Verplaatsen naar een andere werknemer maakt een conflict; verplaatsen naar een
  andere dag of verwijderen heft het conflict op.
- Opties bij verschillende werknemers blijven meetellen zoals voorheen.

`npm run build`: geslaagd, inclusief linting en TypeScript-controle.
Geen volledige interactieve browserregressie uitgevoerd; de centrale helper
voor zowel de kaartbadges als het waarschuwingenoverzicht is getest.
