import { View, Text, Pressable } from 'react-native'
import React from 'react'
import colors from 'tailwindcss/colors';
import { BellSimpleRingingIcon, CalendarCheckIcon, ChecksIcon, Icon } from 'phosphor-react-native';

export type Props = {
    id: string;
    type: string;
    title: string;
    body: string;
    date: string;
};

const NotificationCard = (props:Props) => {
  const Icons: Record<string, Icon> = {
    "reminder": BellSimpleRingingIcon,
    "schedule_sync": CalendarCheckIcon,
    "task_sync": ChecksIcon
  }

  const IconComponent = Icons[props.type];

  return (
    <View className='w-full px-5 py-1 bg-neutral-50'>
      <View className='overflow-hidden rounded-lg border border-neutral-200/70'>
        <Pressable 
          className='p-5 bg-white flex-row items-start justify-start gap-4'
          android_ripple={{ color: colors.neutral[100] }}
        >
          <View className='size-12 items-center justify-center rounded-full bg-neutral-100'>
            {IconComponent ? <IconComponent size={20} color={colors.neutral[600]} /> : null}
          </View>
          <View className='flex-1 gap-2'>
            <View>
              <Text className='text-sm font-medium text-neutral-700'>
                {props.title}
              </Text>
            </View>
            <View>
              <Text className='text-base font-normal text-neutral-600'>
                {props.body}
              </Text>
            </View>
            <View>
              <Text className='text-sm font-normal text-neutral-500 capitalize'>
                {props.date}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default NotificationCard;