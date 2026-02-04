
import { useFavoriteJobs } from "../hooks/useFavoriteJobs";
import { JobCard } from "../components/jobCard/JobCard";

export const Perfil = () => {
  const { jobs, loading, error } = useFavoriteJobs();

  return (
    <main>
      <section className="jobs-search">
        <h1>Mi Perfil</h1>
        <p>Bienvenido a tu perfil</p>
        <h3>Empleos guardados en favoritos</h3>
      </section>

      <section>
        {loading && (
          <div className="jobs-loading" role="status" aria-live="polite">
            <span className="jobs-loading__spinner" aria-hidden="true" />
            <p className="jobs-loading__text">Cargando tus favoritos...</p>
          </div>
        )}

        {!loading && error && (
          <p style={{ textAlign: "center", color: "red", marginTop: "2rem" }}>
            Error: {error?.message ?? String(error)}
          </p>
        )}

        {!loading && !error && jobs.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            No tienes empleos en favoritos. ¡Empieza a explorar y guarda tus
            oportunidades favoritas!
          </p>
        )}

        {!loading && !error && jobs.length > 0 && (
          <div>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} showOnlyFavorite={true} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Perfil;
