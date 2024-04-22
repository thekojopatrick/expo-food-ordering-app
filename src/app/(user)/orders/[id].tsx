import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { OrderItem } from '@/types';
import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';
import orders from '@assets/data/orders';
import { useOrderDetails } from '@/api/orders';
import { useUpdateOrderSubscription } from '@/api/orders/subscriptions';

const OrderDetailScreen = () => {
	const { id: paramId } = useLocalSearchParams();

	const id = parseFloat(typeof paramId === 'string' ? paramId : paramId?.[0]);

	const { data: order, isLoading, isError } = useOrderDetails(id);

	useUpdateOrderSubscription(id);

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (isError) {
		return <Text>Order not found!</Text>;
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: `Order #${order?.id}` }} />

			<OrderListItem order={order!} />

			<FlatList
				data={order?.order_items}
				renderItem={({ item }) => (
					<OrderItemListItem orderItem={item as OrderItem} />
				)}
				contentContainerStyle={{ gap: 10 }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flex: 1,
		gap: 10,
	},
});

export default OrderDetailScreen;
