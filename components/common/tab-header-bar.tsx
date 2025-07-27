import { View, Text } from 'react-native';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

export default function TabHeaderBar(props: BottomTabHeaderProps) {
  const { navigation, route, options } = props;
  const title = options.title ?? route.name;


  return (
    <View className='w-full pt-safe bg-neutral-50'>
      <View className='h-12 flex-row items-center justify-center px-5'>
        <Text className='text-xl font-medium text-neutral-800'>
          {title}
        </Text>
      </View>
    </View>
  )
}