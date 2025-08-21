import { Env } from '@env';
import { type Href, Link, useRouter } from 'expo-router';
import React from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Switch, Text } from '@/components/ui';
import { ArrowLeft } from '@/components/ui/icons';
import { useSelectedTheme } from '@/lib';

export default function Settings() {
  const router = useRouter();
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const isDark = selectedTheme === 'dark';
  const switchTheme = () => setSelectedTheme(isDark ? 'light' : 'dark');
  return (
    <>
      <SafeAreaView className=" mt-4 flex-1 px-6">
        <View className="relative flex-1 gap-10">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft />
            </TouchableOpacity>
            <Text className="text-2xl">Settings</Text>
          </View>
          <Switch
            checked={isDark}
            onChange={switchTheme}
            label={isDark ? 'Dark theme' : 'Light theme'}
            accessibilityLabel={'theme_switch'}
          />{' '}
          <View
            className="absolute right-0 w-full gap-4"
            style={{ bottom: 12 }}
          >
            <Link href={Env.PRIVACY_POLICY as Href} className="underline">
              Privacy Policy
            </Link>
            <Text className="text-center ">Have a problem?</Text>
            <Button
              label={'Contact us'}
              onPress={() => Linking.canOpenURL(Env.FEEDBACK_FORM)}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
