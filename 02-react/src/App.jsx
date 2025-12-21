import { Header } from "./components/header/Header";

import Home from "./pages/Home";

const RESULTS_PER_PAGE = 3;

function App() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
