import * as Notifications from 'expo-notifications';

import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import { ExpoPushToken } from 'expo-notifications';
import { UpdateProfile } from '@/types';
import { registerForPushNotificationsAsync } from '@/lib/notifications';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthProvider';

const NotificationProvider = ({ children }: PropsWithChildren) => {
	const [expoPushToken, setExpoPushToken] = useState<ExpoPushToken | string>();
	const [notification, setNotification] =
		useState<Notifications.Notification>();
	const notificationListener = useRef<Notifications.Subscription>();
	const responseListener = useRef<Notifications.Subscription>();
	const { profile } = useAuth();

	const savePushToken = async (newToken: string) => {
		setExpoPushToken(newToken);

		if (!newToken) {
			return;
		}

		//update the token in the database
		await supabase
			.from('profiles')
			.update({ expo_push_token: newToken })
			.eq('id', profile?.id as UpdateProfile);
	};

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) =>
			//setExpoPushToken(token ?? '')
			savePushToken(token ?? '')
		);

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
			});

		return () => {
			if (notificationListener.current) {
				Notifications.removeNotificationSubscription(
					notificationListener.current
				);
			}
			if (responseListener.current) {
				Notifications.removeNotificationSubscription(responseListener.current);
			}
		};
	}, []);

	console.log('notify:', notification);
	console.log('Push token: ', expoPushToken);

	return <>{children}</>;
};

export default NotificationProvider;
