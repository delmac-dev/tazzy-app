import { supabase } from '../../lib/supabase';
import { View, Text, Alert, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { EnvelopeSimpleIcon, LockSimpleIcon } from 'phosphor-react-native';
import LegalSubtext from '~/components/common/legal-subtext';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useGradualAnimation } from '~/lib/hooks/use-gradual-animation';
import Button from '~/components/form/button';
import TextInput from '~/components/form/text-input';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { ZSignUp } from "~/lib/schemas";
import { ISignUp } from '~/lib/types';
import { useMutation } from '@tanstack/react-query';

export default function SignUp() {
  const router = useRouter();
  const { height } = useGradualAnimation();

  const defaultValues = {
    email: "",
    password: "",
    confirmPassword: ""
  }

  const { control, handleSubmit, reset } = useForm<ISignUp>({
    defaultValues,
    resolver: zodResolver(ZSignUp),
  });

  const {mutate, isPending} = useMutation({
    mutationFn: async ({ email, password }:ISignUp) => {
      const { error } = await supabase.auth.signUp({ email, password });
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
    <View className="flex-1 pt-safe bg-neutral-50">
      <View className='px-5 gap-2 py-12'>
        <Text className='text-xl font-medium text-neutral-700'>Join Tazzy Today</Text>
        <Text className='text-base w-full max-w-80 font-normal text-neutral-600'>Get all your schedules in one place without any hassle, it's quick and easy.</Text>
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
        <TextInput
          name="confirmPassword"
          control={control}
          label='Confirm Password' 
          icon={LockSimpleIcon}
          placeholder="Password"
          viewSwitchable={true} 
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <LegalSubtext />
      </ScrollView>
      <View className='relative w-full py-5 gap-4'>
        <View className='w-full'>
          <Button
            label={isPending? 'Loading...':'Sign Up'} 
            disabled={isPending} 
            onPress={handleSubmit((data) => mutate(data))}
          />
        </View>
        <View className='px-8 justify-center items-center'>
          <Link href={"/login"} replace className='text-xs underline text-neutral-600'>
            Already have an account? Sign In.
          </Link>
        </View>
      </View>
      <Animated.View style={keyboardPadding} />
    </View>
  )
}