import { useState, useEffect } from "react";
import Movie from "./Movie";
import Pagination from "../common/Pagination";

const KEY = process.env.REACT_APP_MOVIE_KEY;
const API_URL =
  `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&api_key=${KEY}`;

const fetchMovies = async (page) => {
  const res = await fetch(API_URL + `&page=${page}`);
  return await res.json();
};

const MoviesList = ({ config }) => {
  const [movies, setMovies] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await fetchMovies(currentPage);
        setMovies(movies);
      } catch (err) {
        console.log(err);
      } finally {
        window.scrollTo({
          top: 0,
        });
      }
    };
    getMovies();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {movies?.results &&
          movies.results.map((m) => (
            <Movie key={m.id} item={m} config={config} />
          ))}
      </div>
      {movies?.results && (
        <Pagination
          currentPage={currentPage}
          totalPageCount={500}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default MoviesList;
