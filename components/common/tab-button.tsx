import { Icon } from "phosphor-react-native";
import { Pressable } from "react-native";

type TabBarButtonProps = {
  icon: Icon
  isFocused: boolean
  onPress: () => void
}

export default function TabButton(props: TabBarButtonProps) {
  return (
    <Pressable
      onPress={() => !props.isFocused? props.onPress(): null}
      className='flex-1 h-full items-center justify-center'
    >
      <props.icon size={28} color={props.isFocused ? '#0284c7': '#141414'} weight={props.isFocused? "duotone": "regular"} />
    </Pressable>
  )
}