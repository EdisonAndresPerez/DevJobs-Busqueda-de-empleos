import { useState, useEffect } from "react";


import { Form } from "../components/formulario";
import data from "../data.json";

import { Navegation } from "../components/navegation/Navegation";
import { JobListings } from "../components/jobListings/JobListings";
import { useJobSearch } from "../hooks/useJobSearch";

const RESULTS_PER_PAGE = 3;

const Search = () => {
  const {
    totalPage,
    pagedResults,
    handlePageChange,
    handleFilterChange,
    filters,
    currentPage,
  } = useJobSearch(data, RESULTS_PER_PAGE);

  return (
    <main>
      <section className="jobs-search">
        <h1>Encuentra tu próximo trabajo</h1>
        <p>Explora miles de oportunidades en el sector tecnológico.</p>
        <Form filters={filters} onFilterChange={handleFilterChange} />
      </section>
      <section>
        <JobListings jobs={pagedResults} />
        <Navegation
          currentPage={currentPage}
          totalPages={totalPage}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
};

export default Search;
