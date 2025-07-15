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
import { useMapPins } from '@/lib/storage/modules/map-pins';

type FavoritePlace = {
  image: string;
  title: string;
  location: string;
  date: string;
  onEdit: () => void;
  onAction: () => void;
  actionIcon?: React.ReactNode;
};

const FavoritePlaceCard = ({
  image,
  title,
  location,
  date,
  onEdit,
  onAction,
  actionIcon,
}: FavoritePlace) => {
  return (
    <View className="mb-4 overflow-hidden rounded-2xl bg-[#1D262B]">
      <View className="relative">
        <Image source={{ uri: image }} className="h-32 w-full rounded-2xl" />
        <View className="absolute right-3 top-2 flex-row gap-2">
          <TouchableOpacity
            className="rounded-full bg-neutral-700 p-3"
            onPress={onEdit}
          >
            <Edit />
          </TouchableOpacity>
          {onAction && (
            <TouchableOpacity
              className="rounded-full bg-blue p-3"
              onPress={onAction}
            >
              {actionIcon ?? <Check color={colors.white} />}
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
        <Text className="text-sm text-[#4e74ff]">{date}</Text>
      </View>
    </View>
  );
};
const places = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    title: 'Trip to USA, California 27345',
    location: 'Toronto, Canada',
    date: '2025/04/01',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    title: 'Trip to USA, California 27345',
    location: 'Toronto, Canada',
    date: '2025/04/01',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    title: 'Trip to USA, California 27345',
    location: 'Toronto, Canada',
    date: '2025/04/01',
  },
];

export default function FavoritesScreen() {
  const router = useRouter();
  const { selectedTheme } = useSelectedTheme();
  const isDark = selectedTheme === 'dark';
  // eslint-disable-next-line unused-imports/no-unused-vars
  const pins = useMapPins.use.pins;
  const onEdit = (id: string) => {
    router.navigate(`/new-place/${id}`);
  };
  const onAction = (id: string) => {
    console.log(id);
  };
  return (
    <SafeAreaView className="flex-1 bg-dark px-4">
      <View className="flex-row items-center  py-6">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={isDark ? colors.white : colors.black} />
        </TouchableOpacity>
        <Text className="mx-auto font-gilroy-700 text-2xl text-white">
          Favorites
        </Text>
        <View className="w-6" />
      </View>
      <FlashList
        data={places}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-4"
        estimatedItemSize={190}
        renderItem={({ item }) => (
          <FavoritePlaceCard
            onEdit={() => onEdit(item.id)}
            onAction={() => onAction(item.id)}
            image={item.image}
            title={item.title}
            location={item.location}
            date={item.date}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
