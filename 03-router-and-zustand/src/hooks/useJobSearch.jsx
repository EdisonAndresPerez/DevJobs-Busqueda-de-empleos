import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const FILTER_KEYS = ["search", "technology", "location", "experience-level"];

const readPageFromSearchParams = (params) => {
  const value = Number(params?.get?.("page"));
  return Number.isFinite(value) && value >= 1 ? Math.floor(value) : 1;
};

const readFiltersFromSearchParams = (params) => {
  const next = {
    search: "",
    technology: "",
    location: "",
    "experience-level": "",
  };

  for (const key of FILTER_KEYS) {
    const value = params?.get?.(key);
    if (value != null) next[key] = value;
  }

  return next;
};

const areFiltersEqual = (a, b) => {
  for (const key of FILTER_KEYS) {
    if (String(a?.[key] ?? "") !== String(b?.[key] ?? "")) return false;
  }
  return true;
};

const areSearchParamsInSync = (params, page, filters) => {
  const expectedPage = String(Number(page) || 1);
  const actualPage = params?.get?.("page") ?? "1";
  if (expectedPage !== actualPage) return false;

  for (const key of FILTER_KEYS) {
    const expected = String(filters?.[key] ?? "").trim();
    const actual = params?.get?.(key) ?? "";
    if (expected !== actual) return false;
  }

  return true;
};

export function useJobSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchString = useMemo(() => searchParams.toString(), [searchParams]);
  const skipNextUrlSyncRef = useRef(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    technology: "",
    location: "",
    "experience-level": "",
  });

  useEffect(() => {
    const urlPage = readPageFromSearchParams(searchParams);
    const urlFilters = readFiltersFromSearchParams(searchParams);

    // Evita que el efecto de escritura sobrescriba la URL
    // antes de que el estado se hidrate desde los query params.
    skipNextUrlSyncRef.current = true;

    setCurrentPage((prev) => (prev === urlPage ? prev : urlPage));
    setFilters((prev) => (areFiltersEqual(prev, urlFilters) ? prev : urlFilters));
  }, [searchString, searchParams]);

  useEffect(() => {
    if (skipNextUrlSyncRef.current) {
      skipNextUrlSyncRef.current = false;
      return;
    }

    if (areSearchParamsInSync(searchParams, currentPage, filters)) return;

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", String(Number(currentPage) || 1));

        for (const key of FILTER_KEYS) {
          const value = String(filters?.[key] ?? "").trim();
          if (value) next.set(key, value);
          else next.delete(key);
        }

        return next;
      },
      { replace: true }
    );
  }, [currentPage, filters, searchParams, setSearchParams]);

  const handlePageChange = (page, totalPages = 1) => {
    setCurrentPage(clamp(page, 1, totalPages));
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  return {
    handlePageChange,
    handleFilterChange,
    filters,
    currentPage,
  };
}
