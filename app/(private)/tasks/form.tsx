import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { IFormType } from '~/lib/types';

export default function TaskForm() {
  const params = useLocalSearchParams<IFormType>();

  // TODO: if type is new then no fetch, default values in tasks form

  // TODO: if type is not new then fetch the task and pre fill form with data

  return (
    <View>
      <Text>TaskForm</Text>
    </View>
  )
}