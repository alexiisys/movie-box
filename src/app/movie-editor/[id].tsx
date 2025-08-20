import { zodResolver } from '@hookform/resolvers/zod';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import {
  Button,
  colors,
  ControlledInput,
  Image,
  Input,
  Text,
} from '@/components/ui';
import { ArrowLeft, Close, Gallery, Star } from '@/components/ui/icons';
import { MovieGenres } from '@/lib/consts';
import { trackMovieEvent } from '@/lib/facebook-attribution';
import { addMovie, updateMovie, useMovie } from '@/lib/storage';
import { deleteImage, saveImagePermanently } from '@/lib/utils/image-manager';
import { type Movie } from '@/types';

const schema = z.object({
  id: z.string(),
  image: z.string().optional(),
  title: z.string({ message: 'Необходимо заполнить' }),
  description: z.string().optional(),
  rating: z.number(),
  director: z.string().optional(),
  runtime: z.string().optional(),
  release_year: z.string().optional(),
  country_object: z
    .object({
      value: z.string().optional(),
      array: z.array(z.string()).optional(),
    })
    .optional(),
  actor_object: z
    .object({
      value: z.string().optional(),
      array: z.array(z.string()).optional(),
    })
    .optional(),
  genres: z.array(z.string()).optional(),
});
type FormType = z.infer<typeof schema>;

const useFormMovie = (movie?: Movie) =>
  useForm<FormType>({
    defaultValues: {
      ...(movie ?? {}),
      id: movie?.id ?? `movie_${Date.now()}`,
      rating: movie?.rating ?? 5,
      country_object: {
        array: movie?.countries ?? [],
      },
      actor_object: {
        array: movie?.actors ?? [],
      },
    },
    resolver: zodResolver(schema),
  });

