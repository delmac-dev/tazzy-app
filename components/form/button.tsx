import { View, Text, PressableProps, Pressable } from 'react-native'
import React from 'react'
import { cn } from '~/lib/utils'
import colors from 'tailwindcss/colors'
import SvgLoader from '../common/loader'

type Props = PressableProps & {
  label: string
}

export default function Button({ label, className, ...rest}: Props) {
  return (
    <View className='mx-5 overflow-hidden rounded-full '>
      <Pressable
        className={cn('w-full items-center bg-neutral-800 rounded-full py-3', className)}
        android_ripple={{color: colors.neutral[700]}}
        {...rest}
      >
        <Text className='text-sm font-medium text-neutral-200'>
          {label}
        </Text>
      </Pressable>
    </View>
  )
}