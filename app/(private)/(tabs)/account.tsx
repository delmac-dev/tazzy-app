import { useRouter } from "expo-router";
import { DeviceMobileCameraIcon, DiamondsFourIcon, FileTextIcon, LinkBreakIcon, MoonIcon, PaletteIcon, ShieldCheckIcon, SignOutIcon, SunIcon, UserIcon } from "phosphor-react-native";
import { Alert, Button, Image, ScrollView, Text, View } from "react-native";

import BottomSheet, { BottomSheetBackdrop, BottomSheetHandle, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import AccountCard, { Props as IAccountCard } from "~/components/ui/account-card";
import { useCallback, useRef } from "react";
import colors from "tailwindcss/colors";
import { supabase } from "~/lib/supabase";

export default function Account() {
  const router = useRouter();

  const sheetRef = useRef<BottomSheetModal>(null);
  // TODO: view profile username, email and avatar
  // TODO: go to profile edit
  // TODO: go to templates screen
  // TODO: go to theme
  // TODO: tap on logout => are you sure modal
  // TODO: go to privacy
  // TODO: go to terms and condition
  // TODO: show version id

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  
    if (!error) {
      router.push('/login');
    }else {
      Alert.alert(error.message);
    }
  };

  const options:IAccountCard["data"] = [
    { name: "Edit Profile", icon: UserIcon, action: () => router.push("profile"), type: "page"},
    { name: "Templates", icon: DiamondsFourIcon, action: () => router.push("templates"), type: "page"},
    { name: "Open Activities", icon: LinkBreakIcon, action: () => router.push("open-activities"), type: "page"},
    { name: "Change Theme", icon: PaletteIcon, action: () => sheetRef.current?.present(), type: "sheet", leftSection: "light"},
    { name: "Terms and Conditions", icon: FileTextIcon, action: () => router.push("terms"), type: "page"},
    { name: "Privacy Policy", icon: ShieldCheckIcon, action: () => router.push("privacy"), type: "page"},
    { name: "Logout", icon: SignOutIcon, action: signOut, type: "default"},
  ]

  const themes:IAccountCard["data"] = [
    { name: "Sytem", icon: DeviceMobileCameraIcon , action: () => {}, type: "default"},
    { name: "Light", icon: SunIcon, action: () => {}, type: "default"},
    { name: "Dark", icon: MoonIcon, action: () => {sheetRef.current?.close();router.push("test")}, type: "default"},
  ]

  return (
    <View className="flex-1 bg-neutral-50">
      <View className="py-7 items-center gap-5">
        <View className="p-1 bg-neutral-50 border border-neutral-200 rounded-full">
          <View className="size-24 bg-neutral-100 rounded-full overflow-hidden items-center justify-center">
            <Image source={require("@/assets/avatars/orange_2.jpg")} className='h-full w-full' />
          </View>
        </View>
        <View>
          <Text className="text-xl font-normal text-neutral-800">Delmac</Text>
        </View>
      </View>
      <View className="gap-5">
        <AccountCard data={[options[0], options[1], options[2], options[3]]} />
        <AccountCard data={[options[4], options[5]]} />
        <AccountCard data={[options[6]]} />
      </View>
      <View className="mt-7">
        <Text className="text-center text-sm text-neutral-500 font-normal">v1.0.0 — Beta</Text>
      </View>
      <BottomSheetModal
        ref={sheetRef}
        containerStyle={{ flex:1}}
        enableDynamicSizing
        backdropComponent={(props) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />}
        handleComponent={(props) => <BottomSheetHandle {...props} style={{backgroundColor: colors.neutral[50]}} />}
      >
        <BottomSheetView className="flex-1 bg-neutral-50">
          <View className="flex-1 pt-5 pb-5">
            <View className="px-5">
              <Text className="text-lg font-medium text-neutral-600 text-center">Select a theme</Text>
            </View>
            <View className="py-5">
              <AccountCard data={[...themes]} />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  )
}