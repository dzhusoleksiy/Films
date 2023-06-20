import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../common/Pagination";
import Movie from "./Movie";
import { ArrToMap } from "../../utils";

const KEY = process.env.REACT_APP_MOVIE_KEY;

const GENRES_URL =
  "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false";

const GENRES_LIST_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`;

const GenresList = ({ config }) => {
  const [movies, setMovies] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [gName, setGname] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function fetchMovies() {
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
      <h1 className="text-3xl text-center mb-4">Genre: {gName && gName}</h1>
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

export default GenresList;
