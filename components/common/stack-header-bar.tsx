import { View, Text, Pressable } from 'react-native'
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { CaretLeftIcon, Icon } from 'phosphor-react-native';
import colors from 'tailwindcss/colors';

type Props = {
  icon?: Icon,
  children?: React.ReactNode
} & NativeStackHeaderProps;

export default function StackHeaderBar(props: Props) {
  return (
    <View className='w-full pt-safe bg-neutral-50'>
      <View className='relative h-14 flex-row items-center justify-center px-5'>
        <View className='absolute left-0 bottom-0 overflow-hidden aspect-square h-full rounded-full'>
          <Pressable 
            className='aspect-square h-full justify-center items-center rounded-full'
            android_ripple={{ color: colors.neutral[200] }}
            onPress={() => props.navigation.goBack()}
          >
            <CaretLeftIcon color={colors.neutral[600]} size={20} weight='bold' />
          </Pressable>
        </View>
        <View className='flex-1 flex-row justify-center items-center'>
          <Text className='text-lg font-medium text-neutral-700'>
            {props.options.title ?? props.route.name}
          </Text>
          {props.icon? (<props.icon  />) : null}
        </View>
        {props.children}
      </View>
    </View>
  )
}