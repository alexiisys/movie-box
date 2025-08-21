import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Checkbox, colors, Image, Input, Text, View } from '@/components/ui';
import { Search, Settings, TrashCan } from '@/components/ui/icons';
import { Clapperboard } from '@/components/ui/icons/clapperboard';
import { CustomeIcon } from '@/components/ui/icons/custome-icon';
import { deleteMovie, useMovie } from '@/lib/storage';
import { type Movie } from '@/types';

const SView = View;
const SText = Text;
const SPressable = TouchableOpacity;

type Obj = Record<string, any>;

function shuffleArray(arr: Obj[]): Obj[] {
  const newArr = [...arr]; // чтобы не мутировать исходный массив
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr.slice(0, 5);
}

function extractUniqueStrings<T extends Obj>(
  arr: T[],
  field: keyof T
): string[] {
  const allStrings = arr.flatMap((obj) => obj[field] as string[]);
  return Array.from(new Set(allStrings));
}
export default function MoviesScreen() {
  const [chosen, setChosen] = React.useState<string[]>([]);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const library = useMovie.use.movies();

  const filtredLibrary = useMemo(
    () =>
      category === 'All'
        ? library
        : library.filter((item) => item.genres.includes(category)),
    [category, library]
  );

  const searchResults = useMemo(() => {
    if (!query.trim()) return [] as Movie[];
    const q = query.toLowerCase();
    // unique by id
    const byId = new Map<string, Movie>();
    filtredLibrary.forEach((m) => {
      if (!byId.has(m.id)) byId.set(m.id, m);
    });
    return Array.from(byId.values()).filter((m) =>
      m.title.toLowerCase().includes(q)
    );
  }, [filtredLibrary, query]);

  const router = useRouter();
  const isSearching = query.trim().length > 0;
  const inset = useSafeAreaInsets();
  const shuffled = useMemo(
    () => shuffleArray(filtredLibrary),
    [filtredLibrary]
  );
  const Header = (
    <SView
      className="bg-color1 px-5 pb-3"
      style={{
        paddingTop: inset.top + 12,
      }}
    >
      <SView className="mb-12 flex-row items-center justify-end">
        <SView className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => router.navigate(`/(app)/settings`)}
            className="size-7 items-center justify-center rounded-full "
          >
            <Settings color={colors.black} />
          </TouchableOpacity>
          <SPressable className="rounded-xl bg-green px-4 py-2">
            <TouchableOpacity
              onPress={() => router.navigate(`/movie-editor/new`)}
              className="flex-row items-center gap-2"
            >
              <Clapperboard />
              <SText className="text-md">Add a movie</SText>
            </TouchableOpacity>
          </SPressable>
        </SView>
      </SView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="-mx-5 px-5"
      >
        {['All', ...extractUniqueStrings(library, 'genres')].map((t) => (
          <TouchableOpacity
            onPress={() => setCategory(t)}
            key={t}
            className="mr-6 border-b-2 pb-2"
            style={{
              borderBottomColor: t === category ? '#000' : 'transparent',
            }}
          >
            <SText
              className={`text-[18px] ${t === category ? 'font-extrabold' : 'font-semibold'} text-black capitalize`}
            >
              {t}
            </SText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Search */}
      <SView className="mt-4">
        <Input
          icon={<Search />}
          placeholder={'Search'}
          outlined
          value={query}
          onChangeText={setQuery}
        />
      </SView>
    </SView>
  );

  const RecommendSection = (
    <SView className="mt-6 px-5">
      <SText className="mb-4 text-[28px]">Recommend you</SText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {shuffled.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.navigate(`/movie-info-profile/${item.id}`)}
            className="mr-4 w-[95px]"
          >
            <SView className="h-[140px] w-[95px] overflow-hidden rounded-2xl bg-black/10">
              <Image
                source={{ uri: item.image }}
                style={{ width: '100%', height: '100%' }}
              />
            </SView>
            <SText className="mt-2" numberOfLines={1}>
              {item.title}
            </SText>
            <SText className="text-black/50">{item.genres?.[0]}</SText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SView>
  );

  const MyMoviesHeader = (
    <SView className="mb-3 mt-8 flex-row items-center justify-between">
      <SView className="flex-row items-center gap-3">
        <SView className="size-10 items-center justify-center rounded-2xl bg-black/10">
          <CustomeIcon />
        </SView>
        <SText className="text-[28px]">My movies</SText>
      </SView>

      <SView className="flex-row items-center gap-3">
        <SPressable className="opacity-80">
          <SText className="font-semibold">Select all</SText>
        </SPressable>

        <Checkbox
          onChange={() =>
            setChosen(chosen.length > 0 ? [] : filtredLibrary.map((item) => item.id))
          }
          accessibilityLabel={'Choose'}
          checked={chosen.length > 0}
        />
      </SView>
    </SView>
  );

  const MovieRow = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      onPress={() => router.navigate(`/movie-info-profile/${item.id}`)}
      className=""
    >
      <SView className="mb-6 flex-row items-start">
        <SView className="mr-4 w-[88px]">
          <SView className="h-[116px] w-[88px] overflow-hidden rounded-2xl bg-black/10">
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: '100%' }}
            />
          </SView>
          {!!item.rating && (
            <SView className="mt-2 flex-1 flex-row items-center justify-center gap-1 rounded-xl border border-black/10 bg-white px-2 py-1">
              <SText>★</SText>
              <SText className="font-semibold">{item.rating}</SText>
            </SView>
          )}
        </SView>

        <SView className="flex-1">
          <SText className="text-[24px]" numberOfLines={2}>
            {item.title}
          </SText>
          <SText className="mt-1 text-black/40">
            {[item.runtime, item.release_year, item.countries?.[0]]
              .filter(Boolean)
              .join(', ')}
          </SText>
          <SText className="mt-2 text-black/70">#{item.genres?.[0]}</SText>
          <SText className="mt-2 text-black/60" numberOfLines={2}>
            {item.description}
          </SText>
        </SView>

        <SView className="ml-3 mt-2">
          <Checkbox
            onChange={() => {
              setChosen((state) =>
                state.includes(item.id)
                  ? state.filter((id) => id !== item.id)
                  : [...state, item.id]
              );
            }}
            accessibilityLabel={''}
            checked={chosen.includes(item.id)}
          />
        </SView>
      </SView>
    </TouchableOpacity>
  );

  const MyMoviesSection = (
    <SView className="flex-1 px-5">
      {MyMoviesHeader}
      <FlashList
        className='flex-1'
        data={filtredLibrary}
        extraData={[chosen]}
        estimatedItemSize={160}
        keyExtractor={(m) => m.id}
        renderItem={MovieRow}
        scrollEnabled={false}
      />
    </SView>
  );

  const SearchResults = (
    <SView className="mt-6 px-5">
      <SText className="mb-4 text-[28px] font-extrabold">Search results</SText>
      <FlashList
        data={searchResults}
        keyExtractor={(m) => m.id}
        extraData={[chosen]}
        estimatedItemSize={160}
        renderItem={MovieRow}
        scrollEnabled={false}
      />
    </SView>
  );

  const BottomDeleteBar =
    chosen.length > 0 ? (
      <SView className="absolute inset-x-4 bottom-4 flex-1 rounded-3xl bg-black px-6 py-4">
        <SPressable
          onPress={() => chosen.map((id) => deleteMovie(id))}
          className="flex-row items-center gap-3"
        >
          <SText className="text-[18px] text-white">
            <TrashCan />
          </SText>
          <SText className="text-[18px] font-semibold text-white">Delete</SText>
        </SPressable>
      </SView>
    ) : null;

  return (
    <View className="flex-1">
      <ScrollView>
      {Header}

      {isSearching ? (
        SearchResults
      ) : (
        <>
          {RecommendSection}
          {MyMoviesSection}
        </>
      )}

      {BottomDeleteBar}
      </ScrollView>
    </View>
  );
}
