import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, Pressable, Alert } from 'react-native';
import colors from 'tailwindcss/colors';
import LoadingScreen from '~/components/common/loading-screen';
import StackHeaderBar from '~/components/common/stack-header-bar';
import { createSchedule, getScheduleDetail, updateSchedule } from '~/lib/queries/app.query';
import { ZScheduleForm } from '~/lib/schemas';
import { IScheduleForm, IScreenFormParams } from '~/lib/types';

export default function ScheduleForm() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const params = useLocalSearchParams<IScreenFormParams>();

  const id = params.id ?? "";
  const isEdit = params.type !== "new";
  const { data, error, isLoading } = useQuery({queryKey: ['schedule-form-details', id], queryFn: () => getScheduleDetail({id})});

  const { control, handleSubmit, reset, watch, formState: { isDirty } } = useForm<IScheduleForm>({
    defaultValues: {
      name: "",
      color: "",
      emoji: "",
      accessibility: "private",
      status: "active"
    },
    resolver: zodResolver(ZScheduleForm),
  });

  const {mutate: updateMutate, isPending: updatePending} = useMutation({
    mutationFn: updateSchedule,
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['schedule-form-details', id], updatedData);
      queryClient.invalidateQueries({ queryKey: ['schedule-form-details', id] });
    },
    onError: (error) => {
      Alert.alert('Error', error.message ?? 'Failed to update schedule details.');
    },
  });

  const {mutate: createMutate, isPending: createPending} = useMutation({
    mutationFn: createSchedule,
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries({ queryKey: ['schedules', id] });
    },
    onError: (error) => {
      Alert.alert('Error', error.message ?? 'Failed to update schedule details.');
    },
  });

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error.message ?? 'Failed to load schedule details.');
    }
  }, [error]);

  useEffect(() => {
    if (data && isEdit) {
      reset({
        accessibility: data.accessibility,
        status: data.status,
        emoji: data.emoji,
        color: data.color,
        name: data.name
      });
    }
  }, [data, reset]);

  // TODO: if type is not new then fetch the task and pre fill form with data
  // TODO: if actionAfterCreate is router.back() , after creating go to prev screen or by default go the schedules/newID

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${params.type === 'new' ? 'New Schedule' : 'Edit Schedule'}`,
      header: (props:NativeStackHeaderProps) => (
        <StackHeaderBar {...props}>
          <View className='absolute right-5 overflow-hidden'>
            <Pressable 
              className='px-3 py-1'
              disabled={!isDirty || updatePending || createPending}
              onPress={handleSubmit((data) => isEdit ? updateMutate({id,data}): createMutate({data}))}
              android_ripple={{color: colors.neutral[200]}}
            >
              <Text className='text-lg font-medium text-neutral-700'>
                {updatePending || createPending ? "Saving":"Save"}
              </Text>
            </Pressable>
          </View>
        </StackHeaderBar>
      )
    });
  }, [navigation, isDirty, updatePending, createPending]);

  if(isLoading && isEdit) {
    return (
      <LoadingScreen />
    )
  };

  return (
    <View className='flex-1 bg-neutral-200 pt-20'>
      <View className='w-full items-center justify-center bg-red-100'>
        <View className='size-24 bg-red-200 rounded-full items-center justify-center'>
          <Text>emoji</Text>
        </View>
      </View>
      <Text>schedule type - private, template</Text>
      <Text>schedule color</Text>
      <Text>schedule name</Text>
    </View>
  )
}