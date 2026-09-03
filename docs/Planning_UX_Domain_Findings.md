# Planning UX & Domain Findings

## Doel

Dit document legt praktijkinzichten vast uit de localhost-validatie na Sprint 04.

Sprint 04 blijft afgesloten. Deze bevindingen zijn discovery-input voor toekomstige refinement en implementatieslices.

---

## Observaties

- De huidige weekplanning werkt technisch, maar voelt nog niet voldoende als dagelijkse terreinplanning.
- De planning lijkt in praktijk meer op een Excel-achtige planningsmatrix dan op een formuliergestuurde planning.
- Snelle invoer per cel lijkt belangrijker dan losse formulierinvoer bovenaan.
- De planner moet per dag en per werknemer snel kunnen zien wat er gepland staat.
- Resourcekeuze is belangrijk, maar niet de enige informatielaag binnen een planningcel.

---

## UX-Problemen Huidige Weekplanning

- Werknemers staan momenteel te dominant bovenaan.
- Datum en dagen moeten waarschijnlijk de primaire structuur worden.
- De huidige werkweek loopt maandag t.e.m. vrijdag, maar de planning moet mogelijk maandag t.e.m. zondag ondersteunen.
- Het huidige board is nog beperkt als matrix voor snelle dagelijkse planning.
- Planningitems toevoegen gebeurt nog via een centraal formulier, niet rechtstreeks vanuit een werknemer/datum-cel.
- Meerdere informatielagen per cel zijn nog niet ondersteund.

---

## Impact Op Domeinmodel

De huidige kernentiteiten blijven bruikbaar:

- werknemer;
- resource;
- planningitem;
- conflictvalidatie.

Nieuwe domeinrichting die verder onderzocht moet worden:

- artikelen/materialen;
- transportmiddel;
- meerdere lagen binnen een planningcel.

Mogelijke informatielagen per cel:

- project/taak;
- resource/machine;
- transportmiddel;
- artikelen/materialen.

Artikelen/materialen kunnen onder meer zijn:

- graszaad;
- meststoffen;
- teelaarde;
- zand;
- andere verbruiksgoederen.

Belangrijk: dit betekent nog niet dat er direct CRUD, database of import nodig is.

---

## Impact Op Planningstructuur

De planningstructuur moet waarschijnlijk evolueren naar:

- datum/dag als primaire scanstructuur;
- werknemer als kolom of rij binnen de dag;
- snelle celinvoer per werknemer + datum;
- compacte celweergave met project/taak en relevante extra lagen;
- weekweergave maandag t.e.m. zondag;
- mogelijk meerdere view modes.

De belangrijkste vraag is:

Hoe kan een planner per dag snel werk, mensen, resources en materialen overzien zonder te veel klikken?

---

## Mogelijke Weergavemodellen

### Model A - Dagen Als Rijen, Werknemers Als Kolommen

Voordeel:

- lijkt op de huidige Sprint 04-richting;
- werknemerplanning blijft duidelijk;
- geschikt voor compacte weekmatrix.

Risico:

- dagen kunnen nog te weinig dominant voelen;
- veel informatielagen kunnen cellen te druk maken.

### Model B - Dagen Als Primaire Secties

Voordeel:

- sluit beter aan op dagelijkse terreinplanning;
- maandag t.e.m. zondag kan duidelijker worden;
- per dag kan de planner sneller focussen.

Risico:

- weekoverzicht kan langer worden;
- werknemersvergelijking over de week wordt minder direct.

### Model C - View Modes

Mogelijke modes:

- weekmatrix;
- dagfocus;
- werknemerfocus.

Voordeel:

- ondersteunt meerdere planner-denkpatronen.

Risico:

- te vroeg bouwen kan scope te groot maken;
- view mode-switching kan afleiden van de eerste kleine slice.

---

## Risico's

- Te snel drag/drop willen bouwen terwijl de celstructuur nog niet helder is.
- Materialen/artikelen te vroeg als volledig beheer- of voorraadmodule behandelen.
- View modes bouwen voordat duidelijk is welke plannerflow het belangrijkst is.
- Planningcell te vol maken, waardoor scanbaarheid daalt.
- Nieuwe domeinlagen toevoegen zonder kleine verticale validatie.
- Terugvallen naar formuliergestuurde UX terwijl het werk eigenlijk cel/matrix-gedreven is.

---

## Open Beslissingen

- Is datum/dag de primaire structuur, of blijven werknemers primaire kolommen?
- Moet de standaardweek maandag t.e.m. zondag zijn?
- Welke view mode is eerst nodig: weekmatrix, dagfocus of werknemerfocus?
- Welke minimale velden horen in een planningcel?
- Moeten materialen/artikelen in eerste instantie vrije tekst, vaste opties of seeddata zijn?
- Is transportmiddel onderdeel van resource, of een aparte laag?
- Moet toevoegen per cel gebeuren via inline invoer, compact paneel of kleine selector?
- Hoeveel informatie mag zichtbaar zijn zonder dat scanbaarheid verloren gaat?

---

## Aanbevolen Volgende Slice

Aanbevolen kleine verticale vervolgstap:

**Cell-based planning input discovery**

Doel:

Valideren hoe een planner vanuit een werknemer + datum cel snel een project/taak kan toevoegen, zonder drag/drop en zonder database.

Minimale scope:

- bestaande weekplanning behouden;
- cel per werknemer + datum klikbaar of selecteerbaar maken;
- compact invoerpaneel openen voor project/taak;
- bestaande resource selector behouden;
- planningitem na toevoegen zichtbaar maken in de cel;
- geen materialen/artikelen implementeren, alleen documenteren als toekomstige laag.

---

## Voorstel Sprint 05

Sprint 05 - Cell-Based Planning Input Discovery

Doel:

De planninginvoer dichter bij de Excel-achtige matrix brengen door invoer te starten vanuit een werknemer/datum-cel.

In scope:

- klik/selectie op planningcel;
- geselecteerde werknemer en datum automatisch meenemen;
- compact invoerpaneel voor project/taak en resource;
- planningitem zichtbaar in dezelfde cel;
- behoud bestaande resource selector;
- behoud bestaande conflictvalidatie;
- weekstructuur voorbereiden op maandag t.e.m. zondag als expliciete beslissing.

Niet in scope:

- drag/drop;
- database;
- import;
- CRUD;
- backend/API;
- login;
- cloud;
- autosave;
- materiaalbeheer;
- transportmiddelbeheer;
- volledige view mode-architectuur.

Acceptance focus:

- minder frictie dan centraal formulier;
- duidelijke werknemer/datum context;
- compacte celweergave;
- bestaande resource- en conflictflow blijven werken.

---

## Discovery Eerst Houden

Deze onderwerpen moeten eerst discovery blijven:

- definitieve boardrichting;
- maandag-vrijdag versus maandag-zondag;
- meerdere view modes;
- materialen/artikelen als domeinlaag;
- transportmiddel als aparte laag;
- voorraad of verbruiksgoederenbeheer;
- drag/drop;
- import vanuit Excel;
- database of persistence.

---

## Advies

Advies: deels implementeerbaar, maar eerst als kleine discovery-slice.

Niet meteen bouwen:

- materialen/artikelen;
- transportmiddelenlaag;
- meerdere view modes;
- drag/drop;
- database/import.

Wel geschikt als volgende kleine implementatieslice:

- cell-based planning input op basis van bestaande lokale state;
- geen nieuwe domeinmodule;
- geen persistence;
- bestaande ResourceSelector en conflictvalidatie hergebruiken.

---

## Sprint 05 Discovery Resultaat

Sprint 05 heeft de kleinste cell-based planning slice gevalideerd.

Uitgevoerd:

- planningcellen zijn selecteerbaar gemaakt;
- geselecteerde cel krijgt lichte visuele selectie;
- actieve celcontext toont werknemer en datum;
- planningformulier vult datum en werknemer vooraf in vanuit de geselecteerde cel;
- datum- en werknemervelden blijven zichtbaar en wijzigbaar;
- bestaande submitflow, ResourceSelector, conflictvalidatie en weekstructuur zijn behouden.

UX-conclusie:

- celselectie voelt als een betere start voor dagelijkse planning dan puur centrale formulierinvoer;
- contextweergave in het formulier is duidelijk genoeg voor discovery;
- prefill verlaagt invoerfrictie zonder nieuwe architectuur;
- het formulier reset na submit, terwijl de actieve cel zichtbaar blijft. Dit is technisch consistent met bestaand gedrag, maar UX-matig nog te beslissen.

Nieuwe open beslissing:

Moet submit na celselectie het formulier volledig resetten, of datum en werknemer opnieuw vullen vanuit de actieve cel?

Blijft discovery-only:

- drag/drop;
- maandag-zondag weekstructuur;
- inline editor in de cel;
- materialen/artikelen;
- transportmiddelenlaag;
- meerdere view modes;
- database/import/persistence.

---

## Praktijkvalidatie Nieuwe Harde Requirements

Deze requirements komen uit praktijkvalidatie na Sprint 05 en overschrijven eerdere aannames over de richting van de weekmatrix.

### Requirement Summary

1. Weekplanning matrixrichting:

- werknemers moeten verticaal als rijen worden getoond;
- dagen/data moeten horizontaal als kolommen worden getoond;
- dit is een kernvereiste;
- de huidige richting met dagen als rijen en werknemers als kolommen is verkeerd voor de praktijkflow.

2. Weekdagen:

- standaard toont de planning maandag t.e.m. vrijdag;
- er moet later een optie komen om zaterdag en zondag mee te tonen;
- weekendweergave is een optie, geen nieuwe standaard.

3. Resources per taak/project:

- meerdere machines, voertuigen of resources moeten per taak/project geselecteerd kunnen worden;
- resources moeten ook los van een project of taak ingepland kunnen worden;
- dit mag niet worden opgelost door direct een materialenmodule of volledige resourceplanningmodule te bouwen.

4. Resource seeddata:

- de huidige resource/machinelijst is te beperkt voor echte praktijkvalidatie;
- echte Perceel-machines moeten later toegevoegd worden;
- dit is seeddata/refinement, geen CRUD- of importbeslissing.

5. Werknemers:

- er moet een standaard vaste werknemerslijst zijn;
- handmatig extra werknemers toevoegen moet later mogelijk worden;
- dit betekent nog geen volledig personeelsbeheer.

6. Onbeschikbaarheid:

- per werknemer per dag moet kunnen worden aangeduid dat de werknemer niet beschikbaar is;
- de cel moet dan grijs worden;
- doel is onmiddellijk zichtbaar maken dat die werknemer die dag niet ingepland mag worden;
- dit is beschikbaarheidsmarkering, nog geen volledig HR- of afwezighedenbeheer.

### Impact Op Planningmodel

De bestaande kernentiteiten blijven bruikbaar, maar latere slices moeten rekening houden met:

- matrixcel blijft conceptueel `employeeId + date`;
- UI-orientatie draait om naar werknemer als rij en dag als kolom;
- planningitems blijven aan werknemer en datum gekoppeld;
- resourcekoppeling moet later van enkelvoudig `resourceId` naar meerdere resources kunnen evolueren;
- resource zonder taak/project vereist later een expliciete minimale representatie, bijvoorbeeld een planningitem met resourcecontext of een aparte lightweight reservering;
- employee availability moet per `employeeId + date` kunnen worden vastgelegd;
- extra werknemers moeten lokaal kunnen worden toegevoegd zonder volledig personeelsbeheer.

