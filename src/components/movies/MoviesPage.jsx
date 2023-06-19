import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MoviesList from "./MoviesList";
import MovieDetails from "./MovieDetails";
import GenresList from "./GenresList";

const KEY = process.env.REACT_APP_MOVIE_KEY;
const CONFIG_URL =
  `https://api.themoviedb.org/3/configuration?api_key=${KEY}`;

const MoviesPage = () => {
  const [config, setConfig] = useState({});

  const getConfig = async () => {
    try {
      const res = await fetch(CONFIG_URL);
      const config = await res.json();
      setConfig(config);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <>
      <Routes>
        <Route path="list" element={<MoviesList config={config} />} />
        <Route path="detail/:id" element={<MovieDetails config={config}/>} />
        <Route path="genres/:id" element={<GenresList config={config}/>} />
      </Routes>
    </>
  );
};

export default MoviesPage;
