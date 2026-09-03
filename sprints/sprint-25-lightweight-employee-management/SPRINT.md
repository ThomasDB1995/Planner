# Sprint 25 - Lightweight Employee Management

## Doel

Een kleine operationele employee-management slice toevoegen waarmee planners werknemers lokaal kunnen verbergen en opnieuw tonen zonder HR-, workflow- of persistence-complexiteit.

De planner blijft een operationele matrixplanner. Werknemersbeheer in deze sprint betekent alleen: de zichtbare werknemerslijst in de planner lokaal beheren.

## Scope

Sprint 25 Slice 1 is uitgevoerd als kleine lokale view/state-slice:

- lokale `plannerEmployees` state toegevoegd in `page.tsx`, initieel vanuit seeddata;
- `Employee` minimaal uitgebreid met optioneel `isHidden?: boolean`;
- helperlaag toegevoegd voor zichtbare en verborgen employees;
- zichtbare employees worden doorgegeven aan `PlanningForm` en `WeekPlanningBoard`;
- werknemers kunnen compact verborgen worden vanuit de werknemerrij;
- verborgen werknemers zijn herstelbaar via een compacte herstelregel;
- planningitems van verborgen werknemers blijven in state;
- availability van verborgen werknemers blijft in state;
- bij opnieuw tonen komen bestaande planningitems en availability terug;
- conflicts tellen alleen planningitems van zichtbare werknemers mee;
- selectie, editcontext en relocationcontext worden gewist wanneer de actieve werknemer verborgen wordt.

Na Slice 1 QA is een kleine UX-polish uitgevoerd:

- de `Verbergen`-actie per werknemerrij is minder dominant gemaakt en wordt vooral zichtbaar bij hover/focus;
- verborgen werknemers worden standaard samengevat als compacte regel `Verborgen: n`;
- herstelopties staan achter een compacte `Beheren`-actie;
- de herstelactie is verduidelijkt naar naam + `Terug tonen`.

Sprint 25 Slice 2 is uitgevoerd als lokale add-flow:

- werknemers kunnen lokaal toegevoegd worden met `Voornaam` en `Naam`;
- displaynaam is overal `Voornaam Naam`;
- `Employee` is uitgebreid met `firstName` en `lastName`;
- `name` blijft compatibel behouden als displayveld;
- lege velden worden geblokkeerd;
- dubbele volledige namen worden geblokkeerd;
- nieuwe werknemers verschijnen direct in matrix en `PlanningForm`-select;
- nieuwe werknemers kunnen planning en availability krijgen;
- nieuwe werknemers gebruiken dezelfde verbergen/tonen-flow als seedwerknemers;
- nieuwe werknemers blijven in-memory en verdwijnen bij reload.

Na Slice 2 is een kleine UX-polish uitgevoerd:

- werknemernaamkolom verbreed voor langere namen;
- lange namen kunnen beter over meerdere regels vallen;
- volledige naam staat in title/tooltip;
- hide-actie is een subtiel `x`-kruisje met accessible label en tooltip;
- toevoegregel is strakker uitgelijnd;
- technische copy `Lokaal in planner` is verwijderd.

Finale werknemerszone-polish:

- werknemer toevoegen en verborgen werknemers beheren zijn gebundeld in een compact kader `Werknemers`;
- standaardbeeld toont `Werknemers`, `+ Werknemer` en indien relevant `Verborgen: n · Beheren`;
- de inline add-flow opent pas na interactie en klapt na succesvol toevoegen terug in;
- de uitgeklapte verborgen lijst toont werknemernaam apart met actieknop `Terug tonen`;
- `Toon [naam]` is vervangen omdat dit klonk als bekijken in plaats van opnieuw zichtbaar maken.

## Gewijzigde bestanden

Codebestanden die tijdens Slice 1 zijn gewijzigd:

- `src/types/planning.ts`
- `src/lib/planning/employees.ts`
- `src/app/page.tsx`
- `src/components/planning/WeekPlanningBoard.tsx`
- `src/components/planning/EmployeeRow.tsx`

Codebestanden die tijdens de UX-polish zijn gewijzigd:

- `src/app/page.tsx`
- `src/components/planning/EmployeeRow.tsx`

Codebestanden die tijdens Slice 2 zijn gewijzigd:

- `src/types/planning.ts`
- `src/lib/planning/employees.ts`
- `src/data/seed.ts`
- `src/app/page.tsx`
- `src/components/planning/PlanningForm.tsx`
- `src/components/planning/EmployeeRow.tsx`
- `src/components/planning/PlanningTable.tsx`

Codebestanden die tijdens Slice 2 UX-polish zijn gewijzigd:

- `src/app/page.tsx`
- `src/components/planning/EmployeeRow.tsx`
- `src/components/planning/WeekHeader.tsx`

