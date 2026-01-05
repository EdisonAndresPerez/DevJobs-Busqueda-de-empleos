import { Form } from "../components/formulario";

import { useEffect } from "react";



import { Navegation } from "../components/navegation/Navegation";
import { JobListings } from "../components/jobListings/JobListings";
import { useJobSearch } from "../hooks/useJobSearch";
import { useJobsApi } from "../hooks/useJobsApi";

const RESULTS_PER_PAGE = 4;
const MIN_LOADING_MS = 900;

const Search = () => {
  const { handlePageChange, handleFilterChange, filters, currentPage } =
    useJobSearch();



  const { jobs, loading, error, totalPages } = useJobsApi(
    filters,
    currentPage,
    RESULTS_PER_PAGE,
    MIN_LOADING_MS
  );

  useEffect(() => {
    if (loading || error) return;
    handlePageChange(currentPage, totalPages);
  }, [currentPage, error, handlePageChange, loading, totalPages]);

  return (
    <main>
      <section className="jobs-search">
        <h1>Encuentra tu próximo trabajo</h1>
        <p>Explora miles de oportunidades en el sector tecnológico.</p>
        <Form filters={filters} onFilterChange={handleFilterChange} />
      </section>
      <section>
        {loading && (
          <div className="jobs-loading" role="status" aria-live="polite">
            <span className="jobs-loading__spinner" aria-hidden="true" />
            <p className="jobs-loading__text">Cargando ofertas de empleo...</p>
          </div>
        )}
        {!loading && error && <p>Error: {error?.message ?? String(error)}</p>}
        {!loading && !error && <JobListings jobs={jobs} />}
        {!loading && !error && jobs.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            No se encontraron ofertas de empleo que coincidan con los filtros.
          </p>
        )}

        {!loading && !error && (
          <Navegation
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => handlePageChange(page, totalPages)}
          />
        )}
      </section>
    </main>
  );
};

export default Search;
