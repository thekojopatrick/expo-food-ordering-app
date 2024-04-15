import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import React from 'react';
import { defaultPizzaImage } from '@/components/ProductListItem';
import products from '@assets/data/products';
import { useState } from 'react';

const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
	const { id } = useLocalSearchParams();
	const [selectedSize, setSelectedSize] = useState('M');
	const product = products.find((p) => p.id === Number(id));
	if (!product) return <Text>Product not found</Text>;

	const addToCart = () => {
		alert(`Added to cart :${selectedSize}`);
	};

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: `${product.name}` }} />
			<Image
				source={{ uri: product.image ?? defaultPizzaImage }}
				style={styles.image}
				resizeMode='contain'
			/>
			<Text>Select size</Text>
			<View style={styles.sizes}>
				{sizes.map((size, index) => (
					<Pressable
						onPress={() => {
							setSelectedSize(size);
						}}
						key={index}
						style={[
							styles.size,
							{
								backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
							},
						]}
					>
						<Text
							style={[
								styles.sizeText,
								{
									color: selectedSize === size ? 'black' : 'gray',
								},
							]}
						>
							{size}
						</Text>
					</Pressable>
				))}
			</View>
			<Text style={styles.price}>${product.price}</Text>
			<Button onPress={addToCart} text='Add to cart' />
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
	},
	image: {
		width: '95%',
		aspectRatio: 1,
	},
	price: {
		color: Colors.light.tint,
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 'auto',
	},
	sizes: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 10,
	},
	size: {
		width: 50,
		aspectRatio: 1,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		backgroundColor: 'gainsboro',
	},
	sizeText: {
		fontSize: 20,
		fontWeight: '600',
	},
});
