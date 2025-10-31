import { useState } from "react";
import data from "./data.json";
import { Footer } from "./components/Footer/Footer";
import { Form } from "./components/formulario";
import { Header } from "./components/header/Header";
import { Navegation } from "./components/navegation/Navegation";
import { JobListings } from "./components/jobListings/JobListings";

const RESULTS_PER_PAGE = 5;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ search: "", technology: "" });

  // Filtrar los datos por título y tecnología
  const filteredData = data.filter((job) => {
    const titleMatch = job.titulo
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const techMatch = !filters.technology || filters.technology === "" || job.data.technology === filters.technology;
const locationMatch = !filters.location || filters.location === "" || filters.location === " " || job.data.modalidad === filters.location;
const experienceMatch = !filters["experience-level"] || filters["experience-level"] === "" || job.data.nivel === filters["experience-level"];
    return titleMatch && techMatch && locationMatch && experienceMatch;
  });

  const totalPage = Math.ceil(filteredData.length / RESULTS_PER_PAGE);
  const pagedResults = filteredData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <main>
        <section className="jobs-search">
          <h1>Encuentra tu próximo trabajo</h1>
          <p>Explora miles de oportunidades en el sector tecnológico.</p>
          <Form filters={filters} onFilterChange={handleFilterChange} />
          <span id="filter-selected-value"></span>
        </section>
        <section>
          <JobListings jobs={pagedResults} />
          <Navegation
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
