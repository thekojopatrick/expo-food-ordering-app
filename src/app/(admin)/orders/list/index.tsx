import { FlatList, StyleSheet, View } from 'react-native';

import OrderListItem from '@/components/OrderListItem';
import orders from '@assets/data/orders';

export default function OrdersScreen() {
	return (
		<View style={styles.container}>
			<FlatList
				data={orders}
				renderItem={({ item }) => <OrderListItem order={item} />}
				contentContainerStyle={{ gap: 10 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
});
