import { View, Text } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { IScreenFormParams } from '~/lib/types';
import { useLayoutEffect } from 'react';

export default function TaskForm() {
  const params = useLocalSearchParams<IScreenFormParams>();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${params.type === 'new' ? 'New Activity' : 'Edit Activity'}`,
      headerShown: true,
    });
  }, [navigation]);

  // TODO: if type is new then no fetch, default values in tasks form

  // TODO: if type is not new then fetch the task and pre fill form with data

  return (
    <View className='flex-1 justify-center items-center bg-neutral-50'>
      <Text>schedule_id</Text>
      <Text>parent_activity</Text>
      <Text>type - default, recurring, instance, reschedule, extra</Text>
      <Text>accessibility - private, public</Text>
      <Text>name</Text>
      <Text>start_time</Text>
      <Text>end_time</Text>
      <Text>date</Text>
      <Text>recurrence</Text>
      <Text>location</Text>
      <Text>metadata</Text>
    </View>
  )
}