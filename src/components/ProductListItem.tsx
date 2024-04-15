import { Image, StyleSheet, Text, View } from 'react-native';

import Colors from '@/src/constants/Colors';
interface IProductProps {
	image: string;
	name: string;
	price: number;
}
interface IProductListItem {
	product: IProductProps;
	index?: number;
}

const ProductListItem: React.FC<IProductListItem> = ({ product }) => {
	return (
		<View style={styles.container}>
			<Image source={{ uri: product.image }} style={styles.image} />
			<Text style={styles.title}>{product.name}</Text>
			<Text style={styles.price}>${product.price}</Text>
		</View>
	);
};

export default ProductListItem;

const styles = StyleSheet.create({
	container: {
		//flex: 1,
		//alignItems: 'flex-start',
		//justifyContent: 'flex-start',
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 8,
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
