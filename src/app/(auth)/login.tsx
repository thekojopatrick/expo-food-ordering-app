import { Alert, Text, TextInput, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';

import Button from '@/components/Button';
import { authStyles } from './_styles';
import { supabase } from '@/lib/supabase';

const AuthIndex = () => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

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
			loginWithEmail();
		}

		resetFields();
	};

	async function loginWithEmail() {
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) Alert.alert(error.message);

		// if (!session)
		// 	Alert.alert('Please check your inbox for email verification!');

		// if (session) {
		// 	router.push('/(user)');
		// }

		setLoading(false);
	}

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
				autoCapitalize={'none'}
			/>

			<Text style={authStyles.label}>Password</Text>
			<TextInput
				value={password}
				onChangeText={setPassword}
				placeholder='Enter password'
				style={authStyles.input}
				textContentType='password'
				secureTextEntry={true}
				autoCapitalize={'none'}
			/>

			<Text style={{ color: 'red' }}>{errors}</Text>
			<Button
				text={loading ? 'Logging in ' : 'Log in'}
				disabled={loading}
				onPress={onSubmit}
			/>
			<Link href='/sign-up' style={authStyles.textButton}>
				Create an account
			</Link>
			<Link href='/(admin)/menu' style={authStyles.textButton}>
				Go to admin
			</Link>
		</View>
	);
};

export default AuthIndex;
