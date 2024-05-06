import { create } from "zustand";
import axios from "axios";
import { TVShow } from "../types";

type TVShowState = {
  tvShows: TVShow[];
  tvShow: TVShow | null;
  isLoading: boolean;
  fetchTVShows: () => Promise<void>;
  fetchTVShowDetails: (id: number) => Promise<void>;
  fetchTVShowsQuery: (query: string) => Promise<void>;
};

const useTVShowStore = create<TVShowState>((set) => ({
  tvShows: [],
  tvShow: null,
  isLoading: false,
  fetchTVShows: async () => {
    try {
      set({ isLoading: true });
      const response = await axios(
        "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_TOKEN}`,
          },
        }
      );
      set((state) => ({
        ...state,
        tvShows: response.data.results,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error("Error fetching TV shows:", error);
    }
  },
  fetchTVShowsQuery: async (query: string) => {
    try {
      set({ isLoading: true });
      const response = await axios(
        `https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_TOKEN}`,
          },
        }
      );

      set((state) => ({
        ...state,
        tvShows: response.data.results,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error("Error fetching TV shows:", error);
    }
  },
  fetchTVShowDetails: async (id: number) => {
    try {
      set({ isLoading: true });
      const response = await axios(
        `https://api.themoviedb.org/3/tv/${id}?language=en-US&append_to_response=videos`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_TOKEN}`,
          },
        }
      );
      set((state) => ({
        ...state,
        tvShow: response.data,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error("Error fetching tv show details:", error);
    }
  },
}));

export default useTVShowStore;