Nog niet beslissen:

- exacte datavorm voor meerdere resources;
- exacte datavorm voor losse resourceplanning;
- opslagvorm voor extra werknemers;
- opslagvorm voor onbeschikbaarheid;
- import of beheer van echte Perceel-machines.

### Impact Op UI

Harde UI-richting:

- werknemers links verticaal als vaste rijlabels;
- dagen/data bovenaan horizontaal als kolommen;
- standaard maandag t.e.m. vrijdag zichtbaar;
- weekend optioneel zichtbaar te maken;
- cel blijft het primaire interactiepunt;
- onbeschikbare werknemer/dag-cel krijgt een grijze, niet-inplanbare status;
- scanbaarheid van de matrix heeft prioriteit boven formulieruitbreiding.

Belangrijk voor vervolgwerk:

- Sprint 05 cell selection is inhoudelijk bruikbaar, maar de matrixorientatie moet worden omgedraaid;
- huidige celselectie/prefill moet niet verder worden uitgebreid voordat de matrixrichting is gecorrigeerd;
- weekendweergave mag pas na matrixorientatie worden opgepakt;
- multi-resource selectie mag niet tegelijk met matrixorientatie worden gebouwd.

### Risico's

- Matrixorientatie combineren met multi-resource selectie maakt de slice te groot.
- Onbeschikbaarheid combineren met matrixorientatie kan leiden tot verborgen beschikbaarheidsarchitectuur.
- Extra werknemers toevoegen kan te snel uitgroeien tot personeelsbeheer.
- Echte Perceel-machines toevoegen kan te snel richting import/CRUD gaan.
- Resources los plannen kan te snel een aparte resourceplanningmodule worden.
- Weekendweergave kan scope vergroten als dit tegelijk met matrixherbouw gebeurt.
- Multi-resource selectie kan bestaande conflictvalidatie raken en moet apart worden gesliced.

### Open Beslissingen

- Hoe blijft de linkerkolom met werknemers scanbaar bij meer werknemers?
- Wordt weekend getoond via simpele toggle, instelling of aparte compacte optie?
- Wat is de minimale UX voor handmatig extra werknemer toevoegen zonder beheeromgeving?
- Hoe wordt werknemer-onbeschikbaarheid ingevoerd: celactie, checkbox, statusknop of compact paneel?
- Blokkeert onbeschikbaarheid planning hard, of is het eerst alleen visueel grijs met waarschuwing?
- Hoe worden meerdere resources in een cel compact getoond zonder scanbaarheid te verliezen?
- Hoe wordt een resource los van taak/project weergegeven in dezelfde matrix?
- Wanneer en hoe wordt echte Perceel-resource seeddata toegevoegd zonder import/CRUD?

### Voorstel Sprint 06 Slicing

**Sprint 06 - Week Matrix Orientation**

Doel:

Corrigeer de weekplanning naar de harde matrixrichting: werknemers als rijen, dagen/data als kolommen.

In scope:

- bestaande weekplanning herorienteren;
- werknemers links als rijen;
- maandag t.e.m. vrijdag bovenaan als kolommen;
- bestaande planningitems in juiste werknemer/dag-cel tonen;
- bestaande celselectie en actieve celcontext behouden of opnieuw aansluiten;
- geen weekendtoggle bouwen, hoogstens voorbereiden/documenteren.

Buiten scope:

- onbeschikbaarheid;
- multi-resource selectie;
- extra werknemers toevoegen;
- echte Perceel-machines toevoegen;
- resources los plannen;
- drag/drop;
- database/API/backend.

**Verouderde aanbeveling - Sprint 07 Employee Availability**

Deze aanbeveling is na latere praktijkvalidatie bijgestuurd. Sprint 07 is niet langer Employee Availability.

Availability blijft belangrijk, maar schuift door naar een latere aparte slice omdat planningcard-selectie, focus en lokale delete eerst nodig zijn voor de dagelijkse planninginteractie.

Doel van de doorgeschoven availability-slice:

Per werknemer per dag onbeschikbaarheid zichtbaar maken in de matrix.

In scope:

- minimale lokale availability-state;
- cel grijs maken bij onbeschikbaarheid;
- eenvoudige manier om beschikbaar/onbeschikbaar te markeren;
- duidelijke visuele waarschuwing dat de werknemer niet ingepland mag worden.

Buiten scope:

- volledig personeelsbeheer;
- ziekteworkflow;
- verlofaanvragen;
- backend/persistence;
- complexe rechten.

**Sprint 07 - Planningcard Interaction Discovery**

Doel:

Planningcards afzonderlijk selecteerbaar, visueel focusbaar en lokaal verwijderbaar maken als voorbereiding op latere relocation.

In scope:

- card selection/focus state;
- compacte focus UI;
- lokale delete uit `planningItems` state;
- bestaande celselectie behouden;
- bestaande prefill behouden;
- bestaande conflictvalidatie behouden;
- relocation discovery note.

Buiten scope:

- drag/drop;
- echte move naar andere cel;
- availability;
- multi-resource;
- weekendtoggle;
- packages/frameworks;
- backend/database/persistence;
- statusworkflow cleanup;
- defectstatus-focus;
- architectuuruitbreiding.

**Verouderde aanbeveling - Sprint 08 Multi-Resource Assignment**

Doel:

Onderzoeken en bouwen van minimale multi-resource koppeling per planningitem.

In scope:

- meerdere resources per taak/project selecteren;
- compacte weergave van meerdere resources in een cel;
- eerste impact op conflictvalidatie onderzoeken;
- resources los van taak/project als aparte kleine UX-vraag voorbereiden.

Buiten scope:

- materialenmodule;
- resourcebeheer CRUD;
- import;
- voorraad;
- volledige resourceplanningmodule.

Deze aanbeveling is na Sprint 07 bijgestuurd. Multi-resource blijft belangrijk, maar schuift door naar een latere aparte slice.

Sprint 08 is nu voorbereid als Relocation Discovery, omdat planningcards inmiddels selecteerbaar, focusbaar en lokaal verwijderbaar zijn. De kleinste volgende stap is:

1. selecteer een planningcard;
2. selecteer een actieve doelcel;
3. voer expliciet `Verplaats naar actieve cel` uit;
4. wijzig alleen `PlanningItem.employeeId` en/of `PlanningItem.date`;
5. laat bestaande conflictvalidatie opnieuw afleiden uit `planningItems`.

Nog steeds buiten scope voor Sprint 08:

- drag/drop;
- drag/drop packages/frameworks;
- undo/history;
- persistence/backend/API;
- realtime sync;
- multi-select;
- bulk move;
- keyboard move;
- contextmenu;
- availability-regels;
- multi-resource conflictregels.

### Niet Combineren

Deze zaken mogen niet in 1 sprint gecombineerd worden:

- matrixorientatie + onbeschikbaarheid;
- matrixorientatie + multi-resource selectie;
- onbeschikbaarheid + personeelsbeheer;
- echte Perceel-resource seeddata + import/CRUD;
- multi-resource selectie + materialen/artikelen;
- weekendtoggle + matrixorientatie + availability;
- resources los plannen + volledige resourceplanningmodule.

---

## Praktijkvalidatie Planningcard-Manipulatie

### Operationele Context

In echte planningworkflow worden taken, projecten en planningitems frequent verschoven.

Een planner moet niet alleen nieuwe items toevoegen, maar bestaande planningcards kunnen aanwijzen, beoordelen en later verplaatsen wanneer:

- werk naar een andere dag schuift;
- een andere werknemer het werk moet uitvoeren;
- planning tijdens de week wijzigt;
- werk opnieuw verdeeld wordt door beschikbaarheid, weer, materiaal of prioriteit.

### Harde Requirement

Planningitems, taken en projecten moeten uiteindelijk:

- afzonderlijk selecteerbaar zijn;
- visueel focusbaar zijn;
- later met de muis verplaatsbaar worden;
- kunnen verschuiven naar een andere dag;
- kunnen verschuiven naar een andere werknemer.

Dit is een kernvereiste voor de praktijkflow, maar nog geen opdracht om drag/drop te bouwen.

### Waarom Dit Belangrijk Is

De planning is geen statische invoerlijst. In de praktijk is verschuiven een dagelijkse handeling.

Zonder card-selectie en latere verplaatsbaarheid blijft de weekplanning te veel formuliergestuurd:

- de planner kan bestaande planning niet snel herverdelen;
- kleine wijzigingen vragen te veel herinvoer;
- scanbaarheid en actiegerichtheid lopen uit elkaar;
- de matrix voelt minder als operationeel planbord.

### Impact Op Huidige Matrixplanning

De harde matrixrichting blijft leidend:

1. werknemers verticaal als rijen;
2. dagen/data horizontaal als kolommen;
3. planningcards in werknemer/dag-cellen.

Planningcard-manipulatie moet daarop aansluiten.

Belangrijke UI-impact:

- cellen blijven selecteerbaar;
- cards binnen cellen moeten apart selecteerbaar worden;
- card focus mag niet concurreren met cel focus;
- visuele focus moet compact blijven;
- verplaatsing mag pas worden onderzocht nadat matrixorientatie klopt;
- muisverplaatsing moet uiteindelijk kunnen verplaatsen naar andere werknemer/dag-cellen.

### Impact Op Toekomstige State Management

Latere card-manipulatie raakt state management sterker dan Sprint 05 deed.

Te verwachten impact:

- er komt waarschijnlijk aparte selected-card state naast selected-cell state;
- verplaatsen betekent wijzigen van `employeeId` en/of `date` op een bestaand planningitem;
- multi-resource assignment en availability kunnen relocation later beinvloeden;
- conflictvalidatie moet na verplaatsing opnieuw draaien;
- zonder persistence blijft dit voorlopig lokale state;
- undo/history, backend sync en realtime gedrag blijven buiten scope.

T701 t/m T703 hebben deze basis inmiddels technisch gevalideerd:

- planningcards kunnen apart geselecteerd worden;
- card focus kan visueel los bestaan van celselectie;
- delete-acties op cards kunnen los van celacties bestaan;
- event bubbling tussen card, deleteknop en cel is beheersbaar.

Daarmee is de veiligste volgende relocation-discovery geen drag/drop, maar een expliciete move-flow.

Aanbevolen eerste relocation-slice:

1. selecteer een planningcard;
2. selecteer een doelcel;
3. voer een expliciete actie uit, bijvoorbeeld `Verplaats naar actieve cel`;
4. wijzig alleen `PlanningItem.employeeId` en/of `PlanningItem.date`;
5. laat bestaande conflictvalidatie opnieuw afleiden uit de aangepaste `planningItems`.

Deze aanpak houdt de interactie controleerbaar:

- de planner kan card en doelcel apart controleren;
- accidental moves zijn minder waarschijnlijk dan bij vroege drag/drop;
- event bubbling blijft lokaal te testen;
- conflictvalidatie kan apart gevalideerd worden;
- undo/history, persistence en drag/drop-packages blijven buiten scope.

