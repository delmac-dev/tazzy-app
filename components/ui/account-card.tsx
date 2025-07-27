import { View, Text, Pressable } from 'react-native';
import { CaretRightIcon, Icon } from 'phosphor-react-native';
import colors from 'tailwindcss/colors';
import { cn } from '~/lib/utils';

export type Props = {
  data: {
    name: string,
    icon: Icon,
    type: "page" | "sheet" | "default",
    action: () => void,
    leftSection?: string
  }[]
};

export default function AccountCard({data}: Props) {
  return (
    <View className='mx-5 px-2 rounded-xl bg-white border border-neutral-200 overflow-hidden'>
      {data.map((item, index) => (
        <View key={item.name} className={cn('overflow-hidden border-b border-neutral-200', data.length === (index+1) && "border-b-0")}>
          <Pressable
            className='px-1 py-4 flex-row items-center gap-2'
            android_ripple={{ color: colors.neutral[100] }}
            onPress={item.action}
          >
            <View>
              <item.icon size={18} color={colors.neutral[600]} weight='bold' />
            </View>
            <View className='flex-1'>
              <Text className='text-sm font-medium text-neutral-600'>{item.name}</Text>
            </View>
            <View>
              {item.type === "page"? (
                <CaretRightIcon size={14} color={colors.neutral[500]} />
              ): item.leftSection && item.type === "sheet" ? (
                <Text className='w-full text-sm font-medium text-neutral-500 capitalize'>{item.leftSection}</Text>
              ): null}
            </View>
          </Pressable>
        </View>
      ))}
    </View>
  )
};

