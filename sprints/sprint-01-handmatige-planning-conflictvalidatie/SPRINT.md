# Sprint 01 - Handmatige Planning & Conflictvalidatie

## Sprintstatus

Uitgevoerd en technisch gevalideerd met architectfeedback op UX-richting.

---

## Sprint Doel

Een kleine verticale slice bouwen waarmee een planner handmatig een planningitem kan aanmaken, een werknemer en machine kan koppelen, en waarschuwingen ziet bij dubbele machineboeking of defecte machine.

---

## Scope

- T001 - App foundation en minimale route
- T002 - Domeintypes en seeddata
- T003 - Conflictvalidatie service
- T004 - Planningitem formulier
- T005 - Planningsoverzicht tabel
- T006 - Formulier en overzicht koppelen
- T007 - Conflictmeldingen tonen
- T008 - QA, regressie en sprint closure

---

## Buiten Scope

- Database
- Login
- Cloud
- Autosave
- Drag/drop
- Voertuigen
- AI
- Automatische correctie
- Backend/API
- Afwezigheden
- Beheerflows
- Planningkalender

---

## Conflictregels

- Zelfde `machineId` + zelfde `date` = conflict.
- Defecte machine = waarschuwing.
- Geen automatische correctie.

---

## Resultaat

- Minimale Next.js, TypeScript en Tailwind app foundation toegevoegd.
- Werknemer seeddata toegevoegd.
- Machine seeddata toegevoegd met minstens 1 defecte machine.
- Planningitem type en lokale state toegevoegd.
- Planningformulier toegevoegd.
- Planningtabel toegevoegd.
- Pure conflictvalidatie toegevoegd.
- Conflictmeldingen als waarschuwingen toegevoegd.

---

## Technisch Gevalideerd

- Lokale state werkt.
- Planningitems kunnen toegevoegd worden.
- Conflictservice werkt.
- Defecte machine waarschuwing werkt.

---

## Verificatie

- Productiebuild succesvol via directe Node/Next build.
- Localhost render succesvol op poort 3008.
- DOM-controle bevestigt titel, lege staat en conflictsummary.
- Scopecontrole uitgevoerd: geen database, login, cloud, autosave, drag/drop, voertuigen, AI of backend in `src`.
- Volledige browserinput kon niet via automation worden afgerond door een browserruntime clipboardfout.

---

## Architectfeedback

- Huidige UI is te veel formulier/tabel.
- Gewenste richting is een Excel-achtige weekplanning.
- Werknemers moeten als kolommen zichtbaar zijn.
- Datum/week moet bovenaan zichtbaar zijn.
- Machines moeten zichtbaar zijn per werknemer.
- Kleurcodes voor voorlopig/bevestigd/uitgevoerd zijn gewenst.
- Drag/drop is later relevant, maar niet direct.

---

## Aanbevolen Volgende Sprint

Sprint 02 - Weekplanning Board.

Scope Sprint 02:

- weekoverzicht;
- werknemers als kolommen;
- dagen/datum zichtbaar;
- planningitems als kaarten/cellen;
- machines zichtbaar in planningitem;
- statuskleuren;
- bestaande conflictvalidatie behouden.

Niet in scope Sprint 02:

- drag/drop;
- database;
- login;
- voertuigen;
- exports;
- afwezigheidsbeheer.
