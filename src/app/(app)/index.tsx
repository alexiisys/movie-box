import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { type TextInput as NTextInput } from 'react-native/Libraries/Components/TextInput/TextInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { deleteMovie, useMovie } from 'src/lib/storage/modules/movies';

import { Checkbox, colors, Image, Input, Text, View } from '@/components/ui';
import { Plus, Search } from '@/components/ui/icons';
import { Star } from '@/components/ui/icons/star';
import { TrashCan } from '@/components/ui/icons/trash-can';
import { MovieGenres } from '@/lib/consts';
import { type Movie } from '@/types';

export default function Contacts() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const movies = useMovie.use.movies();

  const [chosen, setChosen] = React.useState<string[]>([]);
  const renderItem = React.useCallback(
    ({ item }: { item: Movie }) => {
      return (
        <Pressable
          onPress={() => router.navigate(`/movie-info-profile/${item.id}`)}
          className="flex-1 flex-row overflow-hidden rounded-xl bg-white"
          key={item.id}
        >
          <View className="relative w-24 flex-row">
            <Image
              className="flex-1 overflow-hidden "
              contentFit="cover"
              source={{
                uri: item.image,
              }}
            />
            <Checkbox
              onChange={() =>
                setChosen(
                  chosen.includes(item.id)
                    ? chosen.filter((id) => id !== item.id)
                    : [...chosen, item.id]
                )
              }
              accessibilityLabel={''}
              checked={chosen.includes(item.id)}
              className={'absolute left-1 top-1'}
            />
            <View className="absolute bottom-4 left-0 flex-row items-center gap-1 rounded-r-sm bg-white px-1">
              <Star />
              <Text className="text-sm font-bold">{item.rating},0</Text>
            </View>
          </View>
          <View className="p-3">
            <Text className="text-base  font-bold">{item.title}</Text>
            <View className="flex-row gap-5">
              <Text className="text-textGrey">{item.release_year}</Text>
              <Text className="text-textGrey">{item.runtime}</Text>
            </View>
            <Text className="mt-1 font-bold">Geners:</Text>
            <View className="mt-1 flex-row gap-2">
              {item.genres.slice(0, 2).map((genre) => (
                <Text
                  key={genre}
                  className="rounded-sm bg-light px-3 py-px text-textGrey"
                >
                  {MovieGenres[genre as keyof typeof MovieGenres]}
                </Text>
              ))}
              {item.genres.length - 2 >= 1 && (
                <Text className="rounded-sm bg-light px-3 py-px text-textGrey">
                  +{item.genres.length - 2}
                </Text>
              )}
            </View>
            <View className="w-[85%] pt-2">
              <Text
                numberOfLines={1}
                lineBreakMode={'tail'}
                className="text-textGrey"
              >
                {item.description}
              </Text>
            </View>
          </View>
        </Pressable>
      );
    },
    [chosen, router]
  );
  const [searchIsVisible, setSearchIsVisible] = React.useState<boolean>(false);
  const searchRef = React.useRef<NTextInput>(null);
  useEffect(() => {
    setTimeout(() => searchRef?.current?.focus(), 100);
  }, [searchIsVisible]);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const filteredMovies: Movie[] = React.useMemo(
    () =>
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [movies, searchValue]
  );
  return (
    <View className="flex-1 ">
      <View
        className="flex-row items-center justify-between rounded-b-3xl bg-white px-5 pb-4"
        style={{ paddingTop: insets.top + 8 }}
      >
        <View className="flex-row items-center gap-2">
          <Checkbox
            onChange={() =>
              setChosen(chosen.length > 0 ? [] : movies.map((item) => item.id))
            }
            accessibilityLabel={'Choose'}
            checked={chosen.length > 0}
          />
          {chosen.length > 0 ? (
            <TouchableOpacity
              onPress={() => chosen.map((id) => deleteMovie(id))}
              className="flex-row items-center gap-1"
            >
              <TrashCan />
              <Text className="text-md text-textGrey">Delete</Text>
            </TouchableOpacity>
          ) : (
            <Text className="text-md text-textGrey">Choose</Text>
          )}
        </View>
        <TouchableOpacity onPress={() => router.push('/movie-editor/new')}>
          <Plus color={colors.blue} width={24} height={24} />
        </TouchableOpacity>
      </View>
      {searchIsVisible ? (
        <View className="m-4">
          <Input
            className="flex-1 text-white "
            ref={searchRef}
            value={searchValue}
            onChangeText={(text) => setSearchValue(text)}
            onBlur={() => setSearchIsVisible(searchValue.length !== 0)}
            leftIcon={<Search color={'white'} />}
            search
          />
        </View>
      ) : (
        <View className="mx-5 my-4 flex-row items-center justify-between">
          <Text className="text-2xl font-bold">MovieSaver+</Text>
          <TouchableOpacity
            onPress={() => {
              setSearchIsVisible(true);
            }}
          >
            <Search width={24} height={24} color={colors.black} />
          </TouchableOpacity>
        </View>
      )}

      <FlashList
        className="m-4 flex-1"
        data={filteredMovies}
        extraData={[chosen, filteredMovies, movies]}
        renderItem={renderItem}
        keyExtractor={(item) => `item-${item.id}`}
        estimatedItemSize={80}
        ItemSeparatorComponent={() => <View className="py-2" />}
      />
    </View>
  );
}
