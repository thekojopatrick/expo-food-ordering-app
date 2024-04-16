import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const OrderListNavigator = () => {
	return (
		<SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#fff' }}>
			<TopTabs>
				<TopTabs.Screen name='index' options={{ title: 'Active' }} />
			</TopTabs>
		</SafeAreaView>
	);
};

export default OrderListNavigator;
