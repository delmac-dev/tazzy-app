import { View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BellSimpleIcon, UserIcon, HouseSimpleIcon, TimerIcon } from "phosphor-react-native";
import TabAddButton from './tab-add-button';
import TabButton from './tab-button';

export default function TabBar({ state, navigation }:BottomTabBarProps){
  return (
    <View className='relative flex flex-row justify-between items-center elevation-lg px-5 h-16 bg-neutral-100'>
      <TabButton
        icon={HouseSimpleIcon}
        isFocused={state.index === 0}
        onPress={() => navigation.navigate('index')}
      />
      <TabButton
        icon={TimerIcon}
        isFocused={state.index === 3}
        onPress={() => navigation.navigate('schedules')}
      />
      <TabAddButton />
      <TabButton
        icon={BellSimpleIcon}
        isFocused={state.index === 4}
        onPress={() => navigation.navigate('notifications')}
      />
      <TabButton
        icon={UserIcon}
        isFocused={state.index === 1}
        onPress={() => navigation.navigate('account')}
      />
    </View>
  )
}

