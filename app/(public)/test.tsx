import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  StatusBar,
  ScrollView,
  FlatList
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import KeyboardScrollView from '~/components/common/keyboard-scrollview';

export default function Test() {
  const additionalScrollHeight = 0;
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollPositionRef = useRef<number>(0);
  const scrollContentSizeRef = useRef<number>(0);
  const scrollViewSizeRef = useRef<number>(0);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [additionalPadding, setAdditionalPadding] = useState(0);

  const scroll_to_position = useCallback((toPosition: number, animated?: boolean) => {
    scrollViewRef.current?.scrollTo({ y: toPosition, animated: !!animated });
    scrollPositionRef.current = toPosition;
  }, []);

  const additional_scroll = useMemo(() => additionalScrollHeight ?? 0, [additionalScrollHeight],);

  const android_statusbar_offset = useMemo(() => StatusBar.currentHeight ?? 0,[]);

  useEffect(() => {
      const didShowListener = Keyboard.addListener('keyboardDidShow', frames => {
        const keyboardY = frames.endCoordinates.screenY;
        const keyboardHeight = frames.endCoordinates.height;
        setAdditionalPadding(Math.ceil(keyboardHeight));

        console.log('Keyboard shown', frames);
        
    
        setTimeout(() => {
          setIsKeyboardVisible(true);
        }, 100);
  
        // const currentlyFocusedInput = TextInput.State.currentlyFocusedInput();
        // const currentScrollY = scrollPositionRef.current;
  
        // currentlyFocusedInput?.measureInWindow((_x, y, _width, height) => {
        //   const endOfInputY = y + height + ANDROID_STATUSBAR_OFFSET;
        //   const deltaToScroll = endOfInputY - keyboardY;
  
        //   if (deltaToScroll < 0) {
        //     return;
        //   }
  
        //   const scrollPositionTarget =
        //     currentScrollY + deltaToScroll + ADDITIONAL_SCROLL;
        //     SCROLL_TO_POSITION(scrollPositionTarget, true);
        // });
      });
  
      const didHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setAdditionalPadding(0);
        setIsKeyboardVisible(false);
      });
  
      const willHideListener = Keyboard.addListener('keyboardWillHide', frames => {
          // iOS only, scroll back to initial position to avoid flickering
          // const keyboardHeight = frames.endCoordinates.height;
          // const currentScrollY = scrollPositionRef.current;
  
          // if (currentScrollY <= 0) {
          //   return;
          // }
  
          // const scrollPositionTarget = currentScrollY - keyboardHeight;
          // scroll_to_position(scrollPositionTarget, true);
        },
      );
  
      return () => {
        didShowListener.remove();
        didHideListener.remove();
        willHideListener.remove();
      };
    }, [additional_scroll, android_statusbar_offset, scroll_to_position]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView 
        contentContainerStyle={{ padding: 20 }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <View key={i} className="mb-5">
            <Text className="mb-2 font-bold">Field {i + 1}</Text>
            <TextInput
              placeholder={`Enter text for Field ${i + 1}`}
              className="border border-gray-300 rounded px-4 py-3"
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
};