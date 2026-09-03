# Domain Model

## Strategische Modulegrenzen

Het Perceel AI System groeit richting een platform met aparte modules, niet richting een alles-in-een planner.

Beoogde platformmodules:
- Planner
- Mobiele werkbonnen
- Nacalculatie
- Materieelbeheer
- Projecten/klanten
- Rapportage

Planner-scope:
- werknemers, dagen en planningitems operationeel plannen;
- materieel koppelen aan planningitems;
- lichte availability-context tonen per werknemer/dag;
- operationele scanbaarheid ondersteunen via metadata zoals personeelstype.

Expliciet buiten planner-scope:
- verlofaanvragen;
- goedkeuringen;
- saldo's;
- loonadministratie;
- contractbeheer;
- HR-dossiers;
- volledige werkbonworkflow;
- nacalculatieworkflow;
- CRM- of klantenbeheerworkflow;
- materieelbeheer CRUD/import als beheeromgeving.

Modulegrens:
- de planner mag later data delen met mobiele werkbonnen, nacalculatie, materieelbeheer en projecten/klanten;
- de planner mag die workflows niet zelf bevatten;
- integraties moeten data-uitwisseling blijven, geen workflowfusie.

Sprint 18 discovery-guardrail:
- nieuwe plannercontext moet steeds aantoonbaar helpen bij operationeel plannen, scannen, verschuiven of conflicten zien;
- als een feature aanvraag-, goedkeurings-, saldo-, contract-, rechten-, werkbonuitvoerings- of nacalculatiesemantiek krijgt, hoort ze niet in de planner;
- documentatie en review gaan voor implementatie wanneer modulegrenzen geraakt worden.

## Werknemer

Definitie: persoon die ingepland wordt of planning raadpleegt/beheert.

Belangrijkste velden:
- id
- naam
- rol of functiecontext
- personeelstype
- availability per datum

Relaties:
- heeft planningitems;
- kan availability-statussen hebben per datum;
- kan taken/projecten toegewezen krijgen.

Businessregels:
- werknemer kan per dag beschikbaar of afwezig zijn;
- ziekte mag als lichte planningcontext zichtbaar zijn via availability-type `Ziekte`;
- werknemerdata in de planner blijft operationeel en mag niet uitgroeien tot HR-dossier;
- personeelstype is metadata voor grouping, filtering en scanbaarheid, niet voor rechten, HR of payroll.

Open vragen:
- exacte personeelstypewaarden in de UI;
- meerdere planners tegelijk;
- historiek van wijzigingen.

## Personeelstype

Definitie: operationele metadata om werknemers in de planner beter te kunnen groeperen, filteren en scannen.

Voorlopige waarden:
- vaste werknemer terrein;
- vaste werknemer bureau;
- zelfstandige;
- flexi.

Relaties:
- hoort bij werknemer;
- kan gebruikt worden voor visuele grouping of filters in de planner.

Businessregels:
- personeelstype bepaalt voorlopig geen rechten;
- personeelstype bepaalt geen payroll- of contractlogica;
- personeelstype is geen HR-classificatie in de planner;
- bureau versus terrein mag density en scanbaarheid informeren, maar maakt nog geen aparte bureauplanner.
- personeelstype mag pas later worden gebruikt voor grouping of filtering na aparte review;
- personeelstype blijft metadata-only en mag geen impliciet autorisatie- of arbeidsrelatiemodel worden.

Open vragen:
- exacte labels;
- standaard grouping in de matrix;
- of filtering nodig is naast grouping.
- of grouping voldoende is voor bureau versus terrein zonder aparte bureauplanner.

## Project

Definitie: werkcontext waaraan taken of planningitems gekoppeld worden.

Belangrijkste velden:
- id
- naam
- omschrijving
- status

Relaties:
- kan meerdere taken bevatten;
- kan aan planningitems gekoppeld worden.

Businessregels:
- project moet selecteerbaar zijn bij planning.

Open vragen:
- verschil tussen project en taak;
- projectstatussen;
- import uit bestaande lijsten.

## Taak

Definitie: concreet werk dat aan een werknemer op een datum gekoppeld kan worden.

Belangrijkste velden:
- id
- titel
- projectId
- omschrijving
- status
- opmerkingen

Relaties:
- hoort optioneel bij project;
- wordt gekoppeld aan planningitem;
- kan machines/voertuigen nodig hebben via planningitem.

Businessregels:
- taak/project moet handmatig aan werknemer gekoppeld kunnen worden.

Open vragen:
- taaktypes;
- verplichte velden;
- statusovergangen.

## Machine

Definitie: materieel dat ingepland kan worden en conflictgevoelig is.

Belangrijkste velden:
- id
- nummer
- naam
- defectstatus
- beschikbaarheid

Relaties:
- kan aan planningitems gekoppeld worden;
- kan defectstatus hebben;
- kan conflicten veroorzaken bij dubbele boeking.

Businessregels:
- dezelfde machine mag niet dubbel ingepland worden op hetzelfde moment/dagdeel;
- defecte machine moet waarschuwing of blokkering geven.

Open vragen:
- boeking per dag of dagdeel;
- defectstatus blokkeren of alleen waarschuwen;
- machinecategorieen.

## Voertuig

Definitie: voertuig dat net als machines ingepland kan worden.

Belangrijkste velden:
- id
- nummer
- naam
- beschikbaarheid
- defectstatus

