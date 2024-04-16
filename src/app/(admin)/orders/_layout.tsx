import { Link, Stack } from 'expo-router';

import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable } from 'react-native';

export default function MenuStack() {
	return (
		<Stack>
			<Stack.Screen name='index' options={{ title: 'Orders' }} />
		</Stack>
	);
}
