import type { Employee, PlanningItem, Resource } from "@/types/planning";
import { getEmployeeDisplayName } from "@/lib/planning/employees";

type PlanningTableProps = {
  employees: Employee[];
  resources: Resource[];
  items: PlanningItem[];
};

function findEmployeeName(employees: Employee[], employeeId: string): string {
  const employee = employees.find((item) => item.id === employeeId);

  return employee ? getEmployeeDisplayName(employee) : "Onbekende werknemer";
}

function findResourceLabel(resources: Resource[], resourceId: string): string {
  const resource = resources.find((item) => item.id === resourceId);

  if (!resource) {
    return "Onbekend materieel";
  }

  return `${resource.number} ${resource.name}`;
}

export function PlanningTable({
  employees,
  resources,
  items
}: PlanningTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-perceel-line bg-white p-6 text-sm text-slate-600">
        Nog geen planningitems. Voeg een eerste item toe om de planning te
        controleren.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-perceel-line bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-perceel-soft text-xs uppercase text-slate-600">
          <tr>
            <th className="border-b border-perceel-line px-4 py-3">Datum</th>
            <th className="border-b border-perceel-line px-4 py-3">Werknemer</th>
            <th className="border-b border-perceel-line px-4 py-3">Taak/project</th>
            <th className="border-b border-perceel-line px-4 py-3">Materieel</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr className="odd:bg-white even:bg-slate-50" key={item.id}>
              <td className="border-b border-perceel-line px-4 py-3">
                {item.date}
              </td>
              <td className="border-b border-perceel-line px-4 py-3">
                {findEmployeeName(employees, item.employeeId)}
              </td>
              <td className="border-b border-perceel-line px-4 py-3">
                {item.taskName}
              </td>
              <td className="border-b border-perceel-line px-4 py-3">
                {item.resourceId
                  ? findResourceLabel(resources, item.resourceId)
                  : "Geen materieel"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
