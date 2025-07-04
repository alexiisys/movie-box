import Svg, { Path, type SvgProps } from 'react-native-svg';
export const Search = ({
  color = '#B7BECC',
  width = 20,
  height = 20,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M17.5 17.5L15.6917 15.6917L15.2396 15.2396"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
