import { useState, useEffect } from "react";

import { Form } from "../components/formulario";

import { Navegation } from "../components/navegation/Navegation";
import { JobListings } from "../components/jobListings/JobListings";
import { useJobSearch } from "../hooks/useJobSearch";

const RESULTS_PER_PAGE = 3;

const Search = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching job data...');
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://jscamp-api.vercel.app/api/jobs");
        if (!response.ok) {
          throw new Error("Error al obtener los datos de la api");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
