import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

export const Check = ({
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
        d="M16.6164 7.76246C16.9589 9.44343 16.7148 11.191 15.9248 12.7138C15.1347 14.2366 13.8465 15.4425 12.275 16.1304C10.7035 16.8184 8.94359 16.9468 7.28885 16.4942C5.6341 16.0417 4.18452 15.0355 3.18183 13.6435C2.17914 12.2515 1.68396 10.5579 1.77887 8.845C1.87378 7.13211 2.55303 5.50353 3.70336 4.23084C4.85369 2.95815 6.40556 2.11828 8.10017 1.8513C9.79479 1.58432 11.5297 1.90635 13.0156 2.76371"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.01562 8.51245L9.26562 10.7625L16.7656 3.26245"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
