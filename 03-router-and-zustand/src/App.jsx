import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router";



import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";



function App() {
  return (
    <>
      <Header />
      <Route path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/login" component={Login} />
      <Footer />
    </>
  );
}
export default App;
