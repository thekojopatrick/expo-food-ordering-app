import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import ProductListItem from '@components/ProductListItem';
//import products from '@assets/data/products';
import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function MenuScreen() {
	const {
		error,
		isLoading,
		data: products,
	} = useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const { data, error, status } = await supabase
				.from('products')
				.select(`*`);

			if (error) {
				throw new Error(error.message);
			}

			return data;
		},
	});

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>Failed to fetch products</Text>;
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={products}
				renderItem={({ item }) => <ProductListItem product={item} />}
				numColumns={2}
				contentContainerStyle={{ gap: 10 }}
				columnWrapperStyle={{ gap: 10 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		//alignItems: 'flex-start',
		//justifyContent: 'flex-start',
		padding: 10,
	},
});
