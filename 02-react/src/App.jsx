import { Footer } from "./components/Footer/Footer";
import { Form } from "./components/formulario";

import { Header } from "./components/header/Header";
import {  Navegation } from "./components/navegation/Navegation";

function App() {
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
          <h2>Resultados de búsqueda</h2>
          <div className="jobs-listings"></div>
          {/* Navegacion */}
          <Navegation currentPage={1} totalPages={8} />
        </section>
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
