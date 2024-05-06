import { useLocation, useNavigate } from "react-router-dom";
import styles from "./movieDetails.module.css";
import { Movie } from "../../types";

const MovieDetails = ({ movie }: { movie: Movie }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  const handleBack = () => {
    navigate("/", {
      state: {
        displayType: location.state.displayType,
        searchQuery: location.state.searchQuery,
      },
    });
  };

  const trailerMovie = movie.videos.results.find((v) => v.type === "Trailer");

  return (
    <>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={handleBack}>
          Back
        </button>
        {trailerMovie ? (
          <div className={styles.videoContainer}>
            <iframe
              src={`https://www.youtube.com/embed/${trailerMovie.key}`}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <img className={styles.poster} src={imageUrl} alt={movie.title} />
        )}

        <div className={styles.info}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