Nog niet beslissen:

- exacte API of statevorm voor card movement;
- drag/drop-library of eigen implementatie;
- keyboard movement;
- undo/history;
- persistence;
- realtime samenwerking.

### Risico's Van Te Vroege Drag/Drop

- Drag/drop bouwen voordat matrixorientatie klopt leidt tot herwerk.
- Drag/drop bouwen voordat card selection duidelijk is maakt interactie ambigu.
- Drag/drop kan hidden architecture afdwingen rond state, undo, persistence of collision handling.
- Drag/drop kan conflictvalidatie complexer maken voordat multi-resource assignment duidelijk is.
- Drag/drop kan accessibility en keyboardgedrag overslaan.
- Drag/drop kan scope onbedoeld opentrekken naar packages/frameworks.

Aanvullende risico's voor relocation:

- accidental moves wanneer card en doelcel niet expliciet genoeg zijn;
- verwarring tussen celselectie als invoer-prefill en doelcel als move-target;
- stale conflictweergave als conflictvalidatie niet opnieuw via `planningItems` loopt;
- snelle vraag naar undo/history zodra verplaatsen bestaat;
- persistence/backend-vragen zodra verplaatsingen belangrijker worden voor echte planningdata.

### Aanbevolen Discoveryvolgorde

1. **Matrix orientation**

   Eerst de matrix corrigeren naar werknemers als rijen en dagen/data als kolommen.

2. **Card selection/focus**

   Daarna planningcards afzonderlijk selecteerbaar en visueel focusbaar maken, zonder verplaatsen.

3. **Move/relocation discovery**

   Daarna onderzoeken hoe een geselecteerde card naar andere dag of werknemer verschoven kan worden via een eenvoudige actie. De aanbevolen eerste flow is: geselecteerde card + doelcel kiezen + `Verplaats naar actieve cel`. Nog geen drag/drop, contextmenu of keyboard move.

4. **Drag/drop evaluatie**

   Pas daarna beoordelen of echte drag/drop nodig is, en of dit zonder nieuwe packages kan of een expliciete packagebeslissing vraagt.

### Sprint 08 Relocation Discovery Resultaat

Sprint 08 heeft de eerste expliciete relocation-flow gevalideerd zonder drag/drop.

Opgeleverd en gevalideerd:

- planningcard selecteren als bron;
- actieve doelcel kiezen als bestemming;
- expliciete actie `Verplaats naar actieve cel`;
- lokale update van exact 1 planningitem;
- alleen `employeeId` en `date` wijzigen;
- planningitem-id en overige velden behouden;
- conflictvalidatie opnieuw afleiden via bestaande `planningItems` stateflow;
- delete, cardselectie, celselectie en formulier-prefill blijven werken.

UX-conclusie:

- relocation naar lege cellen is duidelijk genoeg;
- relocation naar bezette cellen werkt wanneer de gebruiker op lege celruimte klikt;
- klikken op een bestaande card in een bezette doelcel selecteert die card en zet geen destination;
- daardoor blijft bezette-doelcel-interactie een open UX-beslissing.

Belangrijk:

- Sprint 08 rechtvaardigt nog geen drag/drop;
- drag/drop blijft discovery-only;
- interaction ambiguity rond bezette doelcellen moet later apart onderzocht worden;
- dit mag niet automatisch worden opgelost met drag/drop, contextmenu, keyboard move of een nieuw interaction framework.

### Discovery-Only Houden

Deze onderwerpen blijven expliciet discovery-only:

- echte drag/drop;
- drag/drop packages/frameworks;
- undo/history;
- persistence/backend/API;
- realtime sync;
- collision/overlap-regels;
- multi-select;
- bulk move;
- keyboard relocation;
- verplaatsen met multi-resource conflictregels.

Niet combineren met de eerste relocation-slice:

- drag/drop;
- packages/frameworks;
- multi-select;
- bulk move;
- keyboard move;
- contextmenu;
- undo/history;
- realtime sync;
- persistence/backend/API;
- availability-regels;
- multi-resource conflictregels.

---

## Praktijkvalidatie Resource-Optioneel Plannen

### Nieuwe Harde Validatieregel

Resource, machine of voertuig mag niet verplicht zijn bij het toevoegen van een planningitem.

Minimale verplichte invoer:

- datum;
- werknemer;
- taak/project.

Optionele invoer:

- resource/machine/voertuig.

### Operationele Reden

Niet elk werk vraagt direct een resource. In de praktijk wordt soms eerst bepaald wie wat wanneer doet, terwijl de resource later volgt.

Voorbeelden:

- sommige taken hebben geen machine, voertuig of werktuig nodig;
- de planner wil eerst werknemer en taak vastleggen;
- resourcekeuze volgt pas wanneer materiaalverdeling duidelijk is;
- snelle planninginvoer is belangrijker dan volledige registratie in de eerste stap.

### Impact Op Planningflow

De planningflow moet minimale invoerfrictie ondersteunen:

- de planner moet een taak kunnen plannen zonder resourcekeuze;
- resourcekeuze blijft waardevol, maar is geen blokkade voor aanmaken;
- een planningcard zonder resource moet geldig kunnen bestaan;
- resource kan later worden aangevuld via een aparte interaction slice;
- de hoofdvraag blijft eerst: wie doet wat op welke dag?

Deze beslissing past bij de vereenvoudigde productrichting: planning moet sneller en minder administratief worden, niet vollediger ten koste van bruikbaarheid.

### Impact Op Conflictvalidatie

Conflictvalidatie rond resources mag alleen uitgevoerd worden wanneer een resource aanwezig is.

Nieuwe regel:

- planningitem met resource: resourceconflictvalidatie uitvoeren;
- planningitem zonder resource: geen resourceconflictcontrole uitvoeren;
- geen resource betekent geen dubbele-resource conflict en geen defect-resource waarschuwing.

Dit betekent nog niet dat de conflictservice nu wordt aangepast. Het is een vastgelegde productregel voor een latere implementatieslice.

### Impact Op Toekomstige Multi-Resource Ondersteuning

Multi-resource ondersteuning moet uitgaan van nul, een of meerdere resources per planningitem.

Belangrijk voor latere slices:

- geen resource blijft een geldige planningstatus;
- een enkele resource is niet langer conceptueel verplicht;
- meerdere resources zijn een uitbreiding op een optionele resourcekoppeling;
- conflictvalidatie moet later per aanwezige resource lopen;
- lege resourcecollectie mag geen conflict opleveren.

Daarmee verschuift het toekomstige model van `exact 1 resource` naar `0..n resources`, zonder nu al het typecontract of de UI te wijzigen.

### Bestaande Aannames Die Nu Fout Blijken

- Een planningitem hoeft niet altijd een machine/resource te hebben.
- Resourcekeuze hoort niet in de minimale validatie naast datum, werknemer en taak/project.
- Conflictvalidatie mag niet impliciet aannemen dat elk planningitem een resource heeft.
- Volledige registratie bij aanmaken is minder belangrijk dan snelle, bruikbare planninginvoer.
- Multi-resource is geen stap van 1 naar meerdere resources, maar van optioneel naar mogelijk meerdere resources.

### Niet Nu Doen

- code aanpassen;
- `PlanningItem` type wijzigen;
- formulier-validatie wijzigen;
- conflictservice wijzigen;
- multi-resource bouwen;
- resource-loze card UI ontwerpen;
- database/backend/persistence toevoegen.

---

## UX-Polish Requirement Autofocus Na Celselectie

### Nieuwe Requirement

Wanneer een gebruiker in een planningcel klikt:

- de cel wordt geselecteerd;
- `PlanningForm` vult werknemer en datum vooraf in;
- cursor/focus gaat automatisch naar het taak/project inputveld;
- de gebruiker kan direct beginnen typen.

### Waarom Dit Belangrijk Is

Deze polish verlaagt invoerfrictie in de matrixflow.

Operationele redenen:

- minder klikken na het kiezen van een werknemer/dag-cel;
- snellere planninginvoer;
- de matrix voelt meer als actieve werkplanning;
- de planner hoeft niet eerst visueel terug te zoeken naar het invoerveld;
- gebruiksgemak is belangrijker dan extra administratieve stappen.

### Impact Op Planningflow

De bestaande celselectie blijft de start van invoer:

1. gebruiker kiest cel;
2. datum en werknemer worden geprefilld;
3. taak/project veld krijgt focus;
4. gebruiker typt taak/project;
5. bestaande submitflow blijft leidend.

Dit is geen inline editor. Het formulier blijft de invoerplek, maar wordt sneller bruikbaar na celselectie.

### Buiten Scope

- inline editor in de cel;
- autosubmit;
- keyboard navigation;
- hotkeys;
- drag/drop;
- architectuurwijziging;
- nieuwe packages/frameworks;
- formulierflow herontwerpen.

### Aanbevolen Plaats Op Roadmap

Aanbevolen als kleine UX-polish ticket na Sprint 07, of als aparte micro-slice voor invoerfrictie.

Niet combineren met:

- relocation;
- drag/drop;
- multi-resource;
- availability;
- weekendtoggle;
- formulierarchitectuur refactor.

---

## Vereenvoudigde Productrichting Na Praktijkvalidatie

### Kerninzicht

De planning moet eenvoudiger en sneller worden.

De praktijkflow vraagt in deze fase vooral:

- snel plannen;
- planning kunnen verschuiven;
- matrix snel kunnen scannen;
- weinig administratieve workflow;
- zo weinig mogelijk extra statussen of assetcomplexiteit.
- planningitems kunnen aanmaken zonder verplichte resourcekeuze.
- na celselectie moet taak/project direct typklaar zijn.

### Planningstatussen Deprioriteren

Nieuwe productrichting:

- een planningitem is standaard impliciet gepland;
- aparte workflowstatussen zoals `voorlopig` en `bevestigd` zijn voorlopig overbodig;
- focus moet niet liggen op workflowadministratie;
- mogelijk later is een eenvoudige `uitgevoerd`-markering nuttig;
- `uitgevoerd` kan later bijvoorbeeld via rechter muisklik of contextactie onderzocht worden.

Belangrijk:

- statussen worden nu niet uit de code verwijderd;
- er wordt nu geen contextmenu gebouwd;
- er wordt nu geen nieuwe statusworkflow ontworpen.

Waarom minimale workflow belangrijker is:

- planners moeten snel kunnen herschikken;
- planners moeten taken kunnen vastleggen voordat alle resourcekeuzes bekend zijn;
- planners moeten na celselectie direct kunnen typen zonder extra klik;
- extra statuskeuzes vertragen invoer;
- verplichte resourcekeuze kan invoer onnodig blokkeren;
- statuskleuren kunnen visuele ruis geven in een matrix die vooral scanbaar moet zijn;
- de kernvraag is eerst: wie doet wat op welke dag, met welke resources?

### Defectstatus Resources Deprioriteren

Nieuwe productrichting:

- defectstatus van resources/machines is momenteel geen prioriteit in de hoofdplanningflow;
- defectstatus veroorzaakt extra state- en UI-complexiteit;
- defectstatus hoort mogelijk later thuis in onderhoud of assetbeheer;
- de hoofdplanning moet nu focussen op planning, verschuiven, scanbaarheid en gebruiksgemak.

