import { useKeyboardHandler } from "react-native-keyboard-controller";
import { useSharedValue, withTiming } from "react-native-reanimated";
 
export const useGradualAnimation = (offset:number = 0) => {
 
  const height = useSharedValue(offset);
 
  useKeyboardHandler({
    onMove: (e) => {
      "worklet";
      height.value = withTiming(
        e.height > 0 ? Math.max(e.height + offset, offset) : offset,
        { duration: 250 }
      );
    },
  },[]);
  
  return { height };
};