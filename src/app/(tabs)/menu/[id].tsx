import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

const ProductDetailsScreen = () => {
	const { id } = useLocalSearchParams();
	return (
		<View>
			<Stack.Screen options={{ title: `Product Details ${id}` }} />
			<Text style={styles.title}>ProductDetailsScreen : {id}</Text>
		</View>
	);
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
	},
});
