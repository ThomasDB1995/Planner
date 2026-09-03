# Sprint 30 QA - Weekgebonden Werknemers

## Scope

QA richt zich op:

- kernploeg plus tijdelijke weektoevoegingen;
- dagelijkse UI `+ Aan deze week toevoegen`;
- verwijderen via `Uit deze week`;
- datumgebaseerde planning/availability;
- categorievolgorde;
- weektoevoeglijstsortering;
- naamcorrecties.

Niet getest of gebouwd als nieuwe scope:

- persistence;
- backend/API;
- localStorage;
- instellingen/beheer voor kernploeg;
- HR-module;
- hard delete;
- permissions;
- planninglogica-wijzigingen;
- availability-wijzigingen;
- conflictregelwijzigingen;
- drag/drop;
- nieuwe packages.

## Weekgebonden Werknemers QA

| Punt | Resultaat |
| --- | --- |
| Kernploeg staat standaard zichtbaar in elke week | Ja |
| Niet-kernploeg staat niet standaard zichtbaar | Ja |
| `+ Aan deze week toevoegen` opent beschikbare werknemers | Ja |
| Werknemer toevoegen aan week 23 werkt | Ja |
| Toegevoegde werknemer verschijnt in matrix week 23 | Ja |
| Toegevoegde werknemer verschijnt in werknemerselect week 23 | Ja |
| Navigeren naar week 24 verbergt die werknemer | Ja |
| Terug naar week 23 toont die werknemer opnieuw | Ja |
| `Uit deze week` verwijdert werknemer alleen uit actieve week | Ja |
| `Uit deze week` voelt niet als hard delete | Ja |
| Tooltip/copy van rij-actie is duidelijk | Ja |
| Planning voor tijdelijke werknemer blijft datumgebaseerd | Ja |
| Availability voor tijdelijke werknemer blijft datumgebaseerd | Ja |
| Planning/availability komen terug als werknemer opnieuw aan die week wordt toegevoegd | Ja |
| Create/edit/delete blijven werken | Ja |
| Relocation blijft werken | Ja |
| Weekjump blijft werken | Ja |
| Conflicts blijven correct binnen zichtbare week | Ja |
| Matrix blijft compact | Ja |
| UI voelt planning-first, niet beheer-first | Ja |

## Categorievolgorde QA

Matrixvolgorde gecontroleerd:

1. `Werknemer`
2. `Zelfstandige`
3. `Flexi-job`
4. `Vakantiejob`
5. `Werknemer, bureau`

Resultaat: groen.

Aanvullend gecontroleerd:

- Jan Van Ranst staat onder `Flexi-job`;
- Eric Maes staat onder `Flexi-job`;
- sortOrder binnen categorie blijft behouden;
- weekgebonden tijdelijke werknemers blijven werken.

## Weektoevoeglijst QA

Lijst bij `+ Aan deze week toevoegen` sorteert als:

1. `Flexi-job`
2. `Vakantiejob`
3. `Zelfstandige`

Binnen elke categorie wordt alfabetisch op displaynaam gesorteerd.

Voorbeeld helpercheck:

- `Flexi-job: Carine Borms`
- `Flexi-job: Dries Goossens`
- `Flexi-job: Frans De Bleser`
- `Flexi-job: Jelle Hermans`
- `Flexi-job: Jonathan De Smet`
- daarna `Vakantiejob`;
- daarna `Zelfstandige`.

Resultaat: groen.

## Naamcorrecties QA

Gecorrigeerd naar `Voornaam Achternaam`:

- `Bert De Wit`
- `Philip Sablon`
- `Jonathan De Smet`
- `Stef Hoofd`
- `Jelle Hermans`
- `Sander De Landtsheer`
- `Rens Vandendriessche`
- `Dries Goossens`
- `Sam Van Lent`

Resultaat: groen.

## Buildstatus

Geslaagd.

Uitgevoerd:

- `npm run build` na Slice 1;
- `npm run build` na categorievolgorde-polish;
- `npm run build` na seedcorrecties;
- `npm run build` na weektoevoeglijstsortering en naamcorrecties.

## Bugs

Open bugs: nee.

## Resterend Risico

Weektoevoegingen zijn in-memory. Reload wist tijdelijke weektoevoegingen, wat bewust binnen scope blijft zolang er geen persistence/backend/API is.

## Advies

Sprint 30 afronden.
