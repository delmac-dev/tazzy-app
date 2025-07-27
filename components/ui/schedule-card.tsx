import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { CaretRightIcon } from 'phosphor-react-native';
import colors from 'tailwindcss/colors';
import { useRouter } from 'expo-router';
import kebabCase from 'lodash.kebabcase';

export type Props = {
  name: string;
  color: "blue" | "red" | "green" | "yellow" | "purple" | "orange";
  emoji: string;
}

const ScheduleCard = React.memo((props: Props) => {
  const router = useRouter();

  return (
    <View className='w-full px-5 py-1 bg-neutral-50'>
      <View className='overflow-hidden rounded-lg border border-neutral-200/70'>
        <Pressable 
          className='flex-row items-center justify-between p-4 bg-white'
          android_ripple={{ color: colors.neutral[100] }}
          onPress={() => router.push(`schedules/${kebabCase(props.name)}`) }
        >
          <View className='flex-row items-center gap-4'>
            <View className='aspect-square h-14 rounded-full justify-center items-center' style={{ backgroundColor: colors[props.color][100] }}>
              <Text className='text-2xl text-white text-center'>{props.emoji}</Text>
            </View>
            <View className='flex-col items-start'>
              <Text className='text-base font-medium text-neutral-600'>
                {props.name}
              </Text>
              <View className='flex-row items-center'>
                <Text className='text-sm font-normal text-neutral-500'>Personal</Text>
                <Text  className='text-xl text-neutral-500 mx-1'>•</Text>
                <Text className='text-sm font-normal text-neutral-500'>{Math.floor(Math.random() * 100)} Activities</Text>
              </View>
            </View>
          </View>
          <View>
            <CaretRightIcon color={colors.neutral[400]} size={14} weight='bold' />
          </View>
        </Pressable>
      </View>
    </View>
  )
});

export default ScheduleCard;