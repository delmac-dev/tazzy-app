import { View, VirtualizedList } from "react-native";
import NotificationCard, { Props as NotificationProps } from "~/components/ui/notification-card";
import { MOCK_NOTIFICATIONS } from "~/lib/constants";

export default function Notifications() {
	return (
		<View className="flex-1 pb-2 bg-neutral-50">
			<VirtualizedList
				data={MOCK_NOTIFICATIONS}
				initialNumToRender={7}
				getItemCount={() => MOCK_NOTIFICATIONS.length}
				getItem={(data, index) => data[index]}
				keyExtractor={(item) => item.id}
				className='bg-neutral-50'
				renderItem={({item}:{item: NotificationProps}) => <NotificationCard {...item} />}
			/>
		</View>
	)
}