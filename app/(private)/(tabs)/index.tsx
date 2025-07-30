import { useRouter } from 'expo-router';
import { Alert, Dimensions, Pressable, SectionList, Text, View, VirtualizedList } from 'react-native';
import { eachDayOfInterval, startOfWeek, endOfWeek, format, addDays } from 'date-fns';
import { ArrowDownIcon, CaretDownIcon } from 'phosphor-react-native';
import colors from 'tailwindcss/colors';
import TaskDateCategory from '~/components/ui/task-date-category';
import TaskCard from '~/components/ui/task-card';
import { useCallback } from 'react';
import { MOCK_TASKS } from '~/lib/constants';

export default function Index() {
  const router = useRouter();
  const { width: SCREEN_WIDTH } = Dimensions.get("screen");
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  const daysThisWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

const renderItem = useCallback(({ item }: { item: any}) => (
  item.type === 'header' ? (
    <TaskDateCategory title={item.text} />):(
    <TaskCard title={item.text} />
  )), []);

  return (
    <View className='flex-1 bg-neutral-50 pb-2'>
      <View className='w-full gap-5 py-5 '>
        <View className='w-full px-5 justify-between items-center flex-row'>
          <View className='p-4 py-2 rounded-full bg-neutral-100'>
            <Text className='text-base font-medium text-neutral-700'> July 2025 </Text>
          </View>
          <View className='overflow-hidden rounded-full'>
            <Pressable
              className='p-3 py-2 rounded-full flex-row items-center bg-neutral-100'
              android_ripple={{color: colors.neutral[200]}}
            >
              <Text className='text-base font-medium text-neutral-700'> 21 </Text>
              <CaretDownIcon size={12} weight='bold' color={colors.neutral[500]} />
            </Pressable>
          </View>
        </View>
        <View className='flex-row items-center justify-start gap-3' style={{ height: SCREEN_WIDTH * 0.17 }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <View key={index} className='aspect-square h-full justify-center items-center rounded-full bg-neutral-100 border border-neutral-200'>
              <Text className='text-sm font-semibold text-neutral-600'>
                {format(daysThisWeek[index], 'dd')}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <VirtualizedList
        data={MOCK_TASKS}
        initialNumToRender={7}
        getItemCount={() => MOCK_TASKS.length}
        getItem={(data, index) => data[index]}
        keyExtractor={(item) => item.id}
        className='bg-neutral-50'
        renderItem={renderItem}
      />
    </View>
  );
}
