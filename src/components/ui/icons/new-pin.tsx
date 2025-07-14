import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const NewPin = ({
  width = 24,
  height = 24,
  color = '#000',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M14 9.45h-1v-1a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0v-1h1a1 1 0 0 0 0-2z"
      fill={color}
    />
    <Path
      d="M20.46 9.63A8.5 8.5 0 1 0 6 16.46l5.3 5.31a1 1 0 0 0 1.42 0L18 16.46a8.46 8.46 0 0 0 2.46-6.83zM16.6 15.05L12 19.65l-4.6-4.6A6.49 6.49 0 0 1 5.53 9.83 6.57 6.57 0 0 1 8.42 5a6.47 6.47 0 0 1 7.16 0 6.57 6.57 0 0 1 2.89 4.81 6.49 6.49 0 0 1-2.27 5.24z"
      fill={color}
    />
  </Svg>
);
