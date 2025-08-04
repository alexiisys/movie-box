import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Globe = ({
  color = '#001A72',
  width = 24,
  height = 24,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C12 21 16 18 16 12C16 6 12 3 12 3M12 21C12 21 8 18 8 12C8 6 12 3 12 3M3 12C3 7.02944 7.02944 3 12 3"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
