import { create } from 'zustand';

import { createSelectors } from '@/lib';
import { getCategory, writeCategory } from '@/lib/storages/categories/utils';
import { deleteTransactionByCategory } from '@/lib/storages/transactions';
import { type Category } from '@/types';

interface CategoryState {
  categories: Category[];
  addCategory: (category: Category) => void;
  readCategories: () => void;
  deleteCategory: (id: string) => void;
  updateCategory: (category: Category) => void;
}

const BASE_CATEGORIES: Category[] = [
  { id: 'cat_1', isBase: true, name: 'Salary' },
  { id: 'cat_2', isBase: true, name: 'Groceries' },
  { id: 'cat_3', isBase: true, name: 'Subscription' },
  { id: 'cat_4', isBase: true, name: 'Dining out' },
];

const _useCategory = create<CategoryState>((set, get) => ({
  categories: BASE_CATEGORIES,
  readCategories: () => {
    set((state) => ({ categories: getCategory() || state.categories }));
  },
  addCategory: (category: Category) => {
    set((state) => ({ categories: [...state.categories, category] }));
    writeCategory(get().categories);
  },
  deleteCategory: (id: string) => {
    set((state) => ({
      categories: state.categories.filter((item) => item.id !== id),
    }));
    writeCategory(get().categories);
    deleteTransactionByCategory(id);
  },
  updateCategory: (categories: Category) => {
    set((state) => ({
      categories: state.categories.map((item) =>
        item.id === categories.id ? categories : item
      ),
    }));
    writeCategory(get().categories);
  },
}));

export const useCategory = createSelectors(_useCategory);

export const readCategories = _useCategory.getState().readCategories;
export const addCategory = _useCategory.getState().addCategory;
export const deleteCategory = _useCategory.getState().deleteCategory;
export const updateCategory = _useCategory.getState().updateCategory;
