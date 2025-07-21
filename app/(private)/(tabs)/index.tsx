import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import Dev2 from '~/components/dev2';
import { supabase } from '~/lib/supabase';

export default function Index() {
  const router = useRouter();
  const params = ""

async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (!error) {
    router.push('/');
  }else {
    Alert.alert(error.message);
  }
}

  return (
    <Dev2
      title='This is the home'
      color='orange'
      emoji='🏠'
      btns={[{label: 'Sign Out', action: signOut },{label: 'Go to test', action: () => router.push('/test')},{label: 'Go to test 2', action: () => router.push('/test-2')}, {label: 'Go to test 3', action: () => router.push('/test-3')}]}
    />
  );
}
