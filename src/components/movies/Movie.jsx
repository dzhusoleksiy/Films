import { Link } from "react-router-dom";

const Movie = ({ item, config }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden bg-indianRed lg:hover:shadow-xl">
      <Link to={`/movies/detail/${item.id}`}>
        {config?.images?.base_url && (
          <div>
            <img
              className="w-full max-w-full shadow-md"
              src={config.images.base_url + "w500" + item.poster_path}
              alt={item.title + " poster"}
            />
          </div>
        )}
      </Link>
    </div>
  );
};

export default Movie;
