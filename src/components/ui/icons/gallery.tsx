import Svg, { Path, type SvgProps } from 'react-native-svg';

export const Gallery = ({
  color = '#848B96',
  width = 25,
  height = 25,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 25 25" fill="none" {...props}>
    <Path
      d="M19.1758 3.20937H5.17578C4.07121 3.20937 3.17578 4.1048 3.17578 5.20937V19.2094C3.17578 20.3139 4.07121 21.2094 5.17578 21.2094H19.1758C20.2804 21.2094 21.1758 20.3139 21.1758 19.2094V5.20937C21.1758 4.1048 20.2804 3.20937 19.1758 3.20937Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.17578 11.2094C10.2804 11.2094 11.1758 10.3139 11.1758 9.20937C11.1758 8.1048 10.2804 7.20937 9.17578 7.20937C8.07121 7.20937 7.17578 8.1048 7.17578 9.20937C7.17578 10.3139 8.07121 11.2094 9.17578 11.2094Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.1758 15.2094L18.0898 12.1234C17.7147 11.7484 17.2061 11.5378 16.6758 11.5378C16.1455 11.5378 15.6368 11.7484 15.2618 12.1234L6.17578 21.2094"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
