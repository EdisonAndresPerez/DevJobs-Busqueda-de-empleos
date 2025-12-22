import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer/Footer";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Error from "./components/Error";

import { UseRouter } from "./hooks/useRouter";

function App() {
  const { currentPage } = UseRouter();

  let page = <Error />;

  if (currentPage == "/") {
    page = <Home />;
  } else if (currentPage == "/search") {
    page = <Search />;
  }

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
}
export default App;
