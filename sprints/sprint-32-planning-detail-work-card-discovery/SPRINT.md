# Sprint 32 - Planning Detail & Work Card Discovery

## Status

Slice 1, Slice 2B en Slice 3 afgerond. Final cleanup uitgevoerd: de zichtbare structuurdemo is uit de dagelijkse planner verwijderd.

## Doel

Valideren of een compacte werkkaart als dagoverzicht voor 1 werknemer logisch in de planner past, zonder werkbon, nacalculatie, editor, opslag of nieuw datamodel te bouwen.

Werkkaart betekent in deze sprint:

- dagoverzicht voor 1 werknemer;
- plannercontext;
- read-only preview;
- gebaseerd op bestaande planningdata.

## Scope

Sprint 32 Slice 1 voegde een read-only `Werkkaart` preview toe wanneer een werknemer/dag-cel geselecteerd is.

Sprint 32 Slice 2B voegde een lightweight WorkCard typebasis toe voor toekomstige werkkaartontwikkeling, zonder UI-editor, opslag, migratie of parsing uit `taskName`.

Sprint 32 Slice 3 voegde een compacte structured demo toe aan de read-only werkkaartpreview om de toekomstige dag/project/terrein-hierarchie visueel te valideren zonder nieuwe planninglogica of opslag.

Na de validatie is de zichtbare structuurdemo uit de dagelijkse planner verwijderd. De WorkCard types, documentatie en backlog blijven behouden.

De werkkaart toont:

- werknemer;
- datum;
- unieke resources voor die werknemer/dag;
- planningitems/opdrachten voor die werknemer/dag.

De structuurdemo valideerde demo/mock data voor:

- dagmaterieel;
- projecten;
- terreinen;
- instructie/materiaal/werkwijze.

De bron blijft uitsluitend bestaande plannerdata:

- `selectedCell`;
- zichtbare werknemers;
- zichtbare planningitems;
- bestaande resources;
- bestaande resource helperlaag.

## Gewijzigde Bestanden

Codebestanden gewijzigd tijdens Slice 1:

- `src/components/planning/WorkCardPreview.tsx`
- `src/app/page.tsx`

Codebestanden gewijzigd tijdens Slice 2B:

- `src/types/planning.ts`
- `src/lib/planning/work-card.ts`

Codebestanden gewijzigd tijdens Slice 3:

- `src/components/planning/WorkCardPreview.tsx`

Codebestand gewijzigd tijdens final planner cleanup:

- `src/components/planning/WorkCardPreview.tsx`

Documentatiebestanden voor closure:

- `sprints/sprint-32-planning-detail-work-card-discovery/SPRINT.md`
- `sprints/sprint-32-planning-detail-work-card-discovery/QA.md`
- `sprints/sprint-32-planning-detail-work-card-discovery/tickets/T3201.md`
- `sprints/sprint-32-planning-detail-work-card-discovery/tickets/T3202.md`
- `sprints/sprint-32-planning-detail-work-card-discovery/tickets/T3203.md`
- `PROJECT_STATE.md`

## UX-Beslissing

De werkkaart staat compact boven de matrix en verschijnt alleen wanneer een werknemer/dag geselecteerd is.

Belangrijke UX-keuzes:

- matrix blijft hoofdscherm;
- werkkaart is read-only;
- werkkaart gebruikt compacte secties;
- resources worden als nummerchips getoond;
- opdrachten blijven eenvoudige planningitem-titels;
- structuurdemo is duidelijk gelabeld als voorbeeld/read-only;
- demo-hierarchie leest van dag naar project naar terrein;
- dagelijkse planner toont na cleanup geen zichtbare structuurdemo meer;
- planner focust opnieuw op planning;
- geen werkbon-, nacalculatie- of uitvoeringstaal.

Lege dag:

- toont `Geen materieel gepland.`;
- toont `Geen opdrachten gepland.`;
- blijft bruikbaar als selected-cell context.

Dag met planning:

- groepeert unieke resources voor die werknemer/dag;
- toont dubbele resources maar 1 keer;
- toont alle planningitems voor die werknemer/dag.

## Read-Only Karakter

Slice 1 heeft geen editor toegevoegd.

Niet toegevoegd:

- projectregels;
- terreinen;
- materialen;
- hoeveelheden;
- instructies;
- werkbonstatus;
- uitvoeringregistratie.

Dit is bewust alleen een preview om layout, informatiehierarchie en positie in de planner te valideren.

## Structured Demo

Slice 3 gebruikte demo/mock data om te tonen hoe toekomstige werkkaartinhoud kan lezen.

Voorbeeldstructuur:

- dagmaterieel:
  - `0517-TRL-`;
  - `0392-TAL-`.
- project `FC Oppuurs`:
  - `A-terrein` met `Doorzaaien - 200 kg graszaad - 2 richtingen`;
  - `B-terrein` met `Doorzaaien - 200 kg graszaad - 2 richtingen`.
- project `Daltons`:
  - `A-terrein` met `Doorzaaien - 250 kg graszaad - 2 richtingen`.

Belangrijke afbakening:

- de demo wordt niet opgeslagen;
- de demo wordt niet afgeleid uit `taskName`;
- de demo is geen editor;
- de demo is geen werkbon;
- de demo is geen nacalculatie;
- de demo is geen materialenmodule.

Cleanup na validatie:

- de zichtbare `Structuurdemo` is verwijderd uit de dagelijkse planner;
- `WorkCard`, `WorkCardProject` en `WorkCardTerrain` blijven bestaan;
- WorkCard backlog en documentatie blijven behouden;
- dagelijkse planner toont alleen live planningcontext: werknemer, datum, materieel vandaag en opdrachten vandaag.

## WorkCard Typebasis

Slice 2B legt alleen een veilige typebasis vast.

Toegevoegd:

- `WorkCard`;
- `WorkCardProject`;
- `WorkCardTerrain`;
- `src/lib/planning/work-card.ts`.

Hiërarchie:

- dagniveau: `employeeId`, `date`, optionele `resourceIds`, optionele `dayNote`;
- projectniveau: `title`, `note`, `sortOrder`, `terrains`;
- terreinniveau: `name`, `instruction`, `materialText`, `methodText`, `note`, `sortOrder`.

Materialen:

- blijven vrije tekst op terreinniveau via `materialText`;
- vormen geen artikelcatalogus;
- vormen geen materialenmodule.

Relatie met bestaande planning:

- `PlanningItem` blijft leidend;
- `PlanningItem` contract is niet gewijzigd;
- `sourcePlanningItemIds?: string[]` kan later een expliciete link naar bronplanningitems leggen;
- `WorkCardSourcePlanningItem`, `WorkCardIdentity`, `getWorkCardKey` en `isPlanningItemForWorkCard` zijn read-only/conceptuele helpers;
- er is geen automatische parsing uit `taskName`.

## Non-Goals

Niet gebouwd:

- werkbonnen;
- nacalculatie;
- materialenmodule;
- uitvoeringregistratie;
- editor;
- print;
- PDF-export;
- WhatsApp-integratie;
- backend/API;
- persistence;
- localStorage;
- nieuw datamodel;
- datamigratie;
- wijziging aan `PlanningItem`;
- wijziging aan resourcecontract;
- wijziging aan conflictengine;
- wijziging aan planningengine.
- automatische parsing uit `taskName`;
- werkbonvelden;
- nacalculatievelden;
- structured demo persistence;
- materialenmodule;

## QA-Resultaat

QA volledig groen:

- werkkaart verschijnt bij selectie van werknemer/dag;
- werknemer klopt;
- datum klopt;
- lege dag toont nette lege state;
- dag met planningitems toont opdrachten;
- unieke resources worden gegroepeerd;
- dubbele resources worden niet dubbel getoond;
- werkkaart voelt als dagoverzicht, niet als werkbon;
- werkkaart blijft compact genoeg;
- matrix blijft visueel leidend;
- create/edit/delete blijven werken;
- relocation blijft werken;
- weeknavigatie/weekjump blijven werken;
- werkkaart update bij andere celselectie;
- werkkaart reset logisch bij weekwissel;
- bugs: nee.

Final cleanup QA:

- zichtbare structuurdemo is verwijderd uit de dagelijkse planner;
- live werkkaartpreview blijft beschikbaar;
- matrix blijft leidend;
- planner focust opnieuw op planning;
- planninglogica, resources, conflicts en availability zijn niet gewijzigd;
- build blijft groen.

Slice 2B QA groen:

- build blijft groen;
- `PlanningItem` contract is intact;
- `WorkCardPreview` blijft werken;
- create/edit/delete blijven werken;
- relocation blijft werken;
- weekjump blijft werken;
- geen editor toegevoegd;
- geen persistence toegevoegd;
- geen parsing uit `taskName` toegevoegd;
- geen werkbon/nacalculatievelden toegevoegd;

Slice 3 QA groen:

- werkkaart blijft read-only;
- live dagmaterieel/opdrachten blijven zichtbaar;
- structuurdemo is duidelijk herkenbaar als demo;
- werknemer en datum blijven bovenaan duidelijk;
- dagmaterieel is logisch geplaatst;
- projecten `FC Oppuurs` en `Daltons` zijn duidelijk onderscheiden;
- terreinen `A-terrein` en `B-terrein` zijn onder project gegroepeerd;
- instructie/materiaal/werkwijze zijn begrijpelijk;
- hierarchie dag -> project -> terrein voelt logisch;
- werkkaart voelt niet als werkbon;
- werkkaart voelt niet als nacalculatie;
- matrix blijft leidend en bruikbaar;
- `WorkCardPreview` blijft compact genoeg;
- create/edit/delete blijven werken;
- relocation blijft werken;
- weekjump blijft werken;
- bugs: nee.

Buildstatus:

- `npm run build` geslaagd.

## Resterende Aandachtspunten

- Later evalueren of de werkkaart inklapbaar moet worden als de extra verticale ruimte in praktijk stoort.
- Later evalueren of de volledige werkkaart inklapbaar moet worden als de extra verticale ruimte in praktijk stoort.
- Later pas onderzoeken of project-, terrein-, materiaal- of instructiedetails nodig zijn.
- Niet automatisch doorgroeien naar werkbon of nacalculatie.
- Later pas beslissen of en hoe WorkCard-data echt opgeslagen of bewerkt wordt.

## Advies

Sprint 32 Slice 1, Slice 2B en Slice 3 afronden.

Een volgende slice mag pas na praktijkfeedback bepalen of de werkkaart read-only blijft, inklapbaar moet worden of een beperkte detailstructuur nodig heeft. Geen editor, persistence of werkbonflow starten zonder aparte opdracht.
