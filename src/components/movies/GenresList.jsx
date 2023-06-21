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
        <div className="flex justify-center mt-[50px]">
          <FaSpinner className="text-white animate-spin h-10 w-10" />
        </div>
      ) : (
        <div>
          <h1 className="text-3xl text-center bg-indianRed rounded-lg text-white p-4 mt-[21px] sm:mt-[31px] md:mt-[41px] lg:mt-[51px] mb-[10px] sm:mb-[15px] md:mb-[20px] lg:mb-[25px] shadow-md mx-[10px] sm:mx-[15px] md:mx-[20px] lg:mx-[25px]">
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
              totalPageCount={500}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </>
  );
};

export default GenresList;
