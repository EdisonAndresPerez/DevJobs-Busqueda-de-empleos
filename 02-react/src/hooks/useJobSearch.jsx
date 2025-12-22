import { useState } from "react";


export function useJobSearch(data, RESULTS_PER_PAGE = 3) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ search: "", technology: "" });

  // Filtrar los datos por título y tecnología
  const search = (filters.search ?? "").trim().toLowerCase();
  const technology = (filters.technology ?? "").trim();
  const location = (filters.location ?? "").trim();
  const experienceLevel = (filters["experience-level"] ?? "").trim();

  const matchesSelect = (filterValue, jobValue) =>
    filterValue === "" || jobValue === filterValue;

  const filteredData = data.filter((job) => {
    const haystack = `${job.titulo ?? ""} ${job.empresa ?? ""} ${
      job.descripcion ?? ""
    }`
      .trim()
      .toLowerCase();

    return (
      (search === "" || haystack.includes(search)) &&
      matchesSelect(technology, job.data.technology) &&
      matchesSelect(location, job.data.modalidad) &&
      matchesSelect(experienceLevel, job.data.nivel)
    );
  });

  const totalPage = Math.ceil(filteredData.length / RESULTS_PER_PAGE);
  const pagedResults = filteredData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    console.log("Cambiando a página:", page);
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };
  return {
    totalPage,
    pagedResults,
    handlePageChange,
    handleFilterChange,
    filters,
    currentPage,
  };
}
