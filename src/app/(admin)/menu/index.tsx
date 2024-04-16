import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import ProductListItem from '@components/ProductListItem';
//import products from '@assets/data/products';
import { useProductList } from '@/api/products';

export default function MenuScreen() {
	const { products, isLoading, error } = useProductList();

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
