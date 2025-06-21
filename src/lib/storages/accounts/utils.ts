import { getItem, setItem } from '@/lib/storage';
import { type Account } from '@/types';

const store = 'accounts';

export const getAccounts = () => getItem<Account[]>(store);
export const writeAccounts = (value: Account[]) =>
  setItem<Account[]>(store, value);
