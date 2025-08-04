import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

export const Edit = ({
  width = 19,
  height = 19,
  color = '#FFFFFF',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 19 19" fill="none" {...props}>
    <Defs>
      <ClipPath id="clip">
        <Rect
          width={18}
          height={18}
          fill="white"
          transform="translate(0.265625 0.262451)"
        />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip)">
      <Path
        d="M2.51562 13.2V16.0125H5.32812L13.6231 7.71746L10.8106 4.90496L2.51562 13.2Z"
        fill={color}
      />
      <Path
        d="M15.7981 5.54246C16.0906 5.24996 16.0906 4.77746 15.7981 4.48496L14.0431 2.72996C13.7506 2.43746 13.2781 2.43746 12.9856 2.72996L11.6131 4.10246L14.4256 6.91496L15.7981 5.54246Z"
        fill={color}
      />
    </G>
  </Svg>
);
