import { Text, PressableProps, Pressable, View } from 'react-native';
import { cn } from 'lib/utils';

type ButtonProps = PressableProps & {
  title: string;
  onPress?: () => void;
  theme?: 'primary' | 'secondary' | 'tertiary'| 'dark0' | 'dark1';
  disabled?: boolean;
};

export default function Button({
  title,
  onPress,
  theme = 'primary',
  disabled,
  className,
  ...rest
}: ButtonProps) {
  return (
    <View className={cn("overflow-hidden", theme === 'dark1' && 'rounded-full ')}>
      <Pressable
        onPress={onPress}
        className={cn(
          'flex-row items-center justify-center rounded-md border px-5 py-2',
          theme === 'primary' && 'border-sky-500 bg-sky-600',
          theme === 'secondary' && 'border-sky-200 bg-sky-50',
          theme === 'tertiary' && 'border-transparent bg-transparent',
          theme === 'dark0' && 'border-transparent bg-neutral-950 py-5 rounded-none',
          theme === 'dark1' && 'border border-neutral-200 bg-transparent py-3 rounded-full',
          disabled && 'opacity-50',
          className
        )}
        android_ripple={{
          borderless: false,
        }}
        disabled={disabled}
        {...rest}>
        <Text
          className={cn(
            'text-lg font-normal tracking-wider',
            theme === 'secondary' && 'text-sky-600',
            theme === 'primary' && 'text-white',
            theme === 'tertiary' && 'text-neutral-800',
            theme === 'dark0' && 'text-neutral-100',
            theme === 'dark1' && 'text-neutral-800 font-medium text-sm',
          )}>
          {title} {disabled}
        </Text>
      </Pressable>
    </View>
  );
}
