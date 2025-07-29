import 'react-native-reanimated'; 
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useUserStore } from '~/lib/stores/user-store';
import { supabase } from '~/lib/supabase';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../global.css';
import StackHeaderBar from '~/components/common/stack-header-bar';

const queryClient = new QueryClient();

export default function RootLayout() {
  const { loggedIn, setLoggedIn } = useUserStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      session ? setLoggedIn(true) : setLoggedIn(false);
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      session ? setLoggedIn(true) : setLoggedIn(false);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView className='flex-1'>
        <KeyboardProvider>
          <BottomSheetModalProvider>
            <StatusBar style="inverted" />
            <Stack 
              screenOptions={{
                header: (props) => <StackHeaderBar {...props} />,
              }}
            >
              <Stack.Protected guard={loggedIn}>
                <Stack.Screen name="(private)" options={{ headerShown: false }} />
              </Stack.Protected>
              <Stack.Protected guard={!loggedIn}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              </Stack.Protected>
              <Stack.Screen name="(public)/privacy" options={{ title: "Privacy Policy", animation: "ios_from_right" }} />
              <Stack.Screen name="(public)/terms" options={{ title: "Terms & Conditions", animation: "ios_from_right" }} />
              <Stack.Screen name="(public)/test" options={{ animation: "ios_from_right" }} />
            </Stack>
          </BottomSheetModalProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
