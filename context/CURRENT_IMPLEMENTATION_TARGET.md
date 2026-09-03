# Current Implementation Target

## Implementatiesprint

**Sprint 01 - Handmatige planning + conflictvalidatie**

## Doel

Een kleine verticale slice bouwen waarmee een planner handmatig een planningitem kan aanmaken, een werknemer en machine kan koppelen, en direct ziet of dezelfde machine al op dezelfde datum gepland staat.

Deze sprint bewijst de kern van het domein zonder drag/drop, database, login, cloud, voertuigen of automatische optimalisatie.

## Dependency Order

1. T001 - App foundation en minimale route
2. T002 - Domeintypes en seeddata
3. T003 - Conflictvalidatie service
4. T004 - Planningitem formulier
5. T005 - Planningsoverzicht tabel
6. T006 - Formulier en overzicht koppelen
7. T007 - Conflictmeldingen tonen
8. T008 - QA, regressie en sprint closure

T003 hangt af van T002. T004 en T005 hangen af van T002. T006 hangt af van T004 en T005. T007 hangt af van T003 en T006. T008 sluit alles af.

## Verwachte Filestructuur

Voorgestelde minimale structuur:

```text
src/
|-- app/
|   |-- globals.css
|   |-- layout.tsx
|   `-- page.tsx
|-- components/
|   |-- planning/
|   |   |-- PlanningForm.tsx
|   |   |-- PlanningTable.tsx
|   |   `-- ConflictSummary.tsx
|   `-- ui/
|       `-- SectionHeader.tsx
|-- data/
|   `-- seed.ts
|-- lib/
|   |-- planning/
|   |   |-- conflicts.ts
|   |   `-- planning-item.ts
|   `-- format.ts
`-- types/
    `-- planning.ts
```

Als het gekozen framework afwijkt, moet Codex eerst een plan tonen. Geen package installs zonder expliciete goedkeuring.

## Database Impact

- Geen database in deze sprint.
- Geen migrations.
- Geen persistentie.
- Planningitems mogen in component state of lokale mockdata leven.
- Data kan bij refresh verloren gaan; dat is acceptabel voor deze implementatievalidatie.
- Opslagkeuze wordt later expliciet beslist.

## Out Of Scope

- Database of storage.
- Autosave.
- Login/auth.
- Cloud sync.
- Realtime samenwerking.
- Drag/drop planning.
- Mobile app.
- Voertuigplanning.
- Afwezighedenbeheer.
- Projectbeheer als aparte module.
- Machinebeheer CRUD.
- Automatische optimalisatie.
- AI-planning.
- Export naar PDF/Excel.
- Meerdere tijdslots per dag.
- Rollen en rechten.

---

## Ticket T001 - App Foundation En Minimale Route

### Doel

Maak een minimale werkende applicatiebasis waarin de planning slice kan renderen.

### Dependencies

Geen.

### Exacte Implementatiestappen

1. Controleer of er al frameworkbestanden bestaan.
2. Als er geen app bestaat, scaffold alleen de minimale bestaande projectstack die expliciet in het plan wordt goedgekeurd.
3. Maak een startpagina met titel `Werkplanning & Materieelbeheer`.
4. Voeg een compacte introductie toe: `Handmatige planning + conflictvalidatie`.
5. Gebruik desktop-first layout.
6. Voeg nog geen domeinlogica toe.

### Verwachte Bestanden

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- eventueel `src/components/ui/SectionHeader.tsx`

### Acceptance Criteria

- App rendert lokaal.
- Startpagina toont projectnaam.
- Geen planningfunctionaliteit toegevoegd buiten shell.
- Geen database, login, cloud of autosave.

### Testcases

- Start devserver.
- Open localhost.
- Controleer dat titel zichtbaar is.
- Controleer browserconsole op errors.

### Rollback Considerations

- Verwijder alleen de nieuw aangemaakte app-shell bestanden.
- Geen data-impact.

### Risico-inschatting

Laag. Grootste risico is onbedoeld framework of packagekeuze toevoegen zonder toestemming.

---

## Ticket T002 - Domeintypes En Seeddata

### Doel

Definieer minimale domeintypes en seeddata voor werknemers, machines en planningitems.

### Dependencies

T001.

### Exacte Implementatiestappen

1. Maak planningtypes aan.
2. Definieer `Employee`.
3. Definieer `Machine`.
4. Definieer `PlanningItem`.
5. Definieer `PlanningStatus`.
6. Maak seeddata met minimaal 3 werknemers.
7. Maak seeddata met minimaal 4 machines.
8. Markeer minstens 1 machine als defect.
9. Maak geen voertuigen.
10. Maak geen databasekoppeling.

### Minimale Types

```ts
type PlanningStatus = "voorlopig" | "bevestigd";

