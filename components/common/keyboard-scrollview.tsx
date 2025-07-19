import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Keyboard, ScrollView, TextInput, StatusBar, View, Dimensions} from 'react-native';

interface Props extends React.ComponentProps<typeof ScrollView> {
  additionalScrollHeight?: number;
}

const KeyboardScrollView = ({
  children,
  additionalScrollHeight,
  contentContainerStyle,
  ...props
}: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollPositionRef = useRef<number>(0);
  const scrollContentSizeRef = useRef<number>(0);
  const scrollViewSizeRef = useRef<number>(0);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [additionalPadding, setAdditionalPadding] = useState(0);

  const SCREEN_HEIGHT = Dimensions.get('screen').height;

  const SCROLL_TO_POSITION = useCallback(
    (toPosition: number, animated?: boolean) => {
      scrollViewRef.current?.scrollTo({y: toPosition, animated: !!animated});
      scrollPositionRef.current = toPosition;
    },[]);

  const ADDITIONAL_SCROLL = useMemo(
    () => additionalScrollHeight ?? 0,
    [additionalScrollHeight],
  );
  const ANDROID_STATUSBAR_OFFSET = useMemo(
    () => StatusBar.currentHeight ?? 0,
    [],
  );

  useEffect(() => {
    const didShowListener = Keyboard.addListener('keyboardDidShow', frames => {
      const keyboardY = frames.endCoordinates.screenY;
      const keyboardHeight = frames.endCoordinates.height;
      setAdditionalPadding(Math.ceil(keyboardHeight));
  
      setTimeout(() => {
        setIsKeyboardVisible(true);
      }, 100);

      const currentlyFocusedInput = TextInput.State.currentlyFocusedInput();
      const currentScrollY = scrollPositionRef.current;

      currentlyFocusedInput?.measureInWindow((_x, y, _width, height) => {
        const endOfInputY = y + height + ANDROID_STATUSBAR_OFFSET;
        const deltaToScroll = endOfInputY - keyboardY;

        if (deltaToScroll < 0) {
          return;
        }

        const scrollPositionTarget =
          currentScrollY + deltaToScroll + ADDITIONAL_SCROLL;
          SCROLL_TO_POSITION(scrollPositionTarget, true);
      });
    });

    const didHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setAdditionalPadding(0);
      setIsKeyboardVisible(false);
    });

    const willHideListener = Keyboard.addListener(
      'keyboardWillHide',
      frames => {
        // iOS only, scroll back to initial position to avoid flickering
        const keyboardHeight = frames.endCoordinates.height;
        const currentScrollY = scrollPositionRef.current;

        if (currentScrollY <= 0) {
          return;
        }

        const scrollPositionTarget = currentScrollY - keyboardHeight;
        SCROLL_TO_POSITION(scrollPositionTarget, true);
      },
    );

    return () => {
      didShowListener.remove();
      didHideListener.remove();
      willHideListener.remove();
    };
  }, [ADDITIONAL_SCROLL, ANDROID_STATUSBAR_OFFSET, SCROLL_TO_POSITION]);

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={[contentContainerStyle]}
      contentInset={{bottom: additionalPadding}}
      keyboardShouldPersistTaps="never"
      onMomentumScrollEnd={event => {
        scrollPositionRef.current = event.nativeEvent.contentOffset.y;
      }}
      onScrollEndDrag={event => {
        scrollPositionRef.current = event.nativeEvent.contentOffset.y;
      }}
      onLayout={event => {
        scrollViewSizeRef.current = event.nativeEvent.layout.height;
      }}
      onContentSizeChange={(_width, height) => {
        const currentContentHeight = scrollContentSizeRef.current;
        const contentSizeDelta = height - currentContentHeight;
        scrollContentSizeRef.current = height;
        if (!isKeyboardVisible) {
          return;
        }
        const currentScrollY = scrollPositionRef.current;
        const scrollPositionTarget = currentScrollY + contentSizeDelta;
        SCROLL_TO_POSITION(scrollPositionTarget, true);
      }}
      {...props}
    >
      <View
        style={{
          minHeight: Math.max((scrollViewSizeRef.current || SCREEN_HEIGHT) - additionalPadding, 0),
        }}
      >
        {children}
      </View>
    </ScrollView>
  );
};

export default KeyboardScrollView;