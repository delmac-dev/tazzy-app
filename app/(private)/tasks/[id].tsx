import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function TaskDetails() {
  const params = useLocalSearchParams<{ id: string }>();
  const taskId = params.id;

  // TODO: fetch task from id 
  // TODO: render every detail
  // TODO: tap on header on top to go to edit screen

  return (
    <View className='flex-1 justify-center items-center bg-neutral-50'>
      <Text>Activity:</Text>
      <Text>{taskId}</Text>
      <Text>Details</Text>
    </View>
  )
}