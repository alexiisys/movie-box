import Svg, { Path, type SvgProps } from 'react-native-svg';

export const ArrowLeft = ({
  color = 'black',
  width = 24,
  height = 24,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 19L5 12L12 5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19 12L5 12"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
