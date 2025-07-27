import { View, Text } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { IFormType } from '~/lib/types';
import { useLayoutEffect } from 'react';

export default function TaskForm() {
  const params = useLocalSearchParams<IFormType>();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${params.type === 'new' ? 'New Task' : 'Edit Task'}`,
      headerShown: true,
    });
  }, [navigation]);

  // TODO: if type is new then no fetch, default values in tasks form

  // TODO: if type is not new then fetch the task and pre fill form with data

  return (
    <View className='flex-1 justify-center items-center bg-neutral-50'>
      <Text>
        {params.type === 'new' ? 'Create New Task' : 'Edit Task'}
      </Text>
    </View>
  )
}