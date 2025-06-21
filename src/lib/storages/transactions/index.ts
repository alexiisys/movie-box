import { create } from 'zustand';

import { createSelectors } from '@/lib';
import {
  getTransactions,
  writeTransactions,
} from '@/lib/storages/transactions/utils';
import { type Transaction } from '@/types';

interface TransactionState {
  transactions: Transaction[];
  readTransactions: () => void;
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  deleteTransactionByAccount: (id_account: string) => void;
  deleteTransactionByCategory: (id_category: string) => void;
  updateTransaction: (tx: Transaction) => void;
}

const _useTransaction = create<TransactionState>((set, get) => ({
  transactions: [],

  readTransactions: () => {
    set((state) => ({
      transactions: getTransactions() ?? state.transactions,
    }));
  },

  addTransaction: (tx: Transaction) => {
    set((state) => ({
      transactions: [...state.transactions, tx],
    }));
    writeTransactions(get().transactions);
  },

  deleteTransaction: (id: string) => {
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    }));
    writeTransactions(get().transactions);
  },
  deleteTransactionByAccount: (id_account: string) => {
    set((state) => ({
      transactions: state.transactions.filter(
        (t) => t.id_account !== id_account
      ),
    }));
    writeTransactions(get().transactions);
  },
  deleteTransactionByCategory: (id_category: string) => {
    set((state) => ({
      transactions: state.transactions.filter(
        (t) => t.id_category !== id_category
      ),
    }));
    writeTransactions(get().transactions);
  },
  updateTransaction: (tx: Transaction) => {
    set((state) => ({
      transactions: state.transactions.map((t) => (t.id === tx.id ? tx : t)),
    }));
    writeTransactions(get().transactions);
  },
}));

export const useTransaction = createSelectors(_useTransaction);

export const readTransactions = _useTransaction.getState().readTransactions;
export const addTransaction = (tx: Transaction) =>
  _useTransaction.getState().addTransaction(tx);
export const deleteTransaction = _useTransaction.getState().deleteTransaction;
export const deleteTransactionByAccount =
  _useTransaction.getState().deleteTransactionByAccount;
export const deleteTransactionByCategory =
  _useTransaction.getState().deleteTransactionByCategory;
export const updateTransaction = (tx: Transaction) =>
  _useTransaction.getState().updateTransaction(tx);
