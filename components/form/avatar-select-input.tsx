import { View, Text, Image, Pressable, ImageSourcePropType } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import colors from 'tailwindcss/colors';
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { CameraRotateIcon, CheckCircleIcon } from 'phosphor-react-native';
import { AVATARS } from '~/lib/constants';
import { cn } from '~/lib/utils';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};

type AvatarItemProps = {
  id: string;
  image: ImageSourcePropType;
  selected: boolean;
  onPress: () => void;
};

type AvatarEntry = [key: string, image: ImageSourcePropType];

export default function AvatarSelectInput<T extends FieldValues>({name, control}:Props<T>) {
  const sheetRef = useRef<BottomSheetModal>(null);
  const { field } = useController({ name, control });

  const avatarList = useMemo(() => Object.entries(AVATARS) as AvatarEntry[], []);

  return (
    <React.Fragment>
      <View className="py-7 gap-5 items-center">
        <Pressable
          onPress={() => sheetRef.current?.present()}
          className="p-1 bg-neutral-50 border border-neutral-300 rounded-full"
        >
          <View className="relative size-24 bg-neutral-100 rounded-full overflow-hidden items-center justify-center">
            <Image 
              className='size-full' 
              source={AVATARS[field.value] || require("@/assets/avatars/orange_2.jpg")} 
            />
            <View className={'absolute size-full bg-black/40 items-center justify-center p-1'}>
              <CameraRotateIcon color={colors.neutral[200]} size={36} weight='light' />
            </View>
          </View>
        </Pressable>
      </View>
      <BottomSheetModal
        ref={sheetRef}
        snapPoints={["50%"]}
        enableDynamicSizing={false}
        backgroundStyle={{backgroundColor: colors.neutral[50]}}
        backdropComponent={(props) => (
          <BottomSheetBackdrop 
            {...props}
            disappearsOnIndex={-1} 
            pressBehavior="close" 
          />
        )}
      >
        <View className='flex-1 gap-4'>
          <View>
            <Text className="text-lg font-medium text-neutral-800 text-center">Select an avatar</Text>
          </View>
          <BottomSheetFlatList<AvatarEntry>
            data={avatarList}
            numColumns={4}
            keyExtractor={([key]) => key}
            contentContainerClassName="gap-1 px-5"
            columnWrapperClassName="gap-1 justify-center"
            renderItem={({ item: [key, image] }) => (
              <View className='bg-neutral-100 flex-1 aspect-square rounded-md overflow-hidden'>
                <Pressable className='relative size-full' onPress={() => field.onChange(key)}>
                  <Image source={image} className='size-full' resizeMode='cover' />
                  <View
                    className={cn(
                      'absolute size-full bg-black/50 items-start justify-start p-1',
                      !(field.value === key) && 'hidden'
                    )}
                  >
                    <CheckCircleIcon color={colors.neutral[50]} size={28} weight='fill' />
                  </View>
                </Pressable>
              </View>
            )}
          />
        </View>
      </BottomSheetModal>
    </React.Fragment>
  )
}