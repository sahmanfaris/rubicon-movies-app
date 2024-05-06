import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useTVShowStore from "../stores/tvShows";
import TVShowDetails from "../components/TVShowDetails";

const TVShow = () => {
  const { id } = useParams();

  const { tvShow, fetchTVShowDetails } = useTVShowStore();

  useEffect(() => {
    fetchTVShowDetails(Number(id));
  }, [id, fetchTVShowDetails]);

  if (!tvShow) {
    return <div>Loading...</div>;
  }

  return <TVShowDetails tvShow={tvShow} />;
};

export default TVShow;
