

import { JobCard } from "../jobCard/JobCard";

export const  JobListings = ({jobs}) => {
  return (
    <>
      <h2 className="jobs-title">Resultados de búsqueda</h2>
      <div className="jobs-listings">
        {jobs.map((job) => {
          return <JobCard job={job} key={job.id} />;
        })}
      </div>
    </>
  );
};
 