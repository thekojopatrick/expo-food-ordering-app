import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '@components/Themed';

import EditScreenInfo from '@components/EditScreenInfo';
import { StatusBar } from 'expo-status-bar';

export default function CartScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Cart</Text>
			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
