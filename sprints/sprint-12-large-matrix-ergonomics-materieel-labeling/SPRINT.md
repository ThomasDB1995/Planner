# Sprint 12 - Large Matrix Ergonomics & Materieel Labeling

## Sprintstatus

Afgerond.

## Sprintdoel

De bestaande compacte matrixplanning beter geschikt maken voor een grotere werknemerslijst en de zichtbare UI-terminologie dichter bij de praktijk brengen.

Deze sprint blijft een ergonomie- en density-slice. De interne TypeScript-contracten blijven voorlopig `Resource`, `resourceId` en `ResourceSelector`; alleen zichtbare UI-copy gebruikt `Materieel`.

## Context

Sprint 11 is afgerond:

- matrixplanning werkt;
- formulier is compact;
- resource is optioneel;
- create/edit/delete/relocation werken;
- snelle repetitieve planning is de kernflow;
- drag/drop is nog niet gerechtvaardigd.

Nieuwe localhost-observaties voor Sprint 12:

- `Resource` voelt als UI-label te generiek;
- `Materieel` past beter bij de plannercontext;
- density moet met meer werknemers worden getest;
- de invoerbalk moet zichtbaar blijven tijdens verticale scroll;
- sticky werknemerlabels helpen bij grotere matrixen.

## In Scope

- UI-labels `Resource` naar `Materieel` aanpassen;
- interne resource-contracten behouden;
- vaste extra werknemers toevoegen aan seeddata;
- geen personeelsbeheer toevoegen;
- `PlanningForm` sticky maken tijdens verticale scroll;
- kleine matrix-density CSS-polish;
- sticky werknemerlabels links in de matrix;
- rijhoogte, spacing, borders en leesbaarheid aanscherpen;
- horizontale en verticale scroll valideren;
- create/edit/delete/relocation regressie valideren;
- QA en closure documenteren.

## Buiten Scope

- multi-materieel;
- `resourceIds`;
- conflictregelwijzigingen;
- availability;
- drag/drop;
- backend/API/database/persistence;
- packages/frameworks;
- personeelsbeheer;
- resource CRUD/import;
- grote redesigns;
- virtualisatie;
- paneelarchitectuur;
- nieuw layout-systeem.

## Ticketresultaat

### T1201 - UI-labels Resource naar Materieel

Uitgevoerd.

- zichtbare UI-copy gebruikt `Materieel`;
- page-copy gebruikt `optioneel materieel`;
- lege materieelkeuze toont `Geen materieel gekozen`;
- tabel/fallback-copy gebruikt `Materieel`;
- interne TypeScript-contracten zijn niet hernoemd.

### T1202 - Extra werknemer-seeddata

Uitgevoerd.

- vaste werknemerslijst uitgebreid naar 12 werknemers;
- doel is density- en scanbaarheidstest;
- geen CRUD of personeelsmodule toegevoegd.

### T1203 - Sticky planningbar/form

Uitgevoerd.

- `PlanningForm` is sticky gemaakt met de bestaande layout;
- geen nieuw panelsysteem of layoutarchitectuur toegevoegd;
- form blijft zichtbaar tijdens verticale matrix-scroll.

### T1204 - Large matrix scanbaarheid

Uitgevoerd.

- matrixkolommen iets compacter gemaakt;
- cellen/cards iets compacter gemaakt;
- werknemerlabels sticky links gemaakt;
- header en linkerkolom blijven visueel verbonden;
- geen virtualisatie of package toegevoegd.

### T1205 - QA, density-validatie en closure

Uitgevoerd.

- `npm run build` geslaagd;
- localhost opnieuw gecontroleerd na verse devserver-restart;
- browserconsole zonder warnings of errors;
- grotere werknemerslijst, sticky form, sticky werknemerlabels, matrix density en materieellabels gecontroleerd;
- bekende browserautomation-beperking rond tekstinvoer opnieuw genoteerd.

## UX-Conclusie

Sprint 12 bevestigt dat de matrix met 12 werknemers scanbaar blijft zonder een grotere redesignstap.

Het UI-label `Materieel` voelt domeingerichter dan `Resource`, terwijl de interne resource-contracten bewust stabiel blijven. De sticky invoerbalk verlaagt scrollfrictie omdat de planner niet telkens naar boven hoeft. Sticky werknemerlabels helpen vooral zodra de matrix horizontaal of verticaal groter wordt.

## Density-Beperkingen

- Een open materieelselector neemt merkbaar verticale ruimte in onder de sticky form.
- De sticky form voelt nog compact genoeg zolang de selector gesloten is.
- Bij veel werknemers en meerdere cards per cel blijft scanbaarheid bruikbaar, maar de combinatie van open selector en veel matrixcontent vraagt later mogelijk after-use ergonomie.
- Multi-materieel blijft een aparte discoveryfase, omdat meerdere materieelitems per card de card-density en conflictvalidatie wezenlijk raken.

## Open Vragen

- Moet de materieelselector automatisch sluiten na keuze om sticky vertical space te beperken?
- Moet dezelfde materieelkeuze soms behouden blijven voor meerdere opeenvolgende taken?
- Hoe worden meerdere materieelitems later compact op een card getoond zonder scanbaarheid te schaden?
- Hoe blijven conflictbadges leesbaar wanneer multi-materieel later wordt toegevoegd?
- Wanneer is een aparte dagfocus-view nodig voor nog grotere matrixen?

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

## Closure-Conclusie

Sprint 12 is afgerond. De planner gebruikt zichtbare `Materieel`-terminologie zonder contractrefactor, ondersteunt een grotere vaste werknemerslijst en blijft ergonomisch bruikbaar door sticky invoer en sticky werknemerlabels.
