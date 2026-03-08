import { useState } from "react";
import toast from "react-hot-toast";
import { searchMovies } from "../../services/movieService";
import { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";



const App = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false)
  const [movies, setMovies] = useState<Movie[]>([]);
  const handleSubmit = async (query: string) => {
  setMovies([]);
  setIsError(false);
  setIsLoading(true);
  try {
    const results = await searchMovies(query);
  setIsLoading(false);
  if (results.length === 0) {
    toast.error("No movies found for your request.");
    return;
  }
  setMovies(results);
  } catch {
    setIsError(true);
  } finally {
    setIsLoading(false);
  }
};

  return (
  <>
    <SearchBar onSubmit={handleSubmit} />
    <Toaster />
    {selectedMovie && (
  <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />)}
    {isError && <ErrorMessage />}
    {isLoading && <Loader />}
    {movies.length > 0 && (
      <MovieGrid movies={movies} onSelect={(movie) => setSelectedMovie(movie)} />
    )}
  </>
);
};

export default App;