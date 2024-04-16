import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Order, OrderItem } from '../types';

import Colors from '../constants/Colors';
import React from 'react';
import dayjs from 'dayjs';
import { defaultPizzaImage } from '@/constants/Images';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type OrderListItemProps = {
	order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
	return (
		<View style={styles.container}>
			<View style={{ flex: 1 }}>
				<Text style={styles.title}>User:{order.user_id}</Text>
				<Text style={styles.title}>Order No. #{order.id}</Text>
				<View style={styles.subtitleContainer}>
					<Text style={styles.price}>${order.total.toFixed(2)}</Text>
				</View>
			</View>
			<View style={styles.quantitySelector}>
				<Text style={styles.quantity}>{order.status}</Text>
				<Text>{dayjs(order.created_at).fromNow()}</Text>
			</View>
		</View>
	);
};

type OrdersListItemProps = {
	orderItems?: OrderItem[];
};

const OrdersListItem = ({ orderItems }: OrdersListItemProps) => {
	console.log({ orderItems });

	return (
		<View style={styles.container}>
			{orderItems?.map((orderItem) => {
				return (
					<View>
						<Image
							source={{ uri: orderItem.products.image || defaultPizzaImage }}
							style={styles.image}
							resizeMode='contain'
						/>
						<View style={{ flex: 1 }}>
							<Text style={styles.title}>{orderItem?.products?.name}</Text>
							<View style={styles.subtitleContainer}>
								<Text style={styles.price}>
									${orderItem.products.price.toFixed(2)}
								</Text>
								<Text>Size: {orderItem.size}</Text>
							</View>
						</View>
						<View style={styles.quantitySelector}>
							<Text style={styles.quantity}>{orderItem.quantity}</Text>
						</View>
					</View>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 8,
		paddingHorizontal: 16,
		flexDirection: 'row',
		alignItems: 'center',
		//justifyContent: 'space-around',
	},
	image: {
		width: 75,
		aspectRatio: 1,
		alignSelf: 'center',
		marginRight: 10,
	},
	title: {
		fontWeight: '500',
		fontSize: 16,
		marginBottom: 5,
	},
	subtitleContainer: {
		flexDirection: 'row',
		gap: 5,
	},
	quantitySelector: {
		gap: 10,
		alignItems: 'center',
		marginVertical: 10,
	},
	quantity: {
		fontWeight: '500',
		fontSize: 16,
	},
	price: {
		color: Colors.light.tint,
		fontWeight: 'bold',
	},
});

export default OrderListItem;
