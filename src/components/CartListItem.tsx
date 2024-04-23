import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { CartItem } from '../types';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import RemoteImage from './RemoteImage';
import { defaultPizzaImage } from '@/constants/Images';
import { useCart } from '../providers/CartProvider';

type CartListItemProps = {
	cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
	const { updateQuantity } = useCart();
	//console.log({ cartItem });

	return (
		<View style={styles.container}>
			{/* <Image
				source={{ uri: cartItem.product.image || defaultPizzaImage }}
				style={styles.image}
				resizeMode='contain'
			/> */}
			<RemoteImage
				fallback={defaultPizzaImage}
				path={cartItem.product.image!}
				style={styles.image}
				resizeMode='contain'
			/>
			<View style={{ flex: 1 }}>
				<Text style={styles.title}>{cartItem?.product?.name}</Text>
				<View style={styles.subtitleContainer}>
					<Text style={styles.price}>${cartItem.product.price.toFixed(2)}</Text>
					<Text>Size: {cartItem.size}</Text>
				</View>
			</View>
			<View style={styles.quantitySelector}>
				<FontAwesome
					onPress={() => updateQuantity(cartItem.id, -1)}
					name='minus'
					color='gray'
					style={{ padding: 5 }}
				/>

				<Text style={styles.quantity}>{cartItem.quantity}</Text>
				<FontAwesome
					onPress={() => updateQuantity(cartItem.id, 1)}
					name='plus'
					color='gray'
					style={{ padding: 5 }}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 5,
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
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		marginVertical: 10,
	},
	quantity: {
		fontWeight: '500',
		fontSize: 18,
	},
	price: {
		color: Colors.light.tint,
		fontWeight: 'bold',
	},
});

export default CartListItem;
