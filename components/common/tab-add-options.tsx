import { cn } from 'lib/utils';
import { CalendarDotsIcon, ListChecksIcon, PlusIcon } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { MotiView, MotiText } from 'moti';
import colors from 'tailwindcss/colors';

type Props = {
  visible: boolean;
  closeModal: () => void;
  setOpenActivitySheet: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenScheduleSheet: React.Dispatch<React.SetStateAction<boolean>>;
};

type ActionButtonProps = {
  onPress: () => void;
  icon: any;
  positionStyle: string;
  beforeX: number,
  active: boolean
}

export default function TabAddOptions({ visible, closeModal, setOpenActivitySheet, setOpenScheduleSheet }: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (visible) setActive(true);
  }, [visible]);

  const handleClose = () => {
    setActive(false);
    setTimeout(() => {
      closeModal();
    }, 200);
  };

  const newActivityPress = () => {
    closeModal();
    setOpenActivitySheet(true);
  }

  const newSchedulePress = () => {
    closeModal();
    setOpenScheduleSheet(true);
  }

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <TouchableOpacity className="relative flex-1 justify-end items-center" activeOpacity={1} onPress={handleClose}>
        <View className="relative">
          <ActionButton onPress={newActivityPress} beforeX={56} active={active} icon={ListChecksIcon} positionStyle="-left-16" />
          <ActionButton onPress={newSchedulePress} beforeX={-56} active={active} icon={CalendarDotsIcon} positionStyle="-right-16" />
          <MotiView
            from={{ rotate: '0deg' }}
            animate={{ rotate: active ? '45deg' : '0deg' }}
            transition={{ type: 'timing', duration: 200 }}
            className='relative overflow-hidden rounded-full'
          >
            <Pressable
              className="h-16 aspect-square bg-neutral-800 rounded-full flex items-center justify-center"
              onPress={handleClose}
              android_ripple={{ color: colors.neutral[700] }}
            >
              <PlusIcon size={28} color={colors.neutral[50]} weight="regular" />
            </Pressable>
          </MotiView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const ActionButton = ({ onPress, icon: Icon, positionStyle, beforeX, active }: ActionButtonProps) => (
  <MotiView
    from={{ opacity: 0, translateY: 70, translateX: beforeX }}
    animate={active ? { opacity: 1, translateY: 0, translateX: 0 }:{ opacity: 0, translateY: 70, translateX: beforeX }}
    transition={{ type: 'timing', duration: 200 }}
    className={cn('overflow-hidden rounded-full absolute bottom-20', positionStyle)}
  >
    <Pressable
      className="h-16 aspect-square bg-neutral-800 rounded-full flex items-center justify-center"
      onPress={onPress}
      android_ripple={{ color: colors.neutral[700] }}
    >
      <Icon size={28} color={colors.neutral[50]} weight="fill" />
    </Pressable>
  </MotiView>
);