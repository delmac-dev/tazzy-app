import { Tabs } from "expo-router";
import TabBar from "components/common/tab-bar";

export default function Layout() {

    return (
        <Tabs
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{headerShown: false}}
        />
    )
}