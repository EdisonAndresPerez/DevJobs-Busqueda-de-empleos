import { useState, useEffect } from "react";
import { useFavoriteStore } from "../store/favoriteStore";

/**
 * Hook personalizado para obtener los datos completos de los jobs favoritos
 * Usa el store de Zustand para obtener los IDs y luego hace fetch de los datos completos
 */
export function useFavoriteJobs() {
  const { favorite } = useFavoriteStore();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si no hay favoritos, no hacemos nada
    if (favorite.length === 0) {
      setJobs([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    let isActive = true;

    const fetchFavoriteJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        // Hacemos fetch de todos los jobs y filtramos por IDs favoritos
        const url = "https://jscamp-api.vercel.app/api/jobs?limit=1000";
        const response = await fetch(url, { signal: controller.signal });
        
        if (!response.ok) {
          throw new Error("Error al obtener los empleos favoritos");
        }

        const result = await response.json();
        const apiData = Array.isArray(result?.data) ? result.data : [];

        if (isActive) {
          // Filtramos solo los jobs que están en favoritos
          const favoriteJobs = apiData.filter((job) => favorite.includes(job.id));
          setJobs(favoriteJobs);
        }
      } catch (err) {
        if (err?.name !== "AbortError" && isActive) {
          setError(err);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchFavoriteJobs();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [favorite]);

  return { jobs, loading, error };
}
