import { Link } from "react-router-dom";
import styles from "./card.module.css";

const Card = ({
  id,
  isMovie,
  image,
  title,
  displayType,
  searchQuery,
}: {
  id: number;
  isMovie: boolean;
  image: string;
  title: string;
  displayType: string;
  searchQuery: string;
}) => {
  const isMovieLink = isMovie ? "movie" : "tvshow";

  return (
    <div className={styles.card}>
      <Link to={`/${isMovieLink}/${id}`} state={{ displayType, searchQuery }}>
        <img
          className={styles.image}
          src={`https://image.tmdb.org/t/p/original${image}`}
          alt={title}
        />
        <h3 className={styles.title}>{title}</h3>
      </Link>
    </div>
  );
};

export default Card;
