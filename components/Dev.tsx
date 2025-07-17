import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

type Props = {
    title: string;
    children?: React.ReactNode
};

export const Dev = ({title, children}:Props) => {
    return (
        <View className="flex-1 w-full justify-center items-center gap-2 px-5 bg-neutral-100">
            <Text className="text-xl font-semibold text-neutral-950 mb-4">
                {title}
            </Text>
            {children}
        </View>

    )
}