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
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/*" element={<MoviesPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
