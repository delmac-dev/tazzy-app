import React, { useState } from 'react'
import { supabase } from '../../lib/supabase'
import Button from 'components/button';
import { View, Text, Alert, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import { AtIcon, KeyIcon } from 'phosphor-react-native';
import KeyboardScrollView from '~/components/common/keyboard-scrollview';
import InputTypeOne from '~/components/form/input-type-one';
import LegalSubtext from '~/components/common/legal-subtext';

export default function SignUp() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signUpWithEmail() {
    setLoading(true)
    const { data: { session }, error } = await supabase.auth.signUp({ email: email, password: password})

    if (error) Alert.alert(error.message);

    setLoading(false)
  };

  return (
    <KeyboardScrollView keyboardShouldPersistTaps="handled" noHeightCheck={true}>
      <View className="flex-1 justify-between gap-5 pt-safe bg-white">
        <View>
          <View className='py-12 px-5 gap-5'>
            <Text className='text-2xl font-medium text-neutral-950'>Join Tazzy Today</Text>
            <Text className='text-lg font-normal text-neutral-700'>Get all your schedules in one place without any hassle, it's quick and easy.</Text>
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
            <InputTypeOne
              icon={KeyIcon} 
              onChangeText={(text) => {}}
              value={password}
              secureTextEntry={true}
              placeholder="Confirm Password"
              autoCapitalize="none"
            />
            <LegalSubtext />
          </View>
        </View>
        <View className='relative w-full z-50'>
          <View className='pb-5 px-8 justify-center flex-row flex-wrap'>
            <Text className='text-xs text-neutral-600'>Already have an account? </Text>
            <Link href={"/login"} className='text-xs underline text-neutral-600'>Sign In.</Link>
          </View>
          <View className='w-full'>
            <Button title={loading? 'Loading...':'Sign Up'} theme='dark0' disabled={loading} onPress={signUpWithEmail}/>
          </View>
        </View>
      </View>
    </KeyboardScrollView>
  )
}