import { Linking } from 'react-native';
import type { StoreApi, UseBoundStore } from 'zustand';

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const formatTransaction = (amount: number) => {
  try {
    const formattedAmount = amount
      .toFixed(0) // округляем до целого
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${formattedAmount === '0' ? '' : formattedAmount}`;
  } catch {
    return ``;
  }
};

export function parseCurrencyValue(value: string): number {
  const digitsOnly = value.replace(/[^0-9]/g, '');
  return parseInt(digitsOnly, 10);
}

export function formatDateIntl(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
  }).format(d);
}
