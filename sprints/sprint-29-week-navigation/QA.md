# Sprint 29 QA - Week Navigation & Direct Week Jump

## Scope

QA richt zich op Sprint 29:

- ISO-weeknavigatie;
- directe weekjump;
- resetgedrag bij weekwissel;
- definitieve UX-hiërarchie van de weeknavigatie.

Niet getest of gebouwd als nieuwe scope:

- routing;
- backend/API;
- persistence;
- localStorage;
- kalender/month view;
- jaaroverzicht;
- week-copy/templates;
- drag/drop;
- nieuwe packages;
- wijzigingen aan planning-, conflict-, resource- of availabilitylogica.

## Functionele QA

| Punt | Resultaat |
| --- | --- |
| Huidige week toont correct weeknummer, jaar en datumrange | Ja |
| Vorige week past weeknummer en datumrange correct aan | Ja |
| Volgende week past weeknummer en datumrange correct aan | Ja |
| Vandaag springt correct terug naar huidige week | Ja |
| Direct naar week 5 van huidig jaar werkt | Ja |
| Direct naar week 40 van huidig jaar werkt | Ja |
| Direct naar week 1 werkt | Ja |
| Jaargrens rond week 1 werkt correct | Ja |
| Jaargrens rond laatste week werkt correct | Ja |
| Week 53 wordt geaccepteerd in een jaar met 53 ISO-weken | Ja |
| Week 53 wordt geweigerd in een jaar zonder 53 ISO-weken | Ja |
| Ongeldige week zoals 0 geeft compacte foutmelding | Ja |
| Ongeldige week zoals 54 geeft compacte foutmelding | Ja |
| Ongeldig jaar buiten bereik geeft compacte foutmelding | Ja |
| Planningitem in week A blijft zichtbaar in week A | Ja |
| Weekjump naar week B verbergt item uit week A | Ja |
| Terug naar week A toont item opnieuw | Ja |
| Availability blijft correct per `employeeId + date` | Ja |
| Conflicts blijven correct binnen zichtbare week | Ja |
| Weekjump wist selected cell/formcontext | Ja |
| Weekjump wist selected card/edit | Ja |
| Weekjump wist relocation source/destination | Ja |
| Header blijft compact genoeg | Ja |
| Create/edit/delete/relocation/weeknavigatie blijven intact | Ja |

## UX-Polish QA

| Punt | Resultaat |
| --- | --- |
| Weeknummer is de eerste visuele focus | Ja |
| Pijlen rond weeknummer voelen logisch | Ja |
| Datumrange is duidelijk maar secundair | Ja |
| Weekjump-regel voelt gegroepeerd | Ja |
| Vandaag voelt als utility, niet als hoofdknop | Ja |
| Weekjump werkt | Ja |
| Vandaag werkt | Ja |
| Vorige/volgende week werkt | Ja |
| Ongeldige week geeft foutmelding | Ja |
| Layout blijft compact op laptopbreedte | Ja |
| Matrixlayout blijft rustig | Ja |

## QA-Observaties

- `Week XX` leest nu als primair anker.
- Vorige/volgende week voelen logisch als pijlen rond het weeknummer.
- De datumrange blijft direct zichtbaar, maar concurreert niet meer met het weeknummer.
- `Week`, `Jaar`, `Ga` en `Vandaag` vormen een compacte utility-regel.
- `Vandaag` voelt niet meer als hoofdactie.
- De matrix blijft rustig omdat de navigatiezone visueel begrensd en compact blijft.

## Buildstatus

Geslaagd.

Uitgevoerd:

- `npm run build` na implementatie;
- `npm run build` na UX-polish.

## Bugs

Open bugs: nee.

## Resterend Risico

Compactheid op smallere schermen blijft een aandachtspunt voor later praktijkgebruik. Er is nu geen aanpassing nodig omdat de QA op laptopbreedte groen is.

## Advies

Sprint 29 afronden.
