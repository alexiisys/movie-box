import { zodResolver } from '@hookform/resolvers/zod';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { type LatLng } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import {
  ArrowLeft,
  Button,
  Close,
  colors,
  ControlledInput,
  Image,
  Text,
} from '@/components/ui';
import { Gallery } from '@/components/ui/icons/gallery';
import { useSelectedTheme } from '@/lib';
import { addPin, updatePin, useMapPins } from '@/lib/storage/modules/map-pins';
import { deleteImage, saveImagePermanently } from '@/lib/utils/image-manager';
import { type Pin } from '@/types/pin';

export const schema = z.object({
  id: z.string(),
  image: z.string(),
  name: z.string({ message: 'Required' }),
  location: z.string(),
  purpose: z.string(),
  note: z.string(),
  start: z.string(),
  end: z.string(),
  transportation: z.string(),
  accommodation: z.string(),
  budget: z.string(),
  actualCost: z.string(),
  attendees: z.string(),
  status: z.string(),
});
export type FormType = z.infer<typeof schema>;

// eslint-disable-next-line max-lines-per-function
const Id = () => {
  const router = useRouter();
  const local = useLocalSearchParams<{ id: string }>();
  const currentPin = useMapPins.use.currentCoord();
  const pins = useMapPins.use.pins();
  const filteredPin = useMemo(
    () => pins.find((item) => item.id === local.id),
    [local.id, pins]
  );
  const { selectedTheme } = useSelectedTheme();
  const isDark = selectedTheme === 'dark';
  const { control, handleSubmit } = useForm<FormType>({
    defaultValues: {
      id: `place_${Date.now()}`,
      image: filteredPin?.image ?? '',
      name: filteredPin?.name ?? '',
      location: filteredPin?.location ?? '',
      purpose: filteredPin?.purpose ?? '',
      note: filteredPin?.note ?? '',
      start: filteredPin?.start ?? '',
      end: filteredPin?.end ?? '',
      transportation: filteredPin?.transportation ?? '',
      accommodation: filteredPin?.accommodation ?? '',
      budget: filteredPin?.budget ?? '',
      actualCost: filteredPin?.actualCost ?? '',
      attendees: filteredPin?.attendees ?? '',
      status: filteredPin?.status ?? '',
    },
    resolver: zodResolver(schema),
  });

  const onCreateNewPlace = async ({ image, ...data }: FormType) => {
    if (image !== filteredPin?.image) {
      await deleteImage(filteredPin?.image || '');
    }

    const savedUri =
      image === filteredPin?.image
        ? (filteredPin?.image ?? '')
        : await saveImagePermanently(image);

    const newPin: Pin = {
      coord: currentPin as LatLng,
      image: savedUri,
      activate: false,
      ...data,
    };
    if (filteredPin) {
      updatePin(newPin);
    } else {
      addPin(newPin);
    }
    router.back();
  };
  const onPickImage = async (onChange: (arg0: string) => void) => {
    const result = await launchImageLibraryAsync();
    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView className="flex-1 gap-4 p-4">
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="flex-1">
          <ArrowLeft color={isDark ? colors.white : colors.black} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-2xl">Add a place</Text>
        <View className="flex-1" />
      </View>
      <ScrollView
        contentContainerClassName="gap-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-4">
          <Text className="text-xl">Main</Text>

          <Controller
            name={'image'}
            control={control}
            render={({ field: { value, onChange } }) => (
              <TouchableOpacity
                onPress={() => onPickImage(onChange)}
                className="  bg-lightGrey  dark:bg-charcoal-800"
              >
                {value ? (
                  <View className={'relative'}>
                    <Image
                      className="h-40 w-full rounded-xl"
                      contentFit={'cover'}
                      source={{
                        uri: value,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => onChange('')}
                      className={
                        'absolute right-3 top-3 rounded-2xl bg-black p-1  dark:bg-white'
                      }
                    >
                      <Close color={colors.grey} width={20} height={20} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View className="flex-row items-center justify-center py-12">
                    <Gallery />
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
          <ControlledInput name={'name'} control={control} label={'Name'} />
          <ControlledInput
            name={'location'}
            control={control}
            label={'Location'}
          />
          <ControlledInput
            name={'purpose'}
            control={control}
            label={'Purpose'}
          />
          <ControlledInput name={'note'} control={control} label={'Note'} />
        </View>
        <View className="mt-10 gap-4">
          <Text className="text-xl ">Info</Text>
          <View className="flex-row gap-4">
            <ControlledInput
              name={'start'}
              control={control}
              label={'Start date'}
            />
            <ControlledInput
              name={'end'}
              control={control}
              label={'End date'}
            />
          </View>
          <ControlledInput
            name={'transportation'}
            control={control}
            label={'Transportation'}
          />
          <ControlledInput
            name={'accommodation'}
            control={control}
            label={'Accommodation:'}
          />
          <ControlledInput name={'budget'} control={control} label={'Budget'} />
          <ControlledInput
            name={'actualCost'}
            control={control}
            label={'Actual cost'}
          />
          <ControlledInput
            name={'attendees'}
            control={control}
            label={'Attendees'}
          />
          <ControlledInput name={'status'} control={control} label={'Status'} />
        </View>
        <Button label={'Save'} onPress={handleSubmit(onCreateNewPlace)} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Id;
