import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, Image, Input, Text, View } from '@/components/ui';
import { Search, Settings } from '@/components/ui/icons';
import { Clapperboard } from '@/components/ui/icons/clapperboard';

const SView = View;
const SText = Text;
const SInput = Input;
const SPressable = TouchableOpacity;

export type Movie = {
  id: string;
  title: string;
  year?: string;
  duration?: string; // e.g. "1h 47m"
  country?: string; // e.g. "Australia"
  genre: string; // one tag (for UI brevity)
  poster: string; // image uri
  rating?: number; // 0..5
};

const RECOMMENDED: Movie[] = [
  {
    id: 'madmax',
    title: 'Mad Max: Fury Road',
    genre: 'Action',
    poster: 'https://m.media-amazon.com/images/M/MV5BZWIzOTk5Yjgt.jpg',
  },
  {
    id: 'shrek',
    title: 'Shrek',
    genre: 'Cartoon',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTk5NzY4NzYxOV5BMl5BanBnXkFtZTYwMTY3NzY3._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 'dune2',
    title: 'Dune 2',
    genre: 'Fantasy',
    poster: 'https://m.media-amazon.com/images/M/MV5BM2U1ZDk0ZWIt.jpg',
  },
  {
    id: 'horton',
    title: 'Horton',
    genre: 'Cartoon',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTk1MDQ3NTE2Ml5BMl5BanBnXkFtZTcwMzI2Mjc1MQ@@._V1_.jpg',
  },
];

const INITIAL_LIBRARY: Movie[] = [
  {
    id: 'peanut-butter-falcon',
    title: 'Peanut butter falcon',
    duration: '1h 47m',
    year: '2015',
    country: 'Australia',
    genre: 'Adventure',
    poster: 'https://m.media-amazon.com/images/M/MV5BZmQxN2NiZmMt.jpg',
    rating: 4.5,
  },
  {
    id: 'vikings',
    title: 'Vikings',
    duration: '160h',
    year: '2011-2018',
    country: 'Australia',
    genre: 'Action',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjI1NzEwODQ5M15BMl5BanBnXkFtZTgwNjE5MzA1NjM@._V1_.jpg',
    rating: 4.8,
  },
];

// ————————————————————————————————————————————
// Small UI helpers
// ————————————————————————————————————————————
const Checkbox = ({
  checked,
  onPress,
}: {
  checked: boolean;
  onPress?: () => void;
}) => (
  <SPressable
    onPress={onPress}
    className={`size-6 rounded-lg border ${checked ? 'bg-black' : 'bg-white'} items-center justify-center border-black/30`}
  >
    {checked ? <SText className="text-[14px] text-white">✓</SText> : null}
  </SPressable>
);

const Badge = ({ label }: { label: string }) => (
  <SView className="rounded-lg bg-lime-400 px-2 py-1">
    <SText className="font-semibold text-black">{label}</SText>
  </SView>
);

