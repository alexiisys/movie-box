import React from 'react';

import { Text } from '@/components/ui';

type ChipProps = {
  label: string;
  variant?: 'light' | 'solid';
};

const Chip = ({ label, variant = 'light' }: ChipProps) => {
  return (
    <Text
      className={`rounded-sm  px-3 py-px ${variant === 'light' ? 'bg-light text-textGrey' : 'bg-lightGrey2 text-base text-black'}`}
    >
      {label}
    </Text>
  );
};

export default Chip;
