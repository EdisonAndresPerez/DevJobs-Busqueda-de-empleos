import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer/Footer";

import Home from "./pages/Home";
import Search from "./pages/Search";

function App() {
  const currentPage = window.location.pathname;

  return (
    <>
      <Header />
      {currentPage === "/" ? <Home /> : null} 
      {currentPage === "/search" ? <Search /> : null}

      <Footer />
    </>
  );
}

export default App;
