import { useLocation, useNavigate } from "react-router-dom";
import styles from "./tvShowDetails.module.css";
import { TVShow } from "../../types";

const TVShowDetails = ({ tvShow }: { tvShow: TVShow }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const imageUrl = `https://image.tmdb.org/t/p/original${tvShow.poster_path}`;

  const handleBack = () => {
    navigate("/", {
      state: {
        displayType: location.state.displayType,
        searchQuery: location.state.searchQuery,
      },
    });
  };

  const trailerTVShow = tvShow.videos.results.find((v) => v.type === "Trailer");

  return (
    <>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={handleBack}>
          Back
        </button>
        {trailerTVShow ? (
          <div className={styles.videoContainer}>
            <iframe
              src={`https://www.youtube.com/embed/${trailerTVShow.key}`}
              title="TV Show Trailer"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <img className={styles.poster} src={imageUrl} alt={tvShow.name} />
        )}

        <div className={styles.info}>
          <h2>{tvShow.name}</h2>
          <p>{tvShow.overview}</p>
        </div>
      </div>
    </>
  );
};

export default TVShowDetails;
