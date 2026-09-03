"use client";

import { useEffect, useMemo, useState } from "react";
import {
  filterResources,
  getResourceCategories,
  getResourceDisplayLabel,
  getResourceTypes,
  sortFavoritesFirst,
  toggleFavorite,
  type ResourceCategoryFilter,
  type ResourceTypeFilter
} from "@/lib/planning/resources";
import type { PlannerAuditUser } from "@/lib/supabase/audit";
import {
  addPlannerResourceFavorite,
  fetchPlannerResourceFavoriteIds,
  removePlannerResourceFavorite,
  subscribePlannerResourceFavorites
} from "@/lib/supabase/resource-favorites";
import type { Resource } from "@/types/planning";

type ResourceSelectorProps = {
  resources: Resource[];
  selectedResourceIds: string[];
  isLoading?: boolean;
  hasLoadError?: boolean;
  auditUser?: PlannerAuditUser;
  onChange: (resourceIds: string[]) => void;
};

function formatCategory(category: Resource["category"]): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function ResourceSelector({
  resources,
  selectedResourceIds,
  isLoading = false,
  hasLoadError = false,
  auditUser,
  onChange
}: ResourceSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ResourceCategoryFilter>("all");
  const [type, setType] = useState<ResourceTypeFilter>("all");
  const [favoriteResourceIds, setFavoriteResourceIds] = useState<string[]>(
    () =>
      resources
        .filter((resource) => resource.isFavorite)
        .map((resource) => resource.id)
  );
  const [favoriteSaveError, setFavoriteSaveError] = useState("");

  const categories = useMemo(() => getResourceCategories(resources), [resources]);
  const types = useMemo(() => getResourceTypes(resources), [resources]);
  const filteredResources = useMemo(
    () =>
      sortFavoritesFirst(
        filterResources(resources, query, category, type),
        favoriteResourceIds
      ),
    [category, favoriteResourceIds, query, resources, type]
  );
  const selectedResourceIdSet = useMemo(
    () => new Set(selectedResourceIds),
    [selectedResourceIds]
  );
  const selectedResources = selectedResourceIds
    .map((resourceId) =>
      resources.find((resource) => resource.id === resourceId)
    )
    .filter((resource): resource is Resource => Boolean(resource));
  const selectedSummaryTitle =
    selectedResources.length > 0
      ? selectedResources
          .map((resource) => getResourceDisplayLabel(resource))
          .join("\n")
      : "Geen materieel gekozen";
  const selectedSummaryLabel =
    isLoading
      ? "Materieel laden..."
      : hasLoadError
        ? "Materieel niet geladen"
        : selectedResources.length === 0
      ? "Geen materieel gekozen"
      : selectedResources.length === 1
        ? selectedResources[0].name
        : `${selectedResources.length} materieelitems gekozen`;
  const selectorIsUnavailable = isLoading || hasLoadError;

  useEffect(() => {
    const seededFavoriteIds = resources
      .filter((resource) => resource.isFavorite)
      .map((resource) => resource.id);

    setFavoriteResourceIds((currentFavoriteResourceIds) =>
      currentFavoriteResourceIds.length > 0
        ? currentFavoriteResourceIds
        : seededFavoriteIds
    );
  }, [resources]);

  useEffect(() => {
    if (!auditUser) {
      return;
    }

    let isMounted = true;

    fetchPlannerResourceFavoriteIds()
      .then((nextFavoriteResourceIds) => {
        if (!isMounted) {
          return;
        }

        setFavoriteResourceIds(nextFavoriteResourceIds);
        setFavoriteSaveError("");
      })
      .catch(() => {
        if (isMounted) {
          setFavoriteSaveError("Favorieten niet geladen.");
        }
      });

    const unsubscribe = subscribePlannerResourceFavorites((change) => {
      setFavoriteResourceIds((currentFavoriteResourceIds) => {
        if (change.eventType === "DELETE") {
          return currentFavoriteResourceIds.filter(
            (resourceId) => resourceId !== change.resourceId
          );
        }

        if (currentFavoriteResourceIds.includes(change.resourceId)) {
          return currentFavoriteResourceIds;
        }

        return [...currentFavoriteResourceIds, change.resourceId];
      });
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [auditUser?.email, auditUser?.id]);

  function toggleResource(resourceId: string) {
    if (selectedResourceIdSet.has(resourceId)) {
      onChange(selectedResourceIds.filter((item) => item !== resourceId));
      return;
    }

    onChange([...selectedResourceIds, resourceId]);
  }

  function clearResource(resourceId: string) {
    onChange(selectedResourceIds.filter((item) => item !== resourceId));
  }

  function clearResources() {
    onChange([]);
  }

  function toggleResourceFavorite(resourceId: string) {
    const wasFavorite = favoriteResourceIds.includes(resourceId);

    setFavoriteResourceIds((currentFavoriteResourceIds) =>
      toggleFavorite(currentFavoriteResourceIds, resourceId)
    );
    setFavoriteSaveError("");

    if (!auditUser) {
      return;
    }

    const saveFavorite = wasFavorite
      ? removePlannerResourceFavorite(resourceId)
      : addPlannerResourceFavorite(resourceId, auditUser);

    saveFavorite.catch(() => {
      setFavoriteResourceIds((currentFavoriteResourceIds) =>
        toggleFavorite(currentFavoriteResourceIds, resourceId)
      );
      setFavoriteSaveError("Favoriet niet opgeslagen.");
    });
  }

  return (
    <div className="rounded-md border border-perceel-line bg-slate-50 px-2 py-1.5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-2.5">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase text-slate-500">
            Materieel optioneel
          </p>
          <div
            className="mt-0.5 flex min-w-0 flex-wrap items-center gap-1.5"
            title={selectedSummaryTitle}
          >
            {selectedResources.length > 0 ? (
              selectedResources.map((resource) => (
                <span
                  className="inline-flex max-w-[150px] items-center gap-1 rounded border border-emerald-200 bg-white px-1.5 py-0.5 text-[11px] font-semibold text-perceel-dark"
                  key={resource.id}
                >
                  <span className="font-bold">{resource.number}</span>
                  <span className="truncate">{resource.name}</span>
                  <button
                    aria-label={`Wis ${resource.number} ${resource.name}`}
                    className="rounded px-0.5 text-[10px] font-bold leading-3 text-slate-500 hover:bg-perceel-soft hover:text-red-700"
                    onClick={() => clearResource(resource.id)}
                    type="button"
                  >
                    x
                  </button>
                </span>
              ))
            ) : (
              <p className="truncate text-sm font-semibold text-slate-500">
                {selectedSummaryLabel}
              </p>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {selectedResources.length > 0 ? (
            <button
              className="flex-1 rounded-md border border-perceel-line bg-white px-2 py-1.5 text-xs font-semibold text-slate-600 hover:bg-perceel-soft sm:flex-none sm:py-1"
              onClick={clearResources}
              type="button"
            >
              Alles wissen
            </button>
          ) : null}
          <button
            aria-expanded={isOpen}
            className="flex-1 rounded-md border border-perceel-line bg-white px-2 py-1.5 text-xs font-semibold text-slate-700 hover:bg-perceel-soft disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 sm:flex-none sm:py-1"
            disabled={selectorIsUnavailable}
            onClick={() => setIsOpen((currentValue) => !currentValue)}
            type="button"
          >
            {selectedResources.length > 0 ? "Wijzig materieel" : "Kies materieel"}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="mt-1.5 border-t border-perceel-line pt-1.5">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <p
              className="min-w-0 truncate text-xs font-semibold text-slate-600"
              title={selectedSummaryTitle}
            >
              {selectedSummaryLabel}
            </p>
            <button
              className="rounded-md border border-perceel-line bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-perceel-soft"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              Klaar
            </button>
          </div>
          {favoriteSaveError ? (
            <p className="mt-1 text-[11px] font-semibold text-red-700">
              {favoriteSaveError}
            </p>
          ) : null}

          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-[minmax(160px,1fr)_120px_140px]">
            <label className="text-[10px] font-semibold uppercase text-slate-600">
              Zoek
              <input
                className="mt-0.5 w-full rounded-md border border-perceel-line bg-white px-2 py-0.5 text-xs normal-case text-slate-900"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nummer, groep, naam of merk"
                type="search"
                value={query}
              />
            </label>

            <label className="text-[10px] font-semibold uppercase text-slate-600">
              Categorie
              <select
                className="mt-0.5 w-full rounded-md border border-perceel-line bg-white px-2 py-0.5 text-xs normal-case text-slate-900"
                onChange={(event) =>
                  setCategory(event.target.value as ResourceCategoryFilter)
                }
                value={category}
              >
                <option value="all">Alle</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {formatCategory(item)}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-[10px] font-semibold uppercase text-slate-600">
              Type
              <select
                className="mt-0.5 w-full rounded-md border border-perceel-line bg-white px-2 py-0.5 text-xs normal-case text-slate-900"
                onChange={(event) => setType(event.target.value)}
                value={type}
              >
                <option value="all">Alle</option>
                {types.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-1.5 max-h-64 overflow-y-auto rounded-md border border-perceel-line bg-white sm:max-h-28">
            {filteredResources.length === 0 ? (
              <p className="px-2 py-1 text-xs text-slate-600">
                Geen materieel gevonden.
              </p>
            ) : (
              <div className="divide-y divide-perceel-line">
                {filteredResources.map((resource) => {
                  const isSelected = selectedResourceIdSet.has(resource.id);
                  const isFavorite = favoriteResourceIds.includes(resource.id);

                  return (
                    <div
                      className={`grid grid-cols-[26px_minmax(0,1fr)] items-center gap-1 px-2 py-0.5 text-xs hover:bg-perceel-soft ${
                        isSelected ? "bg-emerald-50" : "bg-white"
                      }`}
                      key={resource.id}
                      title={getResourceDisplayLabel(resource)}
                    >
                      <button
                        aria-label={
                          isFavorite
                            ? `Verwijder ${getResourceDisplayLabel(resource)} uit favorieten`
                            : `Markeer ${getResourceDisplayLabel(resource)} als favoriet`
                        }
                        className={`rounded border border-transparent px-1 text-sm leading-5 ${
                          isFavorite
                            ? "text-amber-500 hover:bg-amber-50"
                            : "text-slate-300 hover:bg-slate-50 hover:text-amber-500"
                        }`}
                        onClick={() => toggleResourceFavorite(resource.id)}
                        title={isFavorite ? "Favoriet" : "Maak favoriet"}
                        type="button"
                      >
                        {isFavorite ? "\u2605" : "\u2606"}
                      </button>
                      <button
                        className="grid w-full grid-cols-[72px_minmax(0,1fr)_64px] items-center gap-1.5 text-left text-xs lg:grid-cols-[58px_minmax(120px,1fr)_70px_86px_110px]"
                        onClick={() => toggleResource(resource.id)}
                        type="button"
                      >
                        <span className="font-bold text-perceel-dark">
                          {resource.number}
                        </span>
                        <span className="truncate font-semibold text-slate-900">
                          {resource.name}
                        </span>
                        <span
                          className={`text-[10px] font-semibold uppercase ${
                            isSelected ? "text-perceel-green" : "text-slate-400"
                          }`}
                        >
                          {isSelected ? "Gekozen" : ""}
                        </span>
                        <span className="hidden truncate text-xs uppercase text-slate-600 lg:block">
                          {resource.category}
                        </span>
                        <span className="hidden truncate text-xs text-slate-600 lg:block">
                          {resource.type}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
