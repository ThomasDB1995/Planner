# Sprint 30 - Weekgebonden Werknemers

## Status

Afgerond.

## Doel

De dagelijkse plannerflow versimpelen door de matrix te laten bestaan uit:

- kernploeg;
- werknemers die tijdelijk aan de actieve ISO-week zijn toegevoegd.

Dit vervangt de eerdere dagelijkse UI rond `Niet standaard` en `Standaard maken`. Kernploegbeheer hoort later onder instellingen/beheer en is bewust niet in deze slice gebouwd.

## Scope

Sprint 30 Slice 1 is uitgevoerd als kleine lokale planner-slice:

- weekgebonden employee state toegevoegd op basis van ISO-weekkey;
- effectieve zichtbaarheid afgeleid als kernploeg plus tijdelijke werknemers voor actieve week;
- dagelijkse UI aangepast naar `+ Aan deze week toevoegen`;
- tijdelijke werknemers kunnen met `Uit deze week` uit alleen de actieve week worden gehaald;
- tijdelijke werknemers verschijnen in matrix en werknemerselect voor die week;
- navigeren naar een andere week verbergt die tijdelijke werknemer;
- terugkeren naar dezelfde week toont hem opnieuw;
- planningitems en availability blijven datumgebaseerd en blijven in state;
- `Niet standaard` en `Standaard maken` zijn verwijderd uit de dagelijkse planner-UI.

Na QA is kleine polish uitgevoerd:

- matrixcategorievolgorde operationeel herordend;
- Jan Van Ranst en Eric Maes gecorrigeerd naar `Flexi-job`;
- de weektoevoeglijst kreeg een aparte sortering;
- duidelijke omgekeerde niet-kernploegnamen zijn gecorrigeerd naar `Voornaam Achternaam`.

## Gewijzigde bestanden

Codebestanden die tijdens Sprint 30 zijn gewijzigd:

- `src/app/page.tsx`
- `src/lib/planning/week.ts`
- `src/lib/planning/employees.ts`
- `src/components/planning/WeekPlanningBoard.tsx`
- `src/components/planning/EmployeeRow.tsx`
- `src/data/seed.ts`

Documentatiebestanden voor closure:

- `sprints/sprint-30-weekgebonden-werknemers/SPRINT.md`
- `sprints/sprint-30-weekgebonden-werknemers/QA.md`
- `sprints/sprint-30-weekgebonden-werknemers/tickets/T3001.md`
- `sprints/sprint-30-weekgebonden-werknemers/tickets/T3002.md`
- `PROJECT_STATE.md`

## Model

`isDefaultVisible` betekent voorlopig kernploeg.

Tijdelijke weektoevoegingen worden lokaal per ISO-weekkey bijgehouden. Effectief zichtbare werknemers:

1. kernploeg;
2. tijdelijke werknemers voor de actieve week.

Niet-kernploegwerknemers staan niet standaard in de matrix, maar kunnen via `+ Aan deze week toevoegen` tijdelijk aan de actieve week worden toegevoegd.

Planning en availability blijven datumgebaseerd:

- `PlanningItem.employeeId + date`;
- availability op `employeeId + date`.

Wanneer een tijdelijke werknemer uit de week wordt gehaald, verdwijnen zijn rij, planning en availability tijdelijk uit de zichtbare matrix. De data blijft in state en komt terug wanneer de werknemer opnieuw aan dezelfde week wordt toegevoegd.

## UX-Beslissingen

Dagelijkse planner-UI gebruikt:

- `+ Aan deze week toevoegen`;
- `Toevoegen aan week`;
- `Uit deze week`.

Verwijderd uit de dagelijkse UI:

- `Niet standaard`;
- `Standaard maken`.

Reden:

- planners voegen mensen operationeel toe aan deze week;
- structureel kernploegbeheer is geen dagelijkse planningstaak;
- de matrix moet planning-first blijven en niet als employee-beheermodule voelen.

Het subtiele rij-kruisje blijft bestaan. Voor kernploeg betekent dit nog `verbergen`. Voor tijdelijk toegevoegde werknemers betekent dezelfde rijactie `uit deze week halen`, met duidelijke title/aria-copy.

