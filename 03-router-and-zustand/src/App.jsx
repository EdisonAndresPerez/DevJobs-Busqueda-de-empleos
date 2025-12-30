import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer/Footer";
import { Routes, Route } from "react-router";

import Error from "./components/Error";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Detaill from "./pages/Detaill";

function App() {
  return (
    <>
      <Header />
      {/* Routes => contenedor que contiene todas las rutas */}
      <Routes>
        {/*  Route => Definir cada ruta individual */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />

        <Route path="/detaill/:id" element={<Detaill />} />

        {/*  Ruta de error  */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