Belangrijk:

- defectstatus wordt nu niet uit de code verwijderd;
- er wordt nu geen maintenance-module gebouwd;
- er wordt nu geen asset lifecycle ontworpen;
- defectmeldingen blijven hoogstens bestaande technische functionaliteit, maar zijn geen roadmapprioriteit voor de volgende slices.

### Bewust Geschrapte Complexiteit

Voor de komende UX-slices bewust niet centraal zetten:

- workflowstatus `voorlopig`;
- workflowstatus `bevestigd`;
- statusgedreven planningproces;
- defectstatus als prominente planningwaarschuwing;
- onderhoudsbeheer;
- asset lifecycle;
- contextmenu voor `uitgevoerd`;
- statusgeschiedenis;
- approval of bevestigingsflow.

### Impact Op Toekomstige Sprintprioriteiten

Roadmapprioriteit schuift naar:

1. matrixorientatie corrigeren;
2. planningcards selecteerbaar/focusbaar maken;
3. planningcards lokaal verwijderbaar maken;
4. relocation discovery zonder drag/drop;
5. scanbaarheid van cellen en cards verbeteren;
6. employee availability als latere visuele planninghulp;
7. multi-resource assignment pas daarna.

Lagere prioriteit:

- statusworkflow;
- defectstatus in hoofdplanning;
- onderhoud/assetbeheer;
- uitvoeringsregistratie;
- contextmenu-acties.

### Mogelijk Later Vereenvoudigen Of Verwijderen

Bestaande concepten die later opnieuw beoordeeld mogen worden:

- `PlanningStatus` als verplicht veld;
- statusselectie in het planningformulier;
- statuskleurmapping op planningcards;
- `voorlopig` en `bevestigd` als expliciete keuzes;
- prominente defectwaarschuwing in de hoofdplanning;
- defectstatus als onderdeel van resource scanbaarheid.

Niet nu doen:

- statussen uit types verwijderen;
- status UI verwijderen;
- defectstatus uit seeddata of resource type verwijderen;
- conflictvalidatie herschrijven;
- onderhouds- of assetmodule toevoegen.

### Open Beslissingen

- Blijft `uitgevoerd` later nodig als simpele markering?
- Is rechter muisklik/contextactie passend voor `uitgevoerd`, of moet dit via een kleine knop?
- Moeten statuskleuren verdwijnen zodra matrixorientatie is gecorrigeerd?
- Moet defectstatus volledig uit de hoofdplanning verdwijnen of alleen minder prominent worden?
- Wanneer wordt onderhoud/assetbeheer een aparte module, als dat al nodig is?

---

## Sprint 09 Planning UX Simplification Resultaat

Sprint 09 heeft de vereenvoudigde productrichting als low-risk UX-polish batch doorgevoerd.

Opgeleverd:

- resource is optioneel bij het aanmaken van planningitems;
- minimale verplichte invoer is nu datum, werknemer en taak/project;
- planningitems zonder resource zijn geldig;
- conflictvalidatie rond resources loopt alleen wanneer een resource aanwezig is;
- statuskeuze is uit de hoofd-invoerflow gehaald;
- planningcards tonen geen `voorlopig`, `bevestigd` of `uitgevoerd` badges;
- defectstatus is niet meer prominent in de hoofdselector/card-UX;
- na celselectie krijgt taak/project automatisch focus;
- planningcards zijn lichter en beter scanbaar;
- bestaande card selection, delete en relocation blijven behouden.

UX-conclusie:

- de planningflow voelt minder administratief;
- snelle dagelijkse invoer is beter ondersteund;
- de matrix blijft leidend;
- status en defectstatus blijven gedeprioriteerd voor de hoofdplanningflow.

Belangrijke technische nuance:

- `PlanningStatus` bestaat nog als intern typecontract;
- nieuwe items krijgen nog een vaste technische default;
- er is geen nieuwe statusworkflow en geen uitgevoerd-flow gebouwd.

QA-bevinding:

- taak/project input krijgt focus na celselectie;
- de input is zichtbaar en actief;
- echte automationtyping werd beperkt door de bekende virtual-clipboard beperking;
- geen productbug gevonden rond verborgen invoertekst.

Nieuwe toekomstige UX-slice:

- planningcards moeten later bewerkbaar worden;
- gebruiker moet een bestaande taak/project kunnen aanpassen;
- dit is niet in Sprint 09 gebouwd;
- geen inline editor, contextmenu, modal, persistence of nieuwe edit-feature is toegevoegd.

---

## Sprint 10 Planning Card Editing Voorbereiding

Sprint 10 is voorbereid als kleine UX-slice voor bestaande planningcards bewerken.

Aanbevolen richting:

- geselecteerde card gebruiken als edit target;
- bestaande `PlanningForm` hergebruiken;
- create/edit-flow duidelijk onderscheiden;
- taak/project aanpassen;
- optionele resource aanpassen of wissen;
- bestaande `PlanningItem` lokaal updaten met behoud van item-id;
- conflictvalidatie opnieuw laten afleiden via bestaande `planningItems` stateflow;
- card selection, delete en relocation behouden.

UX-conclusie:

- editten moet herinvoer verminderen, niet een nieuwe planningsmodus worden;
- het formulier mag editmodus krijgen, maar de card zelf krijgt geen inline editor;
- save/update moet expliciet blijven;
- annuleren moet zonder mutatie terugkeren naar toevoegen;
- resource blijft optioneel en status blijft verborgen.

Buiten scope voor Sprint 10:

- inline editor;
- drag/drop;
- backend/API/database/persistence;
- autosave;
- undo/history;
- packages/frameworks;
- multi-resource;
- availability;
- contextmenu;
- statusworkflow;
- defectstatus-focus;
- grote redesign.

---

## Sprint 10 Planning Card Editing Resultaat

Sprint 10 heeft bestaande planningcards bewerkbaar gemaakt via het bestaande `PlanningForm`.

Opgeleverd:

- geselecteerde card opent in edit mode;
- taak/project wijzigt direct lokaal;
- optionele resource kan direct lokaal gekozen of gewist worden;
- resource wissen zet de card terug naar `Geen resource`;
- datum en werknemer zijn in edit mode niet direct bewerkbaar;
- datum en werknemer blijven via relocation gewijzigd worden;
- conflictvalidatie herberekent na resourcewijziging;
- delete en relocation blijven werken na edit;
- create mode blijft werken na edit.

UX-conclusie:

- directe lokale edit past beter bij snelle planning dan een klassieke save/cancel-flow;
- de planner kan cards aanpassen zonder een extra workflowlaag;
- create/edit scheiding blijft belangrijk omdat selected card en actieve cel tegelijk betekenis kunnen hebben;
- de T1003-guardrail wist taak/project en resource wanneer de gebruiker vanuit edit mode een nieuwe create-cel kiest.

Open UX-punten:

- directe edit heeft nog geen undo/redo;
- selected card kan zichtbaar blijven terwijl het formulier in create mode staat;
- bezette doelcel ambiguity uit Sprint 08 blijft open;
- toekomstige server-backed persistence vereist een aparte infrastructure-slice.

Buiten scope gebleven:

- inline editor;
- drag/drop;
- persistence/backend/API;
- server-autosave;
- undo/redo;
- packages/frameworks;
- multi-resource;
- availability;
- save/cancel-flow;
- redesign.

Blijft buiten scope / later:

- availability;
- multi-resource;
- drag/drop;
- card editing;
- bezette doelcel interaction ambiguity;
- persistence/backend/API;
- undo/history;
- contextmenu;
- onderhouds- of assetmodule.

---

## Sprint 11 Planning Ergonomie & Matrix Density Resultaat

Sprint 11 heeft de bestaande matrixflow compacter en sneller gemaakt zonder nieuwe domeincomplexiteit.

Opgeleverd:

- formulier boven de matrix compacter gemaakt;
- actieve celcontext subtieler gemaakt;
- create/edit onderscheid behouden;
- ResourceSelector compacter en inklapbaar gemaakt;
- gekozen resource blijft zichtbaar;
- resource blijft optioneel;
- resource wordt na create gereset;
- planningcards en cellen compacter gemaakt;
- cards zonder resource tonen geen prominente `Geen resource` regel meer;
- resource wordt op cards alleen getoond wanneer aanwezig;
- Enter in taak/project gebruikt de bestaande submitflow;
- na create blijven actieve cel en autofocus behouden;
- taak/project reset na create;
- conflictinformatie staat compacter dichter bij de matrix;
- conflictengine en conflictregels zijn niet gewijzigd.

UX-conclusie:

- de matrix voelt meer centraal dan voor Sprint 11;
- het formulier voelt meer als snelle invoerstrip;
- de quick planning flow `cel klikken -> typen -> Enter -> volgende taak` is beter ondersteund;
- resource is beschikbaar maar duidelijk secundair;
- resource reset na submit is gekozen omdat resource optioneel is en onbedoeld hergebruik van dezelfde machine/resource risicovoller voelt dan een extra resourcekeuze;
- conflictinformatie voelt minder los doordat ze in de boardheader staat.

QA-bevindingen:

- build geslaagd;
- localhost gecontroleerd na verse devserver-restart;
- actuele browserconsole zonder warnings of errors;
- snelle repetitieve planning gevalideerd;
- planning met en zonder resource gevalideerd;
- edit, delete en relocation blijven werken;
- conflictbadge en compacte waarschuwing blijven werken;
- matrix density blijft leesbaar met meerdere cards per cel.

Nieuwe of resterende UX-punten:

- resource reset kan trager voelen wanneer meerdere opeenvolgende taken exact dezelfde resource gebruiken;
- ResourceSelector blijft open na gebruik en kan dan nog visuele ruimte innemen;
- compacte conflictweergave moet opnieuw bekeken worden bij veel waarschuwingen;
- selected card versus create mode blijft een open helderheidspunt;
- bezette doelcel ambiguity uit Sprint 08 blijft open;
- oude stale devserver-error rond ontbrekende `.next` chunk was niet actueel na serverrestart, maar blijft een praktische QA-notitie.

Buiten scope gebleven:

- availability;
- multi-resource;
- drag/drop;
- backend/API/database/persistence;
- packages/frameworks;
- inline editor;
- undo/history;
- contextmenu;
- keyboard navigation of hotkeys;
- statusworkflow;
- nieuwe conflictregels;
- grote redesign.

Aanbevolen volgende slices:

1. Resource selector after-use ergonomie
   - selector automatisch sluiten na keuze onderzoeken;
   - resource reset versus retain alleen verder verfijnen als praktijkflow daarom vraagt.

2. Selected card versus create mode clarity
   - verduidelijken wanneer selected card zichtbaar blijft terwijl create mode actief is.

3. Conflict summary stresscheck
   - compacte matrixheader-weergave testen met meerdere waarschuwingen zonder nieuwe conflictregels.

---

## Sprint 12 Large Matrix Ergonomics & Materieel Labeling Resultaat

Sprint 12 heeft de bestaande matrixflow gevalideerd met meer werknemers en betere praktijkterminologie, zonder nieuw domeinmodel.

