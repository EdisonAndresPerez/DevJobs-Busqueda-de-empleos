import { useState } from "react";

import { Footer } from "./components/Footer/Footer";
import { Form } from "./components/formulario";

import { Header } from "./components/header/Header";
import { Navegation } from "./components/navegation/Navegation";
import { JobListings } from "./components/jobListings/JobListings";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 6;

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
          <JobListings/>



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
