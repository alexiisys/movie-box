import { create } from 'zustand';

import { createSelectors } from '@/lib';
import { getAccounts, writeAccounts } from '@/lib/storages/accounts/utils';
import { deleteTransactionByAccount } from '@/lib/storages/transactions';
import { type Account } from '@/types';

interface AccountState {
  accounts: Account[];
  readAccounts: () => void;
  addAccount: (account: Account) => void;
  deleteAccount: (id: string) => void;
  updateAccount: (account: Account) => void;
}

const _useAccount = create<AccountState>((set, get) => ({
  accounts: [],
  readAccounts: () => {
    set((state) => ({ accounts: getAccounts() || state.accounts }));
  },
  addAccount: (account: Account) => {
    set((state) => ({ accounts: [...state.accounts, account] }));
    writeAccounts(get().accounts);
  },
  deleteAccount: (id: string) => {
    set((state) => ({
      accounts: state.accounts.filter((item) => item.id !== id),
    }));
    writeAccounts(get().accounts);
    deleteTransactionByAccount(id);
  },
  updateAccount: (account: Account) => {
    set((state) => ({
      accounts: state.accounts.map((item) =>
        item.id === account.id ? account : item
      ),
    }));
    writeAccounts(get().accounts);
  },
}));

export const useAccount = createSelectors(_useAccount);

export const readAccounts = _useAccount.getState().readAccounts;
export const addAccount = (account: Account) =>
  _useAccount.getState().addAccount(account);
export const deleteAccount = _useAccount.getState().deleteAccount;
export const updateAccount = _useAccount.getState().updateAccount;
