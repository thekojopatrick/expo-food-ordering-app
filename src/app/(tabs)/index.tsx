import { StyleSheet, View } from 'react-native';

import ProductListItem from '@components/ProductListItem';
import products from '@assets/data/products';

const product = products[0];

export default function MenuScreen() {
	return (
		<View style={styles.container}>
			<ProductListItem product={product} />
			<ProductListItem product={products[1]} />
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
