import { create } from 'zustand';

import { createSelectors } from '@/lib';
import { type CurrencyName } from '@/lib/consts';
import { getSettings, writeSettings } from '@/lib/storages/settings/utils';
import { type Settings } from '@/types/settings';

interface AccountState {
  settings: Settings;
  updateCurrency: (currency: CurrencyName) => void;
  readSettings: () => void;
}

const _useSetting = create<AccountState>((set, get) => ({
  settings: {
    currency: 'dollar',
  },
  readSettings: () => {
    set((state) => ({ settings: getSettings() || state.settings }));
  },
  updateCurrency: (currency: CurrencyName) => {
    set(() => ({ settings: { currency } }));
    writeSettings(get().settings);
  },
}));

export const useSetting = createSelectors(_useSetting);
export const updateCurrency = (currency: CurrencyName) =>
  _useSetting.getState().updateCurrency(currency);
export const readSettings = () => _useSetting.getState().readSettings();
