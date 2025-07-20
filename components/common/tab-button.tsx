import { Icon } from "phosphor-react-native";
import { Pressable, View } from "react-native";
import colors from "tailwindcss/colors";

type TabBarButtonProps = {
  icon: Icon
  isFocused: boolean
  onPress: () => void
}

export default function TabButton(props: TabBarButtonProps) {
  return (
    <View className="overflow-hidden flex-1 h-full items-center justify-center">
      <Pressable
        onPress={() => !props.isFocused? props.onPress(): null}
        className='w-full h-full items-center justify-center'
        android_ripple={{
          color: colors.neutral[200],
          borderless: false,
          radius: 48,
        }}
      >
        <props.icon size={28} color={colors.neutral[800]} weight={props.isFocused? "duotone": "regular"} />
      </Pressable>
    </View>
  )
}