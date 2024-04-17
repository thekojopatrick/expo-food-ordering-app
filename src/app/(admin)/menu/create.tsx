import * as ImagePicker from 'expo-image-picker';

import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import { defaultPizzaImage } from '@/constants/Images';
import { useInsertProduct } from '@/api/products';

const CreateProductScreen = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [errors, setErrors] = useState('');
	const [image, setImage] = useState<string | null>(null);
	const router = useRouter();

	const { id } = useLocalSearchParams();
	const isUpdating = !!id;

	const { mutate: createProduct } = useInsertProduct();

	const resetFields = () => {
		setName('');
		setPrice('');
	};

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
		// console.warn('Creating product', name);

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

	const onUpdate = () => {
		console.warn('Update product', name);

		if (!validateInput()) {
			return;
		}

		resetFields();
	};

	const onDelete = () => {
		console.warn('Deleting..');
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
