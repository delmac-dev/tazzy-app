import { Icon } from 'phosphor-react-native';
import { View, Text, TextInput } from 'react-native';
import colors from 'tailwindcss/colors';

interface Props extends React.ComponentProps<typeof TextInput> {
  icon: Icon
}

export default function InputTypeOne({icon, ...rest}: Props) {
  const Icon = icon;
  
  return (
    <View className="w-full h-14 flex-row items-center gap-2 px-4 border-b border-neutral-300">
      <View>
        <Icon size={20} weight='regular' color={colors.neutral[950]} />
      </View>
      <TextInput
        className="bg-neutral-50 flex-1 h-full px-3 py-2 text-base rounded-t-md caret-neutral-800"
        {...rest}
      />
    </View>
  )
}