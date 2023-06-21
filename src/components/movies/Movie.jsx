import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSadTear } from "react-icons/fa";

const Movie = ({ item, config }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <div className="movie-div">
      <Link to={`/Films/Catalog/Details/${item.id}`}>
        {config?.images?.base_url && (
          <div className="movie-poster object-none">
            {imageLoaded ? (
              <img
                className="movie-poster"
                src={config?.images?.base_url + "w500" + item.poster_path}
                alt={item.title + " poster"}
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
      </Link>
    </div>
  );
};

export default Movie;
