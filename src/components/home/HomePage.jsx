import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const KEY = process.env.REACT_APP_MOVIE_KEY;
const GENRES_LIST_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`;

const HomePage = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch(GENRES_LIST_URL);
        const { genres } = await res.json();
        setGenres(genres);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchGenres();
  }, []);

  return (
    <>
      <h1 className="text-3xl text-center">Genres</h1>
      <div className="grid grid-cols-3 gap-4">
        {genres &&
          genres?.map((g) => (
            <Link
              key={g.id}
              to={`/movies/genres/${g.id}`}
              className="bg-cyan-600 text-white px-3 py-6 text-center"
            >
              {g.name}
            </Link>
          ))}
      </div>
    </>
  );
};

export default HomePage;
