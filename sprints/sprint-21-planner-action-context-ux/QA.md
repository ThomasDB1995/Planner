# Sprint 21 QA - Planner Action Context UX

## Scope

QA richt zich op:

- Slice 1: compacte action context in de sticky `PlanningForm`;
- Slice 2: subtiele relocation visual context in de matrix.

Niet getest of gewijzigd:

- persistence;
- backend/API;
- permissions;
- drag/drop;
- matrixklikgedrag;
- conflictengine;
- resource selector;
- `PlanningItem`;
- `resourceId/resourceIds` compatlaag.

## Browser-QA

### Slice 1 - Action Context

| Punt | Resultaat |
| --- | --- |
| Is bij lege selectie duidelijk dat je een cel moet kiezen? | Ja |
| Is bij geselecteerde cel duidelijk dat je een nieuwe planning aanmaakt? | Ja |
| Is bij geselecteerde planningcard duidelijk dat je aan het bewerken bent? | Ja |
| Is bij relocation duidelijk welke kaart verplaatst wordt? | Ja, zodra een doelcel gekozen is |
| Is bij relocation duidelijk dat je een doelcel moet kiezen? | Na polish: ja, edit-context zegt `kies doelcel om te verplaatsen` |
| Is de chip compact genoeg in sticky form? | Ja |
| Truncaten lange taaknamen aanvaardbaar? | Ja |
| Voelt dit niet als drag/drop? | Ja |
| Zijn create/edit/delete/relocation nog functioneel intact? | Ja |

### Slice 2 - Relocation Visual Context

| Punt | Resultaat |
| --- | --- |
| Is relocation-mode visueel duidelijker dan voordien? | Ja |
| Voelen bezette cellen doelbaar zonder nieuwe interactie te suggereren? | Ja |
| Lijkt de amber-tint niet op conflict/warning? | Ja |
| Blijven echte conflictbadges visueel belangrijker? | Ja |
| Blijven planningcards dominant? | Ja |
| Blijft availability in bezette cellen ondergeschikt? | Ja |
| Blijft selected/source card herkenbaar? | Ja |
| Blijft destination cell duidelijk genoeg? | Ja |
| Voelt het niet als drag/drop? | Ja |
| Werken create/edit/delete/relocation nog intact? | Ja |

## QA-observaties

- `Nieuwe planning: Kies een cel` is duidelijk bij lege selectie.
- `Nieuwe planning: [werknemer] - [datum]` is duidelijk na celselectie.
- `Bewerken: [taak] - kies doelcel om te verplaatsen` maakt edit en mogelijke relocation duidelijker.
- `Verplaatsen: [taak] -> [werknemer] - [datum]` maakt bron en doel expliciet zodra een doelcel actief is.
- De bestaande move-knop blijft de enige relocation-actie.
- Slice 2 maakt bezette cellen alleen visueel zachter doelbaar; er zijn geen nieuwe klikzones, overlays, labels of knoppen.
- Destination cell blijft duidelijker dan gewone relocation-context.
- Source card blijft herkenbaar via selected styling.
- Conflictbadges blijven sterker dan amber relocation-context.

## Buildstatus

Geslaagd.

Uitgevoerd:

- `npm run build`;
- Next production build;
- TypeScript-validatie via build.

## Bugs

Geen bugs gevonden.

## Resterend Risico

Lange taaknamen kunnen de chiptekst sneller laten truncaten. Dit is acceptabel omdat de chip compact moet blijven en de volledige tekst beschikbaar blijft via de `title`.

Amber relocation-context kan bij veel bezette cellen iets zichtbaarder worden. Dit blijft acceptabel zolang de matrix rustig blijft en conflictbadges/planningcards dominant blijven.

## Advies

Sprint 21 Slice 2 afronden.
