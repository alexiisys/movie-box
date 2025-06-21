/* eslint-disable react/no-unstable-nested-components */
import { SplashScreen, Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useCallback, useEffect } from 'react';

import { colors } from '@/components/ui';
import {
  Balance,
  Dashboard,
  Settings as SettingsIcon,
} from '@/components/ui/icons';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      hideSplash();
    }, 1000);
  }, [hideSplash]);
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: colors.app.iconInactive,
        tabBarActiveTintColor: isDark ? colors.white : colors.black,
        tabBarStyle: {
          backgroundColor: isDark ? colors.app.darkPrimary : colors.app.primary,
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
              color={focused ? colors.app.iconActive : colors.app.iconInactive}
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
              color={focused ? colors.app.iconActive : colors.app.iconInactive}
            />
          ),
          tabBarButtonTestID: 'balance-tab',
        }}
      />
      <Tabs.Screen
        name="spam"
        options={{
          headerShown: false,
          title: 'Spam',
          tabBarIcon: ({ focused }) => (
            <Balance
              color={focused ? colors.app.iconActive : colors.app.iconInactive}
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
              color={focused ? colors.app.iconActive : colors.app.iconInactive}
            />
          ),
          tabBarButtonTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
}
