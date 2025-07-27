import { useCallback } from 'react';
import { View, Text, VirtualizedList } from 'react-native';
import TaskCard from '~/components/ui/task-card';

export default function ScheduleDetails() {
  // TODO: fetch all main tasks
  // TODO: tap on default task , go to task details screen
  // TODO: tap on task with recuring, reschedule, extra sub tasks open bottom sheet => goes to tasks details
  // TODO: tap on header to go to schedule edit form
  // TODO: tap on 3 dots on header , to delete schedule and replace to schedules screen on success
  // TODO: ai chat area at bottom to auto edit and add chat , prompt + file

  const tasks = [
    {"id": "0-0", "text": "Plan activity 1 on Today"},
    {"id": "0-1", "text": "Plan activity 2 on Today"},
    {"id": "0-2", "text": "Plan activity 3 on Today"}
  ];

  const renderItem = useCallback(({ item }: { item: any}) => (
    <TaskCard title={item.text} />
  ),[]);

  return (
    <View className='flex-1 pb-2 bg-neutral-50'>
      <VirtualizedList
        data={tasks}
        initialNumToRender={7}
        getItemCount={() => tasks.length}
        getItem={(data, index) => data[index]}
        keyExtractor={(item) => item.id}
        className='bg-neutral-50'
        renderItem={renderItem}
      />
    </View>
  )
}