## Categorievolgorde Matrix

De matrix gebruikt deze categorievolgorde:

1. `Werknemer`
2. `Zelfstandige`
3. `Flexi-job`
4. `Vakantiejob`
5. `Werknemer, bureau`

Binnen een categorie blijft bestaande `sortOrder` leidend.

## Sortering Weektoevoeglijst

De lijst bij `+ Aan deze week toevoegen` gebruikt bewust een aparte operationele sortering:

1. `Flexi-job`
2. `Vakantiejob`
3. `Zelfstandige`

Binnen elke categorie wordt alfabetisch op displaynaam gesorteerd.

Deze lijstsortering wijzigt niet de matrixsortering, kernploegsortering of weekvisibility.

## Naamcorrecties

De volgende niet-kernploegnamen zijn gecorrigeerd naar `Voornaam Achternaam`:

- `De Wit Bert` -> `Bert De Wit`
- `Sablon Philip` -> `Philip Sablon`
- `De Smet Jonathan` -> `Jonathan De Smet`
- `Hoofd Stef` -> `Stef Hoofd`
- `Hermans Jelle` -> `Jelle Hermans`
- `De Landtsheer Sander` -> `Sander De Landtsheer`
- `Vandendriessche Rens` -> `Rens Vandendriessche`
- `Goossens Dries` -> `Dries Goossens`
- `Van Lent Sam` -> `Sam Van Lent`

Aanvullende seedcorrectie:

- Jan Van Ranst -> `Flexi-job`;
- Eric Maes -> `Flexi-job`.

## QA-Resultaat

QA bevestigde:

- kernploeg staat standaard zichtbaar in elke week;
- niet-kernploeg staat niet standaard zichtbaar;
- `+ Aan deze week toevoegen` opent beschikbare werknemers;
- werknemer toevoegen aan week 23 werkt;
- toegevoegde werknemer verschijnt in matrix week 23;
- toegevoegde werknemer verschijnt in werknemerselect week 23;
- navigeren naar week 24 verbergt die werknemer;
- terug naar week 23 toont die werknemer opnieuw;
- `Uit deze week` verwijdert werknemer alleen uit actieve week;
- `Uit deze week` voelt niet als hard delete;
- tooltip/copy van de rijactie is duidelijk;
- planning voor tijdelijke werknemer blijft datumgebaseerd;
- availability voor tijdelijke werknemer blijft datumgebaseerd;
- planning/availability komen terug als werknemer opnieuw aan die week wordt toegevoegd;
- create, edit en delete blijven werken;
- relocation blijft werken;
- weekjump blijft werken;
- conflicts blijven correct binnen zichtbare week;
- matrix blijft compact;
- UI voelt planning-first, niet beheer-first;
- categorievolgorde is gecontroleerd;
- weektoevoeglijst sorteert correct;
- bugs: nee.

Build/typecheck:

- `npm run build` is geslaagd na implementatie;
- `npm run build` is geslaagd na categoriepolish;
- `npm run build` is geslaagd na seedcorrecties en weektoevoeglijstpolish.

## Non-Goals

Niet toegevoegd:

- persistence;
- backend/API;
- localStorage;
- kernploegbeheer onder instellingen;
- apart employee-beheer;
- HR-module;
- hard delete;
- employee-profielen;
- payroll;
- permissions;
- contract/status/rolbeheer;
- planninglogica-wijzigingen;
- availability-wijzigingen;
- conflictregelwijzigingen;
- drag/drop;
- grote redesigns;
- nieuwe packages.

## Resterende Aandachtspunten

- Weektoevoegingen zijn nog in-memory en verdwijnen bij reload.
- Kernploegbeheer en extra-werknemerbeheer moeten later apart onder instellingen/beheer ontworpen worden.
- Geen persistence/backend/API is bewust zo gehouden in deze slice.
- Later kan onderzocht worden of de weektoevoeglijst automatisch moet inklappen na toevoegen, maar dat is geen bug.

## Status

Sprint 30 is afgerond. Geen open bugs. Sprint 30 wordt niet verder uitgebreid zonder nieuwe opdracht.
