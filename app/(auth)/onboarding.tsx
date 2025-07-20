import { Link } from 'expo-router';
import { Image, Text, View } from 'react-native';
import Button from '~/components/button';
import LegalSubtext from '~/components/common/legal-subtext';
import { ONBOARDING_CONTENT } from '~/lib/constants';
import { useUserStore } from '~/lib/stores/user-store';
import { cn } from '~/lib/utils';

export default function Onboarding() {
  const { completeOnboarding } = useUserStore();
  const dots = Array(4).fill(null);

  return (
    <View className="pt-safe-offset-2 flex-1 bg-green-50">
      <View className="overflow-hidden relative flex-1 items-center justify-end">
        <Image source={require("@/assets/onboarding/board2.png")} className='relative -bottom-[196px] h-[556px] aspect-[500/625]' />
      </View>
      <View className="h-[40%] items-center justify-between rounded-t-2xl bg-white">
        <View className='w-full flex-1 items-center justify-between p-7'>
          <View className='gap-4 items-center'>
            <Text className='text-2xl font-medium text-neutral-950'>{ONBOARDING_CONTENT[0].title}</Text>
            <Text className='text-lg text-center text-neutral-700 max-w-80'>{ONBOARDING_CONTENT[0].body}</Text>
          </View>
          <View className="relative flex-row rounded-full">
            {dots.map((_, index) => (
              <View key={index} className="p-1">
                <View className={cn("aspect-square w-2 bg-neutral-300 rounded-full", index === 0 && "bg-neutral-900")} />
              </View>
            ))}
          </View>
        </View>
        <LegalSubtext />
        <View className='w-full'>
          <Button title='Get Started' theme='dark0' onPress={completeOnboarding}/>
        </View>
      </View>
    </View>
  );
}