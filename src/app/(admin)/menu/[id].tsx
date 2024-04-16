import {
	ActivityIndicator,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';

import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { PizzaSize } from '@/types';
import React from 'react';
import { defaultPizzaImage } from '@/constants/Images';
import products from '@assets/data/products';
import { useCart } from '@/providers/CartProvider';
import { useProduct } from '@/api/products';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
	const { id: paramId } = useLocalSearchParams();

	const id = parseFloat(typeof paramId === 'string' ? paramId : paramId?.[0]);

	const { data: product, error, isLoading } = useProduct(id);

	const { addItem } = useCart();
	const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
	//const product = products.find((p) => p.id === Number(id));

	const router = useRouter();

	const addToCart = () => {
		if (!product) {
			return;
		}
		addItem(product, selectedSize);
		router.push('/cart');

		//alert(`Added to cart :${product.name}`);
	};

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>Failed to fetch product</Text>;
	}

	if (!product) return <Text>Product not found</Text>;

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: 'Menu',
					headerRight: () => (
						<Link href={`/(admin)/menu/create?id=${id}`} asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name='pencil'
										size={25}
										color={Colors.light.tint}
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
			<Stack.Screen options={{ title: product.name }} />
			<Image
				source={{ uri: product.image ?? defaultPizzaImage }}
				style={styles.image}
				resizeMode='contain'
			/>
			<Text style={styles.title}>{product.name}</Text>
			<Text style={styles.price}>${product.price}</Text>
		</View>
	);
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	image: {
		width: '95%',
		aspectRatio: 1,
	},
	price: {
		color: Colors.light.tint,
		fontSize: 20,
		fontWeight: 'bold',
		//marginTop: 'auto',
	},
});
