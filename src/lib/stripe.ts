import {
	initPaymentSheet,
	presentPaymentSheet,
} from '@stripe/stripe-react-native';

import { Alert } from 'react-native';
import { supabase } from './supabase';

const fetchPaymentSheetParams = async (amount: number) => {
	const { data, error } = await supabase.functions.invoke('payment-sheet', {
		body: { amount },
	});

	if (data) {
		return data;
	}

	if (error) {
		return Alert.alert('Error fetching payment sheet params');
	}

	return;
};

export const initializePaymentSheet = async (amount: number) => {
	console.log('Initializing payment sheet  for: ' + amount);
	const { paymentIntent, publishableKey, customer, ephemeralKey } =
		await fetchPaymentSheetParams(amount);
	if (!paymentIntent || !publishableKey) return;

	//console.log({ paymentIntent });

	await initPaymentSheet({
		merchantDisplayName: 'KojoDev',
		returnURL: 'foodapp://stripe-redirect',
		customerId: customer,
		customerEphemeralKeySecret: ephemeralKey,
		paymentIntentClientSecret: paymentIntent,
		defaultBillingDetails: {
			name: 'John Doe',
		},
	});
};

export const openPaymentSheet = async () => {
	const { error } = await presentPaymentSheet();

	if (error) {
		Alert.alert(error.message);
		return false;
	}
	Alert.alert('Success', 'Your order is confirmed');
	return true;
};
