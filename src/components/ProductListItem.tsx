import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, useSegments } from 'expo-router';

import Colors from '@/constants/Colors';
import { Product } from '@/types';
import RemoteImage from './RemoteImage';
import { defaultPizzaImage } from '@/constants/Images';

interface IProductListItemProps {
	product: Product;
	index?: number;
}

const ProductListItem: React.FC<IProductListItemProps> = ({ product }) => {
	const segments = useSegments<['(user)'] | ['(admin)']>();

	//console.log(product.image);

	return (
		<Link asChild href={`/${segments[0]}/menu/${product.id}`}>
			<Pressable style={styles.container}>
				<RemoteImage
					fallback={defaultPizzaImage}
					path={product.image!}
					style={styles.image}
					resizeMode='contain'
				/>
				{/* <Image
					source={{ uri: product.image ?? defaultPizzaImage }}
					style={styles.image}
					resizeMode='contain'
				/> */}
				<Text style={styles.title}>{product.name}</Text>
				<Text style={styles.price}>${product.price}</Text>
			</Pressable>
		</Link>
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
		fontSize: 18,
		fontWeight: '600',
		marginVertical: 10,
	},
	price: {
		color: Colors.light.tint,
		fontWeight: 'bold',
	},
});
