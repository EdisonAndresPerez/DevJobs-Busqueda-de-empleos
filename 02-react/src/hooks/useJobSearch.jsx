import { useState } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const normalize = (value) => (value ?? "").toString().trim().toLowerCase();

export function useJobSearch(data, RESULTS_PER_PAGE = 3) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    technology: "",
    location: "",
    "experience-level": "",
  });

  const source = Array.isArray(data) ? data : [];

  // Filtrar los datos por título y tecnología
  const search = normalize(filters.search);
  const technology = normalize(filters.technology);
  const location = normalize(filters.location);
  const experienceLevel = normalize(filters["experience-level"]);

  const matchesSelect = (filterValue, jobValue) => {
    if (filterValue === "") return true;
    if (Array.isArray(jobValue)) {
      return jobValue.map(normalize).includes(filterValue);
    }
    return normalize(jobValue) === filterValue;
  };

  const filteredData = source.filter((job) => {
    const haystack = `${job.titulo ?? ""} ${job.empresa ?? ""} ${
      job.descripcion ?? ""
    }`
      .trim()
      .toLowerCase();

    return (
      (search === "" || haystack.includes(search)) &&
      matchesSelect(technology, job?.data?.technology) &&
      matchesSelect(location, job?.ubicacion) &&
      matchesSelect(experienceLevel, job?.data?.nivel)
    );
  });

  const totalPage = Math.max(
    1,
    Math.ceil(filteredData.length / RESULTS_PER_PAGE)
  );
  const pagedResults = filteredData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    console.log("Cambiando a página:", page);
    setCurrentPage(clamp(page, 1, totalPage));
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
