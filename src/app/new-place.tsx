import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity, View } from 'react-native';
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

export const schema = z.object({
  id: z.string(),
  image: z.string().optional(),
  name: z.string({ message: 'Required' }),
  location: z.string().optional(),
  purpose: z.string().optional(),
  note: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
  transportation: z.string().optional(),
  accommodation: z.string().optional(),
  budget: z.string().optional(),
  actualCost: z.string().optional(),
  attendees: z.string().optional(),
  status: z.string().optional(),
});
export type FormType = z.infer<typeof schema>;

// eslint-disable-next-line max-lines-per-function
const NewPlace = () => {
  const router = useRouter();
  const { selectedTheme } = useSelectedTheme();
  const isDark = selectedTheme === 'dark';
  const { control } = useForm<FormType>({
    defaultValues: {
      id: `place_${Date.now()}`,
      image: '',
      name: '',
      location: '',
      purpose: '',
      note: '',
      start: '',
      end: '',
      transportation: '',
      accommodation: '',
      budget: '',
      actualCost: '',
      attendees: '',
      status: '',
    },
    resolver: zodResolver(schema),
  });
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
        <Button label={'Save'} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPlace;
