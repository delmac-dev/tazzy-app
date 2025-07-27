import { useNavigation } from 'expo-router';
import { LockSimpleIcon, UserIcon } from 'phosphor-react-native';
import { useLayoutEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
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
      <View className='flex-1 gap-5 py-5'>
        {/* <TextInput label="Username" icon={UserIcon} editable={false} />
        <TextInput label='Password' icon={LockSimpleIcon} viewSwitchable={true} secureTextEntry={true} /> */}
        <Button label='Sign Up' />
        <ColorSelectInput />
        <SearchInput />
        <LocationSelectInput />
        <TextSelectInput />
        <EmojiSelectInput />
        <AvatarSelectInput />
      </View>
      <Animated.View style={keyboardPadding} />
    </View>
  )
};