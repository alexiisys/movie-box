/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, FocusAwareStatusBar, Text } from '@/components/ui';
import { useSelectedTheme } from '@/lib';
import { useSetting } from '@/lib/storages/settings';

export default function Settings() {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const isDark = selectedTheme === 'dark';
  const switchTheme = () => setSelectedTheme(isDark ? 'light' : 'dark');
  const { currency } = useSetting.use.settings();

  return (
    <>
      <FocusAwareStatusBar />

      <SafeAreaView className=" mt-4 flex-1 px-6">
        <View className="relative flex-1 gap-10">
          <Text className="text-app-shadowBorder underline">
            Privacy Policy
          </Text>
          <View
            className="absolute right-0 w-full gap-4"
            style={{ bottom: 12 }}
          >
            <Text className="text-center ">Have a problem?</Text>
            <Button label={'Contact us'} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
