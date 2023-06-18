import MoviesList from "./components/movies/MoviesList";

function App() {
  return (
    <div className="container mx-auto min-h-screen">
      <h1 className="text-3xl text-red-800 text-center">Movies</h1>
      <MoviesList/>
    </div>
  );
}

export default App;