Codebestand dat tijdens de finale werknemerszone-polish is gewijzigd:

- `src/app/page.tsx`

Documentatiebestanden voor closure:

- `sprints/sprint-25-lightweight-employee-management/SPRINT.md`
- `sprints/sprint-25-lightweight-employee-management/QA.md`
- `sprints/sprint-25-lightweight-employee-management/tickets/T2501.md`
- `sprints/sprint-25-lightweight-employee-management/tickets/T2502.md`
- `PROJECT_STATE.md`

## UX-beslissing

De UI gebruikt operationele taal:

- `Verbergen`;
- `Verborgen werknemers`;
- `Terug tonen`.

Er is bewust geen HR-taal toegevoegd zoals `inactive`, `status`, contractstatus, profiel, dossier of personeelsbeheer als aparte module.

De hide-actie staat compact in de sticky werknemerrij. Na UX-polish is deze actie subtieler gemaakt zodat de matrix niet op een beheer- of HR-scherm lijkt. De actie blijft vindbaar via hover/focus en behoudt een duidelijke accessible label.

Verborgen werknemers verschijnen niet meer standaard als rij met meerdere herstelknoppen. De planner toont eerst alleen een compacte summary:

- `Verborgen: n`;
- `Beheren`.

Pas na `Beheren` verschijnen compacte herstelregels met de naam apart en de actie `Terug tonen`. `Toon [naam]` is bewust verwijderd omdat die copy dubbelzinnig voelde: het klonk alsof de planner iemand ging bekijken in plaats van opnieuw zichtbaar maken in de matrix.

Er is geen apart beheerpanel, modal, workflowbar of redesign toegevoegd.

Voor toevoegen is gekozen voor een compacte utility-zone:

- label `Werknemers`;
- knop `+ Werknemer`;
- input `Voornaam`;
- input `Naam`;
- knop `Toevoegen`.

De inline form verschijnt alleen na interactie en klapt na succesvol toevoegen terug in. Verborgen werknemersbeheer zit in hetzelfde kader, zodat de matrix visueel dominant blijft.

De technische copy `Lokaal in planner` is verwijderd omdat die te systeemgericht voelde. De UI blijft operationeel en niet-HR.

Het subtiele `x`-kruisje betekent verbergen uit de planner. Dit is geen hard delete. Tooltip en accessible label gebruiken `verbergen`.

## Architectuurbeslissing

Sprint 25 kiest voor verbergen/tonen in plaats van hard delete.

Reden:

- bestaande `PlanningItem.employeeId`-referenties blijven geldig;
- bestaande availability op `employeeId + date` blijft behouden;
- planningdata wordt niet gemigreerd, verwijderd of herverdeeld;
- verborgen werknemers kunnen later opnieuw zichtbaar worden gemaakt;
- de slice blijft lokaal en operationeel zonder HR-semantiek.

De lokale employee state is alleen in-memory. Seeddata blijft de startlijst. Er is geen persistence, backend, API of localStorage toegevoegd.

## Employee-structuur

`Employee` gebruikt na Slice 2:

- `firstName`;
- `lastName`;
- `name`;
- `isHidden?`.

`name` blijft compatibel behouden voor bestaande display- en legacygebruikspunten. Nieuwe werknemers krijgen `name` als `Voornaam Naam`.

Display in nieuwe UI loopt via `getEmployeeDisplayName(employee)`. Daarmee blijft bestaande seeddata compatibel en krijgen nieuwe werknemers overal dezelfde displaynaam.

## Validatie

De add-flow valideert lokaal:

- lege voornaam blokkeert toevoegen;
- lege naam blokkeert toevoegen;
- dubbele volledige displaynaam blokkeert toevoegen;
- foutcopy is Nederlands en operationeel.

Er is geen employee-profiel, status, rol, contract of HR-validatie toegevoegd.

## Conflictgedrag

Planningitems van verborgen werknemers blijven in `planningItems`, maar tellen niet mee in de zichtbare conflictstatus zolang hun werknemer verborgen is.

Wanneer de werknemer opnieuw getoond wordt:

- planningitems verschijnen terug in de matrix;
- availability verschijnt terug;
- conflictstatus telt de items opnieuw mee.

Dit houdt conflictweergave consistent met wat de planner op dat moment in de matrix ziet.

## QA-resultaat

Browser-QA bevestigde:

