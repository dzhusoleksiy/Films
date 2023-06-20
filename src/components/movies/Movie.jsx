import { Link } from "react-router-dom";

const Movie = ({ item, config }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden bg-indianRed">
      <Link to={`/movies/detail/${item.id}`}>
        {config?.images?.base_url && (
          <div>
            <img
              className="w-full max-w-full shadow-slate-600"
              src={config.images.base_url + "w500" + item.poster_path}
              alt={item.title + " poster"}
            />
          </div>
        )}
        <h2 className="text-2xl px-2 py-2 text-center text-white">
          {item.title}
        </h2>
      </Link>
    </div>
  );
};

export default Movie;
