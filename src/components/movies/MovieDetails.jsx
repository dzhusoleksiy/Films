import { useStatem, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

function getMovieUrl(movie_id) {
  return `https://api.themoviedb.org/3/movie/${movie_id}?api_key=65e043c24785898be00b4abc12fcdaae&language=en-US`;
}

async function fetchMovie(id) {
  const res = await fetch(getMovieUrl(id));
  return await res.json();
}

const MovieDetails = ({ config }) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function getMovie() {
      setLoading(true);
      try {
        const movie = await fetchMovie(id);
        setMovie(movie);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    getMovie();
  }, [id]);

  const formatReleaseDate = (dateString) => {
    let date = new Date(dateString);

    let month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );

    let day = date.getDate();
    let daySuffix = getDaySuffix(day);
    let formattedDay = day + daySuffix;

    let year = date.getFullYear();

    let formattedDate = month + " " + formattedDay + ", " + year;

    return formattedDate;
  };

  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center mt-[50px]">
          <FaSpinner className="text-white animate-spin h-10 w-10" />
        </div>
      ) : (
        <div className="grid grid-cols-1 mt-[21px] sm:mt-[31px] md:mt-[41px] lg:mt-[51px] md:grid-cols-[40%_1fr] lg:grid-cols-[30%_1fr] mx-[10px] sm:mx-[15px] md:mx-[20px] lg:mx-[25px] mb-[10px] sm:mb-[15px] md:mb-[20px] lg:mb-[25px] gap-[10px] sm:gap-[15px] md:gap-[20px] lg:gap-[25px]">
          {config?.images?.base_url && (
            <div className="rounded-lg shadow-md overflow-hidden bg-indianRed">
              <img
                className="w-full max-w-full h-full shadow-md mb-4 object-cover"
                src={config.images.base_url + "w500" + movie.poster_path}
                alt={movie.title + " poster"}
              />
            </div>
          )}
          <div className="rounded-lg shadow-md overflow-hidden bg-indianRed p-5 text-white relative">
            <h1 className="text-3xl my-3 text-bold text-center">
              {movie.title}
            </h1>
            <p className="my-3">{movie.overview}</p>
            <div className="my-3">
              {movie?.vote_average !== 0 && (
                <span>
                  Rated as{" "}
                  {(Math.floor(movie.vote_average * 10) / 10).toFixed(1)}
                  /10 based on {movie?.vote_count !== 0 &&
                    movie.vote_count}{" "}
                  reviews.{" "}
                </span>
              )}
              {movie?.release_date && (
                <span>
                  It was released on {formatReleaseDate(movie.release_date)}.{" "}
                </span>
              )}
              {movie?.runtime !== 0 && (
                <span> It has runtime of {movie.runtime} minutes. </span>
              )}
              {movie?.budget !== 0 && (
                <span>
                  It's budget is ${Number(movie.budget).toLocaleString()}.{" "}
                </span>
              )}
              {movie?.revenue !== 0 && (
                <span>
                  It's revenue is ${Number(movie.revenue).toLocaleString()}.
                </span>
              )}
            </div>
            <div className="flex justify-around flex-wrap">
              {movie?.genres &&
                movie.genres.map((g) => (
                  <Link
                    key={g.id}
                    to={`/movies/genres/${g.id}`}
                    className="block text-bold text-xl shadow-md my-3 px-2.5 py-4 text-white border-2 rounded-full sm:px-9 sm:py-5 lg:px-10 lg:py-6"
                  >
                    {g.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
