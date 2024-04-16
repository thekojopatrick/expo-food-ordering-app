import { Link, Stack } from 'expo-router';
import { Pressable, Text } from 'react-native';

import Colors from '@/constants/Colors';

export default function AuthStack() {
	return (
		<Stack>
			<Stack.Screen
				name='index'
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
