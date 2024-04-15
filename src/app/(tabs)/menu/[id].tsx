import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const ProductDetailsScreen = () => {
	const { id } = useLocalSearchParams();
	return (
		<View>
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
