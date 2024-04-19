import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import OrderListItem from '@/components/OrderListItem';
import { useAdminOrderList } from '@/api/orders';

//import orders from '@assets/data/orders';

export default function OrdersScreen() {
	const { orders, isLoading, error } = useAdminOrderList({ archived: true });

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>Failed to fetch</Text>;
	}

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
