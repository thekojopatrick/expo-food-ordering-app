import { Button, Text, View } from 'react-native';

import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';

const ProfileScreen = () => {
	const { userName, profile } = useAuth();
	return (
		<View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
			<Text style={{ textAlign: 'center' }}>{userName}</Text>
			<Text style={{ textAlign: 'center' }}>{profile?.role ?? ''}</Text>
			<Button
				title='Sign out'
				onPress={async () => await supabase.auth.signOut()}
			/>
		</View>
	);
};

export default ProfileScreen;
