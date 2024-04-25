import { Button, Text, View } from 'react-native';

import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';

const ProfileScreen = () => {
	const { profile, userName } = useAuth();
	return (
		<View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
			<View style={{ alignItems: 'center', marginBottom: 20, gap: 5 }}>
				<Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
					{profile?.full_name}
				</Text>
				<Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '600' }}>
					@{profile?.username ?? userName}
				</Text>
				<Text style={{ textAlign: 'center' }}>{profile?.role ?? ''}</Text>
			</View>
			<Button
				title='Sign out'
				onPress={async () => await supabase.auth.signOut()}
			/>
		</View>
	);
};

export default ProfileScreen;
