import { View, Text, TextInput as TextInputCore, TextInputProps, Pressable } from 'react-native'
import React, { useState } from 'react'
import { cn } from '~/lib/utils'
import { EyeClosedIcon, EyeIcon, Icon, UserIcon } from 'phosphor-react-native'
import colors from 'tailwindcss/colors'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string,
  icon?: Icon,
  viewSwitchable?: boolean
} & TextInputProps;

export default function TextInput<T extends FieldValues>({name, control, icon, label, viewSwitchable, secureTextEntry, ...rest}:Props<T>) {
  const [secureEntry, setSecureEntry] = useState<boolean>(secureTextEntry || false);
  const { field } = useController({ name, control });
  const ViewIcon = secureEntry ? EyeIcon : EyeClosedIcon;
  const Icon = icon;

  return (
    <View className='mx-5'>
      <View className='px-3 py-2 flex-row gap-2 items-center'>
        {Icon? <Icon color={colors.neutral[600]} size={14} weight='bold' /> : null}
        <Text className='text-sm font-medium text-neutral-600'>{label}</Text>
      </View>
      <View className='relative items-center'>
        <TextInputCore
          placeholder='Enter the text...' 
          className={cn('p-3 w-full bg-white rounded-lg border border-neutral-200 text-sm text-neutral-700',
            'placeholder:text-neutral-400',
            viewSwitchable && "pr-12"
          )}
          secureTextEntry={secureEntry}
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          {...rest}
        />
        {viewSwitchable? (
          <View className='h-full absolute overflow-hidden right-0.5'>
            <Pressable 
              className='h-full aspect-square items-center justify-center'
              onPress={() => setSecureEntry(prev => !prev)}
              android_ripple={{ color: colors.neutral[50]}}
            >
              <ViewIcon size={18} weight='regular' color={colors.neutral[600]} />
            </Pressable>
          </View>
        ): null}
      </View>
    </View>
  )
}