import { lazy, Suspense } from "react";

import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer/Footer";
import { Routes, Route } from "react-router";

import Error from "./components/Error";
import { ProtectedRoute } from "./components/ProtectedRoute";

const HomePage = lazy(() => import("./pages/Home"));
const SearchPage = lazy(() => import("./pages/Search"));
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const DetaillPage = lazy(() => import("./pages/Detaill"));
const PerfilPage = lazy(() => import("./pages/Perfil"));

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
          <Route path="/register" element={<RegisterPage />} />
          {/* Ruta protegida */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute redirectTo="/login">
                <PerfilPage />
              </ProtectedRoute>
            }
          />

          <Route path="/detaill/:id" element={<DetaillPage />} />

          {/*  Ruta de error  */}
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}
