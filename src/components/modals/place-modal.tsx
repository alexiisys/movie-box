import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Check, colors, Globe, Image, Modal, Pen, Text } from '@/components/ui';
import { updatePin } from '@/lib/storage/modules/map-pins';
import { type Pin } from '@/types/pin';

type Props = {
  pin?: Pin;
  close: () => void;
};

// eslint-disable-next-line max-lines-per-function
const PlaceModal = React.forwardRef<BottomSheetModal, Props>(
  // eslint-disable-next-line max-lines-per-function
  ({ pin, close }, ref) => {
    const router = useRouter();
    return (
      <Modal
        ref={ref}
        index={0}
        snapPoints={['60%']}
        backgroundStyle={{
          backgroundColor: 'rgba(12,17,24,0.8)',
        }}
      >
        <View className="flex-1">
          <ScrollView
            className="px-4"
            contentContainerStyle={{ paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="relative mb-4 mt-2">
              <Image
                source={{
                  uri: pin?.image ?? '',
                }}
                className="h-32 w-full rounded-2xl"
                contentFit="cover"
              />
              {pin?.activate && (
                <View className="absolute top-0 w-24 flex-row items-center justify-center gap-2 self-center rounded-b-lg bg-[#E2EA51] py-2">
                  <Check color={colors.black} />
                  <Text className={'text-center'}>Done</Text>
                </View>
              )}
            </View>

            <Text className="text-2xl font-bold leading-8 text-white">
              {pin?.name}
            </Text>

            <View className="mt-2 flex-row items-center">
              <Globe color={colors.white} />
              <Text className="ml-2 text-base text-zinc-400">
                {pin?.location}
              </Text>
            </View>
            {/*<Text className="mb-3 mt-1 text-base text-[#90b6ff]">2025/04/01</Text>*/}

            <View className="mb-3 flex-row items-start rounded-xl bg-[#31321E] px-4 py-3">
              <View className="ml-3 flex-1">
                <Text className="text-base font-medium text-[#E2EA51]">
                  Purpose
                </Text>
                <Text className="mt-0.5 text-base text-yellow-100">
                  {pin?.purpose}
                </Text>
              </View>
            </View>

            <View className="mb-3 flex-row items-start rounded-xl bg-[#1E1E1E] px-4 py-3">
              {/*<MaterialIcons name="event-note" size={20} color="#7a7a7a" />*/}
              <View className="ml-3 flex-1">
                <Text className="text-base font-medium text-gray-400">
                  Note:
                </Text>
                <Text className="mt-0.5 text-base text-white">{pin?.note}</Text>
              </View>
            </View>

            <View className="mb-3 flex-row items-start rounded-xl bg-[#1E1E1E] px-4 py-3">
              {/*<FontAwesome5 name="calendar" size={18} color="#7a7a7a" />*/}
              <View className="ml-3 flex-1">
                <Text className="text-base font-medium text-gray-400">
                  Start-End:
                </Text>
                <Text className="mt-0.5 text-base text-white">
                  {pin?.start} to {pin?.end}
                </Text>
              </View>
            </View>

            <View className="mb-3 flex-row items-start rounded-xl bg-[#1E1E1E] px-4 py-3">
              {/*<FontAwesome5 name="car-side" size={18} color="#7a7a7a" />*/}
              <View className="ml-3 flex-1">
                <Text className="text-base font-medium text-gray-400">
                  Transportation:
                </Text>
                <Text className="mt-0.5 text-base text-white">
                  {pin?.transportation}
                </Text>
              </View>
            </View>

            <View className="mb-3 flex-row items-start rounded-xl bg-[#1E1E1E] px-4 py-3">
              {/*<FontAwesome name="home" size={20} color="#7a7a7a" />*/}
              <View className="ml-3 flex-1">
                <Text className="text-base font-medium text-gray-400">
                  Accommodation:
                </Text>
                <Text className="mt-0.5 text-base text-white">
                  {pin?.accommodation}
                </Text>
              </View>
            </View>

            <View className="mb-3 flex-row">
              <View className="mr-1 flex-1 flex-row items-start rounded-xl bg-[#1E1E1E] px-4 py-3">
                <View className="ml-3">
                  <Text className="text-base font-medium text-gray-400">
                    Budget:
                  </Text>
                  <Text className="mt-0.5 text-base text-white">
                    ${pin?.budget}
                  </Text>
                </View>
              </View>
              <View className="ml-1 flex-1 flex-row items-start rounded-xl bg-[#1E1E1E] px-4 py-3">
                <View className="ml-3">
                  <Text className="text-base font-medium text-gray-400">
                    Actual cost:
                  </Text>
                  <Text className="mt-0.5 text-base text-yellow-200">
                    ${pin?.actualCost}
                  </Text>
                </View>
              </View>
            </View>

            <View className="mb-3 flex-row items-start rounded-xl bg-[#1E1E1E] px-4 py-3">
              {/*<FontAwesome5 name="users" size={18} color="#7a7a7a" />*/}
              <View className="ml-3 flex-1">
                <Text className="text-base font-medium text-gray-400">
                  Attendees:
                </Text>
                <Text className="mt-0.5 text-base text-white">
                  {pin?.attendees}
                </Text>
              </View>
            </View>

            <View className="mb-5 flex-row items-start rounded-xl bg-[#1E1E1E] px-4 py-3">
              {/*<MaterialIcons name="verified-user" size={20} color="#7a7a7a" />*/}
              <View className="ml-3 flex-1">
                <Text className="text-base font-medium text-gray-400">
                  Status:
                </Text>
                <Text className="mt-0.5 text-base text-white">
                  {pin?.status}{' '}
                </Text>
              </View>
            </View>

            <View className="mb-4 flex-row">
              <TouchableOpacity
                onPress={() => {
                  close();
                  router.navigate(`/new-place/${pin?.id}`);
                }}
                className="mr-2 flex-1 flex-row items-center justify-center rounded-full bg-[#5b5252] py-4"
              >
                <Pen color={colors.white} />
                <Text className="ml-2 text-lg font-semibold text-white">
                  Edit
                </Text>
              </TouchableOpacity>
              {!pin?.activate && (
                <TouchableOpacity
                  onPress={() => {
                    close();
                    updatePin({ ...pin!, activate: true });
                  }}
                  className="ml-2 flex-1 flex-row items-center justify-center rounded-full bg-[#4958C5] py-4"
                >
                  <Check color={colors.white} />
                  <Text className="ml-2 text-lg font-semibold text-white">
                    Done
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
);

export default PlaceModal;
