import { useState, useEffect } from "react";

const sleep = (ms, signal) =>
  new Promise((resolve, reject) => {
    if (!ms || ms <= 0) return resolve();
    if (signal?.aborted) return reject(new DOMException("Aborted", "AbortError"));

    const timeoutId = setTimeout(resolve, ms);
    const onAbort = () => {
      clearTimeout(timeoutId);
      reject(new DOMException("Aborted", "AbortError"));
    };

    signal?.addEventListener("abort", onAbort, { once: true });
  });

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

export function useJobsApi(filters, page = 1, resultsPerPage = 3, minLoadingMs = 0) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const fetchData = async () => {
      const startMs = performance.now();

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

        if (!isActive) return;
        setJobs(pageData);
        setTotal(Number(result?.total) || 0);
      } catch (error) {
        if (error?.name !== "AbortError") setError(error);
      } finally {
        if (!isActive) return;

        const elapsedMs = performance.now() - startMs;
        const remainingMs = Math.max(0, Number(minLoadingMs) - elapsedMs);

        try {
          await sleep(remainingMs, controller.signal);
        } catch (error) {
          if (error?.name === "AbortError") return;
        }

        if (!isActive) return;
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [filters, page, resultsPerPage, minLoadingMs]);

  const totalPages = Math.max(1, Math.ceil(total / resultsPerPage));

  return { jobs, loading, error, total, totalPages };
}
