import React from 'react';
import { View } from 'react-native';

import Chip from './chip';

type ChipsProps = {
  labels: string[];
  type: 'light' | 'solid';
};

const Chips = ({ labels, type }: ChipsProps) => {
  return (
    <View className="flex-row flex-wrap gap-2">
      {labels.map((label) => (
        <Chip label={label} key={label} variant={type} />
      ))}
    </View>
  );
};

export default Chips;
