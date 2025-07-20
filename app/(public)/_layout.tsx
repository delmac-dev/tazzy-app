import { Stack } from 'expo-router';

export default function Layout() {

  return (
    <Stack>
      <Stack.Screen name="privacy" />
      <Stack.Screen name="terms" />
    </Stack>
  )
}