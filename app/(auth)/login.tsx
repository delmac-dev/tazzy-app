import { supabase } from '../../lib/supabase';
import { View, Text, Alert, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { EnvelopeSimpleIcon, LockSimpleIcon } from 'phosphor-react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useGradualAnimation } from '~/lib/hooks/use-gradual-animation';
import TextInput from '~/components/form/text-input';
import Button from '~/components/form/button';
import { useForm } from 'react-hook-form';
import { ISignIn } from '~/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZSignIn } from '~/lib/schemas';
import { useMutation } from '@tanstack/react-query';

export default function Login() {
  const { height } = useGradualAnimation();
  const router = useRouter();

  const defaultValues = {
    email: "",
    password: ""
  }

  const { control, handleSubmit, reset } = useForm<ISignIn>({
    defaultValues,
    resolver: zodResolver(ZSignIn),
  });

  const {mutate, isPending} = useMutation({
    mutationFn: async ({ email, password }:ISignIn) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
    onSettled:() => {
      reset(defaultValues);
    }
  });

  const keyboardPadding = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  }, []);

  return (
    <View className="relative flex-1 justify-between pt-safe bg-white">
      <View className='py-12 px-5 gap-2'>
        <Text className='text-xl font-medium text-neutral-700'>Welcome Back!</Text>
        <Text className='text-base w-full max-w-80 font-normal text-neutral-600'>Stay organized with personalized schedules and instant updates.</Text>
      </View>
      <ScrollView className='flex-1' contentContainerClassName='gap-5'>
        <TextInput
          name="email"
          control={control}
          label="Email"
          autoCapitalize='none'
          icon={EnvelopeSimpleIcon}
          keyboardType='email-address'
          placeholder='Enter your email'
        />
        <TextInput
          name="password"
          control={control}
          label='Password' 
          icon={LockSimpleIcon}
          placeholder="Password"
          viewSwitchable={true} 
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <View className='items-center'>
          <Link href={"/forgot-password"} className='text-xs underline text-neutral-600'>Forgot Password?</Link>
        </View>
      </ScrollView>
      <View className='relative w-full py-5 gap-4'>
        <View className='w-full'>
          <Button 
            label={isPending? 'Loading...':'Sign In'} 
            disabled={isPending} 
            onPress={handleSubmit((data) => mutate(data))}
          />
        </View>
        <View className='px-8 justify-center items-center'>
          <Link href={"/sign-up"} className='text-xs underline text-neutral-600'>
            Don't have an account? Sign Up.
          </Link>
        </View>
      </View>
      <Animated.View style={keyboardPadding} />
    </View>
  )
}