// export default function Contacts() {
//   const insets = useSafeAreaInsets();
//   const router = useRouter();
//   const movies = useMovie.use.movies();
//
//   const [chosen, setChosen] = React.useState<string[]>([]);
//   const renderItem = React.useCallback(
//     ({ item }: { item: Movie }) => {
//       return (
//         <Pressable
//           onPress={() => router.navigate(`/movie-info-profile/${item.id}`)}
//           className="flex-1 flex-row overflow-hidden rounded-xl bg-white"
//           key={item.id}
//         >
//           <View className="relative w-24 flex-row">
//             <Image
//               className="flex-1 overflow-hidden "
//               contentFit="cover"
//               source={{
//                 uri: item.image,
//               }}
//             />
//             <Checkbox
//               onChange={() =>
//                 setChosen(
//                   chosen.includes(item.id)
//                     ? chosen.filter((id) => id !== item.id)
//                     : [...chosen, item.id]
//                 )
//               }
//               accessibilityLabel={''}
//               checked={chosen.includes(item.id)}
//               className={'absolute left-1 top-1'}
//             />
//             <View className="absolute bottom-4 left-0 flex-row items-center gap-1 rounded-r-sm bg-white px-1">
//               <Star />
//               <Text className="text-sm font-bold">{item.rating},0</Text>
//             </View>
//           </View>
//           <View className="p-3">
//             <Text className="text-base  font-bold">{item.title}</Text>
//             <View className="flex-row gap-5">
//               <Text className="text-textGrey">{item.release_year}</Text>
//               <Text className="text-textGrey">{item.runtime}</Text>
//             </View>
//             <Text className="mt-1 font-bold">Geners:</Text>
//             <View className="mt-1 flex-row gap-2">
//               {item.genres.slice(0, 2).map((genre) => (
//                 <Text
//                   key={genre}
//                   className="rounded-sm bg-light px-3 py-px text-textGrey"
//                 >
//                   {MovieGenres[genre as keyof typeof MovieGenres]}
//                 </Text>
//               ))}
//               {item.genres.length - 2 >= 1 && (
//                 <Text className="rounded-sm bg-light px-3 py-px text-textGrey">
//                   +{item.genres.length - 2}
//                 </Text>
//               )}
//             </View>
//             <View className="w-[85%] pt-2">
//               <Text
//                 numberOfLines={1}
//                 lineBreakMode={'tail'}
//                 className="text-textGrey"
//               >
//                 {item.description}
//               </Text>
//             </View>
//           </View>
//         </Pressable>
//       );
//     },
//     [chosen, router]
//   );
//   const [searchIsVisible, setSearchIsVisible] = React.useState<boolean>(false);
//   const searchRef = React.useRef<NTextInput>(null);
//   useEffect(() => {
//     setTimeout(() => searchRef?.current?.focus(), 100);
//   }, [searchIsVisible]);
//   const [searchValue, setSearchValue] = React.useState<string>('');
//
//   // Track search events for Facebook attribution
//   const searchTimeoutRef = React.useRef<NodeJS.Timeout>();
//   const trackSearchEvent = React.useCallback((searchTerm: string) => {
//     // Clear previous timeout
//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }
//
//     // Track search after 500ms delay (debounced)
//     if (searchTerm.length > 2) {
//       searchTimeoutRef.current = setTimeout(() => {
//         trackSearch(searchTerm);
//       }, 500);
//     }
//   }, []);
//
//   const filteredMovies: Movie[] = React.useMemo(
//     () =>
//       movies.filter((movie) =>
//         movie.title.toLowerCase().includes(searchValue.toLowerCase())
//       ),
//     [movies, searchValue]
//   );
//   return (
//     <View className="flex-1 ">
//       <View
//         className="flex-row items-center justify-between rounded-b-3xl bg-white px-5 pb-4"
//         style={{ paddingTop: insets.top + 8 }}
//       >
//         <View className="flex-row items-center gap-2">
//           <Checkbox
//             onChange={() =>
//               setChosen(chosen.length > 0 ? [] : movies.map((item) => item.id))
//             }
//             accessibilityLabel={'Choose'}
//             checked={chosen.length > 0}
//           />
//           {chosen.length > 0 ? (
//             <TouchableOpacity
//               onPress={() => chosen.map((id) => deleteMovie(id))}
//               className="flex-row items-center gap-1"
//             >
//               <TrashCan />
//               <Text className="text-md text-textGrey">Delete</Text>
//             </TouchableOpacity>
//           ) : (
//             <Text className="text-md text-textGrey">Choose</Text>
//           )}
//         </View>
//         <TouchableOpacity onPress={() => router.push('/movie-editor/new')}>
//           <Plus color={colors.blue} width={24} height={24} />
//         </TouchableOpacity>
//       </View>
//       {searchIsVisible ? (
//         <View className="m-4">
//           <Input
//             className="flex-1 text-white "
//             ref={searchRef}
//             value={searchValue}
//             onChangeText={(text) => {
//               setSearchValue(text);
//               trackSearchEvent(text);
//             }}
//             onBlur={() => setSearchIsVisible(searchValue.length !== 0)}
//             leftIcon={<Search color={'white'} />}
//             search
//           />
//         </View>
//       ) : (
//         <View className="mx-5 my-4 flex-row items-center justify-between">
//           <Text className="text-2xl font-bold">MovieSaver+</Text>
//           <TouchableOpacity
//             onPress={() => {
//               setSearchIsVisible(true);
//             }}
//           >
//             <Search width={24} height={24} color={colors.black} />
//           </TouchableOpacity>
//         </View>
//       )}
//
//       <FlashList
//         className="m-4 flex-1"
//         data={filteredMovies}
//         extraData={[chosen, filteredMovies, movies]}
//         renderItem={renderItem}
//         keyExtractor={(item) => `item-${item.id}`}
//         estimatedItemSize={80}
//         ItemSeparatorComponent={() => <View className="py-2" />}
//       />
//     </View>
//   );
// }

