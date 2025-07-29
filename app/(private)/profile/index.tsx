import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, Alert, TextInput, Pressable } from 'react-native';
import colors from 'tailwindcss/colors';
import LoadingScreen from '~/components/common/loading-screen';
import StackHeaderBar from '~/components/common/stack-header-bar';
import AvatarSelectInput from '~/components/form/avatar-select-input';
import { getProfileDetails, updateProfile } from '~/lib/queries/profile.query';
import { ZUpdateProfile } from '~/lib/schemas';
import { IUpdateProfile } from '~/lib/types';
import { cn } from '~/lib/utils';

export default function ProfileForm() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const { data, error, isLoading } = useQuery({ queryKey: ['account'], queryFn: getProfileDetails });

  
  const { control, handleSubmit, reset, watch, formState: { isDirty } } = useForm<IUpdateProfile>({
    resolver: zodResolver(ZUpdateProfile),
  });

  const _MAXLENGTH = 24;
  const _USERNAME = watch("username");
  
  const {mutate, isPending} = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['account'], updatedData);
      queryClient.invalidateQueries({ queryKey: ['account'] })
    },
    onError: (error) => {
      Alert.alert('Error', error.message ?? 'Failed to update profile details.');
    },
  });

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error.message ?? 'Failed to load profile details.');
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      reset({
        avatar: data.avatar || '',
        username: data.username || '',
      });
    }
  }, [data, reset]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props:NativeStackHeaderProps) => (
        <StackHeaderBar {...props}>
          <View className='absolute right-5 overflow-hidden'>
            <Pressable 
              className='px-3 py-1'
              disabled={!isDirty || isPending}
              onPress={handleSubmit((data) => mutate(data))}
              android_ripple={{color: colors.neutral[200]}}
            >
              <Text className='text-lg font-medium text-neutral-700'>
                {isPending ? "Saving":"Save"}
              </Text>
            </Pressable>
          </View>
        </StackHeaderBar>
      )
    });
  }, [navigation, isDirty, isPending]);

  if(isLoading) {
    return (
      <LoadingScreen />
    )
  };

  return (
    <View className='flex-1 bg-neutral-50'>
      <View className='flex-1 items-center'>
        <AvatarSelectInput name="avatar" control={control} />
        <View className='px-5 items-center w-full'>
          <Controller
            name="username"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  ref={inputRef}
                  className={cn("text-2xl font-normal caret-neutral-700 text-neutral-700 px-3 py-2 rounded w-full text-center",
                    "placeholder:text-neutral-400"
                  )}
                  placeholder="Username"
                  maxLength={_MAXLENGTH}
                  value={value}
                  onFocus={() => setFocused(true)}
                  onChangeText={onChange}
                  onBlur={() => {
                    setFocused(false);
                    onBlur();
                  }}
                />
                <Text className="mt-2 text-sm text-neutral-500">
                  {focused ? `${_USERNAME.length}/${_MAXLENGTH}` : 'Tap to rename'}
                </Text>
              </>
            )}
          />
        </View>
        {/* <Text>{data?.email}</Text>
        <Text className='mt-5 underline'>change password</Text>
        <Text>old password</Text>
        <Text>new password</Text>
        <Text>confirm new password</Text> */}
      </View>
    </View>
  )
}