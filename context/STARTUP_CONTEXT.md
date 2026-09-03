# STARTUP_CONTEXT.md

## Doel

Permanente AI-startcontext voor nieuwe ChatGPT/Codex-sessies binnen het Perceel AI System. Gebruik dit document om consistent verder te werken zonder contextverlies of promptdrift.

## Projectidentiteit

- Project: Perceel AI System.
- Module: werkplanning en materieelbeheer.
- De planner is een operationele module binnen een breder platform, geen generiek ERP.
- De planner helpt bij plannen, scannen, bewerken, verplaatsen en conflictcontext zien.
- Andere platformmodules, zoals mobiele werkbonnen, nacalculatie, materieelbeheer, projecten/klanten en rapportage, blijven aparte modules.

## Huidige Plannerstatus

De planner bevat momenteel:

- matrixplanning per werknemer en werkdag;
- lokale create/edit/delete flows;
- relocation via geselecteerde planningcard, doelcel en expliciete move-actie;
- directe lokale editing van taak/project en materieel;
- sticky `PlanningForm`;
- sticky werknemerlabels;
- compacte dense matrix UX;
- multi-materieel via compatlaag;
- conflictvalidatie per materieelitem;
- typed availability-context per werknemer/dag;
- resource favorites in de materieelselector;
- compacte action context chip in de sticky form.

Belangrijke huidige UX-contexten:

- `Nieuwe planning: [cel]` of `Nieuwe planning: Kies een cel`;
- `Bewerken: [taak] - kies doelcel om te verplaatsen`;
- `Verplaatsen: [taak] -> [werknemer] - [datum]`.

## Architectuurprincipes

- Werk in kleine, controleerbare slices.
- Analyseer eerst de bestaande code en documentatie.
- Gebruik bestaande helperlagen en patronen.
- Voeg helpers toe wanneer writes of contractcompatibiliteit geraakt worden.
- Geen opportunistische refactors.
- Houd bestaande compatibiliteit intact.
- `PlanningItem.resourceId` blijft compatibel als primary mirror.
- `PlanningItem.resourceIds` blijft additief.
- Toekomstige multi-materieel writes moeten via helperlaag blijven lopen.
- Availability blijft gekoppeld aan `employeeId + date`.
- Availability wordt niet gekoppeld aan `PlanningItem`.
- Availability wordt niet meegegeven aan resource allocation of conflictengine.
- Conflictvalidatie blijft derived uit planningitems en resources.

## UX-principes

- Planning eerst.
- Conflicts tweede.
- Availability en context derde.
- Matrixdensity behouden.
- Directe editing behouden.
- UI rustig, compact en scanbaar houden.
- Geen drukke badges, panelen of workflowbars toevoegen zonder expliciete opdracht.
- Nederlandse UI-labels blijven leidend.
- Planning blijft toegestaan op availability-cellen.
- Drag/drop blijft buiten scope tenzij later expliciet bewezen nodig en apart goedgekeurd.
- Bij twijfel: bestaande matrixflow beschermen boven nieuwe interacties toevoegen.

## Expliciete Non-Goals

Niet bouwen zonder expliciete opdracht:

- HR-module;
- payroll;
- verlofaanvragen;
- approvals/workflows;
- permissions/rechtenmodel;
- backend/API/persistence;
- localStorage;
- werkbonmodule;
- nacalculatiemodule;
- workflow engine;
- CRM- of klantenbeheerworkflow;
- materieelbeheer CRUD/import als beheeromgeving;
- nieuwe packages/frameworks zonder noodzaak;
- grote redesigns;
- drag/drop;
- aparte bureauplanner;
- AI-suggesties, ranking engine of analytics.

## AI-Werkwijze

Standaard werkwijze per nieuwe opdracht:

1. Lees alleen de gevraagde context.
2. Analyseer huidige flow, state, helpers en componenten.
3. Formuleer of implementeer de kleinste veilige slice.
4. Houd scope expliciet klein.
5. Run build/typecheck wanneer er code is gewijzigd en dit beschikbaar is.
6. Voer browser/UX-QA uit wanneer de wijziging visueel of interactief is.
7. Documenteer sprint/ticket/projectstate wanneer de slice afgerond is.
8. Voeg geen scope toe zonder opdracht.

Vermijd:

- brede implementaties;
- refactors buiten scope;
- nieuwe architectuurlagen zonder noodzaak;
- codewijzigingen tijdens discovery- of documentatievragen;
- Sprint starten of uitbreiden zonder expliciete opdracht.

## Promptstandaard Voor Nieuwe Codex-Prompts

Elke nieuwe Codex-prompt hoort deze onderdelen te bevatten:

- projectpad;
- `Lees alleen`-lijst;
- belangrijke context;
- focus;
- productbeslissingen;
- UX-richtlijnen;
- non-goals;
- concrete opdracht;
- outputverwachting.

Aanbevolen promptvorm:

```text
Project:
C:\Users\Thomas\Documents\PERCEEL AI\Perceel-AI-System\active-projects\perceel-werkplanning-materieelbeheer

Lees alleen:
- context/
- PROJECT_STATE.md
- docs/Planning_UX_Domain_Findings.md
- relevante sprintmap(pen)
- relevante componenten/helpers

Belangrijke context:
- planner is operationeel, geen ERP;
- matrixplanning, create/edit/delete, relocation, dense UX, multi-materieel, availability, resource favorites en action context bestaan al;
- resourceId blijft compatibel;
- resourceIds blijft additief;
- availability blijft employeeId + date.

Focus:
[naam van sprint/slice]

Productbeslissingen:
[beslissingen die vaststaan]

UX-richtlijnen:
[density, Nederlandse labels, planning/conflict/availability-prioriteit]

Non-goals:
[expliciet niet bouwen]

Concrete opdracht:
[analyse / implementatie / QA / documentatie]

Output:
[gewenste vorm]
```

## Laatste Bekende Status

- Sprint 21 Planner Action Context UX Slice 1 is afgerond.
- Geen actieve implementatiesprint.
- Geen actief implementatieticket.
- Sprint 21 wordt niet verder uitgebreid zonder nieuwe opdracht.
