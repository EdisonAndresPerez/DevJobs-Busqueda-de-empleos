import { useEffect, useState } from "react";
import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer/Footer";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Error from "./components/Error";

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  let page = <Error />;

  if (currentPage == "/") {
    page = <Home />;
  } else if (currentPage == "/search") {
    page = <Search />;
  }
  useEffect(() => {
    const handlePostState = () => {
      setCurrentPage(window.location.pathname);
    };

    window.addEventListener("popstate", handlePostState);

    return () => {
      window.removeEventListener("popstate", handlePostState);
    }


  }, []);

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
}
export default App;
