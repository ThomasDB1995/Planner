# QA - Sprint 13 Materieelselector After-Use Ergonomie

## Status

Afgerond.

## Doel Van QA

Valideren dat Sprint 13 de bestaande enkelvoudige materieelselector compacter en minder dominant maakt, zonder create/edit/delete/relocation, optioneel materieel of conflictbadges te breken.

## Buildstatus

`npm run build` uitgevoerd bij T1305 closure.

Resultaat:

- build geslaagd;
- TypeScript-validatie geslaagd;
- Next.js static page generation geslaagd.

## Localhoststatus

Gecontroleerd op `http://localhost:3003`.

Resultaat:

- stale devserver op `http://localhost:3002` gaf na productiebuild een bekende `.next` chunk-fout;
- verse devserver gestart op `http://localhost:3003`;
- app rendert correct;
- Tailwind CSS wordt correct toegepast;
- browserconsole zonder actuele warnings of errors.

## Test Matrix

| Test | Verwacht resultaat | Status |
| --- | --- | --- |
| Build uitvoeren | Build slaagt zonder TypeScript errors | Geslaagd |
| Localhost openen | App rendert zonder console errors | Geslaagd |
| Planning zonder materieel | Item zonder materieel blijft geldig | Geslaagd |
| Planning met materieel | Materieel kan gekozen en op card getoond worden | Geslaagd |
| Auto-collapse na keuze | Selector klapt dicht na materieelkeuze | Geslaagd |
| Gekozen materieel zichtbaar | Gesloten summary toont gekozen nummer en naam | Geslaagd |
| Opnieuw openen/wijzigen | `Wijzig materieel` opent selector opnieuw | Geslaagd |
| Wissen van materieel | `Wissen` maakt materieelkeuze leeg | Geslaagd |
| Edit mode wijzigen/wissen | Bestaande card kan materieel direct wijzigen en wissen | Geslaagd |
| Delete regressie | Verplaatste/geselecteerde card kan verwijderd worden | Geslaagd |
| Relocation regressie | Card kan naar actieve doelcel worden verplaatst | Geslaagd |
| Conflictbadge | Dubbel materieel op dezelfde datum toont `Dubbel` | Geslaagd |
| Sticky form density | Form blijft sticky en open selector blijft compacter | Geslaagd |
| Browserconsole | Geen actuele warnings of errors | Geslaagd |
| Scopecontrole | Geen out-of-scope features toegevoegd | Geslaagd |

## Browserautomation Notitie

De bekende Browser Use virtual-clipboard beperking trad opnieuw op bij `fill`/`type`-achtige tekstinvoer. Voor T1305 is de QA-flow daarom uitgevoerd met losse keypress-events op eenvoudige taaknamen.

Gevalideerde taaknamen:

- `QAZONDER`;
- `QAMET`;
- `CONFLICTA`;
- `CONFLICTB`.

Dit was voldoende om de browsermatige create-, edit-, delete-, relocation- en conflictflows door de echte UI-state te laten lopen.

## Density Observatie

Gemeten tijdens de localhost-smoke:

- `PlanningForm` berekent als `position: sticky`;
- formhoogte met open selector: circa 348px;
- eerste materieelresultaatrij: circa 21px;
- resultatenlijst blijft begrensd met interne scroll.

De open selector is nog steeds zichtbaar aanwezig, maar minder dominant dan voor Sprint 13. Na selectie verdwijnt de grootste vertical-space impact doordat de selector automatisch dichtklapt.

## UX-Observaties

- Auto-collapse voelt natuurlijk omdat een enkelvoudige materieelkeuze een afgeronde micro-actie is.
- De gesloten summary houdt context zichtbaar via nummerbadge en naam.
- `Wijzig materieel` maakt heropening duidelijk en snel.
- `Wissen` blijft vindbaar wanneer materieel gekozen is.
- De trade-off blijft dat meerdere opeenvolgende taken met hetzelfde materieel opnieuw openen en kiezen vragen.
- Die trade-off past voorlopig bij het bestaande resetgedrag na create en bij het optionele karakter van materieel.

## Scopecontrole

Niet toegevoegd:

- multi-materieel;
- `resourceIds`;
- nieuwe conflictregels;
- backend/API/database/persistence;
- drag/drop;
- availability;
- CRUD/import;
- packages/frameworks;
- popover/modal-framework;
- virtualisatie;
- grote redesigns.

Interne contracten behouden:

- `Resource`;
- `resourceId`;
- `ResourceSelector`.

## QA-Conclusie

Sprint 13 voldoet aan de closurecriteria.

Closure-conclusie: de materieelselector is ergonomischer na gebruik, de gesloten context blijft duidelijk, en bestaande planningflows blijven werken. Sprint 13 is afgerond zonder domein- of contractuitbreiding.
