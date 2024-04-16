import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Text, TextInput, View } from 'react-native';

import Button from '@/components/Button';
import { authStyles } from './_styles';

const SignUpScreen = () => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState('');

	const router = useRouter();

	const resetFields = () => {
		setName('');
		setPassword('');
	};

	const validateInput = () => {
		setErrors('');
		if (!name) {
			setErrors('Name is required.');
			return false;
		}

		if (!password) {
			setErrors('Password is required.');
			return false;
		}

		return true;
	};

	const onSubmit = () => {
		if (!validateInput()) {
			return;
		}

		if (validateInput()) {
			router.push('/(user)');
		}

		resetFields();
	};
	return (
		<View style={authStyles.container}>
			<Stack.Screen options={{ title: 'Sign up' }} />
			<Text style={authStyles.title}>Sign Up</Text>
			<Text style={authStyles.label}>Name</Text>
			<TextInput
				placeholder='Enter name'
				style={authStyles.input}
				value={name}
				onChangeText={setName}
			/>

			<Text style={authStyles.label}>Password</Text>
			<TextInput
				value={password}
				onChangeText={setPassword}
				placeholder='Enter password'
				style={authStyles.input}
				textContentType='password'
				secureTextEntry={true}
			/>

			<Text style={{ color: 'red' }}>{errors}</Text>
			<Button text={'Sign up'} onPress={onSubmit} />
		</View>
	);
};

export default SignUpScreen;
