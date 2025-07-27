import { Tabs } from "expo-router";
import TabBar from "components/common/tab-bar";
import TabHeaderBar from "~/components/common/tab-header-bar";

export default function Layout() {

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        header: (props)=> <TabHeaderBar {...props} />,
        animation: "fade"
      }}
    >
      <Tabs.Screen name="index" options={{title: "Home"}} />
      <Tabs.Screen name="schedules" options={{title: "Schedules"}} />
      <Tabs.Screen name="notifications" options={{title: "Notifications"}} />
      <Tabs.Screen name="account" options={{title: "My Account"}} />
    </Tabs>
  )
}