// eslint-disable-next-line max-lines-per-function
const Id = () => {
  const local = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const movies = useMovie.use.movies();
  const movie = React.useMemo(
    () => movies.find((item) => item.id === local.id),
    [local.id, movies]
  );
  const router = useRouter();
  const { handleSubmit, control } = useFormMovie(movie);
  const onPress = () => {
    router.back();
  };

  const onPickImage = async (onChange: (arg0: string) => void) => {
    const result = await launchImageLibraryAsync();
    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  const onSavePress = async (value: FormType) => {
    if (value.image !== movie?.image) {
      await deleteImage(movie?.image || '');
    }

    const savedUri =
      value.image === movie?.image
        ? (movie?.image ?? '')
        : await saveImagePermanently(value.image);
    const new_movie: Movie = {
      id: value.id,
      image: savedUri,
      description: value.description ?? '',
      title: value.title,
      rating: value.rating,
      director: value.director ?? '',
      runtime: value.runtime ?? '',
      release_year: value.release_year ?? '',
      countries: value.country_object?.array ?? [],
      actors: value.actor_object?.array ?? [],
      genres: value.genres ?? [],
    };

    // Track Facebook attribution event
    const isNewMovie = !movie;
    if (isNewMovie) {
      addMovie(new_movie);
      // Track movie added event for attribution
      await trackMovieEvent('added', {
        movieId: new_movie.id,
        movieTitle: new_movie.title,
        rating: new_movie.rating,
        genre: new_movie.genres?.[0] || 'unknown',
      });
    } else {
      updateMovie(new_movie);
    }

    router.back();
  };

  return (
    <View className="flex-1 bg-light">
      <Stack.Screen options={{ headerShown: false }} />
      <View
        className="flex-row items-center justify-between rounded-b-3xl bg-light px-5 pb-4"
        style={{ paddingTop: insets.top + 8 }}
      >
        <Pressable onPress={onPress}>
          <ArrowLeft />
        </Pressable>
      </View>
      <ScrollView
        contentContainerClassName="gap-4 px-4"
        style={{ marginBottom: insets.bottom }}
      >
        <Text className="mt-4 text-xl font-bold">Main</Text>
        <View className="items-center justify-center">
          <Controller
            name={'image'}
            control={control}
            render={({ field: { value, onChange } }) => (
              <TouchableOpacity
                onPress={() => onPickImage(onChange)}
                className="size-32 items-center justify-center rounded-full mb-8 bg-white"
              >
                {value ? (
                  <View className={'relative'}>
                    <Image
                      className="size-32 rounded-full"
                      contentFit={'cover'}
                      source={{
                        uri: value,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => onChange('')}
                      className={
                        'absolute -right-3 -top-3 rounded-2xl bg-bgGrey p-1'
                      }
                    >
                      <Close color={colors.textGrey} width={20} height={20} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Gallery />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
        <View className={'flex-1 flex-row items-center gap-2'}>
          <Text className="text-color2 w-1/4 text-lg">Movie name</Text>
          <ControlledInput control={control} name={'title'} />
        </View>
        <View className={'flex-1 flex-row items-center gap-2'}>
          <Text className="text-color2 w-1/4 text-lg">Movie name</Text>
          <ControlledInput
            name={'description'}
            textAlignVertical="top"
            multiline
            control={control}
            style={{ minHeight: 100 }}
            label={'Description'}
          />
        </View>
        <View className="gap-2">
          <View className={'flex-1 flex-row items-center gap-2'}>
            <Text className="text-color2 w-1/4 text-lg">Rating</Text>
            <Controller
              render={({ field: { value, onChange } }) => (
                <View className="flex-1 px-4 bg-white rounded-xl flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2 self-start p-3">
                    {new Array(5).fill(0).map((_, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => onChange(i + 1)}
                        className={`items-center justify-center rounded-xl`}
                      >
                        <Star
                          color={
                            value >= i + 1 ? colors.black : colors.textGrey
                          }
                          width={20}
                          height={20}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text className="text-lg font-bold">{value}.0</Text>
                </View>
              )}
              name={'rating'}
              control={control}
            />
          </View>
        </View>
        <View className="mt-10 gap-8">
          <Text className="mb-4 text-2xl text-black">Information</Text>
          <View className={'flex-1 flex-row items-center gap-2'}>
            <Text className="text-color2 w-1/4 text-lg">Director</Text>
            <ControlledInput control={control} name={'director'} />
          </View>
          <View className={'flex-1 flex-row items-center gap-2'}>
            <Text className="text-color2 w-1/4 text-lg">Duration</Text>
            <ControlledInput control={control} name={'runtime'} />
          </View>

          <View>
            <View className={'flex-1 flex-row items-center gap-2'}>
              <Text className="text-color2 w-1/4 text-lg">Country</Text>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <View className={`flex-1 rounded-xl bg-light`}>
                    <Input
                      outlined
                      value={value?.value ?? ''}
                      onChangeText={(text) =>
                        onChange({ ...value, value: text })
                      }
                      icon={
                        <TouchableOpacity
                          onPress={() =>
                            onChange({
                              value: '',
                              array: [
                                ...(value?.array ?? []),
                                value?.value ?? '',
                              ],
                            })
                          }
                        >
                          <Text className="mr-6 p-2 text-lg  text-black">
                            Save
                          </Text>
                        </TouchableOpacity>
                      }
                    />
                    {value && value.array && value.array.length > 0 && (
                      <View className="mx-4 gap-3 py-4">
                        <View className="flex-row items-center justify-between ">
                          <Text className="text-base text-textGrey">
                            Total: {value.array.length}
                          </Text>
                          <TouchableOpacity
                            onPress={() => onChange({ ...value, array: [] })}
                            className="flex-row items-center gap-2"
                          >
                            <Text className="text-base text-textGrey">
                              Clear all
                            </Text>
                            <Close width={16} height={16} />
                          </TouchableOpacity>
                        </View>

                        <View className="flex-row flex-wrap gap-2">
                          {value.array.map((item) => (
                            <View
                              key={item}
                              className="flex-row items-center justify-between gap-2 rounded-lg border border-lightGrey2 bg-white px-4 py-2"
                            >
                              <Text className="text-base">{item}</Text>
                              <TouchableOpacity
                                onPress={() =>
                                  onChange({
                                    ...value,
                                    array: (value?.array ?? []).filter(
                                      (i) => i !== item
                                    ),
                                  })
                                }
                              >
                                <Close
                                  width={16}
                                  height={16}
                                  color={colors.textGrey}
                                />
                              </TouchableOpacity>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                )}
                name={'country_object'}
                control={control}
              />
            </View>
          </View>
          <View className={'flex-1 flex-row items-center gap-2'}>
            <Text className="text-color2 w-1/4 text-lg">Artists</Text>
            <Controller
              render={({ field: { value, onChange } }) => (
                <View className={`flex-1 rounded-xl bg-light`}>
                  <Input
                    outlined
                    value={value?.value ?? ''}
                    onChangeText={(text) => onChange({ ...value, value: text })}
                    icon={
                      <TouchableOpacity
                        onPress={() =>
                          onChange({
                            value: '',
                            array: [
                              ...(value?.array ?? []),
                              value?.value ?? '',
                            ],
                          })
                        }
                      >
                        <Text className="mr-6 p-2 text-lg  text-black">
                          Save
                        </Text>
                      </TouchableOpacity>
                    }
                  />
                  {value && value.array && value.array.length > 0 && (
                    <View className="mx-4 gap-3 py-4">
                      <View className="flex-row items-center justify-between ">
                        <Text className="text-base text-textGrey">
                          Total: {value.array.length}
                        </Text>
                        <TouchableOpacity
                          onPress={() => onChange({ ...value, array: [] })}
                          className="flex-row items-center gap-2"
                        >
                          <Text className="text-base text-textGrey">
                            Clear all
                          </Text>
                          <Close width={16} height={16} />
                        </TouchableOpacity>
                      </View>

                      <View className="flex-row flex-wrap gap-2">
                        {value.array.map((country) => (
                          <View
                            key={country}
                            className="flex-row items-center justify-between gap-2 rounded-lg border border-lightGrey2 bg-white px-4 py-2"
                          >
                            <Text className="text-base">{country}</Text>
                            <TouchableOpacity
                              onPress={() =>
                                onChange({
                                  ...value,
                                  array: (value?.array ?? []).filter(
                                    (item) => item !== country
                                  ),
                                })
                              }
                            >
                              <Close
                                width={16}
                                height={16}
                                color={colors.textGrey}
                              />
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              )}
              name={'actor_object'}
              control={control}
            />
          </View>
          <View>
            <View className={'flex-1 flex-row items-center gap-2'}>
              <Text className="text-color2 w-1/4 text-lg">Genres</Text>
              <Controller
                render={({ field: { value, onChange } }) => (
                  <View className="mt-2 flex-1 flex-row flex-wrap gap-2 self-start">
                    {Object.keys(MovieGenres).map((item) => (
                      <TouchableOpacity
                        key={item}
                        onPress={() =>
                          onChange(
                            value?.find((genre) => genre === item)
                              ? (value?.filter((genre) => genre !== item) ?? [])
                              : [...(value || []), item]
                          )
                        }
                      >
                        <Text
                          className={`${value?.find((genre) => item === genre) ? 'bg-blue text-white' : 'bg-lightGrey text-black'}
                          rounded-lg px-3 py-1 text-base 
                        `}
                        >
                          {MovieGenres[item as keyof typeof MovieGenres]}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                name={'genres'}
                control={control}
              />
            </View>
          </View>
          <Button
            className="mt-12"
            label={'Save'}
            onPress={handleSubmit(onSavePress)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Id;
