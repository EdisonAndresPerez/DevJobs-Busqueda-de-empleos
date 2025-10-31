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
  const totalPage = Math.ceil(data.length / RESULTS_PER_PAGE);

  const pagedResults = data.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    console.log("hola probando", page);
    setCurrentPage(page);
  };

  return (
    <>
      {/* header */}
      <Header />

      {/* Main */}
      <main>
        {/* Seccion 1 */}
        <section className="jobs-search">
          <h1>Encuentra tu próximo trabajo</h1>
          <p>Explora miles de oportunidades en el sector tecnológico.</p>
          {/* Formulario */}
          <Form />
          <span id="filter-selected-value"></span>
        </section>

        {/* Seccion 2 */}
        <section>
          {/* Resultados de busqueda */}
          <JobListings jobs={pagedResults} />

          {/* Navegacion */}
          <Navegation
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
