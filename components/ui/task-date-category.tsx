import { View, Text, Pressable } from 'react-native'
import React from 'react';
import colors from 'tailwindcss/colors';

type Props = {
  title: string
};

const TaskDateCategory = (props: Props) =>{
  const titleSlice = props.title.split(',').map((part) => part.trim());

  return (
    <View className='w-full overflow-hidden'>
      <Pressable className='px-5 py-3 flex-row items-center justify-start bg-neutral-50'>
        <Text className='text-base font-medium text-neutral-700'>{titleSlice[0]}</Text>
        {titleSlice.length > 1? (
          <>
            <Text  className='text-xl text-neutral-500 mx-1'>•</Text>
            <Text className='text-base font-medium text-neutral-700'>{titleSlice[1]}</Text>
          </>
        ):(null)}
      </Pressable>
    </View>
  )
};

export default TaskDateCategory;