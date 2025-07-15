import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ArrowLeft,
  Check,
  colors,
  Edit,
  Globe,
  Image,
  Text,
} from '@/components/ui';
import { useSelectedTheme } from '@/lib';
import { updatePin, useMapPins } from '@/lib/storage/modules/map-pins';

type FavoritePlace = {
  image: string;
  title: string;
  active: boolean;
  location: string;
  onEdit: () => void;
  onAction: () => void;
  actionIcon?: React.ReactNode;
};

const FavoritePlaceCard = ({
  image,
  title,
  location,
  onEdit,
  active,
  onAction,
  actionIcon,
}: FavoritePlace) => {
  console.log(active);
  const { selectedTheme } = useSelectedTheme();
  const isDark = selectedTheme === 'dark';
  return (
    <View className="mb-4 overflow-hidden rounded-2xl bg-greyText dark:bg-[#1D262B]">
      <View className="relative">
        <Image source={{ uri: image }} className="h-32 w-full rounded-2xl" />
        <View className="absolute right-3 top-2 flex-row gap-2">
          <TouchableOpacity
            className="rounded-full bg-light p-3 dark:bg-neutral-700"
            onPress={onEdit}
          >
            <Edit color={isDark ? colors.white : colors.dark} />
          </TouchableOpacity>
          {onAction && (
            <TouchableOpacity
              className={`rounded-full ${!active ? 'bg-light' : 'bg-blue'} p-3`}
              onPress={onAction}
            >
              {actionIcon ?? (
                <Check color={!active ? colors.dark : colors.white} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View className="px-3 py-2.5">
        <Text className="mb-1 text-base font-bold text-white" numberOfLines={2}>
          {title}
        </Text>
        <View className="mb-1 flex-row items-center">
          <Globe color={colors.white} />
          <Text className="ml-1 text-sm text-zinc-300">{location}</Text>
        </View>
      </View>
    </View>
  );
};

export default function FavoritesScreen() {
  const router = useRouter();
  const { selectedTheme } = useSelectedTheme();
  const isDark = selectedTheme === 'dark';

  const pins = useMapPins.use.pins();
  const onEdit = (id: string) => {
    router.navigate(`/new-place/${id}`);
  };
  const onAction = (id: string) => {
    const pin = pins.find((item) => item.id === id)!;
    updatePin({ ...pin, activate: !pin.activate });
  };
  return (
    <SafeAreaView className="darK:bg-dark flex-1 px-4">
      <View className="flex-row items-center  py-6">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={isDark ? colors.white : colors.black} />
        </TouchableOpacity>
        <Text className="mx-auto font-gilroy-700 text-2xl dark:text-white">
          Favorites
        </Text>
        <View className="w-6" />
      </View>
      <FlashList
        data={pins}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-4"
        estimatedItemSize={190}
        renderItem={({ item }) => (
          <FavoritePlaceCard
            onEdit={() => onEdit(item.id)}
            onAction={() => onAction(item.id)}
            image={item.image}
            active={item.activate}
            title={item.name}
            location={item.location}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
