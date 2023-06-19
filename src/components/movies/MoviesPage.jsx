import { Routes, Route } from "react-router-dom";
import MoviesList from "./MoviesList";

const MoviesPage = () => {
  return <>
    <Routes>
        <Route path="list" element={<MoviesList />} />
    </Routes>
  </>;
};

export default MoviesPage;
