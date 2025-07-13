import { Tabs } from "expo-router";
import TabBar from "components/common/tab-bar";
import "../global.css";

export default function RootLayout() {

    return (
        <Tabs
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{headerShown: false}}
        />
    )
}