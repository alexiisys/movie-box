import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, {
  ClipPath,
  Defs,
  FeBlend,
  FeColorMatrix,
  FeComposite,
  FeFlood,
  FeGaussianBlur,
  FeOffset,
  Filter,
  G,
  Path,
  Rect,
} from 'react-native-svg';

export const PinCheckIcon = ({
  width = 31,
  height = 38,
  color = '#2E2E2E',
  accentColor = '#E2EA51',
  ...props
}: SvgProps & {
  width?: number;
  height?: number;
  color?: string;
  accentColor?: string;
}) => (
  <Svg width={width} height={height} viewBox="0 0 31 38" fill="none" {...props}>
    <Defs>
      <Filter
        id="dropShadow"
        x="0.4688"
        y="0"
        width="30.1899"
        height="38"
        filterUnits="userSpaceOnUse"
      >
        <FeFlood floodOpacity="0" result="BackgroundImageFix" />
        <FeColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <FeOffset dy="4" />
        <FeGaussianBlur stdDeviation="2" />
        <FeComposite in2="hardAlpha" operator="out" />
        <FeColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
        />
        <FeBlend in2="BackgroundImageFix" mode="normal" result="dropShadow" />
        <FeBlend in="SourceGraphic" in2="dropShadow" mode="normal" />
      </Filter>
      <ClipPath id="clip">
        <Rect width="31" height="38" fill="#fff" />
      </ClipPath>
    </Defs>

    <G filter="url(#dropShadow)" clipPath="url(#clip)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5637 0C9.43616 0 4.46875 4.9674 4.46875 11.095C4.46875 16.1871 11.8649 25.5914 15.2924 29.8698C15.3605 29.955 15.4544 30 15.5637 30C15.6728 30.0002 15.7666 29.9551 15.835 29.8702C19.1205 25.776 26.6587 16.327 26.6587 11.095C26.6587 4.9674 21.6913 0 15.5637 0ZM15.5637 5.26789C18.7744 5.26789 21.3773 7.87079 21.3773 11.0815C21.3773 14.2923 18.7745 16.8951 15.5637 16.8951C12.353 16.8951 9.75016 14.2923 9.75016 11.0815C9.75016 7.87079 12.353 5.26789 15.5637 5.26789Z"
        fill={color}
      />
      <Rect x={6.5637} y={2} width={18} height={18} rx={9} fill={color} />
      <Path
        d="M19.5637 8L14.0637 13.5L11.5637 11"
        stroke={accentColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