Opgeleverd:

- zichtbare UI-copy gebruikt `Materieel` in plaats van `Resource`;
- interne TypeScript-contracten `Resource`, `resourceId` en `ResourceSelector` zijn behouden;
- vaste werknemerslijst uitgebreid naar 12 werknemers voor density-validatie;
- `PlanningForm` is sticky tijdens verticale scroll;
- werknemerlabels zijn sticky links in de matrix;
- matrixkolommen, cellen en cards zijn licht compacter gemaakt;
- horizontale/verticale scanbaarheid is opnieuw beoordeeld;
- build en localhostcontrole zijn uitgevoerd.

UX-conclusie:

- `Materieel` voelt domeingerichter dan `Resource` voor de planner;
- alleen UI-labeling aanpassen was voldoende en voorkomt onnodige contractrefactor;
- sticky form vermindert scrollfrictie bij grotere werknemerslijsten;
- sticky werknemerlabels helpen om rijcontext vast te houden in een grotere matrix;
- de matrix blijft met 12 werknemers bruikbaar zonder virtualisatie of nieuw layout-systeem.

QA-bevindingen:

- build geslaagd;
- localhost gecontroleerd na verse devserver-restart;
- actuele browserconsole zonder warnings of errors;
- CSS/chunk 404 op een stale devserver verdween na restart;
- grotere werknemerslijst, materieellabels, sticky form en sticky werknemerlabels gevalideerd;
- quick planning flow, planning met en zonder materieel, edit/delete/relocation en conflictbadges zijn tijdens T1201-T1204 smoke gevalideerd;
- T1205 typing-heavy herhaling bleef beperkt door bekende Browser Use virtual-clipboard beperking.

Nieuwe of resterende UX-punten:

- open materieelselector neemt onder de sticky form veel verticale ruimte in;
- gesloten voelt de sticky form compact genoeg, open selector is de belangrijkste density-beperking;
- bij nog meer werknemers of veel cards per cel kan een aparte stresscheck nodig worden;
- multi-materieel moet later apart worden onderzocht, omdat meerdere materieelitems per card cardhoogte, scanbaarheid en conflictvalidatie raken;
- materieelselector after-use gedrag is een logische volgende ergonomieslice.

Buiten scope gebleven:

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

Aanbevolen volgende slices:

1. Materieelselector after-use ergonomie
   - selector automatisch sluiten na keuze onderzoeken;
   - reset versus retain alleen verfijnen als praktijkflow daarom vraagt;
   - geen multi-materieel of resource CRUD.

2. Multi-materieel discovery
   - meerdere materieelitems per planningitem apart onderzoeken;
   - card-density en conflictvalidatie expliciet meenemen;
   - geen directe `resourceIds` refactor zonder goedgekeurde aanpak.

3. Large matrix stresscheck
   - meerdere cards per cel en nog meer werknemers testen;
   - bepalen of sticky form/header/werknemerlabels voldoende blijven.

---

## Sprint 13 Materieelselector After-Use Ergonomie Resultaat

Sprint 13 heeft het resterende Sprint 12-densitypunt rond de open materieelselector als kleine ergonomie-slice opgelost.

Opgeleverd:

- materieelselector klapt automatisch dicht na keuze van 1 materieelitem;
- gekozen materieel blijft zichtbaar in de gesloten summary;
- gesloten summary toont nummer en naam;
- knoptekst is contextueel: `Kies materieel` of `Wijzig materieel`;
- `Wissen` blijft beschikbaar wanneer materieel gekozen is;
- open selector is compacter gemaakt met compactere zoek/filterrij en resultatenrijen;
- resultatenlijst blijft begrensd met interne scroll;
- interne contracten `Resource`, `resourceId` en `ResourceSelector` zijn behouden.

UX-conclusie:

- auto-collapse voelt natuurlijk omdat een enkelvoudige materieelkeuze een afgeronde micro-actie is;
- de gesloten summary houdt voldoende context zichtbaar;
- de sticky form voelt minder dominant zodra de selector na gebruik dichtklapt;
- snelle heropening blijft belangrijk om de keuze niet definitief of verborgen te laten voelen.

QA-bevindingen:

- build geslaagd;
- localhost gecontroleerd na verse devserver-start;
- actuele browserconsole zonder warnings of errors;
- planning zonder materieel en planning met materieel gevalideerd;
- auto-collapse, gekozen summary, wijzigen, wissen en edit mode wijzigen/wissen gevalideerd;
- delete, relocation en conflictbadge blijven werken;
- Browser Use tekstinvoer bleef beperkt door virtual-clipboard gedrag; T1305 gebruikte losse keypress-events voor taaknamen.

Nieuwe of resterende UX-punten:

- bij meerdere opeenvolgende taken met hetzelfde materieel vraagt het huidige reset- en auto-collapsegedrag opnieuw openen en kiezen;
- dit is voorlopig acceptabel omdat materieel optioneel is en onbedoeld hergebruik van materieel risicovoller blijft dan een extra keuze;
- multi-materieel blijft apart omdat dit card-density, conflictvalidatie en typecontracten raakt.

Buiten scope gebleven:

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

Aanbevolen volgende slices:

1. Selected card versus create mode clarity
   - verduidelijken wanneer selected card zichtbaar blijft terwijl create mode actief is;
   - geen nieuwe interaction mode.

2. Materieel reset versus retain refinement
   - alleen oppakken als praktijkvalidatie aantoont dat veel opeenvolgende taken hetzelfde materieel gebruiken;
   - geen multi-materieel of `resourceIds`.

3. Multi-materieel discovery
   - later apart onderzoeken;
   - card-density en conflictvalidatie expliciet meenemen;
   - geen directe contractrefactor zonder goedgekeurde aanpak.

---

## Praktijkinzichten Taakvolgorde En Bureauplanning

Deze observaties komen uit localhost-validatie na Sprint 14. Ze zijn discovery-input en starten nog geen implementatiesprint.

### Observatie 1 - Taakvolgorde Binnen Dezelfde Cel

Binnen een werknemer/dag-cel kan de volgorde van taken operationeel belangrijk zijn.

Voorbeeld van een bureau-achtige dag:

- Bureau;
- 09:00u Afspraak Philippe Mallaerts;
- 11:00u Afspraak Dragon Golf;
- 13:00u WAOW.

De huidige cel toont meerdere planningcards, maar de volgorde is nog impliciet: feitelijk de volgorde waarin items lokaal zijn toegevoegd. Dat is voldoende voor basisplanning, maar niet altijd genoeg voor dagen waarin afspraken of vaste tijdstippen belangrijk zijn.

Operationele reden:

- planners moeten binnen een dag snel zien wat eerst komt;
- afspraken op vaste momenten moeten niet verdrinken tussen vrije taken;
- een werknemer/dag-cel kan een mini-dagplanning worden;
- handmatig verwijderen en opnieuw toevoegen is te veel frictie om volgorde te corrigeren.

Impact op planningmodel:

- `PlanningItem` heeft later mogelijk een optionele sorteerpositie binnen `employeeId + date` nodig;
- een optioneel tijdveld of tijdslot kan later nodig worden, maar niet voor alle taken;
- volgorde en tijd zijn verwant maar niet hetzelfde:
  - volgorde kan zonder tijd;
  - tijd kan sortering aansturen;
  - sommige terreinwerk-taken blijven bewust tijdloos.
- bestaande `employeeId + date` celcontext blijft de basis;
- availability blijft los van taakvolgorde.

Impact op matrix UX:

- binnen een cel moeten cards later mogelijk omhoog/omlaag kunnen;
- een subtiel tijdlabel kan nodig zijn op cards met tijd;
- sorteren op tijd moet onderzocht worden zonder alle taken verplicht een tijd te geven;
- drag/drop is niet automatisch nodig voor de eerste slice;
- cellen met veel taken kunnen hoger worden, waardoor density opnieuw beoordeeld moet worden;
- delete, edit, relocation en conflictbadges moeten blijven werken.

Risico's:

- te vroeg een volledig tijdslotmodel bouwen;
- tijd verplicht maken voor terreinplanning terwijl die vaak dag-gebaseerd blijft;
- drag/drop te snel als oplossing kiezen;
- cellen te druk maken met tijden, volgordeknoppen en indicatoren;
- volgorde combineren met employee grouping of bureauplanning waardoor de slice te groot wordt.

Open beslissingen:

- is de eerste oplossing handmatige volgorde of optionele tijd?
- zijn omhoog/omlaag acties voldoende voor de eerste discovery?
- moet tijd alleen display zijn of ook sortering bepalen?
- wat gebeurt er met taken zonder tijd tussen taken met tijd?
- blijft sortering per werknemer/dag lokaal of wordt dit later persistent?

### Observatie 2 - Bureauplanning Verschilt Van Terreinplanning

Bureau-personen werken mogelijk anders dan terreinmedewerkers.

Bureauplanning bevat vaker:

- afspraken;
- tijdstippen;
- interne bureaublokken;
- minder of geen materieel;
- hogere afspraakdensity;
- andere scanbehoefte dan terreinplanning.

Terreinplanning draait sterker rond:

- wie werkt waar;
- taak/project;
- optioneel materieel;
- beschikbaarheid;
- verplaatsbaarheid over dagen en werknemers.

Operationele reden:

- bureauwerk is vaker agenda-achtig;
- terreinwerk is vaker dagplanning met materieelcontext;
- dezelfde matrix kan beide tonen, maar niet elke werknemer heeft dezelfde informatiedichtheid nodig;
- planners moeten werknemers later mogelijk kunnen scannen per groep.

Impact op planningmodel:

- werknemers kunnen later een lichte groep of categorie nodig hebben;
- mogelijke groepen:
  - terreinploeg;
  - bureau;
  - flexi's/externen later eventueel.
- grouping hoort voorlopig bij werknemerweergave, niet bij permissions;
- grouping betekent nog geen HR-module;
- bureauplanning betekent nog geen aparte bureauplanner.

Impact op matrix UX:

- werknemers kunnen later gegroepeerd worden met visuele sectiekoppen;
- bureauwerknemers kunnen dichter bij elkaar staan;
- terreinploegen kunnen apart scanbaar blijven;
- filters of collapsible groepen kunnen later onderzocht worden;
- materieel kan in bureauplanning vaker leeg blijven en moet dus secundair blijven;
- tijdlabels kunnen voor bureau-cards belangrijker zijn dan voor terrein-cards.

Risico's:

- employee grouping verwarren met rollen, rechten of personeelsbeheer;
- aparte bureauplanner bouwen voordat duidelijk is of de bestaande matrix volstaat;
- te vroeg filters/collapse/permissions toevoegen;
- bureauplanning en intra-day ordering in dezelfde sprint combineren;
- tijdslotmodel verplicht maken vanuit bureaucases en daarmee terreinplanning vertragen.

Open beslissingen:

- zijn groepen vaste seeddata of lokaal instelbaar?
- is groepering alleen visueel of ook filterbaar?
- welke werknemers horen initieel bij bureau versus terrein?
- hebben bureaupersonen andere cardvelden nodig of alleen optionele tijd?
- moet group order handmatig instelbaar zijn?

