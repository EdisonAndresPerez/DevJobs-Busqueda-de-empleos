import data from '../../data.json'
import { JobCard } from '../jobCard/JobCard';


export const JobListings = () => {

   
  return (
    <>
      <h2>Resultados de búsqueda</h2>
      <div className="jobs-listings"></div>
      {
        data.map((job, id) => {
            return (
                <JobCard job={job} key={id} />
            )
        })
      }
    </>
  );
};
