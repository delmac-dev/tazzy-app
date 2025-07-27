import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { BottomSheetBackdrop, BottomSheetHandle, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import colors from 'tailwindcss/colors'

type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  label: string
  children: React.ReactNode
}

export default function MoreActionsSheet(props: Props) {
  const sheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (props.open) {
      sheetRef.current?.present();
    } else {
      sheetRef.current?.dismiss();
    }
  }, [props.open]);

  const handleDismiss = () => {
    props.setOpen(false);
  };

  return (
    <BottomSheetModal
      ref={sheetRef}
      enableDynamicSizing
      onDismiss={handleDismiss}
      backdropComponent={(props) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />}
      handleComponent={(props) => <BottomSheetHandle {...props} style={{backgroundColor: colors.neutral[50]}} />}
    >
      <BottomSheetView className="bg-neutral-50">
        <View className="pt-5 pb-5">
          <View className="px-5">
            <Text className="text-lg font-medium text-neutral-600 text-center">{props.label}</Text>
          </View>
          <View className="py-5">
            {props.children}
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}