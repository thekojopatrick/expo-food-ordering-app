import { FlatList, Platform, StyleSheet } from 'react-native';
import { Text, View } from '@components/Themed';

import Button from '@/components/Button';
import CartListItem from '@/components/CartListItem';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/providers/CartProvider';

export default function CartScreen() {
	const { items, total, checkout } = useCart();

	return (
		<View style={styles.container}>
			<FlatList
				data={items}
				renderItem={({ item }) => <CartListItem cartItem={item} />}
				contentContainerStyle={{ gap: 10 }}
			/>
			<Text style={styles.totalText}>Total : ${total}</Text>
			<Button text='Checkout' onPress={checkout} />

			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	totalText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});
