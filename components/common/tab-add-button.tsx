import { cn } from 'lib/utils';
import { CalendarDotsIcon, ListChecksIcon, PlusIcon } from 'phosphor-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function TabAddButton() {
    const [active, setActive] = useState(false);

    // Shared animated values
    const rotation = useSharedValue(0);
    const taskX = useSharedValue(56);
    const taskY = useSharedValue(70);
    const schedX = useSharedValue(-56);
    const schedY = useSharedValue(70);

    const taskOpacity = useSharedValue(0);
    const schedOpacity = useSharedValue(0);

    // Animated styles for rotation
    const plusStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }]
    }));

    // Animated styles for task button
    const taskStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: taskX.value },
            { translateY: taskY.value },
        ],
        opacity: taskOpacity.value,
    }));

    // Animated styles for schedule button
    const schedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: schedX.value },
            { translateY: schedY.value },
        ],
        opacity: schedOpacity.value,
    }));

    // Handle toggle
    const toggleAdd = () => {
        const isOpening = !active;

        rotation.value = withTiming(isOpening ? 45 : 0, { duration: 200 });

        taskX.value = withTiming(isOpening ? 0 : 56, { duration: 200 });
        taskY.value = withTiming(isOpening ? 0 : 70, { duration: 200 });

        schedX.value = withTiming(isOpening ? 0 : -56, { duration: 200 });
        schedY.value = withTiming(isOpening ? 0 : 70, { duration: 200 });

        taskOpacity.value = withTiming(isOpening ? 1 : 0, { duration: 200 });
        schedOpacity.value = withTiming(isOpening ? 1 : 0, { duration: 200 });

        setActive(isOpening);
    };

    return (
        <View className='relative mx-3'>
            {/* Add Task Button */}
            <Animated.View style={[taskStyle]} className="absolute bottom-20 -left-16">
                <Pressable
                    className="relative h-16 aspect-square bg-[#0284c7] rounded-full flex items-center justify-center"
                    onPress={() => console.log('Add New Task')}
                >
                    <ListChecksIcon size={28} color="#fafafa" weight='fill' />
                    </Pressable>
            </Animated.View>

            {/* Add Schedule Button */}
            <Animated.View style={[schedStyle]} className="absolute bottom-20 -right-16">
                <Pressable
                    className="h-16 aspect-square bg-[#0284c7] rounded-full flex items-center justify-center"
                    onPress={() => console.log('Add New Schedule')}
                >
                    <CalendarDotsIcon size={28} color="#fafafa" weight='fill' />
                    </Pressable>
            </Animated.View>

            {/* Main Add Button */}
            <Animated.View style={[plusStyle]} className="relative">
                <Pressable
                    className="h-16 aspect-square bg-[#0284c7] rounded-full flex items-center justify-center"
                    onPress={toggleAdd}
                >
                    <PlusIcon size={28} color="#fafafa" />
                    </Pressable>
            </Animated.View>
        </View>
    );
}