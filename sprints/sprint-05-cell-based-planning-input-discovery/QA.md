# QA - Sprint 05 Cell-Based Planning Input Discovery

## Status

Afgerond met bekende browserautomationbeperking voor tekstinvoer.

## Doel Van QA

Valideren dat Sprint 05 de invoer dichter naar de planningcel brengt zonder scopegroei richting drag/drop, database, import, CRUD of nieuwe domeinmodules.

## Buildstatus

`npm run build` uitgevoerd.

Resultaat:

- build geslaagd;
- TypeScript-validatie geslaagd;
- Next.js static page generation geslaagd.

## Lokale UX-Controle

Localhost gecontroleerd op `http://127.0.0.1:3000`.

Gecontroleerd gedrag:

- cel selecteren werkt;
- geselecteerde cel krijgt lichte visuele selectie;
- precies 1 cel is actief geselecteerd;
- actieve celcontext toont werknemer en datum;
- formulier vult werknemer en datum vooraf in na celselectie;
- werknemer handmatig wijzigen blijft mogelijk;
- datumveld is niet disabled en niet read-only;
- bestaande submitflow is niet aangepast;
- geselecteerde cel blijft zichtbaar na submit;
- formulier reset na submit blijft bestaand gedrag;
- bestaande ResourceSelector is niet aangepast;
- weekstructuur blijft maandag t.e.m. vrijdag;
- geen nieuwe domeinlaag toegevoegd.

## Handmatige Testcases

| Test | Verwacht resultaat | Status |
| --- | --- | --- |
| Weekplanning openen | Board rendert zonder fout | Geslaagd |
| Cel selecteren | Werknemer en datum zijn duidelijk | Geslaagd |
| Formulier prefill werknemer/datum | Datum en werknemer worden ingevuld vanuit geselecteerde cel | Geslaagd |
| Werknemer handmatig wijzigen | Werknemerselectie blijft wijzigbaar | Geslaagd |
| Datum handmatig wijzigen | Datumveld blijft wijzigbaar | Beperkt bevestigd: veld is enabled/read-write; browserautomation kon native date input beperkt bedienen |
| Planningitem toevoegen | Item wordt via bestaande submitflow toegevoegd | Beperkt bevestigd: tijdens T502-browsercheck geslaagd; T503-tekstinvoer geblokkeerd door clipboardruntime |
| Item verschijnt in juiste cel | Item volgt bestaande `date` + `employeeId` grouping | Beperkt bevestigd: tijdens T502-browsercheck geslaagd; T503 niet volledig opnieuw door tekstinvoerbeperking |
| Geselecteerde cel blijft zichtbaar | Actieve celcontext blijft zichtbaar na submit | Geslaagd tijdens T502-browsercheck; selectiegedrag in T503 opnieuw bevestigd |
| Formulier reset na submit | Bestaand resetgedrag blijft actief | Geslaagd tijdens T502-browsercheck |
| Scanbaarheid met 1-2 items | Cellen blijven compact genoeg voor discovery | Beperkt bevestigd via bestaande cardweergave en T502-check |
| Gedrag met bestaande cards | Cards blijven zichtbaar binnen celstructuur | Beperkt bevestigd; geen cardcomponentwijziging uitgevoerd |

## Browserautomationbeperking

De in-app browser gaf opnieuw een virtual-clipboard beperking bij tekstinvoer. Daardoor kon T503 niet elke tekstinvoer- en submitcase volledig opnieuw automatiseren.

Dit is geen applicatieblokker, maar blijft een QA-beperking. Handmatige browservalidatie blijft aanbevolen voor:

- taak/project tekstinvoer;
- datum wijzigen via native date input;
- submit met 1-2 items;
- scanbaarheid van gevulde cellen.

## UX-Conclusie

De cell-based planning richting is bruikbaar als kleine discovery-slice.

Sterke punten:

- cel selecteren voelt logisch;
- actieve werknemer + datum zijn duidelijk zichtbaar;
- prefill vermindert invoerfrictie zonder formuliercontrole weg te nemen;
- velden blijven wijzigbaar, waardoor de flow veilig blijft voor discovery;
- selectie is zichtbaar zonder redesign.

Bevinding:

- na submit reset het formulier, terwijl de actieve cel zichtbaar blijft. Dit is bestaand gedrag en is niet gewijzigd. UX-matig kan dit verwarring geven, omdat de planner mogelijk verwacht dat datum en werknemer opnieuw uit de actieve cel worden gevuld.

## Scopecontrole

Niet toegevoegd:

- drag/drop;
- database/API/backend;
- import/export;
- CRUD;
- materials-module;
- transportmiddelbeheer;
- nieuwe frameworks of packages;
- nieuwe architectuurlaag;
- weekstructuur maandag-zondag;
- multilayer cells;
- wijziging aan `PlanningItem`;
- wijziging aan `ResourceSelector`.

## Open UX-Beslissingen

- Moet het formulier na submit leeg blijven, of opnieuw de actieve celcontext tonen?
- Moet actieve celcontext dichter bij het board zichtbaar worden, of is de formulierbadge voldoende?
- Is datum/werknemer-prefill genoeg, of moet T502 later evolueren naar een compacter contextpaneel?
- Hoeveel items per cel blijven scanbaar voordat een compactere cardweergave nodig is?
- Blijft maandag-vrijdag voorlopig leidend, of wordt maandag-zondag in een aparte sprint beslist?

## Advies Volgende Sprint

Voer eerst een kleine UX-beslissing uit over form reset versus actieve celcontext.

Aanbevolen volgende slice:

- geen nieuwe domeinlaag;
- geen drag/drop;
- geen view modes;
- alleen verfijnen hoe invoer na submit omgaat met de actieve cel;
- daarna pas scanbaarheid met meerdere echte planningcards beoordelen.
