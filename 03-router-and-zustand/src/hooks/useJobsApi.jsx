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

  const technology = (filters?.technology ?? "").toString().trim();
  const experiencia = (filters?.["experience-level"] ?? "").toString().trim();
  const location = (filters?.location ?? "").toString().trim();

  // Nota: la API filtra de forma confiable por `technology`.
  // El resto de filtros los aplicamos en cliente (ver más abajo).
  if (technology) params.set("technology", technology);
  if (experiencia) params.set("nivel", experiencia);
  if (location) params.set("modalidad", location);

  if (Number.isFinite(limit)) params.set("limit", String(limit));
  if (Number.isFinite(offset)) params.set("offset", String(offset));

  const qs = params.toString();
  return qs ? `${baseUrl}?${qs}` : baseUrl;
};

const normalize = (value) => (value ?? "").toString().trim().toLowerCase();

const matchesSearch = (job, query) => {
  const q = normalize(query);
  if (!q) return true;

  const haystack = [
    job?.titulo,
    job?.empresa,
    job?.ubicacion,
    job?.descripcion,
    job?.content?.description,
  ]
    .filter(Boolean)
    .map((s) => normalize(s))
    .join(" ");

  return haystack.includes(q);
};

const matchesTechnology = (job, technology) => {
  const t = normalize(technology);
  if (!t) return true;
  const list = Array.isArray(job?.data?.technology) ? job.data.technology : [];
  return list.map(normalize).includes(t);
};

const matchesLocation = (job, location) => {
  const l = normalize(location);
  if (!l) return true;
  return normalize(job?.data?.modalidad) === l;
};

const matchesExperience = (job, experience) => {
  const e = normalize(experience);
  if (!e) return true;

  const jobLevel = normalize(job?.data?.nivel);
  if (e === "mid") return jobLevel === "mid" || jobLevel === "mid-level";
  return jobLevel === e;
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

        const safePage = Math.max(1, Number(page) || 1);

        const search = normalize(filters?.search);
        const technology = normalize(filters?.technology);
        const location = normalize(filters?.location);
        const experience = normalize(filters?.["experience-level"]);

        // La API no filtra de forma confiable por `modalidad`/`nivel` (y tampoco hace full-text search).
        // Cuando alguno de esos filtros está activo, hacemos fetch "amplio" y filtramos/paginamos en cliente.
        const useClientFiltering = Boolean(search || location || experience);

        const limit = useClientFiltering ? 1000 : resultsPerPage;
        const offset = useClientFiltering ? 0 : (safePage - 1) * limit;

        const url = buildJobsUrl(filters, { limit, offset });
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("Error al obtener los datos de la api");

        const result = await response.json();
        const apiData = Array.isArray(result?.data) ? result.data : [];

        if (isActive) {
          if (useClientFiltering) {
            const filtered = apiData
              .filter((job) => matchesTechnology(job, technology))
              .filter((job) => matchesLocation(job, location))
              .filter((job) => matchesExperience(job, experience))
              .filter((job) => matchesSearch(job, search));

            const totalFiltered = filtered.length;
            const start = (safePage - 1) * resultsPerPage;
            const end = start + resultsPerPage;

            setJobs(filtered.slice(start, end));
            setTotal(totalFiltered);
          } else {
            setJobs(apiData);
            setTotal(Number(result?.total) || 0);
          }
        }
      } catch (error) {
        if (error?.name !== "AbortError") setError(error);
      } finally {
        if (isActive) {
          const elapsedMs = performance.now() - startMs;
          const remainingMs = Math.max(0, Number(minLoadingMs) - elapsedMs);

          let aborted = false;
          try {
            await sleep(remainingMs, controller.signal);
          } catch (error) {
            if (error?.name === "AbortError") aborted = true;
          }

          if (isActive && !aborted && !controller.signal.aborted) {
            setLoading(false);
          }
        }
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
