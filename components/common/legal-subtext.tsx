import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function LegalSubtext() {
  return (
    <View className='pb-5 px-8 justify-center flex-row flex-wrap'>
      <Text className='text-xs text-neutral-600'>By continuing with the services above, you agree to Tazzy’s</Text>
      <Link href={""} className='text-xs underline text-neutral-600'>Terms of Service</Link>
      <Text className='text-xs text-neutral-600'> and </Text>
      <Link href={""} className='text-xs underline text-neutral-600'>Privacy Policy.</Link>
    </View>
  )
}