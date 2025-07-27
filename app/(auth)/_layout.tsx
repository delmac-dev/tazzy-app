import { Stack } from 'expo-router';
import { useUserStore } from '~/lib/stores/user-store';

export default function Layout() {
  const { isOnboarded } = useUserStore();

  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
      }}
    >
      <Stack.Protected guard={!isOnboarded}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>
      <Stack.Screen name="login" options={{animation: "slide_from_right"}} />
      <Stack.Screen name="sign-up" options={{animation: "ios_from_right"}} />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="confirm-otp" />
      <Stack.Screen name="new-password" />
    </Stack>
  )
}