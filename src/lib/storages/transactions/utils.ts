import { getItem, setItem } from '@/lib/storage';
import { type Transaction } from '@/types';

const store = 'transactions';

export const getTransactions = () => getItem<Transaction[]>(store);
export const writeTransactions = (value: Transaction[]) =>
  setItem<Transaction[]>(store, value);
