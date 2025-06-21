import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import AccountModal from '@/components/balance/account-modal';
import CategoriesModal from '@/components/balance/categories-modal';
import {
  Button,
  FocusAwareStatusBar,
  SafeAreaView,
  useModal,
} from '@/components/ui';
import BalanceCard from '@/components/ui/balance-card/balance-card';
import NewBalanceCard from '@/components/ui/balance-card/new-balance-card';
import CategoriesItem from '@/components/ui/transactions/categories-item';
import NewCategoriesItem from '@/components/ui/transactions/new-categories-item';
import { addAccount, updateAccount, useAccount } from '@/lib/storages/accounts';
import {
  addCategory,
  updateCategory,
  useCategory,
} from '@/lib/storages/categories';
import { type Account, type Category } from '@/types';



export default function Favorite() {

  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView className="mt-4 flex-1 gap-4 px-6">

      </SafeAreaView>
    </>
  );
}
