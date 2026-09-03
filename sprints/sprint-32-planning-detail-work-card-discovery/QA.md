# Sprint 32 QA - Work Card Preview, Typebasis & Structured Demo

## Scope

QA richt zich op Sprint 32 Slice 1, Slice 2B en Slice 3:

- read-only werkkaartpreview;
- celselectie werknemer/dag;
- werknemer- en datumweergave;
- unieke resourcegroepering;
- planningitemweergave;
- lightweight WorkCard types;
- dag/project/terrein-hiërarchie;
- structured demo met dag/project/terrein-hiërarchie;
- matrixdominantie;
- regressie op create/edit/delete, relocation en weeknavigatie.

Niet getest als nieuwe scope:

- editor;
- terreinen;
- materialen;
- hoeveelheden;
- instructies;
- werkbonnen;
- nacalculatie;
- print/PDF/WhatsApp;
- backend/API/persistence;
- nieuw datamodel.
- editor;
- parsing uit `taskName`;
- werkbon/nacalculatievelden.
- structured demo persistence.

## QA-Resultaat

### Slice 1 - Work Card Preview

| Punt | Resultaat |
| --- | --- |
| Werkkaart verschijnt bij selectie van werknemer/dag | Groen |
| Werknemer klopt | Groen |
| Datum klopt | Groen |
| Lege dag toont nette lege state | Groen |
| Dag met planningitems toont opdrachten | Groen |
| Unieke resources worden correct gegroepeerd | Groen |
| Duplicaten in resources worden niet dubbel getoond | Groen |
| Werkkaart voelt als dagoverzicht, niet als werkbon | Groen |
| Werkkaart blijft compact genoeg | Groen |
| Matrix blijft visueel leidend | Groen |
| Create/edit/delete blijven werken | Groen |
| Relocation blijft werken | Groen |
| Weeknavigatie/weekjump blijft werken | Groen |
| Werkkaart update bij andere celselectie | Groen |
| Werkkaart reset logisch bij weekwissel | Groen |

### Slice 2B - WorkCard Typebasis

| Punt | Resultaat |
| --- | --- |
| Build blijft groen | Groen |
| `PlanningItem` contract is intact | Groen |
| `WorkCardPreview` blijft werken | Groen |
| Create/edit/delete blijven werken | Groen |
| Relocation blijft werken | Groen |
| Weekjump blijft werken | Groen |

### Final Cleanup - Structuurdemo Verwijderd

| Punt | Resultaat |
| --- | --- |
| Zichtbare Structuurdemo is uit dagelijkse planner verwijderd | Groen |
| Live werkkaartpreview blijft zichtbaar bij celselectie | Groen |
| WorkCard types blijven bestaan | Groen |
| WorkCard documentatie en backlog blijven behouden | Groen |
| Planner focust opnieuw op planning | Groen |
| Planninglogica is niet gewijzigd | Groen |
| Resourcecontract is niet gewijzigd | Groen |
| Conflicts en availability zijn niet gewijzigd | Groen |
| Er is geen editor toegevoegd | Groen |
| Er is geen persistence toegevoegd | Groen |
| Er is geen parsing uit `taskName` toegevoegd | Groen |
| Er zijn geen werkbon/nacalculatievelden toegevoegd | Groen |

### Slice 3 - Work Card Structured Demo

| Punt | Resultaat |
| --- | --- |
| Werkkaart blijft read-only | Groen |
| Live dagmaterieel/opdrachten blijven zichtbaar | Groen |
| Structuurdemo is duidelijk herkenbaar als demo | Groen |
| Werknemer + datum blijven bovenaan duidelijk | Groen |
| Dagmaterieel is logisch geplaatst | Groen |
| Projecten zoals FC Oppuurs en Daltons zijn duidelijk onderscheiden | Groen |
| Terreinen zoals A-terrein/B-terrein zijn duidelijk onder project gegroepeerd | Groen |
| Instructie/materiaal/werkwijze zijn begrijpelijk | Groen |
| Hierarchie dag -> project -> terrein voelt logisch | Groen |
| Werkkaart voelt niet als werkbon | Groen |
| Werkkaart voelt niet als nacalculatie | Groen |
| Matrix blijft leidend en bruikbaar | Groen |
| WorkCardPreview blijft compact genoeg | Groen |
| Create/edit/delete blijven werken | Groen |
| Relocation blijft werken | Groen |
| Weekjump blijft werken | Groen |

## Detailobservaties

Lege state:

- `Geen materieel gepland.`;
- `Geen opdrachten gepland.`;
- blijft rustig en niet administratief.

Dag met planningitems:

- opdrachten verschijnen onder `Opdrachten vandaag`;
- resources verschijnen onder `Materieel vandaag`;
- resources worden uniek gegroepeerd per werknemer/dag;
- resourcechips gebruiken de bestaande nummergerichte stijl.

Werkbon-scopecontrole:

- geen werkboncopy zichtbaar;
- geen nacalculatiecopy zichtbaar;
- geen uren, handtekening, uitvoering of statusworkflow zichtbaar;
- geen print/PDF/exportknoppen.

Typebasis:

- `WorkCard` beschrijft dagniveau met `employeeId`, `date`, optionele `resourceIds`, optionele `dayNote` en projecten;
- `WorkCardProject` beschrijft project/opdracht met titel, notitie, volgorde en terreinen;
- `WorkCardTerrain` beschrijft terrein/deellocatie met instructie, materiaaltekst, werkwijze en opmerking;
- materialen blijven vrije tekst op terreinniveau via `materialText`;
- `PlanningItem` blijft leidend en is niet gemigreerd;
- `work-card.ts` bevat alleen read-only/conceptuele helpers en scope-notes.

Structured demo:

- demo is zichtbaar onder `Structuurdemo`;
- demo is gelabeld als `Voorbeeld, read-only`;
- dagmaterieel staat apart boven de projectstructuur;
- `FC Oppuurs` en `Daltons` tonen projectniveau;
- `A-terrein` en `B-terrein` tonen terreinniveau;
- instructie, materiaal en werkwijze blijven compact in een regel;
- demo gebruikt mockdata en geen parsing uit bestaande planningitems.

Cleanup na validatie:

- de zichtbare `Structuurdemo` is uit de dagelijkse planner verwijderd;
- de werkkaartpreview toont opnieuw alleen live plannerdata;
- WorkCard types, documentatie en backlog blijven bestaan.

## Buildstatus

Geslaagd:

- `npm run build`

## Bugs

Open bugs: nee.

## Polishvoorstellen

Geen polish nodig voor Slice 1, Slice 2B of Slice 3.

Later eventueel evalueren:

- werkkaart inklapbaar maken als de extra verticale ruimte in praktijk stoort.

## Advies

Sprint 32 Slice 1, Slice 2B en Slice 3 afronden.
