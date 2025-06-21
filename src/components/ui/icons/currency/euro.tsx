import Svg, { Path, type SvgProps } from 'react-native-svg';

export const Euro = ({
  color = 'EF754A',
  width = 24,
  height = 24,
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M4 10h12" />
    <Path d="M4 14h9" />
    <Path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />
  </Svg>
);
