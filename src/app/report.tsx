import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { Button, Input } from '@/components/ui';
import { Date as DateIcon } from '@/components/ui/icons/date';

const Report = () => {
  const router = useRouter();
  const [value, setValue] = React.useState<Date>(new Date());
  const onContinue = () => {
    router.navigate(`/generated-report/${value}`);
  };
  const [datePickerShow, setDatePickerShow] = React.useState(false);
  const onDatePress = () => setDatePickerShow(true);
  const onConfirmPicker = () => setDatePickerShow(false);
  const onClosePicker = () => setDatePickerShow(false);
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Report',
          headerBackTitle: 'Balance',
          headerBackground: () => <View className="flex-1" />,
        }}
      />
      <View className="relative flex-1 ">
        <View className="px-6">
          <DateTimePicker
            date={value}
            isVisible={datePickerShow}
            mode="date"
            onConfirm={(date) => {
              onConfirmPicker();
              setValue(date);
            }}
            onCancel={onClosePicker}
          />
          <TouchableOpacity onPress={onDatePress}>
            <Input
              label={'Date'}
              editable={false}
              icon={<DateIcon />}
              value={value?.toLocaleDateString('ru-RU') ?? ''}
            />
          </TouchableOpacity>
        </View>
        <View className="absolute bottom-0 w-full  px-6">
          <Button label={'Continue'} onPress={onContinue} />
        </View>
      </View>
      <View className="mt-12" />
    </>
  );
};

export default Report;
