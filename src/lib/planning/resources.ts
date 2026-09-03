import type { Resource } from "@/types/planning";

export type ResourceCategoryFilter = Resource["category"] | "all";
export type ResourceTypeFilter = string | "all";

export type ResourceMappingInput = {
  number: string;
  description: string;
  brand?: string;
  type: string;
  category?: Resource["category"];
};

export const RESOURCE_EXCEL_FIELD_MAPPING = {
  nummer: "number",
  groep: "group, derived from number",
  beschrijving: "name",
  merk: "brand",
  soort: "type"
} as const;

export const RESOURCE_CATALOG_MAPPING_RULES = {
  id: "stable id derived from the full normalized number",
  number: "keep the full operational number, including group code",
  group: "derive from the full number, never from the numeric prefix alone",
  name: "use Beschrijving as compact planner display name",
  brand: "normalize as optional search metadata, not planning-card priority",
  category:
    "coarse planner category from explicit mapping, group and description; Soort is not trusted alone",
  type: "keep raw Soort as detail and search metadata"
} as const;

const VEHICLE_TYPE_HINTS = [
  "auto",
  "bestel",
  "camion",
  "kipper",
  "vracht",
  "wagen"
];
const TRAILER_TYPE_HINTS = ["aanhanger", "trailer"];
const TOOL_TYPE_HINTS = [
  "bak",
  "beton",
  "frees",
  "maaier",
  "plaat",
  "ploeg",
  "tril",
  "verdichting",
  "werktuig"
];

export function normalizeResourceText(value: string | null | undefined): string {
  return value?.trim().replace(/\s+/g, " ") ?? "";
}

export function normalizeResourceNumber(value: string): string {
  return normalizeResourceText(value).toUpperCase();
}

export function parseResourceGroupFromNumber(number: string): string {
  const normalizedNumber = normalizeResourceNumber(number);
  const groupMatch = normalizedNumber.match(/^\d+[-\s]+([A-Z0-9]+)/);

  return groupMatch?.[1] ?? "";
}

export function createResourceIdFromNumber(number: string): string {
  return `resource-${normalizeResourceNumber(number)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;
}

export function normalizeResourceBrand(value: string | null | undefined): string {
  const brand = normalizeResourceText(value);

  return brand.toLowerCase() === "onbekend" ? "" : brand;
}

function mapResourceTextToCategory(text: string): Resource["category"] {
  const normalizedType = normalizeResourceText(text).toLowerCase();

  if (TRAILER_TYPE_HINTS.some((hint) => normalizedType.includes(hint))) {
    return "aanhanger";
  }

  if (VEHICLE_TYPE_HINTS.some((hint) => normalizedType.includes(hint))) {
    return "voertuig";
  }

  if (TOOL_TYPE_HINTS.some((hint) => normalizedType.includes(hint))) {
    return "werktuig";
  }

  return "machine";
}

export function mapResourceTypeToCategory(type: string): Resource["category"] {
  return mapResourceTextToCategory(type);
}

export function mapResourceCatalogCategory(input: {
  number: string;
  group?: string;
  description: string;
  type: string;
}): Resource["category"] {
  const group = normalizeResourceText(input.group).toUpperCase();

  if (["VAL", "VAZ"].includes(group)) {
    return "aanhanger";
  }

  if (["VCB", "VGO", "VPW", "VVC"].includes(group)) {
    return "voertuig";
  }

  return mapResourceTextToCategory(
    `${input.number} ${input.description} ${input.type}`
  );
}

export function getResourceDisplayLabel(resource: Resource): string {
  return `${resource.number} ${resource.name}`;
}

export function getResourceSearchText(resource: Resource): string {
  return [
    resource.number,
    resource.group,
    resource.name,
    resource.brand,
    resource.category,
    resource.type
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function normalizeResourceMapping(input: ResourceMappingInput): Resource {
  const number = normalizeResourceNumber(input.number);
  const group = parseResourceGroupFromNumber(number);
  const name = normalizeResourceText(input.description);
  const brand = normalizeResourceBrand(input.brand);
  const type = normalizeResourceText(input.type);

  return {
    id: createResourceIdFromNumber(number),
    number,
    group: group || undefined,
    name,
    brand: brand || undefined,
    category:
      input.category ??
      mapResourceCatalogCategory({
        number,
        group,
        description: name,
        type
      }),
    type,
    isDefective: false
  };
}

export function getResourceCategories(
  resources: Resource[]
): Resource["category"][] {
  return Array.from(
    new Set(resources.map((resource) => resource.category))
  ).sort();
}

export function getResourceTypes(resources: Resource[]): string[] {
  return Array.from(
    new Set(resources.map((resource) => resource.type).filter(Boolean))
  ).sort();
}

export function filterResources(
  resources: Resource[],
  query: string,
  category: ResourceCategoryFilter,
  type: ResourceTypeFilter
): Resource[] {
  const normalizedQuery = query.trim().toLowerCase();

  return resources
    .filter((resource) => {
      if (category !== "all" && resource.category !== category) {
        return false;
      }

      if (type !== "all" && resource.type !== type) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return getResourceSearchText(resource).includes(normalizedQuery);
    })
    .sort((first, second) => first.number.localeCompare(second.number));
}

export function toggleFavorite(
  favoriteResourceIds: string[],
  resourceId: string
): string[] {
  if (favoriteResourceIds.includes(resourceId)) {
    return favoriteResourceIds.filter((item) => item !== resourceId);
  }

  return [...favoriteResourceIds, resourceId];
}

export function sortFavoritesFirst(
  resources: Resource[],
  favoriteResourceIds: string[]
): Resource[] {
  const favoriteResourceIdSet = new Set(favoriteResourceIds);

  return [...resources].sort((first, second) => {
    const firstIsFavorite = favoriteResourceIdSet.has(first.id);
    const secondIsFavorite = favoriteResourceIdSet.has(second.id);

    if (firstIsFavorite !== secondIsFavorite) {
      return firstIsFavorite ? -1 : 1;
    }

    return first.number.localeCompare(second.number);
  });
}
