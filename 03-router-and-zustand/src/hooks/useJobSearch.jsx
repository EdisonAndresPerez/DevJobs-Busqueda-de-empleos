import { useEffect, useState } from "react";
import { useRouter } from "./useRouter";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const FILTER_KEYS = ["search", "technology", "location", "experience-level"];

const readPageFromSearch = (search) => {
  try {
    const params = new URLSearchParams(search);
    const value = Number(params.get("page"));
    return Number.isFinite(value) && value >= 1 ? Math.floor(value) : 1;
  } catch {
    return 1;
  }
};

const readFiltersFromSearch = (search) => {
  const next = {
    search: "",
    technology: "",
    location: "",
    "experience-level": "",
  };

  try {
    const params = new URLSearchParams(search);
    for (const key of FILTER_KEYS) {
      const value = params.get(key);
      if (value != null) next[key] = value;
    }
  } catch {
    // noop
  }

  return next;
};

const areFiltersEqual = (a, b) => {
  for (const key of FILTER_KEYS) {
    if (String(a?.[key] ?? "") !== String(b?.[key] ?? "")) return false;
  }
  return true;
};

const isUrlInSync = (page, filters) => {
  const params = new URLSearchParams(window.location.search);

  const expectedPage = String(Number(page) || 1);
  const actualPage = params.get("page") ?? "1";
  if (expectedPage !== actualPage) return false;

  for (const key of FILTER_KEYS) {
    const expected = String(filters?.[key] ?? "").trim();
    const actual = params.get(key) ?? "";
    if (expected !== actual) return false;
  }

  return true;
};

export function useJobSearch() {
  const { currentSearch, navigate } = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    technology: "",
    location: "",
    "experience-level": "",
  });

  useEffect(() => {
    const urlPage = readPageFromSearch(currentSearch);
    const urlFilters = readFiltersFromSearch(currentSearch);

    setCurrentPage((prev) => (prev === urlPage ? prev : urlPage));
    setFilters((prev) => (areFiltersEqual(prev, urlFilters) ? prev : urlFilters));
  }, [currentSearch]);

  useEffect(() => {
    if (isUrlInSync(currentPage, filters)) return;

    const url = new URL(window.location.href);
    url.searchParams.set("page", String(currentPage));

    for (const key of FILTER_KEYS) {
      const value = String(filters?.[key] ?? "").trim();
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }

    const next = `${url.pathname}?${url.searchParams.toString()}`;
    navigate(next);
  }, [currentPage, filters, navigate]);

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
