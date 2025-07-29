import { Stack } from 'expo-router'
import StackHeaderBar from '~/components/common/stack-header-bar'

export default function Layout() {
  return (
    <Stack 
      screenOptions={{
        header: (props) => <StackHeaderBar {...props} />
      }}
    >
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='schedules/form' options={{ title: 'New Schedule' }} />
      <Stack.Screen name='schedules/[id]' options={{ title: 'Schedule Details'}} />
      <Stack.Screen name='tasks/[id]' options={{ title: 'Task Details'}} />
      <Stack.Screen name='profile/index' options={{ title: 'Edit Profile'}} />
      <Stack.Screen name='templates/index' options={{ title: 'Templates'}} />
      <Stack.Screen name='open-activities/index' options={{ title: 'Open Activities'}} />
    </Stack>
  )
}