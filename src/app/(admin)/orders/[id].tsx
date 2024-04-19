import {
	ActivityIndicator,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import Colors from '@/constants/Colors';
import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';
import { OrderStatusList } from '@/types';
//import orders from '@assets/data/orders';
import { useOrderDetails } from '@/api/orders';

const OrderDetailScreen = () => {
	const { id: paramId } = useLocalSearchParams();

	const id = parseFloat(typeof paramId === 'string' ? paramId : paramId?.[0]);

	const { data: order, isLoading, isError } = useOrderDetails(id);

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (isError) {
		return <Text>Order not found!</Text>;
	}

	const updateStatus = (status: string) => {};

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: `Order #${order?.id}` }} />

			<FlatList
				data={order?.order_items}
				renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
				contentContainerStyle={{ gap: 10 }}
				ListHeaderComponent={() => <OrderListItem order={order!} />}
				ListFooterComponent={() => (
					<>
						<Text style={{ fontWeight: 'bold' }}>Status</Text>
						<View style={{ flexDirection: 'row', gap: 5 }}>
							{OrderStatusList.map((status) => (
								<Pressable
									key={status}
									onPress={() => updateStatus(status)}
									style={{
										borderColor: Colors.light.tint,
										borderWidth: 1,
										padding: 10,
										borderRadius: 5,
										marginVertical: 10,
										backgroundColor:
											order?.status === status
												? Colors.light.tint
												: 'transparent',
									}}
								>
									<Text
										style={{
											color:
												order?.status === status ? 'white' : Colors.light.tint,
										}}
									>
										{status}
									</Text>
								</Pressable>
							))}
						</View>
					</>
				)}
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
