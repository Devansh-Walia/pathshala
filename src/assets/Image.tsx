import Svg, { Rect, Circle, Path, SvgProps } from 'react-native-svg'

function ImageIcon(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
      <Circle cx={8.5} cy={8.5} r={1.5} />
      <Path d="M21 15L16 10 5 21" />
    </Svg>
  )
}

export default ImageIcon
