import { Env } from '@env';
import { type Href, Link } from 'expo-router';
import React from 'react';
import { Linking, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Text } from '@/components/ui';

export default function Settings() {
  return (
    <>
      <SafeAreaView className=" mt-4 flex-1 px-6">
        <View className="relative flex-1 gap-10">
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
