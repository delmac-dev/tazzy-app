import { Link, useRouter } from 'expo-router';
import { AtIcon, KeyIcon } from 'phosphor-react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  ScrollView,
  FlatList,
  Alert
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '~/components/button';
import KeyboardScrollView from '~/components/common/keyboard-scrollview';
import InputTypeOne from '~/components/form/input-type-one';
import { supabase } from '~/lib/supabase';
import { cn } from '~/lib/utils';

export default function Test3() {
  const additionalScrollHeight = 0;
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollPositionRef = useRef<number>(0);
  const scrollContentSizeRef = useRef<number>(0);
  const scrollViewSizeRef = useRef<number>(0);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [additionalPadding, setAdditionalPadding] = useState(0);
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email: email, password: password });
    if (!error) {
      // If sign in is successful, redirect to the home screen
      router.push('/');
    } else {
      Alert.alert(error.message);
    }

    setLoading(false)
  }

  const scroll_to_position = useCallback((toPosition: number, animated?: boolean) => {
    scrollViewRef.current?.scrollTo({ y: toPosition, animated: !!animated });
    scrollPositionRef.current = toPosition;
  }, []);

  console.log("keyboard shown", Keyboard.isVisible());

  const additional_scroll = useMemo(() => additionalScrollHeight ?? 0, [additionalScrollHeight],);

  const android_statusbar_offset = useMemo(() => StatusBar.currentHeight ?? 0, []);

  useEffect(() => {
    const didShowListener = Keyboard.addListener('keyboardDidShow', frames => {
      const keyboardY = frames.endCoordinates.screenY;
      const keyboardHeight = frames.endCoordinates.height;
      setAdditionalPadding(Math.ceil(keyboardHeight));

      setTimeout(() => {
        setIsKeyboardVisible(true);
      }, 100);
    });

    return () => {
      didShowListener.remove();
    };
  },);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : "height"}
        keyboardVerticalOffset={0}
        style={styles.container} className={cn(!Keyboard.isVisible() && 'flex-1')}>

        <View style={styles.inner}>
          <View className='py-12 px-5 gap-5'>
            <Text className='text-2xl font-medium text-neutral-950'>Welcome Back!</Text>
            <Text className='text-lg font-normal text-neutral-700'>Stay organized with personalized schedules and instant updates.</Text>
          </View>
          <ScrollView contentContainerStyle={{ padding: 20 }}
            className='flex-1'
            keyboardShouldPersistTaps="handled">
            <InputTypeOne
              icon={AtIcon}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <InputTypeOne
              icon={KeyIcon}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize="none"
            />
            <InputTypeOne
              icon={KeyIcon}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize="none"
            />
            <View className='items-center'>
              <Link href={"/forgot-password"} className='text-xs underline text-neutral-600'>Forgot Password?</Link>
            </View>
          </ScrollView>
          <View className='relative w-full z-50'>
            <View className='pb-5 px-8 justify-center flex-row flex-wrap'>
              <Text className='text-xs text-neutral-600'>Don't have an account? </Text>
              <Link href={"/sign-up"} className='text-xs underline text-neutral-600'>Sign Up.</Link>
            </View>
            <View className='w-full'>
              <Button title={loading ? 'Loading...' : 'Sign In'} theme='dark0' disabled={loading} onPress={signInWithEmail} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 0,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});