export default function MoviesScreen() {
  // UI state
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All'); // static for demo
  const [library, setLibrary] = useState<Movie[]>(INITIAL_LIBRARY);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const selectionMode = selectedIds.size > 0;

  const onToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onSelectAll = () => {
    if (selectedIds.size === library.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(library.map((m) => m.id)));
    }
  };

  const onDelete = () => {
    setLibrary((prev) => prev.filter((m) => !selectedIds.has(m.id)));
    setSelectedIds(new Set());
  };

  const searchResults = useMemo(() => {
    if (!query.trim()) return [] as Movie[];
    const q = query.toLowerCase();
    const all = [...RECOMMENDED, ...INITIAL_LIBRARY];
    // unique by id
    const byId = new Map<string, Movie>();
    all.forEach((m) => {
      if (!byId.has(m.id)) byId.set(m.id, m);
    });
    return Array.from(byId.values()).filter((m) =>
      m.title.toLowerCase().includes(q)
    );
  }, [query]);

  const router = useRouter();
  const isSearching = query.trim().length > 0;
  const inset = useSafeAreaInsets();

  const Header = (
    <SView className="px-5 pb-3 bg-color1" style={{
      paddingTop: inset.top + 12,
    }}>
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
        {['All', 'Action', 'Martial Arts', 'Fiction', 'Fantasy', 'Drama'].map(
          (t) => (
            <TouchableOpacity
              onPress={() => setCategory(t)}
              key={t}
              className="mr-6 border-b-2 pb-2"
              style={{
                borderBottomColor: t === category ? '#000' : 'transparent',
              }}
            >
              <SText
                className={`text-[18px] ${t === category ? 'font-extrabold' : 'font-semibold'} text-black`}
              >
                {t}
              </SText>
            </TouchableOpacity>
          )
        )}
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
      <FlashList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={RECOMMENDED}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.navigate(`/movie-info-profile/${item.id}`)}
            className="mr-4 w-[95px]"
          >
            <SView className="h-[140px] w-[95px] overflow-hidden rounded-2xl bg-black/10">
              <Image
                source={{ uri: item.poster }}
                style={{ width: '100%', height: '100%' }}
              />
            </SView>
            <SText className="mt-2" numberOfLines={1}>
              {item.title}
            </SText>
            <SText className="text-black/50">{item.genre}</SText>
          </TouchableOpacity>
        )}
      />
    </SView>
  );

  const MyMoviesHeader = (
    <SView className="mb-3 mt-8 flex-row items-center justify-between">
      <SView className="flex-row items-center gap-3">
        <SView className="size-10 items-center justify-center rounded-2xl bg-black/10">
          <SText className="text-[18px]">🎞️</SText>
        </SView>
        <SText className="text-[28px]">My movies</SText>
      </SView>

      <SView className="flex-row items-center gap-3">
        <SPressable onPress={onSelectAll} className="opacity-80">
          <SText className="font-semibold">Select all</SText>
        </SPressable>
        <Checkbox
          checked={selectedIds.size === library.length && library.length > 0}
          onPress={onSelectAll}
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
              source={{ uri: item.poster }}
              style={{ width: '100%', height: '100%' }}
            />
          </SView>
          {!!item.rating && (
            <SView className="mt-2 flex-row items-center gap-1 self-start rounded-xl border border-black/10 bg-white px-2 py-1">
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
            {[item.duration, item.year, item.country]
              .filter(Boolean)
              .join(', ')}
          </SText>
          <SText className="mt-2 text-black/70">#{item.genre}</SText>
          <SText className="mt-2 text-black/60" numberOfLines={2}>
            Haunted by the ghosts of the past, Max is convinced that the best
            way to survive is t...
          </SText>
        </SView>

        <SView className="ml-3 mt-2">
          <Checkbox
            checked={selectedIds.has(item.id)}
            onPress={() => onToggleSelect(item.id)}
          />
        </SView>
      </SView>
    </TouchableOpacity>
  );

  const MyMoviesSection = (
    <SView className="px-5">
      {MyMoviesHeader}
      <FlashList
        data={library}
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
        renderItem={MovieRow}
        scrollEnabled={false}
      />
    </SView>
  );

  const BottomDeleteBar = selectionMode ? (
    <SView className="absolute inset-x-4 bottom-4 rounded-3xl bg-black px-6 py-4">
      <SPressable onPress={onDelete} className="flex-row items-center gap-3">
        <SText className="text-[18px] text-white">🗑️</SText>
        <SText className="text-[18px] font-semibold text-white">Delete</SText>
      </SPressable>
    </SView>
  ) : null;

  return (
    <View className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {Header}

        {isSearching ? (
          SearchResults
        ) : (
          <>
            {RecommendSection}
            {MyMoviesSection}
          </>
        )}

        <SView className="h-24" />
      </ScrollView>

      {BottomDeleteBar}
    </View>
  );
}
