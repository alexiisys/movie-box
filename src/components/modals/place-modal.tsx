import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { colors, Globe, Image, Modal, Text } from '@/components/ui';

// eslint-disable-next-line max-lines-per-function
const PlaceModal = React.forwardRef<BottomSheetModal>((_, ref) => {
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
                uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
              }}
              className="h-32 w-full rounded-2xl"
              contentFit="cover"
            />
          </View>

          <Text className="text-2xl font-bold leading-8 text-white">
            Trip to USA, California 27345
          </Text>

          <View className="mt-2 flex-row items-center">
            <Globe color={colors.white} />
            <Text className="ml-2 text-base text-zinc-400">
              Toronto, Canada
            </Text>
          </View>
          <Text className="mb-3 mt-1 text-base text-[#90b6ff]">2025/04/01</Text>

          <View className="mb-3 flex-row items-start rounded-xl bg-[#31321E] px-4 py-3">
            {/*<FontAwesome5 name="bullseye" size={18} color="#ffe352" className="mt-1" />*/}
            <View className="ml-3 flex-1">
              <Text className="text-base font-medium text-[#E2EA51]">
                Purpose
              </Text>
              <Text className="mt-0.5 text-base text-yellow-100">
                Discuss future business strategies and KPIs
              </Text>
            </View>
          </View>

          <View className="mb-3 flex-row items-start rounded-xl bg-[#1E1E1E] px-4 py-3">
            {/*<MaterialIcons name="event-note" size={20} color="#7a7a7a" />*/}
            <View className="ml-3 flex-1">
              <Text className="text-base font-medium text-gray-400">Note:</Text>
              <Text className="mt-0.5 text-base text-white">
                Lorem ipsum dolor sit amet
              </Text>
            </View>
          </View>

          <View className="mb-3 flex-row items-start rounded-xl bg-[#1E1E1E] px-4 py-3">
            {/*<FontAwesome5 name="calendar" size={18} color="#7a7a7a" />*/}
            <View className="ml-3 flex-1">
              <Text className="text-base font-medium text-gray-400">
                Start-End:
              </Text>
              <Text className="mt-0.5 text-base text-white">
                2025-05-12 to 2025-06-12
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
                Flight{'\n'}$40{'\n'}2 hours
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
                Super Deluxe Stays{'\n'}$100 per day{'\n'}22753 Mathew’s Street
                4
              </Text>
            </View>
          </View>

          <View className="mb-3 flex-row">
            <View className="mr-1 flex-1 flex-row items-start rounded-xl bg-[#1E1E1E] px-4 py-3">
              <View className="ml-3">
                <Text className="text-base font-medium text-gray-400">
                  Budget:
                </Text>
                <Text className="mt-0.5 text-base text-white">$4500</Text>
              </View>
            </View>
            <View className="ml-1 flex-1 flex-row items-start rounded-xl bg-[#1E1E1E] px-4 py-3">
              <View className="ml-3">
                <Text className="text-base font-medium text-gray-400">
                  Actual cost:
                </Text>
                <Text className="mt-0.5 text-base text-yellow-200">$6000</Text>
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
                5 team members
              </Text>
            </View>
          </View>

          <View className="mb-5 flex-row items-start rounded-xl bg-[#1E1E1E] px-4 py-3">
            {/*<MaterialIcons name="verified-user" size={20} color="#7a7a7a" />*/}
            <View className="ml-3 flex-1">
              <Text className="text-base font-medium text-gray-400">
                Status:
              </Text>
              <Text className="mt-0.5 text-base text-white">Approved</Text>
            </View>
          </View>

          <View className="mb-4 flex-row">
            <TouchableOpacity className="mr-2 flex-1 flex-row items-center justify-center rounded-full bg-[#5b5252] py-4">
              {/*<MaterialIcons name="edit" size={22} color="#fff" />*/}
              <Text className="ml-2 text-lg font-semibold text-white">
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="ml-2 flex-1 flex-row items-center justify-center rounded-full bg-[#4958C5] py-4">
              {/*<Ionicons name="checkmark-done-circle-outline" size={22} color="#fff" />*/}
              <Text className="ml-2 text-lg font-semibold text-white">
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
});

export default PlaceModal;
