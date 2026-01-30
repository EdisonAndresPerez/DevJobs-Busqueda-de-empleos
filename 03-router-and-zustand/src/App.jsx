import { lazy, Suspense } from "react";



import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer/Footer";
import { Routes, Route } from "react-router";

import Error from "./components/Error";

const HomePage = lazy(() => import("./pages/Home"));
const SearchPage = lazy(() => import("./pages/Search"));
const LoginPage = lazy(() => import("./pages/Login"));
const DetaillPage = lazy(() => import("./pages/Detaill"));

export default function App() {
  return (
    <>
      <Header />

      <Suspense
        fallback={
          <main>
            <section>
              <div className="jobs-loading" role="status" aria-live="polite">
                <span className="jobs-loading__spinner" aria-hidden="true" />
                <p className="jobs-loading__text">Cargando…</p>
              </div>
            </section>
          </main>
        }
      >
        {/* Routes => contenedor que contiene todas las rutas */}
        <Routes>
          {/*  Route => Definir cada ruta individual */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/detaill/:id" element={<DetaillPage />} />

          {/*  Ruta de error  */}
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}
