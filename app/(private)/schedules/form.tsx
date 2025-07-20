import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { IFormType } from '~/lib/types';

export default function ScheduleForm() {
  const params = useLocalSearchParams<IFormType>();
  
  // TODO: if type is new then no fetch, default values in tasks form

  // TODO: if type is not new then fetch the task and pre fill form with data
  // TODO: if actionAfterCreate is router.back() , after creating go to prev screen or by default go the schedules/newID

  return (
    <View>
      <Text>ScheduleForm</Text>
    </View>
  )
}