# QA - Sprint 12 Large Matrix Ergonomics & Materieel Labeling

## Status

Afgerond.

## Doel Van QA

Valideren dat Sprint 12 de bestaande matrixplanning bruikbaar houdt met meer werknemers, sticky invoer en UI-label `Materieel`, zonder bestaande create/edit/delete/relocation- of conflictflows te breken.

## Buildstatus

`npm run build` uitgevoerd bij T1205 closure.

Resultaat:

- build geslaagd;
- TypeScript-validatie geslaagd;
- Next.js static page generation geslaagd.

## Localhoststatus

Gecontroleerd op `http://localhost:3001`.

Resultaat:

- devserver opnieuw gestart na stale CSS/chunk 404 op oude sessie;
- app rendert na verse devserver-restart;
- Tailwind CSS wordt correct toegepast;
- `PlanningForm` berekent als `position: sticky`;
- browserconsole zonder actuele warnings of errors.

## QA-Focus

Sprint 12 moet vooral valideren:

- grotere werknemerslijst;
- sticky planningbar;
- sticky werknemerlabels;
- horizontale overflow;
- verticale scanbaarheid;
- quick planning flow;
- planning met en zonder materieel;
- edit/delete/relocation regressie;
- conflictbadges;
- matrix density.

## Test Matrix

| Test | Verwacht resultaat | Status |
| --- | --- | --- |
| Build uitvoeren | Build slaagt zonder TypeScript errors | Geslaagd |
| Localhost openen | App rendert zonder console errors | Geslaagd |
| Grotere werknemerslijst | 12 vaste werknemers zichtbaar in matrix | Geslaagd |
| UI-labels | Zichtbare resource-copy is vervangen door materieel-copy | Geslaagd |
| Contractscope | Interne `Resource`, `resourceId`, `ResourceSelector` blijven behouden | Geslaagd |
| Sticky planningbar | Form blijft zichtbaar tijdens verticale scroll | Geslaagd |
| Sticky werknemerlabels | Linker werknemerlabels blijven scanbaar bij grotere matrix | Geslaagd |
| Horizontale overflow | Matrix blijft binnen bestaande overflow-container bruikbaar | Geslaagd |
| Verticale scanbaarheid | Meer werknemers blijven leesbaar met compacte rijhoogte | Geslaagd |
| Quick planning flow | Cel -> taak/project -> Enter blijft de bedoelde flow | Geslaagd bij T1201-T1204 smoke; T1205 typing automation beperkt |
| Planning zonder materieel | Item zonder materieel blijft geldig | Geslaagd bij T1201-T1204 smoke |
| Planning met materieel | Materieel kan gekozen en compact getoond worden | Geslaagd bij T1201-T1204 smoke |
| Conflictbadges | Dubbel ingepland materieel toont conflictbadge | Geslaagd bij T1201-T1204 smoke |
| Edit | Direct local edit blijft werken | Geslaagd bij T1201-T1204 smoke |
| Delete | Card delete blijft werken | Geslaagd bij T1201-T1204 smoke |
| Relocation | Verplaatsen via actieve doelcel blijft werken | Geslaagd bij T1201-T1204 smoke |
| Scopecontrole | Geen out-of-scope features toegevoegd | Geslaagd |

## Browserautomation Notitie

Tijdens T1205 werd echte tekstinvoer opnieuw beperkt door de bekende Browser Use virtual-clipboard fout. Daardoor is de typing-heavy flow in T1205 niet opnieuw volledig geautomatiseerd.

Dezelfde flow is tijdens de T1201-T1204 implementatiesmoke wel browsermatig gevalideerd:

- cel selecteren;
- taak typen;
- Enter submit;
- planning met en zonder materieel;
- dubbele materieelplanning met conflictbadge;
- edit;
- delete;
- relocation naar andere werknemer/dag;
- conflictbadge verdwijnt wanneer relocation het conflict oplost.

T1205 heeft aanvullend opnieuw gevalideerd:

- buildstatus;
- verse localhost-render;
- correcte CSS na devserver-restart;
- sticky form;
- grotere werknemerslijst;
- materieellabels;
- afwezigheid van oude zichtbare resource-copy;
- console zonder warnings of errors.

## UX-Observaties

- `Materieel` werkt beter als zichtbaar UI-label dan `Resource`.
- De contracten stabiel houden voorkomt refactornoise en houdt deze sprint ergonomisch.
- Sticky form vermindert scrollfrictie bij grotere werknemerslijsten.
- Sticky werknemerlabels maken de linkerkolom bruikbaarer wanneer de matrix langer wordt.
- De matrix blijft leesbaar met 12 werknemers door compactere kolommen, cellen en cards.
- De open materieelselector neemt nog veel verticale ruimte in omdat hij onder de sticky form blijft staan.
- Gesloten voelt de sticky form compact genoeg; open selector is de belangrijkste resterende density-beperking.

## Density-Beperkingen

- De matrix is getest met 12 werknemers, niet met een volledige grote organisatie.
- Meerdere cards per cel blijven leesbaar, maar echte werkdruk met veel taken per dag vraagt later opnieuw visuele stresscheck.
- Open materieelselector plus sticky form kan veel viewport innemen.
- Multi-materieel zou de cardhoogte en conflictweergave raken en is daarom terecht niet in Sprint 12 gebouwd.

## Open Ergonomiepunten

- Materieelselector automatisch sluiten na keuze onderzoeken.
- Resource/materieel reset versus retain na create alleen verfijnen als praktijkflow dat vraagt.
- Selected card versus create mode blijft een bekend helderheidspunt.
- Bezette doelcel ambiguity uit Sprint 08 blijft open.
- Multi-materieel later apart discoveren met aandacht voor card-density en conflictvalidatie.

## Scopecontrole

Niet toegevoegd:

- multi-materieel;
- `resourceIds`;
- availability;
- drag/drop;
- backend/API/database/persistence;
- packages/frameworks;
- personeelsbeheer;
- resource CRUD/import;
- conflictregelwijzigingen;
- virtualisatie;
- grote redesigns.

## QA-Conclusie

Sprint 12 voldoet aan de closurecriteria.

Gevalideerd:

- build;
- localhost render na verse devserver-restart;
- grote werknemerslijst;
- sticky planningbar;
- sticky werknemerlabels;
- materieel-labeling zonder contractrefactor;
- matrix density en scanbaarheid;
- scopecontrole.

Closure-conclusie: Sprint 12 is afgerond als ergonomie- en density-slice. De resterende vragen horen bij latere UX-slices, vooral materieelselector after-use gedrag en multi-materieel discovery.
