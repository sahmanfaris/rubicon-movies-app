import { DisplayType } from "../../constants";
import { Movie, TVShow } from "../../types";
import Card from "../Card";
import styles from "./columnDisplay.module.css";

type Props = {
  data: Movie[] | TVShow[];
  displayType: string;
  searchQuery: string;
};

export const ColumnDisplay = (props: Props) => {
  const { data, displayType, searchQuery } = props;

  const isMovie = displayType === DisplayType.Movies;

  return (
    <div className={styles.cardContainer}>
      {data.map((item) => (
        <Card
          searchQuery={searchQuery}
          displayType={displayType}
          key={item.id}
          id={item.id}
          isMovie={isMovie}
          title={isMovie ? (item as Movie).title : (item as TVShow).name}
          image={item.poster_path}
        />
      ))}
    </div>
  );
};

export default ColumnDisplay;
