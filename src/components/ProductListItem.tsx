import { Image, StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import { Product } from '../types';

interface IProductListItemProps {
	product: Product;
	index?: number;
}

export const defaultPizzaImage =
	'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

const ProductListItem: React.FC<IProductListItemProps> = ({ product }) => {
	return (
		<View style={styles.container}>
			<Image
				source={{ uri: product.image ?? defaultPizzaImage }}
				style={styles.image}
			/>
			<Text style={styles.title}>{product.name}</Text>
			<Text style={styles.price}>${product.price}</Text>
		</View>
	);
};

export default ProductListItem;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 8,
		maxWidth: '50%',
	},
	image: {
		width: '95%',
		aspectRatio: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginVertical: 10,
	},
	price: {
		color: Colors.light.tint,
		fontWeight: 'bold',
	},
});
