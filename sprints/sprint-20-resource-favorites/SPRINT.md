# Sprint 20 - Resource Favorites

## Doel

Veelgebruikte machines en resources sneller selecteerbaar maken in de bestaande materieelselector, zonder nieuwe systeemcomplexiteit of wijziging aan de planningarchitectuur.

## Scope

Sprint 20 is uitgevoerd als kleine operationele productivity slice:

- resource favorites blijven operationeel/global;
- favorieten zijn alleen in-memory;
- resources krijgen optioneel `isFavorite?: boolean`;
- favorieten sorteren bovenaan in de bestaande `ResourceSelector`;
- favoriet togglen gebeurt met een klein sterretje per resource;
- selectie van materieel blijft via de bestaande rij-interactie;
- multi-materieel selectie blijft behouden;
- selector blijft compact en zonder aparte favorietensectie.

## Gewijzigde bestanden

Codebestanden die tijdens de implementatieslice zijn gewijzigd:

- `src/types/planning.ts`
- `src/data/seed.ts`
- `src/lib/planning/resources.ts`
- `src/components/planning/ResourceSelector.tsx`

Documentatiebestanden voor closure:

- `sprints/sprint-20-resource-favorites/SPRINT.md`
- `sprints/sprint-20-resource-favorites/QA.md`
- `sprints/sprint-20-resource-favorites/tickets/T2001.md`
- `sprints/sprint-20-resource-favorites/tickets/T2002.md`
- `sprints/sprint-20-resource-favorites/tickets/T2003.md`
- `sprints/sprint-20-resource-favorites/tickets/T2004.md`
- `PROJECT_STATE.md`

## Helperlaag

Toegevoegd in `src/lib/planning/resources.ts`:

- `toggleFavorite(favoriteResourceIds, resourceId)`
- `sortFavoritesFirst(resources, favoriteResourceIds)`

Deze helpers houden favorite-logica lokaal bij de bestaande resource helperlaag. Ze wijzigen geen planningitems, resource allocation, conflictvalidatie of multi-materieel helperpad.

## UX-beslissingen

- Een klein sterretje is voldoende als favorite affordance.
- Favoriet togglen is 1-click.
- De sterknop staat los van de brede resource-selectieknop.
- Favorieten verschijnen direct bovenaan na togglen.
- Er is geen aparte favorietensectie toegevoegd om density en rust te behouden.
- Niet-favorieten blijven zichtbaar onder de favorieten.
- De selector blijft bruikbaar voor 0..n materieelitems.

## Expliciete non-goals

Niet gebouwd:

- persistence;
- backend/API;
- localStorage;
- persoonlijke user preferences;
- accounts of permissions;
- ranking engine;
- AI-suggesties;
- analytics;
- aparte favorietenmodule;
- nieuwe filteringarchitectuur;
- redesign van de selector;
- drag/drop;
- packages/frameworks;
- wijzigingen aan `PlanningItem`;
- wijzigingen aan `resourceId/resourceIds`;
- wijzigingen aan planninglogica;
- wijzigingen aan conflictengine.

## QA-resultaat

Browser-QA is uitgevoerd op de bestaande selector:

- sterretje is duidelijk als favorite toggle;
- resource-selectie blijft duidelijk via de brede rij;
- favoriet togglen selecteert de resource niet;
- resource selecteren togglet favoriet niet;
- favorieten springen meteen bovenaan;
- selector blijft compact en rustig;
- multi-materieel selectie werkt nog;
- conflictstatus blijft renderen;
- bugs: nee.

## Resterend aandachtspunt

Favorieten zijn bewust niet persistent. Ze resetten bij reload. Dit is acceptabel binnen Sprint 20 omdat persistence, backend/API en localStorage expliciet buiten scope blijven.

## Status

Sprint 20 Resource Favorites is afgerond.
