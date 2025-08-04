import * as React from 'react';

import { FocusAwareStatusBar, SafeAreaView, Text } from '@/components/ui';

export default function Favorite() {
  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView className="mt-4 flex-1 gap-4 px-6">
        <Text>Favorite</Text>
      </SafeAreaView>
    </>
  );
}