## Aanbevolen Sprintvolgorde Na Deze Observaties

1. Latere slice - Intra-Day Task Ordering Discovery
   - onderzoeken hoe taken binnen dezelfde werknemer/dag-cel herschikt kunnen worden;
   - starten met kleine volgorde-discovery;
   - mogelijke richting: omhoog/omlaag acties;
   - optioneel tijdslot alleen documenteren of zeer klein onderzoeken;
   - geen drag/drop, geen volledig tijdslotmodel, geen persistence.

2. Latere slice - Employee Grouping & Bureau Planning Discovery
   - onderzoeken of werknemers gegroepeerd moeten worden;
   - mogelijke groepen: terreinploeg, bureau, later flexi's/externen;
   - bureauplanning als andere density- en tijdverwachting documenteren;
   - geen permissions, geen HR-module, geen aparte bureauplanner.

3. Daarna opnieuw prioriteren
   - selected card versus create mode clarity;
   - availability dense-cell stresscheck;
   - multi-materieel discovery;
   - persistence pas als aparte infrastructure-slice.

## Discovery-Only Blijft

- tijdslotmodel;
- verplichte tijden;
- sorteren op tijd;
- handmatige sortIndex persistence;
- drag/drop binnen cel;
- drag/drop tussen cellen;
- employee grouping implementatie;
- bureauplanner als aparte view;
- HR/workforce module;
- permissions;
- database/backend/API;
- realtime sync.

---

## Sprint 14 Employee Availability Discovery Resultaat

Sprint 14 heeft employee availability als kleine lokale discovery-slice toegevoegd.

Opgeleverd:

- lokale availability state op basis van `employeeId + date`;
- availability hoort bij de matrixcel en niet bij `PlanningItem`;
- `PlanningItem` is niet uitgebreid;
- compacte toggle voor actieve cel:
  - `Niet beschikbaar markeren`;
  - `Beschikbaar maken`;
- unavailable cellen krijgen een duidelijke grijze basisstijl;
- indicator `Niet beschikbaar` wordt subtiel in de cel getoond;
- bestaande planningcards blijven zichtbaar;
- create, edit, delete en relocation blijven werken;
- planning blijft technisch toegestaan;
- selected cell, destination cell en unavailable state blijven samen leesbaar;
- conflictbadges blijven zichtbaar op unavailable cellen.

UX-conclusie:

- unavailable werkt goed als visuele guardrail;
- de grijze cel voelt niet als harde systeemblokkering;
- planners krijgen sneller scanbaar signaal zonder nieuwe administratie;
- de indicator is compact genoeg in de huidige dense-cell validatie;
- toggle naast relocation is functioneel leesbaar zonder nieuwe interaction mode.

QA-bevindingen:

- build geslaagd;
- localhost gecontroleerd op `http://localhost:3006`;
- browserconsole zonder actuele warnings of errors;
- availability toggle gevalideerd;
- unavailable celstijl gevalideerd;
- create/edit/delete/relocation op unavailable cellen gevalideerd;
- selected/destination/unavailable combinaties gevalideerd;
- conflictbadge op unavailable cel gevalideerd;
- dense cell met meerdere cards en unavailable indicator gevalideerd.

Nieuwe of resterende UX-punten:

- indicatorruimte bij zeer volle unavailable cellen blijft een latere stresscheck;
- bezette-doelcelambiguiteit blijft een bestaand open UX-punt uit relocation discovery;
- die bezette-doelcelambiguiteit is geen availability-regressie;
- harde blokkering bij onbeschikbaarheid blijft discovery-only;
- availability-conflictregels blijven discovery-only.

Buiten scope gebleven:

- HR/workforce module;
- ziekte- of verlofworkflow;
- afwezigheidsredenen;
- permissions;
- persistence/backend/API;
- conflictregels;
- harde validatie;
- realtime sync;
- drag/drop;
- packages/frameworks;
- grote redesigns.

Aanbevolen volgende slices:

1. Selected card versus create mode clarity
   - verduidelijken wanneer selected card zichtbaar blijft terwijl create mode actief is;
   - geen nieuwe interaction mode.

2. Availability dense-cell stresscheck
   - indicatorruimte beoordelen bij zeer volle cellen;
   - alleen oppakken als praktijkvalidatie toont dat unavailable cellen vaak veel cards bevatten;
   - geen harde blokkering of HR-module.

3. Multi-materieel discovery
   - later apart onderzoeken;
   - card-density en conflictvalidatie expliciet meenemen;
   - geen directe contractrefactor zonder goedgekeurde aanpak.

---

## Sprint 15 Matrix Interaction Polish Resultaat

Sprint 15 heeft kleine localhost-observaties rond matrixinteractie opgepakt zonder nieuwe domeinlaag.

Opgeleverd:

- cardselectie wordt visueel gewist wanneer de gebruiker na cardselectie een andere cel kiest;
- relocation blijft behouden via een interne relocation-bron, ook wanneer de card niet meer visueel geselecteerd is;
- datumheader is compacter gemaakt door de secundaire ISO-datumregel te verwijderen;
- header toont nu alleen de compacte dag/datum zoals `MA 18/5`;
- Enter in het taak/projectveld submit in create mode via de bestaande form-submit;
- Enter in edit mode doet geen submit en veroorzaakt geen extra update;
- bestaande create, edit, delete, relocation, availability guardrail en materieelselector blijven behouden.

UX-conclusie:

- actieve cel en geselecteerde card concurreren minder visueel;
- relocation blijft expliciet via de knop `Verplaats naar actieve cel`;
- de header is rustiger en scanbaarder;
- Enter-to-add past bij de snelle matrixflow zonder keyboard-navigation of hotkey-systeem te introduceren.

QA-bevindingen:

- build geslaagd;
- localhost gecontroleerd op `http://localhost:3007`;
- card selecteren gevalideerd;
- andere cel klikken wist cardselectie;
- relocation na deselectie blijft werken;
- datumheader toont geen dubbele ISO-datum meer;
- Enter voegt nieuw item toe in create mode;
- Enter in edit mode veroorzaakt geen ongewenste submit;
- edit, delete en availability blijven werken;
- browserconsole zonder actuele warnings of errors.

Nieuwe of resterende UX-punten:

- relocation heeft nu een bron zonder visuele cardselectie zodra de gebruiker een doelcel kiest; de move-knop houdt de actie expliciet, maar broncontext kan later nog duidelijker worden als planners dat vragen;
- bezette-doelcelambiguiteit blijft bestaan en is niet opgelost in deze polish;
- task ordering, tijdslots en employee grouping blijven aparte discovery-slices.

Buiten scope gebleven:

- task ordering;
- tijdslotmodel;
- employee grouping;
- drag/drop;
- backend/API/persistence;
- packages/frameworks;
- nieuwe domeinlaag;
- grote redesigns.

Aanbevolen volgende slices:

1. Intra-Day Task Ordering Discovery
   - volgorde binnen dezelfde werknemer/dag-cel onderzoeken;
   - mogelijke eerste richting: omhoog/omlaag acties;
   - geen drag/drop of verplicht tijdslotmodel.

2. Employee Grouping & Bureau Planning Discovery
   - terreinploeg/bureau/flexi's externen onderzoeken;
   - geen permissions, HR-module of aparte bureauplanner.

3. Availability dense-cell stresscheck
   - indicatorruimte bij zeer volle unavailable cellen beoordelen;
   - geen harde blokkering.

---

## Sprint 16 Multi-Materieel Assignment Discovery

Sprint 16 is documentair voorbereid als discovery-sprint voor de nieuwe harde praktijkrequirement dat een taak/project later meerdere materieelitems moet kunnen bevatten.

Voorbeelden:

- tractor + frees;
- camion + aanhangwagen;
- meerdere machines tegelijk.

Belangrijk: Sprint 16 voert geen implementatie uit.

Niet gewijzigd:

- `PlanningItem.resourceId?: string`;
- `Resource`;
- `ResourceSelector`;
- bestaande selector;
- bestaande conflictservice;
- bestaande cardweergave;
- bestaande create/edit/delete/relocation-flow.

### Huidige Contractimpact

De single-resource aanname zit verspreid door de planner:

- `PlanningItem.resourceId?: string`;
- `PlanningConflict.resourceId`;
- `PlanningFormState.resourceId`;
- `PlanningForm` submit en resetlogica;
- directe editupdates via `resourceId`;
- `ResourceSelector` met `selectedResourceId` en `onSelect(resourceId)`;
- auto-collapse na een enkelvoudige materieelkeuze;
- `PlanningCell` die exact 1 resource opzoekt voor een card;
- `PlanningCard` die exact 1 resource-object ontvangt;
- `findPlanningConflicts` die groepeert op `date + resourceId`;
- legacy `PlanningTable` die 1 materieelitem toont.

Conclusie:

Een directe rename naar `resourceIds` lijkt eenvoudig, maar raakt create, edit, selector, cardweergave, conflictvalidatie en legacy weergave tegelijk. Dat is te breed voor een ongereviewde implementatiestap.

### Toekomstige Contractopties

#### Optie A - Huidig `resourceId` Behouden

Voordeel:

- maximale stabiliteit;
- geen regressie in bestaande flow;
- geschikt zolang 0 of 1 materieelitem voldoende is.

Nadeel:

- voldoet niet aan tractor + frees of camion + aanhangwagen;
- planners zouden meerdere cards moeten maken voor 1 taak;
- dat schaadt taakcontext en density.

#### Optie B - Later `resourceIds?: string[]`

Voordeel:

- natuurlijk 0..n model;
- planning zonder materieel blijft mogelijk;
- conflictvalidatie kan per gekoppeld materieelitem lopen.

Nadeel:

- brede contractwijziging;
- vereist gelijktijdige aanpassing van form, selector, card, conflicts en legacy table;
- migratiepad moet expliciet zijn.

#### Optie C - Overgangsmodel Met Adapter/Helper

Voordeel:

- kleinste veilige stap richting 0..n-denken;
- bestaand `resourceId` contract kan voorlopig blijven;
- conflict- en cardconcepten kunnen voorbereid worden zonder brede refactor.

Nadeel:

- tijdelijk extra denklaagje;
- helper mag niet uitgroeien tot verborgen parallel contract.

Adviesrichting:

- Sprint 17 mag alleen klein starten;
- voorkeur voor adapter/helper of expliciet klein contractvoorstel;
- geen brede `resourceId` naar `resourceIds` refactor in een keer.

### Compacte Cardweergave

Toekomstige UX-regels:

- 0 materieelitems: niets tonen;
- 1 materieelitem: huidige compacte regel;
- 2 materieelitems: compacte nummerbadges/chips;
- 3+ materieelitems: eerste 2 tonen plus `+n`;
- volledige namen via tooltip/title of latere detailcontext;
- taak/project blijft de primaire scanregel;
- conflictbadges blijven zichtbaar;
- cardhoogte mag niet structureel groeien door materieelnamen.

Density blijft leidend.

### Selector UX Discovery

Een toekomstige multi-materieel selector moet zonder library kunnen werken.

Gewenst gedrag:

