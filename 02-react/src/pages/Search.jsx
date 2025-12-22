import { useState, useEffect } from "react";

import { Form } from "../components/formulario";

import { Navegation } from "../components/navegation/Navegation";
import { JobListings } from "../components/jobListings/JobListings";
import { useJobSearch } from "../hooks/useJobSearch";

const RESULTS_PER_PAGE = 3;

const buildJobsUrl = (filters, { limit, offset } = {}) => {
  const baseUrl = "https://jscamp-api.vercel.app/api/jobs";
  const params = new URLSearchParams();

  const search = (filters?.search ?? "").toString().trim();
  const technology = (filters?.technology ?? "").toString().trim();
  const experiencia = (filters?.["experience-level"] ?? "").toString().trim();
  const location = (filters?.location ?? "").toString().trim();

  if (search) params.set("search", search);
  if (technology) params.set("technology", technology);
  if (experiencia) params.set("nivel", experiencia);
  // En la API el campo filtrable suele ser modalidad (remoto/híbrido/presencial)
  if (location) params.set("modalidad", location);

  if (Number.isFinite(limit)) params.set("limit", String(limit));
  if (Number.isFinite(offset)) params.set("offset", String(offset));

  const qs = params.toString();
  return qs ? `${baseUrl}?${qs}` : baseUrl;
};

const Search = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    totalPage,
    pagedResults,
    handlePageChange,
    handleFilterChange,
    filters,
    currentPage,
  } = useJobSearch(data, RESULTS_PER_PAGE);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const allJobs = [];
        let offset = 0;
        const limit = 50;

        while (true) {
          const url = buildJobsUrl(filters, { limit, offset });
          const response = await fetch(url, { signal: controller.signal });
          if (!response.ok) throw new Error("Error al obtener los datos de la api");

          const result = await response.json();
          const pageData = Array.isArray(result?.data) ? result.data : [];
          allJobs.push(...pageData);

          const total = Number(result?.total);
          const pageLimit = Number(result?.limit ?? limit);
          const pageOffset = Number(result?.offset ?? offset);

          if (!Number.isFinite(total)) break;
          if (pageOffset + pageLimit >= total) break;
          if (pageData.length === 0) break;

          offset = pageOffset + pageLimit;
        }

        setData(allJobs);
      } catch (error) {
        if (error?.name !== "AbortError") setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => controller.abort();
  }, [filters]);

  return (
    <main>
      <section className="jobs-search">
        <h1>Encuentra tu próximo trabajo</h1>
        <p>Explora miles de oportunidades en el sector tecnológico.</p>
        <Form filters={filters} onFilterChange={handleFilterChange} />
      </section>
      <section>
        {loading && <p>Cargando ofertas de empleo...</p>}
        {!loading && error && <p>Error: {error?.message ?? String(error)}</p>}
        {!loading && !error && <JobListings jobs={pagedResults} />}

        {!loading && !error && (
          <Navegation
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </main>
  );
};

export default Search;
