import { Button, Text, View } from 'react-native';

import { supabase } from '@/lib/supabase';

const ProfileScreen = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<Button
				title='Sign out'
				onPress={async () => await supabase.auth.signOut()}
			/>
		</View>
	);
};

export default ProfileScreen;