- togglebare resultaten;
- selected summary;
- wissen per item;
- alles wissen;
- selector blijft open tijdens meerdere keuzes;
- duidelijke sluitactie, bijvoorbeeld `Klaar`;
- zoeken en filteren behouden;
- geen multi-select library;
- geen popover/modal-framework.

Belangrijk verschil met Sprint 13:

- auto-collapse is logisch bij 1 keuze;
- bij meerdere keuzes zou auto-collapse frictie geven;
- multi-keuze vraagt daarom een expliciete afrondingsactie.

### Conflictvalidatie Impact

Toekomstige regel:

- elk planningitem levert 0..n materieelboekingen;
- elke boeking is conceptueel `planningItemId + date + resourceId`;
- conflicten ontstaan per `date + resourceId`;
- een planningitem zonder materieel levert 0 boekingen;
- een lege collectie is conflictloos;
- relocation herberekent conflicten over alle gekoppelde materieelitems op de nieuwe datum.

Voorbeeld:

- tractor + frees levert 2 boekingen;
- tractor conflicteert onafhankelijk van frees;
- frees conflicteert onafhankelijk van tractor.

Open aandachtspunt:

- huidige `PlanningConflict.resourceId` is enkelvoudig;
- een card kan later meerdere conflicterende materieelitems hebben;
- summary en badges moeten compact blijven.

### Datumnotatie Guardrail

Nieuwe observatie:

Datumnotatie moet overal consequent Belgisch/Nederlandstalig blijven.

Wel:

- `19/05/2026`;
- `maandag 18 mei 2026`.

Niet:

- `2026-05-19`;
- maand/dag/jaar;
- gemengde formaten.

Te bewaken in:

- conflictmeldingen;
- summaries;
- badges en tooltips;
- selectorcontext;
- matrixheaders;
- toekomstige multi-materieel UX-voorstellen.

Niet nu doen:

- globale date-library toevoegen;
- internationalization/i18n toevoegen;
- bestaande datumcode refactoren zonder aparte implementatiescope.

### Go/No-Go Voor Sprint 17

Advies:

Voorzichtig Go voor een kleine Sprint 17 implementatieslice, mits strikt afgebakend.

Go-voorwaarden:

- geen brede `resourceId` naar `resourceIds` refactor;
- geen backend/persistence/API;
- geen drag/drop;
- geen realtime sync;
- geen packages;
- geen multi-select library;
- geen availability-wijzigingen;
- geen resource CRUD/import;
- geen volledige planner-redesign;
- eerst adapter/helper of klein contractvoorstel reviewen;
- carddensity en conflictvalidatie leidend houden;
- Belgische/Nederlandstalige datumnotatie bewaken.

No-Go:

- selector, card, conflictvalidatie, contractmigratie en persistence in 1 sprint combineren;
- drag/drop gebruiken als oplossing;
- multi-select library toevoegen;
- de planner redesignen om multi-materieel te dragen.

---

## Sprint 17 Multi-Materieel Prototype Voorbereiding

Sprint 17 is documentair voorbereid als kleine implementatieslice voor multi-materieel.

Belangrijk: deze voorbereiding voert nog geen codewijziging, build of localhost-QA uit.

### Ontwerpbesluit

`PlanningItem.resourceId` blijft voorlopig compatibel.

Multi-materieel wordt additief voorbereid via helpers/adapters die materieelkeuzes normaliseren naar een lijst.

`resourceId` blijft de primary mirror:

- bij 0 materieelitems is `resourceId` leeg of `undefined`;
- bij 1 materieelitem blijft `resourceId` exact de bestaande single-resource waarde;
- bij meerdere materieelitems wijst `resourceId` voorlopig naar het eerste materieelitem;
- de helperlaag is verantwoordelijk om de volledige lijst te lezen en te normaliseren;
- er komt geen brede contractrename in Sprint 17.

### Aanbevolen Ticketvolgorde

1. T1701 - Adapter/helper en compatcontract
   - conceptueel `planning-resources.ts`;
   - `getPlanningItemResourceIds(item)`;
   - `normalizeResourceIds(ids)`;
   - compat write-helper;
   - `resourceId` blijft primary mirror.

2. T1702 - Compacte cardweergave
   - 0 items: niets;
   - 1 item: huidige compacte regel;
   - 2 items: compacte badges/chips;
   - 3+ items: eerste 2 plus `+n`;
   - density blijft leidend.

3. T1703 - Minimale multi-selector
   - multi-select zonder library;
   - selected summary;
   - wissen per item;
   - alles wissen;
   - `Klaar`;
   - selector open houden tijdens meerdere keuzes;
   - bestaande single-flow niet breken.

4. T1704 - Conflictvalidatie per materieelitem
   - elk planningitem levert 0..n boekingen;
   - conflicts per `date + resourceId`;
   - `PlanningConflict.resourceId` voorlopig enkelvoudig houden;
   - Belgische/Nederlandstalige datumweergave bewaken.

5. T1705 - QA, regressie en closure
   - create/edit/wissen/delete;
   - relocation;
   - planning zonder materieel;
   - 1, 2 en 3+ materieelitems;
   - unavailable cells;
   - conflictbadges;
   - datumweergave.

### Verplichte Checkpoints

Na T1701:

- helpercontract reviewen;
- controleren dat `resourceId` single-resource compatibiliteit intact blijft;
- controleren dat lege waarden en duplicaten veilig worden genormaliseerd;
- controleren dat de write-helper `resourceId` als primary mirror behoudt;
- pas daarna card/selector/conflictwerk starten.

Na T1703:

- selector density reviewen;
- selected summary reviewen;
- wissen per item en alles wissen reviewen;
- `Klaar` controleren op duidelijke lokale sluitactie zonder save-semantiek;
- single-resource flow opnieuw beoordelen;
- pas daarna conflictvalidatie aanpassen.

### Belangrijkste Contractrisico's

- helperlaag kan een verborgen parallel contract worden als `resourceId` en een toekomstige lijst uit sync raken;
- directe editupdates zijn nu veldgericht en moeten voorzichtig lijstgericht worden;
- de bestaande `ResourceSelector` is ontworpen rond 1 gekozen item en auto-collapse;
- `PlanningCard` ontvangt nu 1 resource-object en moet density behouden bij meerdere resources;
- `findPlanningConflicts` groepeert nu op 1 `resourceId`;
- `PlanningConflict.resourceId` blijft voorlopig enkelvoudig, dus meerdere conflicten op 1 card moeten compact blijven;
- legacy single-resource gedrag mag niet regressief worden;
- conflictmeldingen mogen geen technische ISO-datums tonen.

### Expliciet Buiten Scope

- backend/persistence/API;
- drag/drop;
- packages;
- multi-select library;
- availability-wijzigingen;
- resource CRUD/import;
- volledige planner-redesign;
- materialen/artikelen;
- weekendtoggle;
- tijdslots;
- employee grouping;
- brede `resourceId` naar `resourceIds` contractrename.

### Go/No-Go Voor Implementatie

Advies: Go na review, maar alleen gefaseerd.

Go:

- T1701 eerst;
- checkpoint na T1701 verplicht;
- checkpoint na T1703 verplicht;
- helper/adapters blijven leidend;
- `resourceId` blijft compatibel;
- carddensity en regressiebeperking blijven leidend.

No-Go:

- volledige contractrename;
- selector, card, conflictvalidatie en redesign in 1 batch;
- multi-select library of package;
- persistence/backend/API;
- drag/drop;
- availability-herwerking;
- resource CRUD/import.

---

## Sprint 17 Multi-Materieel Prototype Resultaat

Sprint 17 heeft multi-materieel als klein prototype geimplementeerd en gevalideerd.

Opgeleverd:

- `PlanningItem.resourceIds?: string[]` is additief toegevoegd;
- `PlanningItem.resourceId` blijft bestaan als primary mirror;
- helperlaag toegevoegd:
  - `normalizeResourceIds(ids)`;
  - `getPlanningItemResourceIds(item)`;
  - `withPlanningItemResourceIds(item, resourceIds)`.
- `PlanningCell` resolve't materieelitems via de helperlaag;
- `PlanningCard` toont:
  - 0 materieelitems: niets;
  - 1 materieelitem: huidige compacte tekstregel;
  - 2 materieelitems: compacte nummerlabels;
  - 3+ materieelitems: eerste 2 nummers plus `+n`.
- `ResourceSelector` ondersteunt minimale multi-select zonder library;
- selector heeft selected summary, wissen per item, alles wissen en `Klaar`;
- create en edit ondersteunen 0..n materieelitems;
- conflictvalidatie loopt per afgeleide materieelboeking;
- conflicts ontstaan per `date + resourceId`;
- `PlanningConflict.resourceId` blijft enkelvoudig;
- conflictmeldingen tonen Belgische/Nederlandstalige datumweergave zoals `20/05/2026`.

QA-conclusie:

- build geslaagd;
- localhost-regressie geslaagd;
- planning zonder materieel blijft geldig en conflictloos;
- 1, 2 en 3+ materieelitems werken;
- edit toevoegen, per item wissen en alles wissen werkt;
- delete en relocation blijven werken;
- availability blijft een losse visuele guardrail;
- conflictbadges en summary blijven bruikbaar;
- browserconsole zonder actuele warnings of errors.

Contractconclusie:

- `resourceId` blijft voorlopig compatibel;
- `resourceIds` is additief en geen brede contractrename;
- toekomstige writes naar materieelkoppelingen moeten via de helperlaag lopen;
- conflictvalidatie gebruikt de read-helper en behandelt elk gekoppeld materieelitem apart;
- geen backend/persistence/API of migratiepad toegevoegd.

UX-conclusie:

- prototype is bruikbaar voor praktijkvalidatie;
- selector blijft compact genoeg bij de geteste aantallen;
- cardweergave blijft scanbaar voor 0, 1, 2 en 3+ items;
- bij veel gekozen materieelitems kan de selected summary nog hoogte vragen;
- meerdere conflictbadges op 1 card kunnen druk worden en blijven een stresscheck.

Buiten scope gebleven:

- backend/persistence/API;
- packages of multi-select library;
- drag/drop;
- availability-wijzigingen;
- resource CRUD/import;
- materialen/artikelen;
- weekendtoggle;
- tijdslots;
- employee grouping;
- brede `resourceId` naar `resourceIds` contractrename;
- volledige planner-redesign.

Aanbevolen vervolg:

1. Praktijkvalidatie / polish van multi-materieel
   - selector-density bij veel geselecteerde items;
   - conflictbadge-density bij meerdere conflicten;
   - helperpad en primary mirror bewaken.

2. Daarna opnieuw prioriteren
   - intra-day task ordering;
   - employee grouping;
   - selected card versus create mode clarity;
   - persistence als aparte infrastructure-slice.

---

## Relocation Context Polish

Na Sprint 17 is een kleine UX-polish uitgevoerd rond relocation-context.

Probleem:

- bij het kiezen van een destination cell verdween de visuele cardselectie;
- relocation bleef technisch werken via interne relocation-bron;
- de broncontext was visueel minder duidelijk.

Aanpassing:

- geselecteerde card blijft visueel geselecteerd tijdens destination-keuze;
- active cell blijft bestaan;
- destination cell blijft bestaan;
- relocation uitvoeren wist de visuele cardselectie;
- delete wist selectie en relocationcontext;
- selectie van een andere card vervangt de geselecteerde card.

