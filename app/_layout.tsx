import { Slot, Tabs } from "expo-router";
import "../global.css";
import { BellIcon, CalendarCheckIcon, HouseIcon, UserIcon } from "phosphor-react-native";

export default function RootLayout() {

    return (
        <Tabs
            
            screenOptions={{
                headerShadowVisible: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "black",
                tabBarStyle: {
                    height: 64,
                    paddingTop: 16,
                }
            }}
        >
            <Tabs.Screen 
                name="index" 
                options={{ 
                    title: "Home",
                    tabBarIcon: ({color, size}) => <HouseIcon size={size} color={color} weight="light" />
                }} 
            />
            <Tabs.Screen 
                name="schedules" 
                options={{ 
                    title: "Schedules",
                    tabBarIcon: ({color, size}) => <CalendarCheckIcon size={size} color={color} weight="light" />
                }} 
            />
            <Tabs.Screen 
                name="notifications" 
                options={{ 
                    title: "Notifications",
                    tabBarIcon: ({color, size}) => <BellIcon size={size} color={color} weight="duotone" />
                }} 
            />
            <Tabs.Screen 
                name="more" 
                options={{ 
                    title: "My Profile",
                    tabBarIcon: ({color, size}) => <UserIcon size={size} color={color} weight="light" />
                }} 
            />
        </Tabs>
    )
}