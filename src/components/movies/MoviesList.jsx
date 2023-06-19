import { useState, useEffect } from "react";
import Movie from "./Movie";
import Pagination from "../common/Pagination";

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=65e043c24785898be00b4abc12fcdaae&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false";
const CONFIG_URL =
  "https://api.themoviedb.org/3/configuration?api_key=65e043c24785898be00b4abc12fcdaae";

const fetchMovies = async (page) => {
  const res = await fetch(API_URL + `&page=${page}`);
  return await res.json();
};

const MoviesList = () => {
  const [movies, setMovies] = useState({});
  const [config, setConfig] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const getConfig = async () => {
    try {
      const res = await fetch(CONFIG_URL);
      const config = await res.json();
      setConfig(config);
    } catch (err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    getConfig();
  }, []);

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
      <Pagination
        currentPage={currentPage}
        totalPageCount={500}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default MoviesList;
