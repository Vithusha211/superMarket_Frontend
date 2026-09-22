import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../componets/layout/Header';

const COLORS = {
	primary: '#07C187',
	white: '#FFFFFF',
	text: '#111111',
	muted: '#71828A',
};

type NotificationScreenProps = {
	onBack?: () => void;
};

const NOTIFICATIONS = [
	{
		icon: '🚚',
		title: 'Out for Delivery!',
		message: 'Your order is on the way and will arrive soon.',
		time: '2 hour ago',
	},
	{
		icon: '🔔',
		title: 'New Offers Available!',
		message: 'Check out the latest supermarket deals and discounts.',
		time: '10:23 PM',
	},
	{
		icon: '💳',
		title: 'Payment Successful!',
		message: 'Your payment has been confirmed successfully.',
		time: '10:23 PM',
	},
	{
		icon: '📦',
		title: 'Order Packed!',
		message: 'Your items have been packed and are ready for dispatch.',
		time: '10:23 PM',
	},
	{
		icon: '✅',
		title: 'Delivered Successfully!',
		message: 'Your order has been delivered successfully.',
		time: '10:23 PM',
	},
] as const;

export default function NotificationScreen({ onBack }: NotificationScreenProps) {
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.screen}>
			<StatusBar style="light" />
			<Header
				title="Notification"
				titleAlign="left"
				showBack
				onBack={onBack}
				backgroundColor={COLORS.primary}
			/>

			<View style={styles.sheet}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={[
						styles.content,
						{ paddingBottom: Math.max(insets.bottom, 20) },
					]}
				>
					<Text style={styles.today}>Today</Text>

					{NOTIFICATIONS.slice(0, 3).map((item) => (
						<NotificationRow key={item.title} {...item} />
					))}

					<Text style={styles.date}>12/02/2026</Text>

					{NOTIFICATIONS.slice(3).map((item) => (
						<NotificationRow key={item.title} {...item} />
					))}
				</ScrollView>
			</View>
		</View>
	);
}

type NotificationRowProps = (typeof NOTIFICATIONS)[number];

function NotificationRow({ icon, title, message, time }: NotificationRowProps) {
	return (
		<View style={styles.row}>
			<View style={styles.titleLine}>
				<Text style={styles.title}>
					{icon} {title}
				</Text>
				<View style={styles.timeLine}>
					<Ionicons name="time-outline" size={11} color={COLORS.muted} />
					<Text style={styles.time}>{time}</Text>
				</View>
			</View>
			<Text style={styles.message}>{message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: COLORS.primary,
	},
	sheet: {
		flex: 1,
		backgroundColor: COLORS.white,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		overflow: 'hidden',
	},
	content: {
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	today: {
		fontSize: 12,
		lineHeight: 18,
		color: COLORS.text,
		marginBottom: 19,
	},
	date: {
		fontSize: 12,
		lineHeight: 18,
		color: COLORS.text,
		marginTop: 20,
		marginBottom: 18,
	},
	row: {
		marginBottom: 18,
	},
	titleLine: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 8,
	},
	title: {
		flex: 1,
		fontSize: 14,
		lineHeight: 18,
		fontWeight: '500',
		color: COLORS.text,
	},
	timeLine: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 3,
	},
	time: {
		fontSize: 7,
		lineHeight: 11,
		color: COLORS.muted,
	},
	message: {
		fontSize: 14,
		lineHeight: 20,
		color: COLORS.muted,
		marginTop: 2,
	},
});
