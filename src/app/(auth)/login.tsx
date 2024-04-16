import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import Button from '@/components/Button';
import { authStyles } from './_styles';

const AuthIndex = () => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [errors, setErrors] = useState('');

	const router = useRouter();

	const resetFields = () => {
		setUsername('');
		setPassword('');
		setEmail('');
	};

	const validateInput = () => {
		setErrors('');

		if (!email) {
			setErrors('Email is required.');
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
			{/* <Text style={authStyles.label}>Username</Text>
			<TextInput
				placeholder='Enter username'
				style={authStyles.input}
				value={username}
				onChangeText={setUsername}
			/> */}
			<Text style={authStyles.label}>Email</Text>
			<TextInput
				value={email}
				onChangeText={setEmail}
				placeholder='jon@gmail.com'
				style={authStyles.input}
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
			<Link href='/sign-up' style={authStyles.textButton}>
				Create an account
			</Link>
		</View>
	);
};

export default AuthIndex;
