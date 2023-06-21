import { useState, useEffect } from "react";
import Movie from "./Movie";
import Pagination from "../common/Pagination";
import { FaSpinner } from "react-icons/fa";

const KEY = process.env.REACT_APP_MOVIE_KEY;
const API_URL = `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&api_key=${KEY}`;

const fetchMovies = async (page) => {
  const res = await fetch(API_URL + `&page=${page}`);
  return await res.json();
};

const MoviesList = ({ config }) => {
  const [movies, setMovies] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const movies = await fetchMovies(currentPage);
        setMovies(movies);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
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
      {loading && (
        <div className="flex justify-center mt-[50px]">
          <FaSpinner className="text-white animate-spin h-10 w-10" />
        </div>
      )}
      <div className="movie-grid">
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
