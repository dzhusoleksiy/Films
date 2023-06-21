import { Route, Routes } from "react-router-dom";
import MoviesPage from "./components/movies/MoviesPage";
import HomePage from "./components/home/HomePage";
import About from "./components/about/About";
import Nav from "./components/common/Nav";

function App() {
  return (
    <div className="container mx-auto">
      <Nav />
      <Routes>
        <Route path="/Films/Genres" element={<HomePage />} />
        <Route path="/Films/*" element={<MoviesPage />} />
        <Route path="/Films/About-Us" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
