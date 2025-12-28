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
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
