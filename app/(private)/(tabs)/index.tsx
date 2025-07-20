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
      className='bg-red-50'
      title='This is the home'
      color='orange'
      emoji='🏠'
      btns={[{label: 'Sign Out', action: signOut }]}
    />
  );
}
