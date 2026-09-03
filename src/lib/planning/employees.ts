import type { Employee, EmployeeCategory } from "@/types/planning";

export const EMPLOYEE_CATEGORIES: EmployeeCategory[] = [
  "Werknemer",
  "Zelfstandige",
  "Flexi-job",
  "Vakantiejob",
  "Werknemer, bureau"
];

const WEEK_ADDITION_CATEGORY_ORDER: EmployeeCategory[] = [
  "Flexi-job",
  "Vakantiejob",
  "Zelfstandige"
];

export function normalizeEmployeeNameInput(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function getEmployeeDisplayName(employee: Employee): string {
  const fullName = normalizeEmployeeNameInput(
    `${employee.firstName} ${employee.lastName}`
  );

  return fullName || employee.name;
}

function slugifyEmployeeName(value: string): string {
  const slug = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `werknemer-${Date.now()}`;
}

export function createLocalEmployee(
  firstName: string,
  lastName: string,
  category: EmployeeCategory,
  sortOrder: number,
  isDefaultVisible = true
): Employee {
  const normalizedFirstName = normalizeEmployeeNameInput(firstName);
  const normalizedLastName = normalizeEmployeeNameInput(lastName);
  const name = normalizeEmployeeNameInput(
    `${normalizedFirstName} ${normalizedLastName}`
  );

  return {
    id: `employee-${slugifyEmployeeName(name)}-${Date.now()}`,
    firstName: normalizedFirstName,
    lastName: normalizedLastName,
    name,
    category,
    sortOrder,
    isDefaultVisible
  };
}

export function sortEmployeesBySortOrder(employees: Employee[]): Employee[] {
  return [...employees].sort((first, second) => {
    const firstCategoryIndex = EMPLOYEE_CATEGORIES.indexOf(first.category);
    const secondCategoryIndex = EMPLOYEE_CATEGORIES.indexOf(second.category);

    if (firstCategoryIndex !== secondCategoryIndex) {
      return firstCategoryIndex - secondCategoryIndex;
    }

    if (first.sortOrder !== second.sortOrder) {
      return first.sortOrder - second.sortOrder;
    }

    return getEmployeeDisplayName(first).localeCompare(
      getEmployeeDisplayName(second)
    );
  });
}

export function getVisibleEmployees(employees: Employee[]): Employee[] {
  return sortEmployeesBySortOrder(
    employees.filter(
      (employee) => employee.isDefaultVisible !== false && !employee.isHidden
    )
  );
}

export function getHiddenEmployees(employees: Employee[]): Employee[] {
  return sortEmployeesBySortOrder(
    employees.filter(
      (employee) => employee.isDefaultVisible !== false && employee.isHidden
    )
  );
}

export function getNonDefaultEmployees(employees: Employee[]): Employee[] {
  return sortEmployeesBySortOrder(
    employees.filter((employee) => employee.isDefaultVisible === false)
  );
}

export function getVisibleEmployeesForWeek(
  employees: Employee[],
  weeklyEmployeeIds: string[]
): Employee[] {
  const weeklyEmployeeIdSet = new Set(weeklyEmployeeIds);

  return sortEmployeesBySortOrder(
    employees.filter(
      (employee) =>
        !employee.isHidden &&
        (employee.isDefaultVisible !== false ||
          weeklyEmployeeIdSet.has(employee.id))
    )
  );
}

export function getWeeklyAddedEmployees(
  employees: Employee[],
  weeklyEmployeeIds: string[]
): Employee[] {
  const weeklyEmployeeIdSet = new Set(weeklyEmployeeIds);

  return sortEmployeesBySortOrder(
    employees.filter(
      (employee) =>
        employee.isDefaultVisible === false &&
        !employee.isHidden &&
        weeklyEmployeeIdSet.has(employee.id)
    )
  );
}

export function getAvailableEmployeesForWeekAddition(
  employees: Employee[],
  weeklyEmployeeIds: string[]
): Employee[] {
  const weeklyEmployeeIdSet = new Set(weeklyEmployeeIds);

  return employees
    .filter(
      (employee) =>
        employee.isDefaultVisible === false &&
        !employee.isHidden &&
        !weeklyEmployeeIdSet.has(employee.id)
    )
    .sort((first, second) => {
    const firstCategoryIndex = WEEK_ADDITION_CATEGORY_ORDER.indexOf(
      first.category
    );
    const secondCategoryIndex = WEEK_ADDITION_CATEGORY_ORDER.indexOf(
      second.category
    );

    if (firstCategoryIndex !== secondCategoryIndex) {
      return firstCategoryIndex - secondCategoryIndex;
    }

    return getEmployeeDisplayName(first).localeCompare(
      getEmployeeDisplayName(second),
      "nl-BE"
    );
  });
}

export function getNextEmployeeSortOrderForCategory(
  employees: Employee[],
  category: EmployeeCategory
): number {
  const sortedEmployees = sortEmployeesBySortOrder(employees);
  const employeesInCategory = sortedEmployees.filter(
    (employee) => employee.category === category
  );
  const categoryIndex = EMPLOYEE_CATEGORIES.indexOf(category);
  const laterCategoryEmployees = sortedEmployees.filter(
    (employee) => EMPLOYEE_CATEGORIES.indexOf(employee.category) > categoryIndex
  );

  if (employeesInCategory.length === 0) {
    const previousCategoryEmployees = sortedEmployees.filter(
      (employee) =>
        EMPLOYEE_CATEGORIES.indexOf(employee.category) < categoryIndex
    );
    const previousSortOrder =
      previousCategoryEmployees.at(-1)?.sortOrder ?? categoryIndex * 100;
    const nextSortOrder =
      laterCategoryEmployees[0]?.sortOrder ?? previousSortOrder + 100;

    return (previousSortOrder + nextSortOrder) / 2;
  }

  const lastCategorySortOrder =
    employeesInCategory[employeesInCategory.length - 1].sortOrder;
  const nextSortOrder =
    laterCategoryEmployees[0]?.sortOrder ?? lastCategorySortOrder + 2;

  return (lastCategorySortOrder + nextSortOrder) / 2;
}

export function hideEmployee(
  employees: Employee[],
  employeeId: string
): Employee[] {
  return employees.map((employee) =>
    employee.id === employeeId ? { ...employee, isHidden: true } : employee
  );
}

export function showEmployee(
  employees: Employee[],
  employeeId: string
): Employee[] {
  return employees.map((employee) =>
    employee.id === employeeId ? { ...employee, isHidden: false } : employee
  );
}

export function setEmployeeDefaultVisibility(
  employees: Employee[],
  employeeId: string,
  isDefaultVisible: boolean
): Employee[] {
  return employees.map((employee) =>
    employee.id === employeeId
      ? { ...employee, isDefaultVisible, isHidden: false }
      : employee
  );
}
