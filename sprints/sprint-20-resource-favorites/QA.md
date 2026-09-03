# Sprint 20 QA - Resource Favorites

## Scope

QA richt zich uitsluitend op de kleine favorites-slice in de bestaande `ResourceSelector`.

Niet getest of gewijzigd:

- persistence;
- backend/API;
- localStorage;
- drag/drop;
- planninglogica;
- conflictengine;
- `PlanningItem`;
- `resourceId/resourceIds` architectuur.

## Browser-QA

| Punt | Resultaat |
| --- | --- |
| Is het duidelijk dat het sterretje favoriet togglet? | Ja |
| Is het duidelijk waar je klikt om een resource te selecteren? | Ja |
| Kun je favoriet togglen zonder per ongeluk resource te selecteren? | Ja |
| Kun je resource selecteren zonder per ongeluk favoriet te togglen? | Ja |
| Sorteren favorieten meteen bovenaan? | Ja |
| Blijft selector compact en rustig? | Ja |
| Werkt multi-materieel selectie nog zoals voordien? | Ja |
| Zijn bestaande resource/conflictflows intact? | Ja |

## Observaties

- De sterknop en resource-selectieknop zijn aparte klikzones.
- De brede resource-rij blijft de primaire selectie-interactie.
- Favorieten worden direct bovenaan gezet na togglen.
- Er is geen aparte favorite group of extra module zichtbaar.
- De selector behoudt dezelfde compacte density.

## Bugs

Geen bugs gevonden.

## Regressierisico's

- Favorieten zijn in-memory en resetten bij reload.
- De rij heeft nu twee klikzones: ster voor favorite, brede rij voor selectie. Browser-QA bevestigt dat dit geen klikverwarring gaf.

## Advies

Sprint 20 slice afronden.
