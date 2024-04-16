import { ActivityIndicator, Pressable, Text } from 'react-native';
import { Link, Redirect, Stack } from 'expo-router';

import Colors from '@/constants/Colors';
import { useAuth } from '@/providers/AuthProvider';

export default function AuthStack() {
	const { session, loading } = useAuth();

	// if (loading) {
	// 	return <ActivityIndicator />;
	// }

	if (session) {
		return <Redirect href={'/'} />;
	}

	return (
		<Stack>
			<Stack.Screen
				name='login'
				options={{
					title: 'Login',
					headerRight: () => (
						<Link href='/(auth)/sign-up' asChild>
							<Pressable style={{ paddingHorizontal: 10 }}>
								<Text style={{ color: Colors.light.tint }}>Sign up</Text>
							</Pressable>
						</Link>
					),
				}}
			/>
		</Stack>
	);
}
