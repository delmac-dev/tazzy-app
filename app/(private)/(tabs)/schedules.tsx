import { useCallback } from "react";
import { View, VirtualizedList } from "react-native";
import ScheduleCard, {Props as ScheduleProps} from "~/components/ui/schedule-card";
import { MOCK_SCHEDULES } from "~/lib/constants";

export default function Schedules() {
  // TODO: show all schedules
  // TODO: no schedules show empty
  // TODO: delete schedules, archive done schedules
  // TODO: filter between active, done and archive

  const renderItem = useCallback(({ item }: { item: ScheduleProps}) => (
    <ScheduleCard {...item} />
  ),[]);

  return (
    <View className="flex-1 pb-2 bg-neutral-50">
      <VirtualizedList
        data={MOCK_SCHEDULES}
        getItemCount={() => MOCK_SCHEDULES.length}
        getItem={(data, index) => data[index]}
        keyExtractor={(item) => item.name}
        className='bg-neutral-50'
        renderItem={renderItem}
      />
    </View>
  )
}