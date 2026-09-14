# Knippen, kopieren en plakken

Datum: 2026-09-14

## Gebruik

In Bewerken: selecteer een taak, druk Ctrl/Cmd+X (knippen) of Ctrl/Cmd+C
(kopieren), navigeer eventueel naar een andere week, selecteer een doelcel
en druk Ctrl/Cmd+V. Er is geen aparte actiebalk in de planner.

- Knippen dimt de bron; de taak verhuist pas na bevestigde opslag.
- Kopieren behoudt de bron en ondersteunt herhaald plakken met nieuwe IDs.
- Taakomschrijving, status en alle machines blijven behouden. De doelcel bepaalt
  werknemer en datum. Een kopie krijgt de huidige gebruiker als aanmaker.
- Het invoerformulier blijft zichtbaar. Het neemt tijdens het kiezen van een
  bestemming niet automatisch de toetsenbordfocus over.
- Een korte bevestigingsmelding verdwijnt automatisch na 2,5 seconden.
- Ctrl/Cmd+X, C en V werken buiten tekstvelden; Escape annuleert.
- Escape en overschakelen naar Bekijken wissen het tijdelijke klembord.
- Het klembord blijft bewaard bij weeknavigatie en weekjump, maar niet na herladen
  of wisselen van gebruiker. Het gebruikt niet het systeemklembord.

## Techniek

- `src/lib/planning/clipboard.ts`: kopieert uitsluitend planningsvelden,
  zonder oorspronkelijke auditvelden.
- `src/components/planning/usePlanningClipboard.ts`: sessiegebonden state,
  sneltoetsen, wacht op lopende edits, blokkeert gelijktijdig plakken en houdt de
  kopie-ID bij voor herhalen na een verloren antwoord.
- `PlanningClipboardToolbar.tsx` en de bijbehorende knoppen zijn verwijderd.
- `page.tsx`: integratie en seriele opslag per taak, met afwachtbare edit-flush.
- `WeekPlanningBoard`, `EmployeeRow`, `PlanningCell` en `PlanningCard`: dimmen
  van de geknipte kaart. `PlanningForm` behoudt focus op de gekozen kaart/doelcel.
- `src/lib/supabase/planning-items.ts`: verplaatsen wijzigt uitsluitend locatie
  en wijzigingsaudit. Een inmiddels verwijderde taak wordt niet opnieuw aangemaakt;
  tussentijdse wijzigingen van andere gebruikers worden niet overschreven.
- De ongebruikte dependency `lucide-react` is verwijderd. Geen database- of beleidswijziging.

## QA

Interactieve Playwright-test: `scripts/qa-planning-clipboard.cjs`.
Start de lokale app op poort 3010; voer het script uit met Playwright beschikbaar
via de modulezoekpadinstelling `PLAYWRIGHT_MODULE_PATH` of een lokale installatie.
Het script gebruikt een eigen browsercontext met fictieve login en API-responses.
Alle externe requests zijn onderschept; er worden geen productiedata geschreven.

Geslaagd:

- Kopieren en knippen tussen weken, inclusief behouden bron voor het plakken.
- Herhaald kopieren met nieuwe IDs, correcte machines, status en aanmaker.
- Lopende tekstwijziging opslaan voordat deze wordt gekopieerd.
- Snel dubbel Ctrl+V maakt tijdens dezelfde lopende aanvraag geen extra kopie.
- Mislukte verplaatsing laat de bron staan; opnieuw proberen slaagt.
- Tussentijdse externe taakwijziging blijft behouden bij verplaatsen.
- Verloren antwoord na insert: herhalen gebruikt dezelfde ID, zonder extra kopie.
- Verwijderde brontaak wordt niet opnieuw aangemaakt door plakken.
- Normale tekstveld-shortcuts, annuleren, en reset bij Bekijken.
- Alle taakacties via toetsenbord getest; geen Knippen/Kopieren/Plakken-knoppen aanwezig.
- Ctrl en Cmd voor kopieren gecontroleerd. Mobiel vereist voor deze taakacties
  een aangesloten toetsenbord; de gewone plannerbediening blijft beschikbaar.
- Desktop (1440px) en mobiel (390px): screenshots gecontroleerd; geen pagina-overflow.
- Bestaande zes conflictregressietests geslaagd.
- Productiebuild inclusief TypeScript-controle geslaagd.

Beperking: interactieve opslagfouten zijn met een gesimuleerde Supabase API getest;
er zijn voor deze uitbreiding geen echte planningstaken in productie gewijzigd.
