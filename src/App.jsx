import { Route, Routes } from "react-router-dom";
import MoviesPage from "./components/movies/MoviesPage";
import HomePage from "./components/home/HomePage";
import About from "./components/about/About";
import Nav from "./components/common/Nav";
import PageNotFound from "./components/common/PageNotFound";

function App() {
  return (
    <div className="container mx-auto min-h-screen">
      <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/*" element={<MoviesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </div>
  );
}

export default App;
