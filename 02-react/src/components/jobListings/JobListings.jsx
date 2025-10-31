

import { JobCard } from "../jobCard/JobCard";

export const  JobListings = ({jobs}) => {
  return (
    <>
      <h2>Resultados de búsqueda</h2>
      <div className="jobs-listings">
        {jobs.map((job, id) => {
          return <JobCard job={job} key={id} />;
        })}
      </div>
    </>
  );
};
 