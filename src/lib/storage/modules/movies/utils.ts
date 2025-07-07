import { type Movie } from '@/types/movie';

import { getItem, setItem } from '../../helpers';

const store = 'movies';

export const getMovies = () => getItem<Movie[]>(store);
export const writeMovies = (value: Movie[]) => setItem<Movie[]>(store, value);
