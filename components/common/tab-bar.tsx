import { Pressable, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BellSimpleIcon, UserIcon, HouseSimpleIcon, TimerIcon, PlusIcon, PencilSimpleLineIcon, LinkBreakIcon, PuzzlePieceIcon } from "phosphor-react-native";
import TabButton from './tab-button';
import { useState } from 'react';
import TabAddOptions from './tab-add-options';
import colors from 'tailwindcss/colors';
import MoreActionsSheet from './more-actions-sheet';
import AccountCard, { Props as IAccountCard } from '../ui/account-card';
import { useRouter } from 'expo-router';

export default function TabBar({ state, navigation }:BottomTabBarProps){
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [openActivitySheet, setOpenActivitySheet] = useState(false);
  const [openScheduleSheet, setOpenScheduleSheet] = useState(false);

  const activityOptions:IAccountCard["data"] = [
    { 
      name: "Start from scratch", 
      icon: PencilSimpleLineIcon , 
      type: "page",
      action: () => {
        setOpenActivitySheet(false);
        router.push({pathname: "tasks/form", params: { type: 'new' }});
      }, 
    },
    { 
      name: "Subscribe to an activity", 
      icon: LinkBreakIcon, 
      type: "page",
      action: () => {
        setOpenActivitySheet(false);
        router.push("open-activities");
      }, 
    },
  ];

  const scheduleOptions:IAccountCard["data"] = [
    { 
      name: "Start from scratch", 
      icon: PencilSimpleLineIcon , 
      type: "page",
      action: () => {
        setOpenScheduleSheet(false);
        router.push({pathname: "schedules/form", params: { type: 'new' }});
      }, 
    },
    { 
      name: "Use a template", 
      icon: PuzzlePieceIcon, 
      type: "page",
      action: () => {
        setOpenScheduleSheet(false);
        router.push("templates");
      },
    },
  ];

  return (
    <View className='relative flex flex-row justify-between items-center px-5 h-16 bg-neutral-50'>
      <TabButton
        icon={HouseSimpleIcon}
        isFocused={state.index === 0}
        onPress={() => navigation.navigate('index')}
      />
      <TabButton
        icon={TimerIcon}
        isFocused={state.index === 1}
        onPress={() => navigation.navigate('schedules')}
      />
      <View className='overflow-hidden rounded-full mx-3'>
        <Pressable
          className="h-16 aspect-square bg-neutral-800 rounded-full flex items-center justify-center"
          onPress={() => setModalVisible(true)}
          android_ripple={{
            color: colors.neutral[700],
            borderless: false,
            radius: 32,
          }}
        >
          <PlusIcon size={28} color={colors.neutral[50]} />
        </Pressable>
      </View>
      <TabButton
        icon={BellSimpleIcon}
        isFocused={state.index === 2}
        onPress={() => navigation.navigate('notifications')}
      />
      <TabButton
        icon={UserIcon}
        isFocused={state.index === 3}
        onPress={() => navigation.navigate('account')}
      />
      <TabAddOptions 
        visible={modalVisible} 
        closeModal={() => setModalVisible(false)} 
        setOpenActivitySheet={setOpenActivitySheet}
        setOpenScheduleSheet={setOpenScheduleSheet}
      />
      <MoreActionsSheet open={openActivitySheet} setOpen={setOpenActivitySheet} label='New Activity'>
        <AccountCard data={[...activityOptions]} />
      </MoreActionsSheet>
      <MoreActionsSheet open={openScheduleSheet} setOpen={setOpenScheduleSheet} label='New Schedule'>
        <AccountCard data={[...scheduleOptions]} />
      </MoreActionsSheet>
    </View>
  )
}

