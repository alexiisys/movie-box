import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Clapperboard = ({ color = '#000', ...props }: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M15 3.33337L16.6666 6.66671H14.1666L12.5 3.33337H10.8333L12.5 6.66671H9.99996L8.33329 3.33337H6.66663L8.33329 6.66671H5.83329L4.16663 3.33337H3.33329C2.41663 3.33337 1.67496 4.08337 1.67496 5.00004L1.66663 15C1.66663 15.9167 2.41663 16.6667 3.33329 16.6667H16.6666C17.5833 16.6667 18.3333 15.9167 18.3333 15V3.33337H15Z"
      fill={color}
    />
  </Svg>
);
