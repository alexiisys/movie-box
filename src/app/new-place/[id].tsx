import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { type LatLng } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import {
  ArrowLeft,
  Button,
  colors,
  ControlledInput,
  Text,
} from '@/components/ui';
import { Gallery } from '@/components/ui/icons/gallery';
import { useSelectedTheme } from '@/lib';
import { useMapPins } from '@/lib/storage/modules/map-pins';
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
  const currentPin = useMapPins.use.currentCoord();
  const pins = useMapPins.use.pins();
  const filteredPin = useMemo(
    () => pins.find((item) => item.id === '1'),
    [pins]
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

  const onCreateNewPlace = (data: FormType) => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const newPin: Pin = {
      coord: currentPin as LatLng,
      ...data,
    };
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
          <View className="flex-row items-center justify-center rounded-xl bg-lightGrey py-12 dark:bg-charcoal-800">
            <Gallery />
          </View>
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
