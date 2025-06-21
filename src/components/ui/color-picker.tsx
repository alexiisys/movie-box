import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { View } from '@/components/ui/index';
import { GradientVariants, type GradientVariantType } from '@/lib/consts';

type ColorPickerProps = {
  value?: GradientVariantType;
  onChange?: (selectedCurrency: GradientVariantType) => void;
};

const ColorPicker = ({
  value = 'blue',
  onChange = () => {},
}: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] =
    React.useState<GradientVariantType>(value);

  const onSelectColor = (currency: GradientVariantType) => {
    setSelectedColor(currency);
    onChange(currency);
  };

  return (
    <View className="flex-row gap-2 self-start">
      {(Object.keys(GradientVariants) as GradientVariantType[]).map(
        (color: GradientVariantType) => (
          <View
            key={color}
            className={`rounded-2xl border ${selectedColor === color ? 'border-app-greyText' : 'border-white dark:border-app-darkBackground'} p-1`}
          >
            <LinearGradient
              start={[0, 1]}
              style={{ borderRadius: 12 }}
              end={[1.16, 0]}
              colors={GradientVariants[color]}
            >
              <TouchableOpacity
                className="rounded-3xl p-3"
                onPress={() => onSelectColor(color)}
              />
            </LinearGradient>
          </View>
        )
      )}
    </View>
  );
};

export default ColorPicker;
