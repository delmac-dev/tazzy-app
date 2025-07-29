import { useNavigation } from 'expo-router';
import { MotiView } from 'moti';
import { LockSimpleIcon, PlusIcon, UserIcon } from 'phosphor-react-native';
import { useLayoutEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import colors from 'tailwindcss/colors';
import AvatarSelectInput from '~/components/form/avatar-select-input';
import Button from '~/components/form/button';
import ColorSelectInput from '~/components/form/color-select-input';
import EmojiSelectInput from '~/components/form/emoji-select-input';
import LocationSelectInput from '~/components/form/location-select-input';
import SearchInput from '~/components/form/search-input';
import TextInput from '~/components/form/text-input';
import TextSelectInput from '~/components/form/text-select-input';
import { useGradualAnimation } from '~/lib/hooks/use-gradual-animation';

export default function Test() {
  const { height } = useGradualAnimation();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Test Input",
      headerShown: true,
    });
  }, [navigation]);

  const keyboardPadding = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  }, []);

  return (
    <View className='flex-1 bg-neutral-50'>
      <View className='flex-1 gap-5 py-5 items-center justify-center'>
        {/* <TextInput label="Username" icon={UserIcon} editable={false} />
        <TextInput label='Password' icon={LockSimpleIcon} viewSwitchable={true} secureTextEntry={true} /> */}
        {/* <Button label='Sign Up' />
        <ColorSelectInput />
        <SearchInput />
        <LocationSelectInput />
        <TextSelectInput /> */}
        <EmojiSelectInput />
        {/* <AvatarSelectInput /> */}

        <MotiView
          from={{ rotate: '0deg' }}
          animate={{ rotate: visible ? '45deg' : '0deg' }}
          transition={{ type: 'timing', duration: 200 }}
          className="relative"
        >
          <Pressable
            className="h-16 aspect-square bg-neutral-800 rounded-full flex items-center justify-center"
            onPress={() => setVisible((prev) => !prev)}
          >
            <PlusIcon size={28} color={colors.neutral[50]} weight="regular" />
          </Pressable>
        </MotiView>
      </View>
      <Animated.View style={keyboardPadding} />
    </View>
  )
};