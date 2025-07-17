import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { useAuthStore } from "lib/stores/auth-store";

export default function RootLayout() {
    const { isLoggedIn } = useAuthStore();

    return (
        <React.Fragment>
            <StatusBar style="auto" />
            <Stack>
                <Stack.Protected guard={isLoggedIn}>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}} />
                </Stack.Protected>
                <Stack.Protected guard={!isLoggedIn}>
                    <Stack.Screen name="login" />
                </Stack.Protected>
            </Stack>
        </React.Fragment>
    )
}