UX-conclusie:

- relocation is begrijpelijker omdat broncard en doelcel tegelijk zichtbaar blijven;
- er is geen nieuwe interaction layer toegevoegd;
- er is geen drag/drop of nieuwe move-logica toegevoegd;
- cognitieve spanning tussen selected card, active cell en destination cell is verminderd.

QA:

- build geslaagd;
- localhost-smoke geslaagd;
- selected card blijft zichtbaar tijdens relocation;
- active/destination cell blijven zichtbaar;
- relocation wist selectie na uitvoering;
- create/edit/delete regressie smoke geslaagd;
- browserconsole zonder actuele warnings of errors.

---

## Strategische Productinzichten - Planner Modulegrenzen

De planner blijft een eigen module binnen het toekomstige Perceel-platform. Hij mag niet uitgroeien tot een alles-in-een HR-, CRM-, werkbon-, nacalculatie- of materieelbeheerapp.

Beoogd platformbeeld:

- Planner;
- Mobiele werkbonnen;
- Nacalculatie;
- Materieelbeheer;
- Projecten/klanten;
- Rapportage.

Belangrijk ontwerpprincipe:

- de planner mag later data delen met werkbonnen, nacalculatie, materieelbeheer en projecten/klanten;
- de planner mag hun workflow niet bevatten;
- uitbreiding moet dus steeds worden getoetst op modulegrens, niet alleen op technische haalbaarheid.

### Availability In De Planner

Availability-types horen wel in de planner, maar alleen als lichte planningscontext.

Toegestane planner availability-types:

- Niet beschikbaar;
- Recup;
- Jaarlijkse vakantie;
- Weerverlet;
- Ziekte.

Contractguardrail:

- availability blijft gekoppeld aan `employeeId + date`;
- availability hoort niet aan `PlanningItem`;
- availability is context of guardrail, geen HR-workflow;
- bestaande planningitems blijven zichtbaar en technisch bewerkbaar tenzij later expliciet anders beslist.

Niet bouwen in de planner:

- verlofaanvragen;
- goedkeuringen;
- verlofsaldo's;
- loonadministratie;
- contractbeheer;
- HR-dossiers;
- ziektebeheer als dossier of medisch proces.

### Personeelstypes Als Operationele Metadata

Toekomstig onderscheid:

- vaste werknemer terrein;
- vaste werknemer bureau;
- zelfstandige;
- flexi.

Gebruik:

- grouping;
- filtering;
- scanbaarheid;
- matrixorganisatie;
- density-keuzes voor bureau- versus terreinplanning.

Niet gebruiken voor:

- rechten;
- HR-processen;
- payroll;
- contractlogica;
- aparte personeelsbeheerworkflow.

### Roadmapimpact

Deze inzichten verschuiven de roadmap naar scherpere modulegrenzen voordat nieuwe plannerfuncties worden verbreed.

Impact:

- availability-types kunnen later als kleine planner-slice worden onderzocht of geimplementeerd;
- employee grouping blijft relevant, maar moet op personeelstype als operationele metadata steunen;
- bureauplanning mag density- en scanbaarheidsverschillen informeren, maar wordt geen aparte HR- of CRM-module;
- werkbonnen en nacalculatie blijven latere integratiemodules, geen workflows binnen de planner;
- multi-materieel blijft geldig, maar mag niet verward worden met volledig materieelbeheer.

### Sprint 18 Voorbereid Voor Review

Voorbereide discovery-sprint:

**Sprint 18 - Planner Module Boundaries & Availability Types Discovery**

Doel:

- modulegrenzen expliciet toetsen voordat de planner verder groeit;
- availability-types als lichte planningscontext uitwerken;
- personeelstypes als operationele metadata documenteren voor grouping/filtering;
- bepalen welke minimale UI-labels nodig zijn zonder HR- of beheerworkflow.

In scope:

- discovery/documentatie;
- availability-types op `employeeId + date`;
- personeelstype labels en grouping-scenario's;
- impact op matrixscanbaarheid;
- out-of-scope checks voor HR, werkbonnen en nacalculatie.

Buiten scope:

- backend/persistence/API;
- HR-module;
- verlofaanvragen;
- goedkeuringen;
- saldo's;
- payroll;
- contractbeheer;
- HR-dossiers;
- werkbonuitvoering;
- nacalculatieflow;
- CRM/projectbeheerflow;
- materieelbeheer CRUD/import;
- drag/drop;
- packages/frameworks;
- grote redesigns.

### UX-Conclusie

De planner moet operationeel blijven: snel plannen, scannen, verschuiven en conflicten zien. Availability en personeelstype mogen die flow verduidelijken, maar niet veranderen in administratie.

De juiste richting is dus:

- plannercontext toevoegen waar die direct helpt bij planning;
- modulegrenzen expliciet bewaken;
- workflows voor werkbonnen, nacalculatie, HR, CRM en materieelbeheer in aparte modules houden.

---

## Sprint 18 Planner Module Boundaries & Availability Types Discovery

Sprint 18 is documentair voorbereid om modulegrenzen en availability-types scherp af te bakenen voor verdere implementatie.

Belangrijk: Sprint 18 voert geen codewijziging uit, geen build en geen implementatie.

### Uitgewerkte Documenten

Aangemaakt:

- `sprints/sprint-18-planner-module-boundaries-availability-types-discovery/SPRINT.md`;
- `sprints/sprint-18-planner-module-boundaries-availability-types-discovery/QA.md`;
- `sprints/sprint-18-planner-module-boundaries-availability-types-discovery/tickets/T1801.md`;
- `sprints/sprint-18-planner-module-boundaries-availability-types-discovery/tickets/T1802.md`;
- `sprints/sprint-18-planner-module-boundaries-availability-types-discovery/tickets/T1803.md`;
- `sprints/sprint-18-planner-module-boundaries-availability-types-discovery/tickets/T1804.md`;
- `sprints/sprint-18-planner-module-boundaries-availability-types-discovery/tickets/T1805.md`;
- `sprints/sprint-18-planner-module-boundaries-availability-types-discovery/tickets/T1806.md`.

### Ticketvolgorde

1. T1801 - Planner Module Boundary Map
2. T1802 - Availability Types UX Discovery
3. T1803 - Availability Visual Hierarchy & Density
4. T1804 - Personeelstype Metadata Discovery
5. T1805 - Bureau Versus Terrein Planning Scenarios
6. T1806 - QA & Go/No-Go

### Modulegrenzen

De planner blijft verantwoordelijk voor operationele planning:

- weekplanning per werknemer en dag;
- planningitems aanmaken, scannen, bewerken, verwijderen en verplaatsen;
- materieel koppelen aan planningitems;
- conflictwaarschuwingen tonen;
- lichte availability-context tonen per werknemer/dag;
- operationele metadata gebruiken voor scanbaarheid.

De planner blijft expliciet niet verantwoordelijk voor:

- HR;
- verlofaanvragen;
- approvals;
- saldo's;
- payroll;
- contractbeheer;
- rechtenmodel;
- werkbonuitvoering;
- nacalculatie;
- CRM of klantenbeheer;
- materieelbeheer CRUD/import.

### Availability Types

Sprint 18 bakent deze availability-types af als plannercontext:

- Niet beschikbaar;
- Recup;
- Jaarlijkse vakantie;
- Weerverlet;
- Ziekte.

Guardrails:

- availability blijft gekoppeld aan `employeeId + date`;
- availability wordt niet gekoppeld aan `PlanningItem`;
- availability is context of waarschuwing, geen workflow;
- ziekte blijft planningcontext, geen medisch of HR-dossier;
- `Recup` en `Jaarlijkse vakantie` introduceren geen saldo's of approvals;
- `Weerverlet` introduceert geen payroll- of juridische verwerking.

### Visual Hierarchy En Density

T1803 legt vast dat een latere implementatie kleur, badge, tooltip en label moet beoordelen tegen matrixdensity.

Stresscases:

- cel zonder cards met availability-type;
- cel met meerdere cards;
- cel met conflictbadges;
- cel met multi-materieel card;
- selected cell plus availability-state;
- destination cell plus availability-state;
- volle bureaucel met meerdere korte afspraken;
- terreinplanningcel met lange taaknaam en meerdere materieelitems.

Belangrijkste UX-principe:

Availability mag de celcontext verduidelijken, maar mag planningcards, conflictbadges of materieelcontext niet verdringen.

### Personeelstype Metadata

Sprint 18 bevestigt deze personeelstypewaarden als metadata-only:

- vaste werknemer terrein;
- vaste werknemer bureau;
- zelfstandige;
- flexi.

Toegestaan gebruik:

- grouping;
- filtering;
- scanbaarheid;
- matrixorganisatie;
- density-keuzes.

Niet toegestaan gebruik:

- rechten;
- payroll;
- HR-processen;
- contractlogica;
- personeelsdossiers;
- aparte personeelsbeheerworkflow.

### Bureau Versus Terrein

Bureauplanning:

- vaker afspraken;
- vaker tijdstippen;
- hogere density;
- minder materieelcontext;
- meer volgordegevoeligheid binnen dezelfde cel.

Terreinplanning:

- vaker dagplanning;
- meer materieelcontext;
- meer conflictgevoeligheid door machines, voertuigen en werktuigen;
- grotere behoefte aan scanbaarheid over meerdere werknemers.

Conclusie:

- geen aparte bureauplanner bouwen;
- eerst beoordelen of de bestaande matrix met metadata, lichte visuele hierarchie en latere aparte ordering-slices volstaat.

### Grootste Discovery-Risico's

- availability-types krijgen impliciet HR-semantiek;
- `Jaarlijkse vakantie` of `Recup` worden per ongeluk verlof- of saldo-workflows;
- `Ziekte` wordt verkeerd behandeld als medisch of HR-dossier;
- personeelstype wordt impliciet rechten- of contractlogica;
- bureauplanning trekt de planner richting agenda- of CRM-app;
- availability-labels maken volle cellen minder scanbaar;
- grouping/filtering wordt tegelijk met availability-types gebouwd en maakt de slice te groot.

### Expliciete No-Go's

Geen Go voor:

- availability-implementatie zonder review;
- grouping/filtering implementatie in Sprint 18;
- HR-module;
- verlofaanvragen;
- approvals;
- saldo's;
- payroll;
- contractbeheer;
- rechtenmodel;
- backend/persistence/API;
- werkbonnen;
- nacalculatie;
- CRM-flow;
- materieelbeheer CRUD/import;
- aparte bureauplanner;
- drag/drop;
- packages/frameworks;
- grote planner-redesign.

### Advies Na Sprint 18

Advies: voorzichtig Go voor een latere kleine implementatieslice, alleen na review en expliciete goedkeuring.

Veilige richting:

- availability-type lokaal en visueel op `employeeId + date`;
- compacte badge/label/kleurproef;
- bestaande planningcards zichtbaar houden;
- planning technisch blijven toelaten;
- geen conflictregelwijziging;
- geen persistence;
- geen HR-workflow;
- geen grouping/filtering tegelijk.