type Employee = {
  id: string;
  name: string;
};

type Machine = {
  id: string;
  number: string;
  name: string;
  isDefective: boolean;
};

type PlanningItem = {
  id: string;
  date: string;
  employeeId: string;
  taskName: string;
  machineId: string;
  status: PlanningStatus;
};
```

### Verwachte Bestanden

- `src/types/planning.ts`
- `src/data/seed.ts`

### Acceptance Criteria

- Types zijn expliciet en klein.
- Seeddata is bruikbaar voor formulier en overzicht.
- Defecte machine is aanwezig in seeddata.
- Geen voertuigen of extra domeinen toegevoegd.

### Testcases

- TypeScript build slaagt.
- Seeddata importeert zonder runtime errors.

### Rollback Considerations

- Verwijder `src/types/planning.ts` en `src/data/seed.ts`.
- Geen data-impact.

### Risico-inschatting

Laag. Risico is scopegroei door extra velden of entiteiten.

---

## Ticket T003 - Conflictvalidatie Service

### Doel

Maak een pure functie die dubbele machineboekingen op dezelfde datum detecteert.

### Dependencies

T002.

### Exacte Implementatiestappen

1. Maak `src/lib/planning/conflicts.ts`.
2. Definieer een `PlanningConflict` type of exporteer dit vanuit `planning.ts`.
3. Maak functie `findMachineConflicts(items, machines)`.
4. Detecteer conflicten op combinatie `date + machineId`.
5. Voeg defectwaarschuwing toe wanneer `machine.isDefective === true`.
6. Geef conflictresultaten terug zonder UI-logica.
7. Geen automatische correctie uitvoeren.

### Verwachte Bestanden

- `src/lib/planning/conflicts.ts`
- mogelijk update `src/types/planning.ts`

### Acceptance Criteria

- Zelfde machine op zelfde datum geeft conflict.
- Zelfde machine op andere datum geeft geen conflict.
- Andere machine op zelfde datum geeft geen conflict.
- Defecte machine geeft waarschuwing.
- Functie muteert input niet.

### Testcases

- 2 items met zelfde `date` en `machineId` -> conflict.
- 2 items met verschillende `date` -> geen conflict.
- 2 items met verschillende `machineId` -> geen conflict.
- item met defecte machine -> defectwaarschuwing.

### Rollback Considerations

- Verwijder `conflicts.ts`.
- Draai eventuele type-aanpassing terug.
- Geen data-impact.

### Risico-inschatting

Medium. Conflictregels kunnen later complexer worden; deze sprint beperkt bewust tot datum-niveau.

---

## Ticket T004 - Planningitem Formulier

### Doel

Maak een formulier waarmee de gebruiker een planningitem kan voorbereiden.

### Dependencies

T002.

### Exacte Implementatiestappen

1. Maak `PlanningForm.tsx`.
2. Voeg datumveld toe.
3. Voeg werknemerselectie toe.
4. Voeg taak/project tekstveld toe.
5. Voeg machineselectie toe.
6. Voeg statusselectie toe met `voorlopig` en `bevestigd`.
7. Valideer verplichte velden.
8. Submit geeft een `PlanningItem` terug aan parent component.
9. Formulier reset na succesvolle submit.
10. Geen opslag of API-call.

### Verwachte Bestanden

- `src/components/planning/PlanningForm.tsx`

### Acceptance Criteria

- Gebruiker kan datum invullen.
- Gebruiker kan werknemer kiezen.
- Gebruiker kan taak/project invullen.
- Gebruiker kan machine kiezen.
- Gebruiker kan status kiezen.
- Submit is geblokkeerd of toont melding bij ontbrekende verplichte velden.
- Submit maakt precies 1 planningitem.

### Testcases

- Submit leeg formulier -> validatiemelding.
- Vul alle velden in -> item wordt aangemaakt.
- Na submit is formulier klaar voor nieuw item.
- Geen voertuigveld zichtbaar.

### Rollback Considerations

- Verwijder `PlanningForm.tsx`.
- Verwijder imports uit parent component.

### Risico-inschatting

Medium. Risico is UI te groot maken of al beheerflows toevoegen.

---

## Ticket T005 - Planningsoverzicht Tabel

### Doel

Toon planningitems in een duidelijke desktop-first tabel.

### Dependencies

T002.

### Exacte Implementatiestappen

1. Maak `PlanningTable.tsx`.
2. Ontvang planningitems, werknemers en machines als props.
3. Toon datum.
4. Toon werknemernaam.
5. Toon taak/project.
6. Toon machinenummer en machinenaam.
7. Toon status.
8. Toon lege staat wanneer er geen planningitems zijn.
9. Geen edit/delete toevoegen.

### Verwachte Bestanden

- `src/components/planning/PlanningTable.tsx`

### Acceptance Criteria

- Tabel toont alle planningitems.
- Ids worden vertaald naar namen.
- Lege staat is duidelijk.
- Geen beheeracties buiten scope.

### Testcases

- Geen items -> lege staat.
- 1 item -> 1 rij.
- 2 items -> 2 rijen.
- Onbekende machineId toont veilige fallback.

### Rollback Considerations

- Verwijder `PlanningTable.tsx`.
- Verwijder imports uit parent component.

### Risico-inschatting

Laag. Risico is toevoegen van edit/delete buiten scope.

---

## Ticket T006 - Formulier En Overzicht Koppelen

### Doel

Koppel formulier en tabel op de startpagina met lokale state.

### Dependencies

T004 en T005.

### Exacte Implementatiestappen

1. Importeer seed werknemers en machines.
2. Houd `planningItems` bij in component state.
3. Render `PlanningForm`.
4. Render `PlanningTable`.
5. Voeg nieuw item toe aan state bij submit.
6. Gebruik eenvoudige id-generatie, bijvoorbeeld timestamp of teller.
7. Geen persistence.

### Verwachte Bestanden

- `src/app/page.tsx`
- mogelijk `src/lib/planning/planning-item.ts`

### Acceptance Criteria

- Nieuw planningitem verschijnt direct in tabel.
- Meerdere items kunnen worden toegevoegd.
- Refresh mag data wissen.
- Geen API/backend toegevoegd.

### Testcases

- Voeg 1 item toe -> tabel toont item.
- Voeg 2 items toe -> tabel toont beide.
- Refresh -> state reset; dit is acceptabel en gedocumenteerd.

### Rollback Considerations

- Draai wijzigingen in `page.tsx` terug.
- Verwijder helperbestand indien toegevoegd.

### Risico-inschatting

Medium. Risico is impliciet persistence toevoegen.

---

## Ticket T007 - Conflictmeldingen Tonen

### Doel

Toon dubbele machineboekingen en defecte machinewaarschuwingen in de UI.

### Dependencies

T003 en T006.

### Exacte Implementatiestappen

1. Maak `ConflictSummary.tsx`.
2. Roep conflictvalidatie aan op actuele planningitems.
3. Toon waarschuwing bij dubbele machineboeking.
4. Toon waarschuwing bij defecte machine.
5. Toon conflictindicatie in of boven planningsoverzicht.
6. Geen automatische correctie.
7. Geen hard delete of blokkering tenzij expliciet gekozen.

### Verwachte Bestanden

- `src/components/planning/ConflictSummary.tsx`
- `src/app/page.tsx`
- mogelijk `src/components/planning/PlanningTable.tsx`

### Acceptance Criteria

- Dubbele machine op dezelfde datum toont melding.
- Defecte machine toont melding.
- Geen conflict betekent geen foutmelding.
- Gebruiker begrijpt welke machine en datum betrokken zijn.

### Testcases

- Machine 250 tweemaal op dezelfde datum -> conflict zichtbaar.
- Machine 250 op twee verschillende datums -> geen dubbelboekingsconflict.
- Defecte machine gekozen -> defectwaarschuwing.
- Niet-defecte machine gekozen -> geen defectwaarschuwing.

### Rollback Considerations

- Verwijder `ConflictSummary.tsx`.
- Verwijder conflictweergave uit `page.tsx`.
- Laat formulier/tabel intact als die tickets al goedgekeurd zijn.

### Risico-inschatting

Medium. Risico is dat waarschuwing en blokkering door elkaar gehaald worden.

---

## Ticket T008 - QA, Regressie En Sprint Closure

### Doel

Valideer de verticale slice en sluit de sprint correct af.

### Dependencies

T001 t/m T007.

### Exacte Implementatiestappen

1. Run build.
2. Start localhost.
3. Test lege staat.
4. Test planningitem aanmaken.
5. Test dubbele machineboeking.
6. Test defecte machinewaarschuwing.
7. Controleer dat out-of-scope features niet zijn toegevoegd.
8. Werk sprint QA bij.
9. Werk `PROJECT_STATE.md` bij.
10. Rapporteer open risico's.

### Verwachte Bestanden

- `sprints/{nieuwe-sprint}/QA.md`
- `PROJECT_STATE.md`
- eventueel `docs/` indien sprintdocumentatie nodig is

### Acceptance Criteria

- Build slaagt.
- Localhost werkt.
- Kernflow werkt.
- Conflictvalidatie werkt.
- Sprint Closure Protocol is uitgevoerd.

### Testcases

- Build zonder errors.
- Browserconsole zonder kritieke errors.
- Minimaal twee planningitems kunnen worden toegevoegd.
- Dubbele machineboeking geeft waarschuwing.
- Defecte machine geeft waarschuwing.

### Rollback Considerations

- Geen rollback van werkende feature zonder expliciete opdracht.
- Bij regressie: documenteer fout, stop feature-uitbreiding en vraag architectbeslissing.

### Risico-inschatting

Laag. Dit ticket wijzigt vooral documentatie en validatie.

---

## Sprint Acceptance Criteria

De sprint is klaar wanneer:

- applicatie lokaal rendert;
- werknemer- en machineseeddata beschikbaar is;
- gebruiker handmatig planningitem kan toevoegen;
- planningitems zichtbaar zijn in tabel;
- dubbele machineboeking op dezelfde datum gedetecteerd wordt;
- defecte machine waarschuwing getoond wordt;
- geen database, login, cloud, drag/drop, voertuigen of AI is toegevoegd;
- QA en `PROJECT_STATE.md` bijgewerkt zijn.

## Sprint Test Matrix

| Scenario | Verwacht resultaat |
| --- | --- |
| Lege planning openen | Lege staat zichtbaar |
| Planningitem volledig invullen | Item verschijnt in tabel |
| Verplicht veld leeg laten | Validatiemelding of geblokkeerde submit |
| Zelfde machine zelfde datum tweemaal plannen | Conflictwaarschuwing zichtbaar |
| Zelfde machine andere datum plannen | Geen dubbelboekingsconflict |
| Andere machine zelfde datum plannen | Geen dubbelboekingsconflict |
| Defecte machine kiezen | Defectwaarschuwing zichtbaar |
| Pagina refreshen | Data mag verdwijnen |

## Rollback Op Sprintniveau

- Omdat er geen database of persistentie is, is rollback beperkt tot codebestanden.
- Verwijder of revert alleen bestanden die in de sprint zijn aangemaakt of gewijzigd.
- Documentatie en QA mogen niet stil worden teruggedraaid.
- Als een ticket faalt, stop vervolgwerk en documenteer de blocker.

## Belangrijkste Risico's

- Scope creep richting volledige planningtool.
- Onbewust toevoegen van opslag of backend.
- Te vroeg voertuigen, afwezigheden of rollen toevoegen.
- Conflictregels te complex maken.
- Generated brede sprintscope alsnog volgen.

## Codex Instructie Voor Deze Sprint

Codex mag dit pas uitvoeren na expliciete goedkeuring van deze sprint en ticketset.

Codex moet ticket per ticket werken, telkens:

1. context lezen;
2. begrip samenvatten;
3. implementatieplan geven;
4. verwachte bestanden benoemen;
5. risico's benoemen;
6. wachten op goedkeuring;
7. implementeren;
8. verifiëren;
9. rapporteren.