- werknemer verbergen verwijdert de rij uit de matrix;
- werknemer verbergen verwijdert de werknemer uit de `PlanningForm`-select;
- herstelregel toont duidelijk dat er verborgen werknemers zijn;
- `Terug tonen` zet de werknemer terug;
- bestaande planning van verborgen werknemer komt terug na tonen;
- availability van verborgen werknemer komt terug na tonen;
- verborgen werknemer-items tellen niet mee in zichtbare conflictstatus;
- na tonen tellen items opnieuw mee in conflictstatus;
- verbergen van werknemer met actieve selected cell wist selectie/formcontext;
- verbergen van werknemer met selected card/edit wist editcontext;
- verbergen tijdens relocation wist relocation source/destination;
- create, edit en delete blijven werken;
- relocation blijft werken;
- weeknavigatie blijft werken;
- UI blijft compact en voelt niet als HR-module;
- teksten zijn Nederlands en operationeel.

UX-polish QA bevestigde:

- werknemer verbergen werkt;
- hide-actie is subtiel maar vindbaar;
- verborgen werknemers summary is compact;
- `Beheren` opent herstelopties;
- `Terug tonen` herstelt werknemer;
- planning en availability komen terug;
- conflictfilter blijft correct;
- matrix voelt rustiger dan voordien;
- UI voelt niet als HR-module;
- create, edit, delete, relocation en weeknavigatie blijven intact.

Slice 2 QA bevestigde:

- nieuwe werknemer toevoegen met `Voornaam` + `Naam` werkt;
- lege `Voornaam` wordt geblokkeerd;
- lege `Naam` wordt geblokkeerd;
- dubbele volledige naam wordt geblokkeerd;
- nieuwe werknemer verschijnt direct als rij in de matrix;
- nieuwe werknemer verschijnt direct in `PlanningForm`-select;
- displaynaam is overal consistent `Voornaam Naam`;
- lange namen zijn voldoende leesbaar in de matrix;
- volledige naam is beschikbaar via title/tooltip;
- het `x`-kruisje is subtiel maar begrijpelijk als verbergen;
- het `x`-kruisje voelt niet als hard delete;
- verborgen werknemer verschijnt in compacte verborgen-werknemers summary;
- `Terug tonen` herstelt werknemer;
- planning en availability van verborgen werknemer komen terug na tonen;
- nieuwe werknemer kan planning krijgen;
- nieuwe werknemer kan availability krijgen;
- create, edit en delete blijven werken;
- relocation blijft werken;
- weeknavigatie blijft werken;
- conflictvalidatie blijft werken;
- bestaande seedwerknemers tonen correct;
- UI blijft compact en voelt niet als HR-module;
- layout blijft acceptabel op laptopbreedte met horizontale scroll.

Finale werknemerszone QA bevestigde:

- werknemerszone is een compact enkel kader;
- `+ Werknemer` opent de inline add-flow;
- toevoegen met `Voornaam` en `Naam` werkt;
- `Annuleren` sluit de add-flow;
- lege velden en dubbele volledige namen blijven geblokkeerd;
- verbergen werkt;
- `Verborgen: n · Beheren` werkt;
- naam + `Terug tonen` is duidelijker dan `Toon [naam]`;
- `Terug tonen` herstelt de werknemer;
- planning en availability komen terug na herstellen;
- create, edit, delete, relocation en weeknavigatie blijven intact;
- UI blijft compact en voelt niet als HR-module.

Build/typecheck:

- `npm run build` geslaagd na implementatie en na finale werknemerszone-polish;
- browser-QA uitgevoerd op `http://localhost:3031` voor finale werknemerszone-QA.

## Expliciete non-goals

Niet gebouwd:

- hard delete van werknemers;
- planningitems verwijderen of migreren;
- availability verwijderen;
- HR-profielen;
- personeelsdossiers;
- payroll;
- contractstatus;
- permissions/rechten;
- user management;
- employee edit;
- persistence;
- backend/API;
- localStorage;
- aparte employee-module;
- workflow engine;
- drag/drop;
- nieuwe packages/frameworks;
- redesign.

## Resterende aandachtspunten

- Verborgen werknemers maken bestaande planning tijdelijk onzichtbaar, maar dit is herstelbaar via `Terug tonen`.
- Er is nog geen persistence; verborgen/getoonde status reset bij reload.
- Later lokaal toevoegen van werknemers kan pas veilig volgen na aparte opdracht.
- Hard delete blijft buiten scope totdat er expliciete regels bestaan voor bestaande planningitems en availability.
- Omdat de hide-actie subtieler is, is discoverability afhankelijker van hover/focus. Dit is bewust gekozen om de matrix rustiger te houden.
- Nieuwe werknemers zijn nog niet persistent en verdwijnen bij reload.
- Er is nog geen employee-edit; foutief toegevoegde werknemers kunnen voorlopig alleen verborgen worden.

## Status

Sprint 25 Slice 1 en Slice 2 zijn afgerond. Sprint 25 wordt niet verder uitgebreid zonder nieuwe opdracht.
