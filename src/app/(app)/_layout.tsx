import { Stack, Tabs } from 'expo-router';
import React from 'react';

import { colors } from '@/components/ui';
import { Movie, Settings } from '@/components/ui/icons';

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Movies',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
