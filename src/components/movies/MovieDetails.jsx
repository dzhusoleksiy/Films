import { useStatem, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function getMovieUrl(movie_id) {
  return `https://api.themoviedb.org/3/movie/${movie_id}?api_key=65e043c24785898be00b4abc12fcdaae&language=en-US`;
}

async function fetchMovie(id) {
  const res = await fetch(getMovieUrl(id));
  return await res.json();
}

const MovieDetails = ({ config }) => {
  const [movie, setMovie] = useState({});

  const { id } = useParams();

  useEffect(() => {
    async function getMovie() {
      try {
        const movie = await fetchMovie(id);
        setMovie(movie);
      } catch (err) {
        console.log(err.message);
      }
    }
    getMovie();
  }, [id]);

  return (
    <>
      <div className="grid grid-cols-[300px_1fr] gap-4">
        {config?.images?.base_url && (
          <div className="px-4">
            <img
              className="w-full max-w-full shadow-md shadow-slate-600 mb-4"
              src={config.images.base_url + "w500" + movie.poster_path}
              alt={movie.title + " poster"}
            />
          </div>
        )}
        <div>
          <h1 className="text-3xl mb-3">{movie.title}</h1>
          <p className="mb-3">{movie.overview}</p>
          {movie?.genres &&
            movie.genres.map((g) => (
              <Link
                key={g.id}
                to={`/movies/genres/${g.id}`}
                className="block mb-3 text-red-500 underline md:hober:no-underline"
              >
                {g.name}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
