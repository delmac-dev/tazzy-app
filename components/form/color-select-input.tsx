import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SCHEDULE_COLORS } from '~/lib/constants'
import colors from 'tailwindcss/colors'
import { cn } from '~/lib/utils'

export default function ColorSelectInput() {
  const [active, setActive] = useState(0);

  return (
    <FlatList 
      horizontal
      data={SCHEDULE_COLORS}
      keyExtractor={(item) => item.name}
      showsHorizontalScrollIndicator={false}
      renderItem={({item: { name, color }, index})=> (
        <View className='overflow-hidden'>
          <Pressable
            className='size-12 items-center justify-center p-2'
            android_ripple={{color:colors.neutral[200]}}
            onPress={() => setActive(index)}
          >
            <View 
              className={cn('w-full aspect-square rounded-full border border-transparent p-1', 
                index === active && 'border-neutral-400'
              )}
            >
              <View className='w-full aspect-square rounded-full' style={{ backgroundColor: color.hex }}/>
            </View>
          </Pressable>
        </View>
      )}
      className='flex-grow-0 self-center'
      contentContainerClassName='px-5'
    />
  )
}