Relaties:
- kan aan planningitems gekoppeld worden;
- kan conflicten veroorzaken bij dubbele boeking.

Businessregels:
- voertuigbeschikbaarheid moet controleerbaar zijn.

Open vragen:
- voertuigen in eerste slice of later;
- overlap met machines;
- defectstatus verplicht?

## Beschikbaarheid

Definitie: lichte planningscontext die aangeeft of een werknemer op een datum beschikbaar is.

Belangrijkste velden:
- employeeId
- date
- type

Relaties:
- hoort bij werknemer;
- hoort bij datum;
- hoort niet bij `PlanningItem`.

Planner availability-types:
- Niet beschikbaar;
- Recup;
- Jaarlijkse vakantie;
- Weerverlet;
- Ziekte.

Businessregels:
- availability is zichtbaar in de planner als context/guardrail;
- availability blijft gekoppeld aan `employeeId + date`;
- planningitems blijven los van availability;
- availability is geen verlofaanvraag, goedkeuring, saldo of HR-dossier;
- planning mag availability gebruiken voor scanbaarheid en waarschuwing, niet automatisch als HR-workflow.
- `Niet beschikbaar` is de algemene guardrail;
- `Recup` is alleen plannercontext en geen saldo-opbouw of saldo-afboeking;
- `Jaarlijkse vakantie` is alleen zichtbaarheidscontext en geen verlofaanvraag of goedkeuringsflow;
- `Weerverlet` is alleen operationele context en geen payroll- of juridische verwerking;
- `Ziekte` is alleen beschikbaarheidscontext en geen medisch of HR-dossier.

Open vragen:
- of availability altijd dag-niveau blijft;
- of availability ooit harde blokkering wordt of alleen waarschuwing blijft;
- exacte UI voor meerdere availability-types.
- of typeweergave via kleur, badge, label of tooltip het minst schadelijk is voor matrixdensity;
- hoe availability zichtbaar blijft in volle cellen met meerdere cards, conflictbadges en multi-materieel.

## Afwezigheid

Definitie: HR-achtig concept dat voorlopig niet als aparte plannerworkflow wordt gebouwd.

Belangrijkste velden:
- werknemerId
- startdatum
- einddatum
- reden
- type

Relaties:
- hoort bij werknemer;
- kan later als bron dienen voor planner availability.

Businessregels:
- de planner toont hoogstens afgeleide lichte availability-context;
- verlofaanvragen, goedkeuringen, saldo's en HR-dossiers horen niet in de planner;
- ziekte kan als availability-type zichtbaar zijn, maar niet als medisch of HR-dossier.

Open vragen:
- welke externe module of bron afwezigheden later beheert;
- hoe afgeleide planner availability gesynchroniseerd wordt als persistence/integratie later komt.

## Defectstatus

Definitie: status die aangeeft dat machine of voertuig defect of beperkt inzetbaar is.

Belangrijkste velden:
- entityType
- entityId
- status
- reden
- startdatum
- einddatum

Relaties:
- hoort bij machine of voertuig;
- beinvloedt conflictvalidatie.

Businessregels:
- defect materieel mag niet onzichtbaar ingepland worden.
- waarschuwing is minimaal vereist.

Open vragen:
- harde blokkering of waarschuwing;
- einddatum verplicht?

## Planning

Definitie: verzameling planningitems per datum waarin werknemer, taak/project en materieel gekoppeld worden.

Belangrijkste velden:
- id
- datum
- werknemerId
- taakId/projectId
- machineIds
- voertuigIds
- status
- opmerkingen

Relaties:
- koppelt werknemer aan taak/project;
- koppelt machines en voertuigen;
- gebruikt beschikbaarheden en defectstatussen voor validatie.
- kan later data delen met mobiele werkbonnen en nacalculatie.

Businessregels:
- planner kiest datum, werknemer en taak/project;
- planner koppelt machines/voertuigen;
- planning kan voorlopig, bevestigd of uitgevoerd zijn.
- planner bevat geen werkbonuitvoering of nacalculatieproces;
- planner bevat geen klanten-/projectbeheerworkflow buiten minimale planningcontext.

Open vragen:
- dagplanning versus weekplanning als eerste UI;
- meerdere werknemers op een taak;
- planningitem per dag of tijdslot.

## Conflictvalidatie

Definitie: regels die planning controleren op dubbele boekingen en onbeschikbaarheid.

Belangrijkste velden/resultaten:
- type conflict
- severity
- bericht
- betrokken planningitems
- betrokken machine/voertuig/werknemer

Relaties:
- leest planningitems;
- leest machines, voertuigen, beschikbaarheden en defectstatussen.

Businessregels:
- dubbele machineboeking moet gedetecteerd worden.
- defecte machine moet waarschuwing geven.
- onbeschikbare werknemer mag waarschuwing of context geven indien in scope.
- availability blijft los van `PlanningItem` en wordt niet als HR-validatie behandeld.

Open vragen:
- severityniveaus;
- override toegestaan?
- conflicten blokkeren of alleen melden?

## Planningstatussen

Definitie: status van een planningitem.

Bekende statussen:
- voorlopig
- bevestigd
- uitgevoerd

Relaties:
- hoort bij planningitem.

Businessregels:
- planner kan planning voorlopig of bevestigd markeren.
- na uitvoering kan werk als uitgevoerd bevestigd worden.

Open vragen:
- annuleren/wijzigen;
- wie mag bevestigen;
- statusgeschiedenis.
