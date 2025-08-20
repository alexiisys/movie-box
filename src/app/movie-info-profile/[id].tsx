import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, colors, Image, Text, useModal, View } from '@/components/ui';
import Chips from '@/components/ui/chip/сhips';
import { ArrowLeft, Pen, Star, TrashCan } from '@/components/ui/icons';
import DeleteModal from '@/components/ui/modal/delete-modal';
import { trackContentView, trackMovieEvent } from '@/lib/facebook-attribution';
import { deleteMovie, useMovie } from '@/lib/storage';
import { deleteImage } from '@/lib/utils/image-manager';

export default function FilmInfo() {
  const local = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const movies = useMovie.use.movies();
  const movie = React.useMemo(
    () => movies.find((item) => item.id === local.id),
    [local.id, movies]
  );
  const router = useRouter();
  const onPress = () => {
    router.back();
  };
  const [showDescription, setShowDescription] = React.useState<boolean>(false);
  const modal = useModal();
  const onDelete = () => {
    deleteImage(movie?.image || '');
    deleteMovie(local.id);
    router.back();
  };

  // Track movie view for Facebook attribution
  React.useEffect(() => {
    if (movie) {
      // Track movie viewed event
      trackMovieEvent('viewed', {
        movieId: movie.id,
        movieTitle: movie.title,
        rating: movie.rating,
        genre: movie.genres?.[0] || 'unknown',
      });

      // Track content view event
      trackContentView({
        contentType: 'movie',
        contentId: movie.id,
      });
    }
  }, [movie]);
  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <View
        className="flex-row items-center justify-between rounded-b-3xl bg-color1 px-5 pb-4"
        style={{ paddingTop: insets.top + 8 }}
      >
        <Pressable onPress={onPress}>
          <ArrowLeft />
        </Pressable>
      </View>
      <ScrollView
        style={{ marginBottom: insets.bottom }}
        contentContainerClassName={'items-center'}
      >
        <View className="w-full items-center overflow-hidden rounded-xl bg-color1">
          <Image
            className="h-[390px] w-3/5 overflow-hidden bg-white "
            contentFit="cover"
            source={{
              uri: movie?.image,
            }}
          />
        </View>
        <Text className="mb-4 mt-8 w-4/5 text-center text-2xl font-bold">
          {movie?.title}
        </Text>
        <Text>
          {movie?.runtime},{movie?.release_year},{movie?.countries.join(', ')}
        </Text>
        <View className="flex-row items-center  justify-center gap-2 rounded-lg bg-white px-4 py-2 shadow-lg">
          <Star width={20} height={20} />
          <Text className="text-base font-bold">{movie?.rating},0</Text>
        </View>

        <View className="mx-4 mt-4 flex-1 items-start">
          <Text
            numberOfLines={!showDescription ? 4 : undefined}
            className=" text-base"
          >
            {movie?.description}
          </Text>
          {!showDescription && (
            <TouchableOpacity
              onPress={() => setShowDescription((state) => !state)}
            >
              <Text>Read more</Text>
            </TouchableOpacity>
          )}
        </View>
        <View className={'mt-8 w-full gap-2 px-4'}>
          <View className={'flex-row'}>
            <Text className="w-1/3 text-base font-bold">Director</Text>
            <Text className="text-base">{movie?.director}</Text>
          </View>
          <View className={'flex-row'}>
            <Text className="w-1/3 text-base font-bold">Runtime</Text>
            <Text className="text-base">{movie?.runtime}</Text>
          </View>
          <View className={'flex-row'}>
            <Text className="w-1/3 text-base font-bold">Release year</Text>
            <Text className="text-base">{movie?.release_year}</Text>
          </View>
          <View className={'flex-row'}>
            <Text className="w-1/3 text-base font-bold">Country</Text>
            <Text className="text-base">{movie?.countries.join(', ')}</Text>
          </View>
          <View className={'flex-row'}>
            <Text className="w-1/3 text-base font-bold">Actors</Text>
            <Text className="text-base">{movie?.actors.join(', ')}</Text>
          </View>
          <View className={'flex-row'}>
            <Text className="w-1/3 text-base font-bold">Genre</Text>
            <View className="flex-1 ">
              <Chips labels={movie?.genres ?? []} type={'solid'} />
            </View>
          </View>
        </View>
        <View className="my-8 w-full flex-1 flex-row gap-4 px-4">
          <Button
            icon={<Pen />}
            onPress={() => router.navigate(`/movie-editor/${movie?.id}`)}
          />
          <Button
            onPress={() => modal.present()}
            icon={<TrashCan color={colors.black} />}
            variant={'inactive'}
          />
        </View>
        <DeleteModal
          ref={modal.ref}
          onDelete={onDelete}
          onCancel={() => modal.dismiss()}
        />
      </ScrollView>
    </View>
  );
}
