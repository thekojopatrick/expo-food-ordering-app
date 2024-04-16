import { Link, Redirect } from 'expo-router';

import { ActivityIndicator } from 'react-native';
import React from 'react';
import { useAuth } from '@/providers/AuthProvider';

const index = () => {
	const { session, loading } = useAuth();

	if (loading) {
		return <ActivityIndicator />;
	}

	if (session) return <Redirect href={'/(user)/menu'} />;

	return <Redirect href={'/(auth)/login'} />;
};

export default index;
