import { useParams } from "react-router-dom";
import useMovieStore from "../stores/movies";
import { useEffect } from "react";
import MovieDetails from "../components/MovieDetails";

const Movie = () => {
  const { id } = useParams();

  const { movie, fetchMovieDetails } = useMovieStore();

  useEffect(() => {
    fetchMovieDetails(Number(id));
  }, [id, fetchMovieDetails]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return <MovieDetails movie={movie} />;
};

export default Movie;
