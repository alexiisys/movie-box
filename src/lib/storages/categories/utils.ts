import { getItem, setItem } from '@/lib/storage';
import { type Category } from '@/types';

const store = 'categories';

export const getCategory = () => getItem<Category[]>(store);
export const writeCategory = (value: Category[]) =>
  setItem<Category[]>(store, value);
