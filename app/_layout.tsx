import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useUserStore } from '~/lib/stores/user-store';
import { supabase } from '~/lib/supabase';
import '../global.css';

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
    <React.Fragment>
      <StatusBar style="auto" />
      <Stack screenOptions={{ animation: 'none', headerShown: false}}>
        <Stack.Protected guard={loggedIn}>
          <Stack.Screen name="(private)" />
        </Stack.Protected>
        <Stack.Protected guard={!loggedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
        <Stack.Screen name="(public)" />
      </Stack>
    </React.Fragment>
  );
}
