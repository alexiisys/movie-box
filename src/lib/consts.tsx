import { type ColorValue } from 'react-native';

import { Salary } from '@/components/ui/icons';
import {
  DiningOut,
  Groceries,
  NewCategory,
  Subscription,
} from '@/components/ui/icons/categories';

export const CurrencyObject = {
  dollar: '$',
  euro: '€',
  ruble: '₽',
} as const;

export type CurrencyName = keyof typeof CurrencyObject;
export type CurrencySymbol = (typeof CurrencyObject)[CurrencyName];

export type GradientVariantType = 'blue' | 'green' | 'orange';

export const GradientVariants: Record<
  GradientVariantType,
  [ColorValue, ColorValue]
> = {
  blue: ['#1FB0BF', '#4070E9'],
  green: ['#24BF1F', '#BCE940'],
  orange: ['#FCAD5E', '#E95740'],
};

export const IconCategories = (color: string) => ({
  cat_1: () => <Salary color={color} width={20} height={20} />,
  cat_2: () => <Groceries color={color} width={20} height={20} />,
  cat_3: () => <Subscription color={color} width={20} height={20} />,
  cat_4: () => <DiningOut color={color} width={20} height={20} />,
  default: () => <NewCategory color={color} width={20} height={20} />,
});
export const BaseCategoriesID = ['cat_1', 'cat_2', 'cat_3', 'cat_4'];
export type BaseCategoryIDType = 'cat_1' | 'cat_2' | 'cat_3' | 'cat_4';
