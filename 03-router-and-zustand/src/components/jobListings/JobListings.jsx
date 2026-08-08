

import { JobCard } from "../jobCard/JobCard";
import {useAuthStore} from "../../store/authStore";
import  "../../index.css"


export const  JobListings = ({jobs}) => {

const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <>
      <h2 className="jobs-title">Resultados de búsqueda</h2>
        {
          !isLoggedIn && (
            <p className="jobs-isuser">
            Regístrate o inicia sesión para poder aplicar a ofertas
            y agregarlas a favoritos.
          </p>
          )
        }
      <div className="jobs-listings">
        {jobs.map((job) => {
          return <JobCard job={job} key={job.id} />;
        })}
      </div>
    </>
  );
};
 