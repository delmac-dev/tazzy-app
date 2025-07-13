import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

type Props = {
    title: string;
};

export const Dev = ({title}:Props) => {
    return (
        <View className="flex-1 justify-center items-center gap-2 px-5 bg-neutral-100">
            <Text className="text-xl font-semibold text-neutral-950 mb-4">
                {title}
            </Text>
        </View>
    )
}