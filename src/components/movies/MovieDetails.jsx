import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaSpinner, FaSadTear } from "react-icons/fa";

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
  const [imageLoaded, setImageLoaded] = useState(false);

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

  useEffect(() => {
    if (movie.poster_path) {
      const image = new Image();
      image.onload = () => {
        setImageLoaded(true);
      };
      image.onerror = () => {
        setImageLoaded(false);
      };
      image.src = config?.images?.base_url + "w500" + movie.poster_path;
    }
  }, [movie.poster_path, config]);

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

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <>
      {loading ? (
        <div className="spinner-div">
          <FaSpinner className="spinner" />
        </div>
      ) : (
        <div className="movie-details">
          {config?.images?.base_url && (
            <div className="movie-details-div-poster">
              {imageLoaded ? (
                <img
                  className="movie-details-poster"
                  src={config?.images.base_url + "w500" + movie.poster_path}
                  alt={movie.title + " poster"}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              ) : (
                <div className="sad-face-div">
                  <FaSadTear className="sad-face" />
                </div>
              )}
            </div>
          )}
          <div className="movie-details-info">
            <h1 className="movie-details-header">{movie.title}</h1>
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
                  {movie?.status === "Released" ? (
                    <span>It was released on </span>
                  ) : (
                    <span>It will be released on </span>
                  )}
                  {formatReleaseDate(movie.release_date)}.{" "}
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
            <div className="movie-details-genres-div">
              {movie?.genres &&
                movie.genres.map((g) => (
                  <Link
                    key={g.id}
                    to={`/Films/Genres/${g.id}`}
                    className="movie-details-genres"
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
