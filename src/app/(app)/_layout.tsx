/* eslint-disable react/no-unstable-nested-components */
import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
          title: 'Settings',
        }}
      />
    </Stack>
  );
}
