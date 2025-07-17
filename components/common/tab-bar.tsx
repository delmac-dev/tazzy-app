import { Pressable, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BellSimpleIcon, UserIcon, HouseSimpleIcon, TimerIcon, PlusIcon } from "phosphor-react-native";
import TabButton from './tab-button';
import { useState } from 'react';
import TabAddOptions from './tab-add-options';

export default function TabBar({ state, navigation }:BottomTabBarProps){
  const [modalVisible, setModalVisible] = useState(false);

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
      <View className='overflow-hidden rounded-full mx-3'>
        <Pressable
          className="h-16 aspect-square bg-sky-600 rounded-full flex items-center justify-center"
          onPress={() => setModalVisible(true)}
          android_ripple={{
            color: "rgba(223, 242, 254, 0.2)",
            borderless: false,
            radius: 32,
          }}
        >
          <PlusIcon size={28} color="#fafafa" />
        </Pressable>
      </View>
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
      <TabAddOptions visible={modalVisible} closeModal={() => setModalVisible(false)} />
    </View>
  )
}

