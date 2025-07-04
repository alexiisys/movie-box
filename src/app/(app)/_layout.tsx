import { Tabs } from 'expo-router';
import React from 'react';

import { colors } from '@/components/ui';
import { Movie, Settings } from '@/components/ui/icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Movies',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Movie color={focused ? colors.blue : colors.textGrey} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Settings color={focused ? colors.blue : colors.textGrey} />
          ),
        }}
      />
    </Tabs>
  );
}
