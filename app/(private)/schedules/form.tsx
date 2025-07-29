import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { IFormType } from '~/lib/types';

export default function ScheduleForm() {
  const params = useLocalSearchParams<IFormType>();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${params.type === 'new' ? 'New Schedule' : 'Edit Schedule'}`,
      headerShown: true,
    });
  }, [navigation]);
  
  // TODO: if type is new then no fetch, default values in tasks form

  // TODO: if type is not new then fetch the task and pre fill form with data
  // TODO: if actionAfterCreate is router.back() , after creating go to prev screen or by default go the schedules/newID

  return (
    <View className='flex-1 justify-center items-center bg-neutral-50'>
      <Text>schedule type - private, template</Text>
      <Text>schedule emoji</Text>
      <Text>schedule color</Text>
      <Text>schedule name</Text>
    </View>
  )
}