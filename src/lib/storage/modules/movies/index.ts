import { create } from 'zustand';

import { createSelectors } from '@/lib/utils';
import { type Movie } from '@/types/movie';

import { getMovies, writeMovies } from './utils';

interface MovieState {
  movies: Movie[];
  readMovies: () => void;
  addMovie: (movie: Movie) => void;
  deleteMovie: (id: string) => void;
  updateMovie: (movie: Movie) => void;
}

const _useMovie = create<MovieState>((set, get) => ({
  movies: [],

  readMovies: () => {
    set((state) => ({
      movies: getMovies() ?? state.movies,
    }));
  },

  addMovie: (movie: Movie) => {
    set((state) => ({
      movies: [...state.movies, movie],
    }));
    writeMovies(get().movies);
  },

  deleteMovie: (id: string) => {
    set((state) => ({
      movies: state.movies.filter((movie) => movie.id !== id),
    }));
    writeMovies(get().movies);
  },

  updateMovie: (movie: Movie) => {
    set((state) => ({
      movies: state.movies.map((m) => (m.id === movie.id ? movie : m)),
    }));
    writeMovies(get().movies);
  },
}));

export const useMovie = createSelectors(_useMovie);

export const readMovies = _useMovie.getState().readMovies;

export const addMovie = (movie: Movie) => _useMovie.getState().addMovie(movie);

export const deleteMovie = _useMovie.getState().deleteMovie;

export const updateMovie = (movie: Movie) =>
  _useMovie.getState().updateMovie(movie);
