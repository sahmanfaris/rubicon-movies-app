import { create } from "zustand";
import axios from "axios";
import { Movie } from "../types";

type MovieState = {
  movies: Movie[];
  movie: Movie | null;
  isLoading: boolean;
  fetchMovies: () => Promise<void>;
  fetchMovieDetails: (id: number) => Promise<void>;
  fetchMoviesQuery: (query: string) => Promise<void>;
};

const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  movie: null,
  isLoading: false,
  fetchMovies: async () => {
    try {
      set({ isLoading: true });
      const response = await axios(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_TOKEN}`,
          },
        }
      );
      set((state) => ({
        ...state,
        movies: response.data.results,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error("Error fetching movies:", error);
    }
  },
  fetchMoviesQuery: async (query: string) => {
    try {
      set({ isLoading: true });
      const response = await axios(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_TOKEN}`,
          },
        }
      );
      set((state) => ({
        ...state,
        movies: response.data.results,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error("Error fetching movies:", error);
    }
  },
  fetchMovieDetails: async (id: number) => {
    try {
      set({ isLoading: true });
      const response = await axios(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=videos`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_TOKEN}`,
          },
        }
      );
      set((state) => ({
        ...state,
        movie: response.data,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error("Error fetching movie details:", error);
    }
  },
}));

export default useMovieStore;
