import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

type Props = {
    title: string;
    links: {name: string, url: string}[];
};

export const Dev = ({title, links}:Props) => {
    return (
        <View className="flex-1 justify-center items-center gap-2 px-5 bg-neutral-100">
            <Text className="text-xl font-semibold text-neutral-950 mb-4">
                {title}
            </Text>

            {links.map(link => (
                <Link key={link.url} href={link.url} push asChild>
                    <Pressable className={"w-full bg-blue-500 px-2 py-3 rounded-full items-center"}>
                        <Text className="text-white font-bold text-sm">{link.name}</Text>
                    </Pressable>
                </Link>
            ))}
        </View>
    )
}