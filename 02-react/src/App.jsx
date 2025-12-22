import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer/Footer";

import Home from "./pages/Home";
import Search from "./pages/Search";

import Route from './Route';

function App() {
 
  return (
    <>
      <Header />
      <Route path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Footer />
    </>
  );
}
export default App;
