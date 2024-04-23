import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Order, OrderItem } from '../types';

import Colors from '../constants/Colors';
import React from 'react';
import RemoteImage from './RemoteImage';
import dayjs from 'dayjs';
import { defaultPizzaImage } from '@/constants/Images';
import relativeTime from 'dayjs/plugin/relativeTime';

type OrderItemListItemProps = {
	orderItem: OrderItem;
};

const OrderItemListItem = ({ orderItem }: OrderItemListItemProps) => {
	return (
		<View style={styles.container}>
			{/* <Image
				source={{ uri: orderItem.products.image || defaultPizzaImage }}
				style={styles.image}
				resizeMode='contain'
			/> */}
			<RemoteImage
				fallback={defaultPizzaImage}
				path={orderItem.products.image!}
				style={styles.image}
				resizeMode='contain'
			/>

			<View style={{ flex: 1 }}>
				<Text style={styles.title}>{orderItem.products.name}</Text>
				<View style={styles.subtitleContainer}>
					<Text style={styles.price}>
						${orderItem.products.price?.toFixed(2)}
					</Text>
					<Text>Size: {orderItem.size}</Text>
				</View>
			</View>
			<View style={styles.quantitySelector}>
				<Text style={styles.quantity}>{orderItem.quantity}</Text>
			</View>
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

export default OrderItemListItem;
