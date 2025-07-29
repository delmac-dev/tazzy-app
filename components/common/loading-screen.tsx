import { View, Text } from 'react-native'
import React from 'react';

type Props = {
  presentation?: "screen" | "modal";
}

export default function LoadingScreen(props:Props) {
  return (
    <View className='flex-1 items-center justify-center bg-neutral-50'>
      <Text>Loading...</Text>
    </View>
  )
}