import React, { useState } from 'react'
import { supabase } from '../../lib/supabase'
import Button from 'components/button';
import { View, Text, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { AtIcon, KeyIcon } from 'phosphor-react-native';
import KeyboardScrollView from '~/components/common/keyboard-scrollview';
import InputTypeOne from '~/components/form/input-type-one';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email: email, password: password });
    if (!error) {
      // If sign in is successful, redirect to the home screen
      router.push('/');
    }else {
      Alert.alert(error.message);
    }

    setLoading(false)
  }

  return (
    <KeyboardScrollView keyboardShouldPersistTaps="handled">
      <View className="relative flex-1 justify-between pt-safe bg-white">
        <View>
          <View className='py-12 px-5 gap-5'>
            <Text className='text-2xl font-medium text-neutral-950'>Welcome Back!</Text>
            <Text className='text-lg font-normal text-neutral-700'>Stay organized with personalized schedules and instant updates.</Text>
          </View>
          <View className='gap-5'>
            <InputTypeOne
              icon={AtIcon} 
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <InputTypeOne
              icon={KeyIcon} 
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize="none"
            />
            <View className='items-center'>
              <Link href={"/forgot-password"} className='text-xs underline text-neutral-600'>Forgot Password?</Link>
            </View>
          </View>
        </View>
        <View className='relative w-full z-50'>
          <View className='pb-5 px-8 justify-center flex-row flex-wrap'>
            <Text className='text-xs text-neutral-600'>Don't have an account? </Text>
            <Link href={"/sign-up"} className='text-xs underline text-neutral-600'>Sign Up.</Link>
          </View>
          <View className='w-full'>
            <Button title={loading? 'Loading...':'Sign In'} theme='dark0' disabled={loading} onPress={signInWithEmail}/>
          </View>
        </View>
      </View>
    </KeyboardScrollView>
  )
}