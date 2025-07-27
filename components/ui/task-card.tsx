import { View, Text, Pressable } from 'react-native'
import React from 'react'
import colors from 'tailwindcss/colors';
import { useRouter } from 'expo-router';
import kebabCase from 'lodash.kebabcase';

type Props = {
  title: string
};

const TaskCard = React.memo((props: Props) => {
  const router = useRouter();
  
  return (
    <View className='w-full px-5 py-1 bg-neutral-50'>
      <View className='overflow-hidden rounded-lg border border-neutral-200/70'>
        <Pressable 
          className='p-5 bg-white items-start justify-start gap-2'
          android_ripple={{ color: colors.neutral[100] }}
          onPress={() => router.push(`tasks/${kebabCase(props.title)}`)}
        >
          <View className='w-full flex-row justify-between items-center'>
            <View className='flex-row items-center gap-2'>
              <Text className='text-base'>📚</Text>
              <Text className='text-sm font-medium text-neutral-500'>CE2: Semester 1</Text>
            </View>
            <View className='flex-row items-center gap-2'>
              <Text className='text-sm font-medium text-neutral-500'>7:15</Text>
              <Text className='text-sm font-medium text-neutral-500'>-</Text>
              <Text className='text-sm font-medium text-neutral-500'>10:20</Text>
            </View>
          </View>
          <View>
            <Text className='text-lg font-neutral text-neutral-700'>
              {props.title}
            </Text>
          </View>
          <View className='flex-row items-center'>
            <Text className='text-sm font-normal text-neutral-500'>Personal</Text>
            <Text  className='text-xl text-neutral-500 mx-1'>•</Text>
            <Text className='text-sm font-normal text-neutral-500'>Reschedule</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
});

export default TaskCard;