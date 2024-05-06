export type Movie = {
  id: number;
  overview: string;
  poster_path: string;
  vote_average: number;
  title: string;
  release_date: string;
  videos: {
    results: { key: string; type: string }[];
  };
};

export type TVShow = {
  id: number;
  overview: string;
  poster_path: string;
  vote_average: number;
  name: string;
  first_air_date: string;
  videos: {
    results: { key: string; type: string }[];
  };
};
