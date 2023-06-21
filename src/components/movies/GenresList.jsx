import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../common/Pagination";
import Movie from "./Movie";
import { ArrToMap } from "../../utils";
import { FaSpinner } from "react-icons/fa";

const KEY = process.env.REACT_APP_MOVIE_KEY;

const GENRES_URL =
  "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false";

const GENRES_LIST_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`;

const GenresList = ({ config }) => {
  const [movies, setMovies] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [gName, setGname] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      if (!id) {
        return;
      }
      const URL =
        GENRES_URL + `&with_genres=${id}&page=${currentPage}&api_key=${KEY}`;
      try {
        const res = await fetch(URL);
        const movies = await res.json();
        setMovies(movies);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [currentPage, id]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch(GENRES_LIST_URL);
        const { genres } = await res.json();
        const ob = ArrToMap(genres);
        setGname(ob[id].name);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchGenres();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="spinner-div">
          <FaSpinner className="spinner" />
        </div>
      ) : (
        <div>
          <h1 className="genre-header">
            Genre: {gName && gName}
          </h1>
          <div className="movie-grid mt-0">
            {movies?.results &&
              movies.results.map((m) => (
                <Movie key={m.id} item={m} config={config} />
              ))}
          </div>
          {movies?.results && (
            <Pagination
              currentPage={currentPage}
              totalPageCount={movies.total_pages <= 500 ? movies.total_pages : 500}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </>
  );
};

export default GenresList;
