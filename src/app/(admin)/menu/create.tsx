import * as ImagePicker from 'expo-image-picker';

import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
	useDeleteProduct,
	useInsertProduct,
	useProduct,
	useUpdateProduct,
} from '@/api/products';

import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import { defaultPizzaImage } from '@/constants/Images';

const CreateProductScreen = () => {
	const { id: paramId } = useLocalSearchParams();

	const id = parseFloat(typeof paramId === 'string' ? paramId : paramId?.[0]);

	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [errors, setErrors] = useState('');
	const [image, setImage] = useState<string | null>(null);
	const router = useRouter();

	const { data: product } = useProduct(id);
	const isUpdating = !!id;

	const { mutate: createProduct } = useInsertProduct();
	const { mutate: updateProduct } = useUpdateProduct();
	const { mutate: deleteProduct } = useDeleteProduct();

	const resetFields = () => {
		setName('');
		setPrice('');
	};

	useEffect(() => {
		if (product) {
			setName(product.name ?? '');
			setImage(product.image ?? defaultPizzaImage);
			setPrice(product.price?.toString() ?? '');
		}
	}, [product]);

	const validateInput = () => {
		setErrors('');
		if (!name) {
			setErrors('Product Name is required.');
			return false;
		}

		if (!price) {
			setErrors('Price is required.');
			return false;
		}

		if (isNaN(parseFloat(price))) {
			setErrors('Price is not a number');
			return false;
		}

		return true;
	};

	const onCreate = () => {
		console.log('Creating product', name);

		if (!validateInput()) {
			return;
		}

		//Create product
		createProduct(
			{ name, price: parseFloat(price), image },
			{
				onSuccess: () => {
					resetFields();
					router.back();
				},
			}
		);
	};

	// const onCreate = async () => {
	// 	console.log('Creating product', name);

	// 	if (!validateInput()) {
	// 		return;
	// 	}

	// 	try {
	// 		// Create product
	// 		const newProduct = await createProduct({
	// 			name,
	// 			price: parseFloat(price),
	// 			image,
	// 		});

	// 		console.log({ newProduct });

	// 		// Call onSuccess callback if creation is successful
	// 		if (newProduct!) {
	// 			resetFields();
	// 			router.back();
	// 		}
	// 	} catch (error) {
	// 		// Handle any errors that occur during product creation
	// 		console.error('Error creating product:', error);
	// 		// Optionally, you can show an error message to the user
	// 	}
	// };

	const onUpdate = () => {
		console.log('Updating product', name);

		if (!validateInput()) {
			return;
		}

		//Update product
		updateProduct(
			{ id, name, price: parseFloat(price), image },
			{
				onSuccess: () => {
					resetFields();
					router.back();
				},
			}
		);
	};

	const onDelete = () => {
		console.log('Deleting..');

		//Delete product
		deleteProduct(id, {
			onSuccess: () => {
				resetFields();
				router.replace('/(admin)');
			},
		});
	};

	const confirmDelete = () => {
		Alert.alert('Confirm', 'Are you sure you want to delete this product', [
			{ text: 'No' },
			{ text: 'Yes', style: 'destructive', onPress: onDelete },
		]);
	};

	const onSubmit = () => {
		if (isUpdating) {
			onUpdate();
		} else {
			onCreate();
		}
	};

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{ title: isUpdating ? 'Update Product' : 'Create Product' }}
			/>
			<Image
				source={{ uri: image || defaultPizzaImage }}
				style={styles.image}
			/>
			<Text onPress={pickImage} style={styles.textButton}>
				Select Image
			</Text>

			<Text style={styles.label}>Name</Text>
			<TextInput
				placeholder='Enter name'
				style={styles.input}
				value={name}
				onChangeText={setName}
			/>

			<Text style={styles.label}>Price</Text>
			<TextInput
				value={price}
				onChangeText={setPrice}
				placeholder='Enter price'
				style={styles.input}
				keyboardType='numeric'
			/>

			<Text style={{ color: 'red' }}>{errors}</Text>
			<Button text={isUpdating ? 'Update' : 'Create'} onPress={onSubmit} />
			{isUpdating && (
				<Text
					onPress={confirmDelete}
					style={[styles.textButton, { color: 'red' }]}
				>
					Delete
				</Text>
			)}
		</View>
	);
};

export default CreateProductScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 10,
	},
	image: {
		width: '50%',
		aspectRatio: 1,
		alignSelf: 'center',
	},
	textButton: {
		alignSelf: 'center',
		fontWeight: 'bold',
		color: Colors.light.tint,
		marginVertical: 10,
	},

	input: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 5,
		marginTop: 5,
		marginBottom: 20,
	},
	label: {
		color: 'gray',
		fontSize: 16,
	},
});
