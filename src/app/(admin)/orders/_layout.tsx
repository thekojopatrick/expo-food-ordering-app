import { Link, Stack } from 'expo-router';

import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable } from 'react-native';

export default function OrdersStack() {
	return (
		<Stack>
			<Stack.Screen
				name='list'
				options={{ title: 'Orders', headerShown: false }}
			/>
		</Stack>
	);
}
