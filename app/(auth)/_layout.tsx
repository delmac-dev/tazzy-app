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
      <Stack.Screen name="login" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="confirm-otp" />
      <Stack.Screen name="new-password" />
    </Stack>
  )
}