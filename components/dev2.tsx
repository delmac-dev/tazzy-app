import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import colors from 'tailwindcss/colors';
import Button from './button';
import { cn } from '~/lib/utils';

type Props = {
  title: string;
  emoji: string;
  className?: string;
  color: "blue" | "red" | "green" | "yellow" | "purple" | "orange";
  btns?: Array<{ action?: () => void; label: string }>;
};

export default function Dev2(props: Props) {
  return (
    <View className={cn('flex-1 bg-neutral-50 justify-center items-center gap-4 px-5', props.className)}>
      <View className='p-1 border border-neutral-200 rounded-full'>
        <View className='aspect-sqaure p-6 rounded-full' style={{ backgroundColor: colors[props.color][100] }}>
          <Text className='text-3xl text-white text-center'>{props.emoji}</Text>
        </View>
      </View>
      <View className='w-full items-center'>
        <Text className='text-lg font-semibold text-neutral-600 mb-4'>
          {props.title}
        </Text>
      </View>
      {props.btns && props.btns.map((btn, index) => (
        <View key={index} className='mb-2'>
          <Button title={btn.label} theme='dark1' onPress={btn.action}/>
        </View>
      ))}
    </View>
  )
}