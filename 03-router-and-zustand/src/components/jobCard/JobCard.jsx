//hook useState
import { useState } from "react";
import Link from "../Link";
import { useFavoriteStore } from "../../store/favoriteStore";
import { useAuthStore } from "../../store/authStore";

export const JobCard = ({ job, showOnlyFavorite = false }) => {
  //estado para el boton aplicar
  const [isApplied, setIsApplied] = useState(false);
  
  //zustand store para favoritos
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const {isLoggedIn} = useAuthStore()
  
  //verificamos si este job es favorito
  const isFav = isFavorite(job.id);

  const handleApplyClick = () => {
    setIsApplied(!isApplied);
  };

  const handleFavoriteClick = () => {
    toggleFavorite(job.id);
  };

  const buttonApplyClasses = isApplied
    ? "button-apply-job is-applied"
    : "button-apply-job";
  const buttonApplyText = isApplied ? "Aplicado" : "Aplicar";
  
  const buttonFavoriteClasses = isFav
    ? "button-apply-job is-favorite"
    : "button-apply-job";
  const buttonFavoriteText = isFav
    ? "Eliminar Favorito"
    : "Agregar a Favoritos";

  return (
    <article
      className="job-listing-card"
      data-modalidad={job.data?.modalidad}
      data-nivel={job.data?.nivel}
      data-technology={job.data?.technology}
    >
      <div className="job-listing-card__content">
        <h3>
          <Link className="links_ofertas" href={`/detaill/${job.id}`}>
            {job.titulo}
          </Link>
        </h3>
        <small>
          {job.empresa} -- {job.ubicacion}
        </small>
        <p>{job.descripcion}</p>
      </div>
        <button onClick={handleApplyClick}
         className={buttonApplyClasses}
         disabled={!isLoggedIn}
        >
          {buttonApplyText}
        </button>
      
      <button 
        onClick={handleFavoriteClick} 
        disabled={!isLoggedIn}
        className={buttonFavoriteClasses}
      >
        {buttonFavoriteText}
      </button>
    </article>
  );
};
