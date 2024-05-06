import { useCallback, useEffect, useMemo, useState } from "react";
import ColumnDisplay from "../components/ColumnDisplay";
import Tabs from "../components/Tabs";
import useMovieStore from "../stores/movies";
import useTVShowStore from "../stores/tvShows";
import TabContent from "../components/Tabs/TabContent";
import { useLocation } from "react-router-dom";
import { DisplayType } from "../constants";
import { debounce } from "lodash";
import SearchInput from "../components/SearchInput";

const Home = () => {
  const location = useLocation();

  const [displayType, setDisplayType] = useState(DisplayType.TvShows);
  const [searchQuery, setSearchQuery] = useState(
    location.state?.searchQuery || ""
  );

  const {
    movies,
    isLoading: isMoviesLoading,
    fetchMovies,
    fetchMoviesQuery,
  } = useMovieStore();
  const {
    tvShows,
    isLoading: isTVShowsLoading,
    fetchTVShows,
    fetchTVShowsQuery,
  } = useTVShowStore();

  useEffect(() => {
    if (location.state?.displayType !== undefined) {
      setDisplayType(location.state?.displayType);
    }
    if (location.state?.searchQuery !== "") {
      setSearchQuery(location.state?.searchQuery);
    }
  }, [location]);

  const debouncedSearchMemo = useMemo(
    () =>
      debounce((query: string) => {
        if (query.length >= 3) {
          fetchMoviesQuery(query);
          fetchTVShowsQuery(query);
        } else {
          fetchMovies();
          fetchTVShows();
        }
      }, 1000),
    [fetchMoviesQuery, fetchTVShowsQuery, fetchMovies, fetchTVShows]
  );
  const debouncedSearch = useCallback(
    (query: string) => debouncedSearchMemo(query),
    [debouncedSearchMemo]
  );

  useEffect(() => {
    debouncedSearchMemo.cancel();
  }, [debouncedSearchMemo]);

  useEffect(() => {
    if (
      location.state?.searchQuery &&
      location.state?.searchQuery.length >= 3
    ) {
      debouncedSearch(location.state?.searchQuery);
    }
  }, [location, debouncedSearch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  if (isMoviesLoading || isTVShowsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Tabs selectedTabIndex={displayType} setSelectedTabIndex={setDisplayType}>
      <TabContent title={DisplayType.Movies}>
        <SearchInput value={searchQuery} handleSearch={handleSearch} />
        <ColumnDisplay
          data={movies}
          displayType={displayType}
          searchQuery={searchQuery}
        />
      </TabContent>

      <TabContent title={DisplayType.TvShows}>
        <SearchInput value={searchQuery} handleSearch={handleSearch} />

        <ColumnDisplay
          data={tvShows}
          displayType={displayType}
          searchQuery={searchQuery}
        />
      </TabContent>
    </Tabs>
  );
};

export default Home;
