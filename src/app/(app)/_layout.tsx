/* eslint-disable react/no-unstable-nested-components */
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';

import { colors } from '@/components/ui';
import {
  Balance,
  Dashboard,
  Settings as SettingsIcon,
} from '@/components/ui/icons';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: colors.iconInactive,
        tabBarActiveTintColor: isDark ? colors.white : colors.black,
        tabBarStyle: {
          backgroundColor: isDark ? colors.darkPrimary : colors.primary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Dashboard
              color={focused ? colors.iconActive : colors.iconInactive}
            />
          ),
          tabBarButtonTestID: 'feed-tab',
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          headerShown: false,
          title: 'Favorite',
          tabBarIcon: ({ focused }) => (
            <Balance
              color={focused ? colors.iconActive : colors.iconInactive}
            />
          ),
          tabBarButtonTestID: 'balance-tab',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <SettingsIcon
              color={focused ? colors.iconActive : colors.iconInactive}
            />
          ),
          tabBarButtonTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
}
