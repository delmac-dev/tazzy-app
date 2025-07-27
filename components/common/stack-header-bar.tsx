import { View, Text, Pressable } from 'react-native'
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { CaretLeftIcon } from 'phosphor-react-native';
import colors from 'tailwindcss/colors';

export default function StackHeaderBar(props: NativeStackHeaderProps) {
  return (
    <View className='w-full pt-safe bg-neutral-50'>
      <View className='relative h-12 flex-row items-center justify-center px-5'>
        <View className='absolute left-0 bottom-0 overflow-hidden aspect-square h-full rounded-full'>
          <Pressable 
            className='aspect-square h-full justify-center items-center rounded-full'
            android_ripple={{ color: colors.neutral[200] }}
            onPress={() => props.navigation.goBack()}
          >
            <CaretLeftIcon color={colors.neutral[500]} size={20} weight='bold' />
          </Pressable>
        </View>
        <View className='flex-1 justify-center items-center'>
          <Text className='text-xl font-medium text-neutral-800'>
            {props.options.title ?? props.route.name}
          </Text>
        </View>
      </View>
    </View>
  )
}