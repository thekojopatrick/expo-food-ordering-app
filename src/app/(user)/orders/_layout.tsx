import { Link, Stack } from 'expo-router';

import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable } from 'react-native';

export default function OrdersStack() {
	return (
		<Stack
			screenOptions={{
				headerRight: () => (
					<Link href='/cart' asChild>
						<Pressable>
							{({ pressed }) => (
								<FontAwesome
									name='shopping-cart'
									size={25}
									color={Colors.light.tint}
									style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
								/>
							)}
						</Pressable>
					</Link>
				),
			}}
		>
			<Stack.Screen name='index' options={{ title: 'Orders' }} />
		</Stack>
	);
}
