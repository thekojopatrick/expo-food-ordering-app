import { ActivityIndicator, View } from 'react-native';
import { Link, Redirect } from 'expo-router';

import Button from '@/components/Button';
import React from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';

const index = () => {
	const { session, loading, isAdmin } = useAuth();

	if (loading) {
		return <ActivityIndicator />;
	}

	if (!session) {
		return <Redirect href={'/(auth)/login'} />;
	}

	if (!isAdmin) {
		return <Redirect href={'/(user)'} />;
	}

	//if (session) return <Redirect href={'/(user)/menu'} />;

	return (
		<View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
			<Link href={'/(user)'} asChild>
				<Button text='User' />
			</Link>
			<Link href={'/(admin)'} asChild>
				<Button text='Admin' />
			</Link>

			<Button onPress={() => supabase.auth.signOut()} text='Sign out' />
		</View>
	);
};

export default index;
