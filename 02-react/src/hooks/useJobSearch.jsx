import { useState } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function useJobSearch() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    technology: "",
    location: "",
    "experience-level": "",
  });

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
