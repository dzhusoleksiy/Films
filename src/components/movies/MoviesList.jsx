import {useState, useEffect} from "react";
import Movie from "./Movie";

const API_URL = "https://api.themoviedb.org/3/discover/movie?api_key=65e043c24785898be00b4abc12fcdaae&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
const CONFIG_URL = "https://api.themoviedb.org/3/configuration?api_key=65e043c24785898be00b4abc12fcdaae";

const MoviesList = () => {
    const [movies, setMovies] = useState({});
    const [config, setConfig] = useState({});

    const getConfig = async () => {
        try {
            const res = await fetch(CONFIG_URL);
            const config = await res.json();
            setConfig(config);
            console.log("Config: ", config)
        } catch (err) { 
            console.log(err)
        }
    }

    const getMovies = async () => {
        try {
            const res = await fetch(API_URL);
            const movies = await res.json();
            setMovies(movies);
            console.log(movies);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMovies();
        getConfig();
    }, [])

  return (
    <div className="grid grid-cols-4 gap-4">
        {movies?.results && movies.results.map(m => <Movie key={m.id} item={m} config={config}/>)}
    </div>
  )
}

export default MoviesList