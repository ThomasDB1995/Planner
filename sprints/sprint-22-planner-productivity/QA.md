# Sprint 22 QA - Planner Productivity

## Scope

QA richt zich op Sprint 22 Slice 1: de create-mode optie `Materieel behouden`.

Niet getest of gewijzigd:

- persistence;
- backend/API;
- localStorage;
- user preferences;
- permissions;
- drag/drop;
- `PlanningItem`;
- `resourceId/resourceIds` architectuur;
- resource helpers;
- conflictengine.

## Browser-QA

| Punt | Resultaat |
| --- | --- |
| Checkbox `Materieel behouden` is alleen zichtbaar in create mode | Ja |
| Checkbox staat standaard uit | Ja |
| Met checkbox uit reset materieel zoals vroeger | Ja |
| Met checkbox aan blijft een geselecteerde resource behouden na toevoegen | Ja |
| Met checkbox aan blijven meerdere geselecteerde resources behouden na toevoegen | Ja |
| Taak/projectvelden resetten correct na toevoegen | Ja |
| Actieve cel/context blijft logisch | Ja |
| Edit mode wordt niet beinvloed | Ja |
| Delete blijft intact | Ja |
| Relocation blijft intact | Ja |
| Conflictvalidatie per resource blijft werken | Ja |
| UI blijft compact en niet verwarrend | Ja |

## QA-observaties

- De checkbox is compact genoeg voor de sticky `PlanningForm`.
- De optie is alleen zichtbaar waar ze functioneel relevant is: create mode.
- Het standaardgedrag blijft veilig doordat de checkbox uit staat.
- Bij behoud van materieel worden `resourceIds` behouden, terwijl taak/projectvelden resetten.
- Multi-materieel selectie blijft intact.
- Bestaande edit, delete en relocation flows blijven ongemoeid.
- Conflictvalidatie per resource blijft werken.

## Buildstatus

Geslaagd.

Uitgevoerd:

- `npm run build`;
- Next production build;
- TypeScript-validatie via build.

## Bugs

Geen bugs gevonden.

## Resterend Risico

Een planner kan vergeten de checkbox aan te laten bij reeksen met hetzelfde materieel. Dit risico blijft beperkt omdat de optie lokaal zichtbaar is in de create-flow en standaard uit staat.

## Advies

Sprint 22 Slice 1 afronden.
