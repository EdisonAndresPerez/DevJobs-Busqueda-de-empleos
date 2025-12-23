import { useState, useEffect } from "react";

const buildJobsUrl = (filters, { limit, offset } = {}) => {
  const baseUrl = "https://jscamp-api.vercel.app/api/jobs";
  const params = new URLSearchParams();

  const search = (filters?.search ?? "").toString().trim();
  const technology = (filters?.technology ?? "").toString().trim();
  const experiencia = (filters?.["experience-level"] ?? "").toString().trim();
  const location = (filters?.location ?? "").toString().trim();

  // Nota: esta API no filtra por `search`/`query`. Para mantener filtrado 100% server-side,
  // usamos el texto como fallback de `technology` cuando no hay un technology seleccionado.
  const technologyQuery = technology || search;
  if (technologyQuery) params.set("technology", technologyQuery);
  if (experiencia) params.set("nivel", experiencia);
  if (location) params.set("modalidad", location);

  if (Number.isFinite(limit)) params.set("limit", String(limit));
  if (Number.isFinite(offset)) params.set("offset", String(offset));

  const qs = params.toString();
  return qs ? `${baseUrl}?${qs}` : baseUrl;
};

export function useJobsApi(filters, page = 1, resultsPerPage = 3) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const limit = resultsPerPage;
        const safePage = Math.max(1, Number(page) || 1);
        const offset = (safePage - 1) * limit;

        const url = buildJobsUrl(filters, { limit, offset });
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("Error al obtener los datos de la api");

        const result = await response.json();
        const pageData = Array.isArray(result?.data) ? result.data : [];

        setJobs(pageData);
        setTotal(Number(result?.total) || 0);
      } catch (error) {
        if (error?.name !== "AbortError") setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [filters, page, resultsPerPage]);

  const totalPages = Math.max(1, Math.ceil(total / resultsPerPage));

  return { jobs, loading, error, total, totalPages };
}
