import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import Button from '@/components/Button';
import { authStyles } from './_styles';
import { useRouter } from 'expo-router';

const AuthIndex = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [errors, setErrors] = useState('');

	const router = useRouter();

	const resetFields = () => {
		setUsername('');
		setPassword('');
	};

	const validateInput = () => {
		setErrors('');
		if (!username) {
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
			<Text style={authStyles.title}>Login</Text>
			<Text style={authStyles.label}>Username</Text>
			<TextInput
				placeholder='Enter username'
				style={authStyles.input}
				value={username}
				onChangeText={setUsername}
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
			<Button text={'Log in'} onPress={onSubmit} />
		</View>
	);
};

export default AuthIndex;
