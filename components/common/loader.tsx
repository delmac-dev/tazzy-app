import React, { useEffect } from 'react';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import colors from 'tailwindcss/colors';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function SvgLoader() {
  const rotation = useSharedValue(0);

 useEffect(() => {
    rotation.value = withTiming(
      360 * 1000, // 1000 full spins
      { duration: 1000 } // 3s per spin
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <AnimatedSvg
      width={20}
      height={20}
      style={animatedStyle}
    >
      <Circle
        cx="10"
        cy="10"
        r="8"
        stroke={colors.neutral[200]}
        strokeWidth="2"
        fill="none"
        strokeDasharray="12.57 37.7"
      />
    </AnimatedSvg>
  );
}