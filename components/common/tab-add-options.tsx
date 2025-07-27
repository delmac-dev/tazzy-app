import { useRouter } from 'expo-router';
import { cn } from 'lib/utils';
import { CalendarDotsIcon, ListChecksIcon, PlusIcon } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { Modal, Pressable, TouchableOpacity, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import colors from 'tailwindcss/colors';

type Props = {
  visible: boolean, 
  closeModal: () => void,
  setOpenActivitySheet: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenScheduleSheet: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function TabAddOptions({visible, closeModal, setOpenActivitySheet, setOpenScheduleSheet}:Props) {
  const router = useRouter();
  const [internalVisible, setInternalVisible] = useState(false);

  // Shared animated values
  const rotation = useSharedValue(0);
  const taskX = useSharedValue(56);
  const taskY = useSharedValue(70);
  const schedX = useSharedValue(-56);
  const schedY = useSharedValue(70);

  const taskOpacity = useSharedValue(0);
  const schedOpacity = useSharedValue(0);

  // Animated styles for rotation
  const plusStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }]
  }));

  // Animated styles for task button
  const taskStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: taskX.value },
      { translateY: taskY.value },
    ],
    opacity: taskOpacity.value,
  }));

  // Animated styles for schedule button
  const schedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: schedX.value },
      { translateY: schedY.value },
    ],
    opacity: schedOpacity.value,
  }));

  const actuallyCloseModal = () => {
    setInternalVisible(false);
    closeModal();
  };

  const playOpenAnimation = () => {
    rotation.value = withTiming(45, { duration: 200 });
    
    taskX.value = withTiming(0, { duration: 200 });
    taskY.value = withTiming(0, { duration: 200 });
    
    schedX.value = withTiming(0, { duration: 200 });
    schedY.value = withTiming(0, { duration: 200 });
    
    taskOpacity.value = withTiming(1, { duration: 200 });
    schedOpacity.value = withTiming(1, { duration: 200 });
  };

  const playCloseAnimation = () => {
    rotation.value = withTiming(0, { duration: 200 });
    
    taskX.value = withTiming(56, { duration: 200 });
    taskY.value = withTiming(70, { duration: 200 });
    
    schedX.value = withTiming(-56, { duration: 200 });
    schedY.value = withTiming(70, { duration: 200 });
    
    taskOpacity.value = withTiming(0, { duration: 200 });
    schedOpacity.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(actuallyCloseModal)(); // After animation completes, actually close the modal
    });
  };

  useEffect(() => {
    if (visible) {
      setInternalVisible(true);
      playOpenAnimation();
    } else if (internalVisible) {
      playCloseAnimation(); // Play closing animation, modal will close when animation completes
    }
  }, [visible, internalVisible]);

  const handleClose = () => {
    playCloseAnimation();
  };

  const actionButtons = [
    {
      style: [taskStyle],
      className: "absolute bottom-20 -left-16",
      onPress: () => {
        playCloseAnimation();
        setOpenActivitySheet(true);
      },
      icon: ListChecksIcon,
      fill: true
    },
    {
      style: [schedStyle],
      className: "absolute bottom-20 -right-16",
      onPress: () => {
        playCloseAnimation();
        setOpenScheduleSheet(true);
      },
      icon: CalendarDotsIcon,
      fill: true
    },
    {
      style: [plusStyle],
      className: "relative",
      onPress: handleClose,
      icon: PlusIcon,
      fill: false
    },
  ]

  return (
    <Modal
      // backdropColor="rgba(0, 0, 0, 0.05)"
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableOpacity 
        className="relative flex-1 justify-end items-center"
        activeOpacity={1} 
        onPress={handleClose}
      >
        <View className='relative'>
          {actionButtons.map((btn, index) => (
            <Animated.View key={index} style={btn.style} className={cn("overflow-hidden rounded-full", btn.className)}>
              <Pressable
                className="h-16 aspect-square bg-neutral-800 rounded-full flex items-center justify-center"
                onPress={btn.onPress}
                android_ripple={{
                  color: colors.neutral[700],
                  borderless: false,
                  radius: 48,
                }}
              >
                <btn.icon size={28} color={colors.neutral[50]} weight={btn.fill? 'fill': 'regular'} />
                </Pressable>
            </Animated.View>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}